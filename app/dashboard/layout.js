// app/dashboard/layout.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import Header from '../components/Header';

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
        return <div className="text-center py-8">در حال بارگذاری...</div>;
    }

    return (
        <div>
            <Header></Header>
            {children}
        </div>

    );
}
