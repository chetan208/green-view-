'use client';

import React, { useState, useEffect } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Loader2, X, UploadCloud, AlertCircle } from "lucide-react";
import { erpApi } from "@/services/erpApi";

export interface HeroImage {
  _id: string;
  imageUrl: string;
  imagePublicId: string;
  order: number;
}

interface FilePreview {
  file: File;
  previewUrl: string;
}

export default function HeroManager() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Upload States
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Delete States
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await erpApi.heroImages.list();
      if (res.success) {
        setImages(res.images || []);
      }
    } catch (err) {
      console.error(err);
      setUploadError("Failed to fetch banner images.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    const newPreviews = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    setSelectedFiles(prev => [...prev, ...newPreviews]);
    setUploadError(null);
    e.target.value = ''; // Reset input
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].previewUrl);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const uploadSelectedFiles = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress({ current: 0, total: selectedFiles.length });

    let successCount = 0;
    const newUploadedImages: HeroImage[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      setUploadProgress(prev => ({ ...prev, current: i + 1 }));
      const formData = new FormData();
      formData.append("image", selectedFiles[i].file);

      try {
        const res = await erpApi.heroImages.create(formData);
        if (res.success) {
          successCount++;
          newUploadedImages.push(res.image);
        }
      } catch (err) {
        console.error("Upload failed for a file:", err);
      }
    }

    if (successCount > 0) {
      setImages(prev => [...prev, ...newUploadedImages]);
      // Cleanup previews
      selectedFiles.forEach(sf => URL.revokeObjectURL(sf.previewUrl));
      setSelectedFiles([]);
    } else {
      setUploadError("Failed to upload files. Please try again.");
    }
    
    setIsUploading(false);
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev => 
      prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id]
    );
  };

  const confirmDelete = (ids: string[]) => {
    setImagesToDelete(ids);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (imagesToDelete.length === 0) return;
    
    setIsDeleting(true);
    let successCount = 0;

    for (const id of imagesToDelete) {
      try {
        const res = await erpApi.heroImages.delete(id);
        if (res.success) {
          successCount++;
        }
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    }

    if (successCount > 0) {
      setImages(prev => prev.filter((img) => !imagesToDelete.includes(img._id)));
      setSelectedImages(prev => prev.filter((id) => !imagesToDelete.includes(id)));
      setDeleteModalOpen(false);
      setImagesToDelete([]);
    } else {
      alert("Failed to delete images.");
    }
    
    setIsDeleting(false);
  };

  const moveImage = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === images.length - 1)
    ) return;

    const newImages = [...images];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    const tempOrder = newImages[index].order;
    newImages[index].order = newImages[swapIndex].order;
    newImages[swapIndex].order = tempOrder;

    newImages.sort((a, b) => a.order - b.order);
    setImages(newImages);

    const updates = newImages.map(img => ({ id: img._id, order: img.order }));
    try {
      await erpApi.heroImages.reorder(updates);
    } catch (err) {
      console.error('Failed to save new order:', err);
      alert('Failed to save the new order.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>Loading banners...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Website Banner</h2>
          <p className="text-sm text-slate-500 mt-1">Manage banner images shown in the home page carousel.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {selectedImages.length > 0 && (
            <button
              onClick={() => confirmDelete(selectedImages)}
              className="bg-red-50 text-red-600 border border-red-200 px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-red-100 transition shadow-sm"
            >
              <Trash2 size={18} />
              Delete Selected ({selectedImages.length})
            </button>
          )}
          <label className="cursor-pointer bg-[#006a37] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-[#00522a] transition shadow-sm active:scale-95">
            <Plus size={18} />
            Add Banners
            <input 
              type="file" 
              accept="image/*" 
              multiple
              className="hidden" 
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {uploadError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100 flex items-center gap-3">
          <AlertCircle size={20} />
          {uploadError}
        </div>
      )}

      {/* Upload Preview Section */}
      {selectedFiles.length > 0 && (
        <div className="mb-8 bg-blue-50/50 border border-blue-100 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              <UploadCloud size={18} />
              Files ready to upload ({selectedFiles.length})
            </h3>
            {!isUploading && (
              <button 
                onClick={uploadSelectedFiles}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm flex items-center gap-2"
              >
                Upload All
              </button>
            )}
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {selectedFiles.map((sf, idx) => (
              <div key={idx} className="relative shrink-0 w-32 h-32 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img src={sf.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                {!isUploading && (
                  <button 
                    onClick={() => removeSelectedFile(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <X size={14} />
                  </button>
                )}
                {isUploading && uploadProgress.current === idx + 1 && (
                  <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center backdrop-blur-sm">
                    <Loader2 className="animate-spin text-blue-600 mb-2" size={24} />
                    <span className="text-xs font-bold text-blue-800">Uploading...</span>
                  </div>
                )}
                {isUploading && uploadProgress.current > idx + 1 && (
                  <div className="absolute inset-0 bg-green-500/80 flex flex-col items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-bold text-sm">Done</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {images.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
          <ImageIcon className="mx-auto text-slate-300 mb-4" size={56} />
          <h3 className="text-lg font-medium text-slate-700">No banners uploaded</h3>
          <p className="text-sm text-slate-500 mt-1">Upload an image to start showing banners.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={image._id} 
              className={`bg-white rounded-xl overflow-hidden shadow-sm border transition-all group ${selectedImages.includes(image._id) ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 hover:border-[#006a37]/30'}`}
            >
              <div className="relative aspect-[16/9] sm:aspect-[4/3] bg-slate-100">
                <img 
                  src={image.imageUrl} 
                  alt="Banner Slide" 
                  className="w-full h-full object-cover"
                />
                
                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(image._id)}
                    onChange={() => toggleImageSelection(image._id)}
                    className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer shadow-sm"
                  />
                </div>
                
                {/* Actions overlay */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => moveImage(index, 'up')}
                    disabled={index === 0}
                    className="p-2 bg-white/95 text-slate-700 rounded-md hover:bg-white hover:text-[#006a37] disabled:opacity-50 shadow-sm transition-colors"
                    title="Move Earlier"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button 
                    onClick={() => moveImage(index, 'down')}
                    disabled={index === images.length - 1}
                    className="p-2 bg-white/95 text-slate-700 rounded-md hover:bg-white hover:text-[#006a37] disabled:opacity-50 shadow-sm transition-colors"
                    title="Move Later"
                  >
                    <ArrowDown size={16} />
                  </button>
                  <button 
                    onClick={() => confirmDelete([image._id])}
                    className="p-2 bg-white/95 text-red-600 rounded-md hover:bg-red-50 hover:text-red-700 shadow-sm ml-1 transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-white border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Slide {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={28} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Delete {imagesToDelete.length > 1 ? `${imagesToDelete.length} Banners` : 'Banner'}?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to delete {imagesToDelete.length > 1 ? 'these banners' : 'this banner'}? This action cannot be undone and will immediately remove {imagesToDelete.length > 1 ? 'them' : 'it'} from the website.
              </p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => { setDeleteModalOpen(false); setImagesToDelete([]); }}
                  disabled={isDeleting}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isDeleting ? <Loader2 size={18} className="animate-spin" /> : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
