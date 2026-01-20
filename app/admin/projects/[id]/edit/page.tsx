'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiGet, apiPutFormData } from '@/lib/api';
import ProjectForm from '@/components/admin/ProjectForm';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [projectData, setProjectData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const data = await apiGet(`/projects/${id}`, false);
            setProjectData(data);
        } catch (error) {
            console.error('Error fetching project:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        try {
            await apiPutFormData(`/admin/projects/${id}`, formData);
            router.push('/admin/projects');
        } catch (error) {
            throw error;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!projectData) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Project not found</p>
                <Link href="/admin/projects" className="text-green-600 hover:text-green-700 mt-4 inline-block">
                    Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <Link href="/admin/projects" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
                    <FiArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
                <p className="text-gray-600 mt-1">Update project details</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <ProjectForm initialData={projectData} onSubmit={handleSubmit} submitLabel="Update Project" />
            </div>
        </div>
    );
}
