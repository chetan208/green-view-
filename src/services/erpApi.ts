const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.greenviewschool.in';

// Helper to get auth token
const getAuthHeaders = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('erp_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {};
};

// Helper for authenticated fetch
export const authFetch = async (url: string, options: RequestInit = {}) => {
  const headers = new Headers();
  
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  const auth = getAuthHeaders();
  if (auth.Authorization) {
    headers.set('Authorization', auth.Authorization);
  }

  if (options.headers) {
    const customHeaders = new Headers(options.headers);
    customHeaders.forEach((value, key) => {
      headers.set(key, value);
    });
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
    credentials: 'omit', // Using token in header for API
  });
  
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('erp_token');
      localStorage.removeItem('erp_user');
      window.location.href = '/auth/teacher/login';
    }
    throw new Error('Unauthorized');
  }
  return res;
};

export interface Class {
  _id: string;
  className: string;
  sections?: string[];
  admissionFee: number;
  tuitionFee: number;
  examFee: number;
  computerFee: number;
  smartClassFee: number;
  sportsFee: number;
  ptmFine: number;
  lateFee: number;
  annualCharges: number;
  otherCharges: number;
}

export interface StudentSession {
  _id: string;
  userId: any;
  sessionId: any;
  classId: Class | string;
  section?: string;
  cardNo: string;
  station?: string;
  dateOfAdmission?: string;
}


// --- AUTH API ---
export const authApi = {
  sendOtp: async (phone: string, role: 'user' | 'student' = 'user') => {
    const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, role }),
    });
    return res.json();
  },
  
  verifyOtp: async (phone: string, otp: string, role: 'user' | 'student' = 'user') => {
    const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp, role }),
    });
    return res.json();
  },
  
  me: async () => {
    const res = await authFetch('/api/auth/me');
    return res.json();
  },
  
  updateMe: async (data: any) => {
    const res = await authFetch('/api/auth/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateProfilePhoto: async (formData: FormData) => {
    const res = await authFetch('/api/auth/me/photo', {
      method: 'PUT',
      body: formData
    });
    return res.json();
  },
  
  logout: async () => {
    const res = await authFetch('/api/auth/logout', { method: 'POST' });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('erp_token');
      localStorage.removeItem('erp_user');
    }
    return res.json();
  }
};

