import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.greenviewschool.in';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
});

const baseApi = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// ==================== ADMISSIONS API ====================
export const submitAdmissionApplicationApi = async (formData: FormData) => {
  const response = await baseApi.post('/admissions/submit', formData);
  return response.data;
};

// ==================== TRANSPORT API ====================
export const getPublicStationsApi = async () => {
  const res = await baseApi.get('/stations');
  return res.data;
};

// ==================== NOTICES API ====================
export const getNoticesApi = async () => {
  const response = await api.get('/notices');
  return response.data;
};

export const createNoticeApi = async (formData: FormData) => {
  const response = await api.post('/notice', formData);
  return response.data;
};

export const updateNoticeApi = async (id: string, formData: FormData) => {
  const response = await api.put(`/notice/${id}`, formData);
  return response.data;
};

export const deleteNoticeApi = async (id: string) => {
  const response = await api.delete(`/notice/${id}`);
  return response.data;
};

// ==================== CALENDAR API ====================
export const getCalendarEventsApi = async (params?: { month?: number; year?: number }) => {
  const response = await api.get('/calendar', { params });
  return response.data;
};

export const createCalendarEventApi = async (data: {
  title: string;
  description?: string;
  date: string;
  endDate?: string;
  type?: 'singleDay' | 'multiDay';
}) => {
  const response = await api.post('/calendar', data);
  return response.data;
};

export const updateCalendarEventApi = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    date?: string;
    endDate?: string;
    type?: 'singleDay' | 'multiDay';
  }
) => {
  const response = await api.put(`/calendar/${id}`, data);
  return response.data;
};

export const deleteCalendarEventApi = async (id: string) => {
  const response = await api.delete(`/calendar/${id}`);
  return response.data;
};

// ==================== GALLERY / FOLDERS API ====================
export const getFoldersApi = async () => {
  const response = await api.get('/folders');
  return response.data;
};

export const getFolderByIdApi = async (id: string, params?: { page?: number; limit?: number }) => {
  const response = await api.get(`/folder/${id}`, { params });
  return response.data;
};

export const createFolderApi = async (name: string) => {
  const response = await api.post('/folder', { name });
  return response.data;
};

export const updateFolderApi = async (id: string, name: string) => {
  const response = await api.put(`/folder/${id}`, { name });
  return response.data;
};

export const deleteFolderApi = async (id: string) => {
  const response = await api.delete(`/folder/${id}`);
  return response.data;
};

export const getMediaApi = async (params?: { folderId?: string; mediaType?: string; page?: number; limit?: number }) => {
  const response = await api.get('/gallery', { params });
  return response.data;
};

export const addMediaToFolderApi = async (folderId: string, data: FormData | { title?: string; mediaType: 'video'; youtubeUrl: string }) => {
  if (data instanceof FormData) {
    const response = await api.post(`/folder/${folderId}/media`, data);
    return response.data;
  } else {
    const response = await api.post(`/folder/${folderId}/media`, data);
    return response.data;
  }
};

export const addMultipleMediaToFolderApi = async (folderId: string, formData: FormData) => {
  const response = await api.post(`/folder/${folderId}/media/batch`, formData);
  return response.data;
};

export const deleteMediaApi = async (id: string) => {
  const response = await api.delete(`/gallery/${id}`);
  return response.data;
};

export const deleteMultipleMediaApi = async (ids: string[]) => {
  const response = await api.post('/gallery/batch-delete', { ids });
  return response.data;
};
