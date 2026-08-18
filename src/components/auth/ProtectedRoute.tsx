'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
        const userAccessRole = user.accessLevel;
        if (user.role === 'user' && userAccessRole && !allowedRoles.includes(userAccessRole)) {
          // Access denied, redirect to appropriate default page
          if (userAccessRole === 'superadmin') router.push('/erp');
          else router.push('/admin');
        } else if (user.role === 'student' && !allowedRoles.includes('student')) {
          router.push('/student-portal');
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

  // If not authenticated or wrong role, render nothing while redirecting
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
