export type StudyMaterialType = 'notes' | 'lectures' | 'papers';
export type AcademicStream = 'General' | 'Science' | 'Commerce' | 'Arts';

export interface StudyMaterialItem {
    _id: string;
    className: string;           // "Class I" - "Class XII"
    stream: AcademicStream;
    subjectName: string;
    chapterNumber: number;
    chapterName: string;
    title: string;
    description?: string;
    type: StudyMaterialType;

    // PDF details (notes & papers)
    pdfUrl?: string;
    pdfPublicId?: string;
    cloudProvider?: string;
    fileSizeBytes?: number;
    formattedSize?: string;

    // Video details (lectures)
    youtubeUrl?: string;
    youtubeVideoId?: string;
    videoTitle?: string;
    thumbnailUrl?: string;
    duration?: string;

    // Question Paper details
    paperYear?: string;
    examType?: string;
    totalMarks?: number;
    hasSolution?: boolean;
    solutionPdfUrl?: string;

    // Stats & metadata
    order: number;
    downloadsCount: number;
    viewsCount: number;
    isPublished: boolean;
    session?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface ChapterSummary {
    chapterNumber: number;
    chapterName: string;
    notesCount: number;
    lecturesCount: number;
    papersCount: number;
    materials: StudyMaterialItem[];
}

export interface SubjectSummary {
    name: string;
    iconName?: string;
    totalMaterials: number;
    chapters: ChapterSummary[];
}

export interface ClassSummary {
    className: string;
    desc: string;
    totalMaterials: number;
    subjects: string[];
}

export interface AcademicStructureResponse {
    success: boolean;
    classes: string[];
    materialsSummary: Array<{
        _id: {
            className: string;
            subjectName: string;
            chapterNumber: number;
            chapterName: string;
            type: StudyMaterialType;
        };
        count: number;
    }>;
    subjectsCatalog: Array<{
        _id: string;
        className: string;
        subjectName: string;
        stream: string;
        chapters: Array<{
            chapterNumber: number;
            title: string;
            description?: string;
        }>;
    }>;
}
