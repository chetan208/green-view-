import { useState, useEffect } from 'react';
import { authApi } from '@/services/erpApi';
import { useRouter } from 'next/navigation';

export interface User {
  _id: string;
  phone: string;
  role: 'student' | 'user';
  name: string;
  photoUrl?: string;
  accessLevel?: 'staff' | 'admin' | 'superadmin' | 'student';
  staffProfile?: {
    post?: string;
    subject?: string;
    department?: string;
    isPrincipal?: boolean;
    employeeId?: string;
  };
  studentProfile?: {
    fatherName?: string;
    motherName?: string;
    dob?: string;
    sex?: string;
  };
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('erp_token');
        if (!token) {
          setIsLoading(false);
          setIsAuthenticated(false);
          return;
        }

        const data = await authApi.me();
        
        if (data.success && data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
          localStorage.setItem('erp_user', JSON.stringify(data.user));
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth verification failed', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.error('Logout API failed, continuing local cleanup', e);
    } finally {
      localStorage.removeItem('erp_token');
      localStorage.removeItem('erp_user');
      setUser(null);
      setIsAuthenticated(false);
      router.push('/auth/teacher/login');
    }
  };

  return { user, isLoading, isAuthenticated, logout };
}
