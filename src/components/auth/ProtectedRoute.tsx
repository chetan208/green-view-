'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2, ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        // Redirect based on current route path
        if (pathname.startsWith('/student-portal')) {
          router.push('/auth/student/login');
        } else {
          router.push('/auth/teacher/login');
        }
      } else if (allowedRoles && allowedRoles.length > 0) {
        // Check access role for users
        let hasAccess = false;
        
        if (user.role === 'user') {
          hasAccess = allowedRoles.includes(user.accessLevel || '');
        } else if (user.role === 'student') {
          hasAccess = allowedRoles.includes('student');
        }

        if (!hasAccess) {
          setAuthError(true);
          setTimeout(() => {
            router.push('/');
          }, 2500);
        }
      }
    }
  }, [isLoading, isAuthenticated, user, router, allowedRoles, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-brand-green" />
          <p className="text-sm font-semibold text-slate-500">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl shadow-xl border border-rose-100 max-w-sm text-center animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h2>
            <p className="text-sm text-slate-600">You do not have permission to view this page. Redirecting to home...</p>
          </div>
          <Loader2 className="w-5 h-5 animate-spin text-rose-400 mt-2" />
        </div>
      </div>
    );
  }

  // If not authenticated, render nothing while redirecting
  if (!isAuthenticated || !user) {
    return null;
  }
  
  if (allowedRoles && allowedRoles.length > 0) {
    if (user.role === 'user' && !allowedRoles.includes(user.accessLevel || '')) {
      return null;
    }
    if (user.role === 'student' && !allowedRoles.includes('student')) {
      return null;
    }
  }

  return <>{children}</>;
}