// --- ADMISSIONS API ---
export const admissionsApi = {
  submit: async (formData: FormData) => {
    const res = await fetch(`${API_BASE}/api/admissions/submit`, {
      method: 'POST',
      body: formData, // Do not set Content-Type for FormData
    });
    return res.json();
  },
  
  list: async (filters: any = {}) => {
    const params = new URLSearchParams(filters).toString();
    const res = await authFetch(`/api/admissions?${params}`);
    return res.json();
  },
  
  stats: async () => {
    const res = await authFetch('/api/admissions/stats');
    return res.json();
  },
  
  get: async (id: string) => {
    const res = await authFetch(`/api/admissions/${id}`);
    return res.json();
  },
  
  approve: async (id: string, sessionYear?: string) => {
    const res = await authFetch(`/api/admissions/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ sessionYear })
    });
    return res.json();
  },
  reject: async (id: string, reason: string) => {
    const res = await authFetch(`/api/admissions/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
    return res.json();
  }
};

// --- ERP API ---
export const erpApi = {
  // Students
  students: {
    list: async (filters: any = {}) => {
      const params = new URLSearchParams(filters).toString();
      const res = await authFetch(`/api/erp/students?${params}`);
      return res.json();
    },
    create: async (formData: FormData) => {
      const res = await authFetch('/api/erp/students', {
        method: 'POST',
        body: formData,
      });
      return res.json();
    },
    get: async (id: string) => {
      const res = await authFetch(`/api/erp/students/${id}`);
      return res.json();
    },
    update: async (id: string, data: any) => {
      const isFormData = data instanceof FormData;
      const res = await authFetch(`/api/erp/students/${id}`, {
        method: 'PUT',
        body: isFormData ? data : JSON.stringify(data),
        // authFetch usually adds Content-Type automatically if not FormData. Wait, I should check authFetch.
      });
      return res.json();
    },
    delete: async (id: string) => {
      const res = await authFetch(`/api/erp/students/${id}`, { method: 'DELETE' });
      return res.json();
    },
    promote: async (id: string, data: any) => {
      const res = await authFetch(`/api/erp/students/${id}/promote`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.json();
    },
    getNextRollNo: async (classId: string, sessionId: string) => {
      const res = await authFetch(`/api/erp/students/next-roll-no?classId=${classId}&sessionId=${sessionId}`);
      return res.json();
    }
  },
  
  // Teachers
  teachers: {
    list: async (filters: any = {}) => {
      const params = new URLSearchParams(filters).toString();
      const res = await authFetch(`/api/erp/teachers?${params}`);
      return res.json();
    },
    create: async (formData: FormData) => {
      const res = await authFetch('/api/erp/teachers', {
        method: 'POST',
        body: formData,
      });
      return res.json();
    },
    get: async (id: string) => {
      const res = await authFetch(`/api/erp/teachers/${id}`);
      return res.json();
    },
    update: async (id: string, data: any) => {
      const res = await authFetch(`/api/erp/teachers/${id}`, {
        method: 'PUT',
        body: data instanceof FormData ? data : JSON.stringify(data)
      });
      return res.json();
    },
    delete: async (id: string) => {
      const res = await authFetch(`/api/erp/teachers/${id}`, { method: 'DELETE' });
      return res.json();
    }
  },

  // Classes & Sessions
  classes: {
    list: async () => {
      const res = await authFetch('/api/erp/classes');
      return res.json();
    },
    createClass: async (data: Partial<Class>) => {
      const res = await authFetch('/api/erp/classes', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.json();
    },
    updateClass: async (id: string, data: Partial<Class>) => {
      const res = await authFetch(`/api/erp/classes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return res.json();
    },
    getDefaultFees: async () => {
      const res = await authFetch('/api/erp/classes/fees');
      return res.json();
    },
    setDefaultFees: async (data: any) => {
      const res = await authFetch('/api/erp/classes/fees', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.json();
    },
    getMonthlyFees: async () => {
      const res = await authFetch('/api/erp/classes/monthly-fees');
      return res.json();
    },
    setMonthlyFees: async (data: any) => {
      const res = await authFetch('/api/erp/classes/monthly-fees', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.json();
    }
  },
  
  sessions: {
    list: async () => {
      const res = await authFetch('/api/erp/sessions');
      return res.json();
    },
    create: async (year: string) => {
      const res = await authFetch('/api/erp/sessions', {
        method: 'POST',
        body: JSON.stringify({ year })
      });
      return res.json();
    },
    getAdmissionStatus: async () => {
      const res = await fetch(`${API_BASE}/api/erp/sessions/public/admission-status`);
      return res.json();
    },
    toggleAdmissionStatus: async (id: string, admissionsOpen: boolean) => {
      const res = await authFetch(`/api/erp/sessions/${id}/toggle-admissions`, {
        method: 'POST',
        body: JSON.stringify({ admissionsOpen })
      });
      return res.json();
    }
  },

  // Fees & Payments
  fees: {
    stats: async (session?: string) => {
      const res = await authFetch(`/api/fees/stats${session ? `?session=${session}` : ''}`);
      return res.json();
    },
    incomeAnalysis: async (session?: string) => {
      const res = await authFetch(`/api/fees/income-analysis${session ? `?session=${session}` : ''}`);
      return res.json();
    },
    getStudentFees: async (studentId: string) => {
      const res = await authFetch(`/api/fees/students/${studentId}`);
      return res.json();
    },
    updateFeeRecord: async (feeId: string, data: any) => {
      const res = await authFetch(`/api/fees/${feeId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return res.json();
    },
    makePayment: async (data: any) => {
      const res = await authFetch('/api/payments/make-payment', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.json();
    },
    getReceipt: async (feeStructureId: string) => {
      const res = await authFetch(`/api/payments/receipt/public/${feeStructureId}`);
      return res.json();
    }
  },
  
  // Transport
  transport: {
    routes: {
      list: async () => {
        const res = await authFetch('/api/erp/routes');
        return res.json();
      },
      create: async (data: any) => {
        const res = await authFetch('/api/erp/routes', {
          method: 'POST',
          body: JSON.stringify(data)
        });
        return res.json();
      },
      update: async (id: string, data: any) => {
        const res = await authFetch(`/api/erp/routes/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data)
        });
        return res.json();
      },
      delete: async (id: string) => {
        const res = await authFetch(`/api/erp/routes/${id}`, { method: 'DELETE' });
        return res.json();
      }
    },
    stations: {
      list: async () => {
        const res = await authFetch('/api/erp/stations');
        return res.json();
      },
      reorder: async (orderedIds: string[]) => {
        const res = await authFetch('/api/erp/stations/reorder', {
          method: 'POST',
          body: JSON.stringify({ orderedIds })
        });
        return res.json();
      },
      create: async (data: any) => {
        const res = await authFetch('/api/erp/stations', {
          method: 'POST',
          body: JSON.stringify(data)
        });
        return res.json();
      },
      update: async (id: string, data: any) => {
        const res = await authFetch(`/api/erp/stations/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data)
        });
        return res.json();
      },
      delete: async (id: string) => {
        const res = await authFetch(`/api/erp/stations/${id}`, { method: 'DELETE' });
        return res.json();
      }
    },
    getFees: async () => {
      const res = await authFetch('/api/erp/transport/fees');
      return res.json();
    },
    updateFees: async (data: any) => {
      const res = await authFetch('/api/erp/transport/fees', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return res.json();
    },
    getStudents: async () => {
      const res = await authFetch('/api/erp/transport/students');
      return res.json();
    }
  },

  // Fee Automation
  feeAutomation: {
    getSettings: async () => {
      const res = await authFetch('/api/erp/fee-automation/settings');
      return res.json();
    },
    updateSettings: async (data: any) => {
      const res = await authFetch('/api/erp/fee-automation/settings', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return res.json();
    },
    getLogs: async () => {
      const res = await authFetch('/api/erp/fee-automation/logs');
      return res.json();
    },
    trigger: async () => {
      const res = await authFetch('/api/erp/fee-automation/trigger', { method: 'POST' });
      return res.json();
    },
    getStatus: async () => {
      const res = await authFetch('/api/erp/fee-automation/status');
      return res.json();
    }
  },

  // Top Results
  heroImages: {
    list: async () => {
      const res = await authFetch('/api/hero-images');
      return res.json();
    },
    create: async (formData: FormData) => {
      const res = await authFetch('/api/admin/hero-image', {
        method: 'POST',
        body: formData,
      });
      return res.json();
    },
    delete: async (id: string) => {
      const res = await authFetch(`/api/admin/hero-image/${id}`, { method: 'DELETE' });
      return res.json();
    },
    reorder: async (updates: {id: string, order: number}[]) => {
      const res = await authFetch('/api/admin/hero-image/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });
      return res.json();
    }
  },

  // Top Results
  topResults: {
    list: async (session?: string) => {
      const url = session ? `/api/top-results?session=${session}` : '/api/top-results';
      const res = await authFetch(url);
      return res.json();
    },
    create: async (formData: FormData) => {
      const res = await authFetch('/api/admin/top-result', {
        method: 'POST',
        body: formData,
      });
      return res.json();
    },
    delete: async (id: string) => {
      const res = await authFetch(`/api/admin/top-result/${id}`, { method: 'DELETE' });
      return res.json();
    }
  }
};
