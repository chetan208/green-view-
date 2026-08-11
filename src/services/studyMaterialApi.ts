import { StudyMaterialItem, AcademicStructureResponse, StudyMaterialType } from '@/types/studyMaterial';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const StudyMaterialApi = {
    /**
     * Fetch the dynamic classes and subjects structure with real counts
     */
    async getStructure(): Promise<AcademicStructureResponse> {
        try {
            const res = await fetch(`${API_BASE_URL}/api/study-material/structure`, {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch academic structure');
            return await res.json();
        } catch (error) {
            console.error('[StudyMaterialApi] Error fetching structure:', error);
            return {
                success: false,
                classes: [
                    'Class I', 'Class II', 'Class III', 'Class IV', 'Class V',
                    'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X',
                    'Class XI', 'Class XII'
                ],
                materialsSummary: [],
                subjectsCatalog: []
            };
        }
    },

    /**
     * Fetch study materials with filters
     */
    async getMaterials(params: {
        className?: string;
        subjectName?: string;
        type?: StudyMaterialType;
        chapterNumber?: number;
        search?: string;
    }): Promise<StudyMaterialItem[]> {
        try {
            const query = new URLSearchParams();
            if (params.className) query.append('className', params.className);
            if (params.subjectName) query.append('subjectName', params.subjectName);
            if (params.type) query.append('type', params.type);
            if (params.chapterNumber) query.append('chapterNumber', params.chapterNumber.toString());
            if (params.search) query.append('search', params.search);

            const res = await fetch(`${API_BASE_URL}/api/study-material?${query.toString()}`, {
                cache: 'no-store'
            });

            if (!res.ok) throw new Error('Failed to fetch study materials');
            const data = await res.json();
            return data.data || [];
        } catch (error) {
            console.error('[StudyMaterialApi] Error fetching materials:', error);
            return [];
        }
    },

    /**
     * Track download count atomically
     */
    async trackDownload(id: string): Promise<void> {
        try {
            await fetch(`${API_BASE_URL}/api/study-material/${id}/download`, {
                method: 'POST'
            });
        } catch (e) {
            // Non-blocking analytics
        }
    },

    /**
     * Track view count atomically
     */
    async trackView(id: string): Promise<void> {
        try {
            await fetch(`${API_BASE_URL}/api/study-material/${id}/view`, {
                method: 'POST'
            });
        } catch (e) {
            // Non-blocking analytics
        }
    },

    // ==================== ADMIN API CALLS ====================

    async adminGetMaterials(params?: {
        className?: string;
        subjectName?: string;
        type?: string;
    }): Promise<StudyMaterialItem[]> {
        const query = new URLSearchParams();
        if (params?.className) query.append('className', params.className);
        if (params?.subjectName) query.append('subjectName', params.subjectName);
        if (params?.type) query.append('type', params.type);

        const res = await fetch(`${API_BASE_URL}/api/admin/study-materials?${query.toString()}`, {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error('Failed to fetch admin study materials');
        const data = await res.json();
        return data.data || [];
    },

    async adminCreateMaterial(formData: FormData): Promise<StudyMaterialItem> {
        const res = await fetch(`${API_BASE_URL}/api/admin/study-material`, {
            method: 'POST',
            body: formData
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'Failed to create material');
        }
        const data = await res.json();
        return data.data;
    },

    async adminUpdateMaterial(id: string, formData: FormData): Promise<StudyMaterialItem> {
        const res = await fetch(`${API_BASE_URL}/api/admin/study-material/${id}`, {
            method: 'PUT',
            body: formData
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'Failed to update material');
        }
        const data = await res.json();
        return data.data;
    },

    async adminDeleteMaterial(id: string): Promise<boolean> {
        const res = await fetch(`${API_BASE_URL}/api/admin/study-material/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete material');
        return true;
    },

    async adminSeedDefaults(): Promise<void> {
        await fetch(`${API_BASE_URL}/api/admin/study-material/seed-default`, {
            method: 'POST'
        });
    }
};

export default StudyMaterialApi;
