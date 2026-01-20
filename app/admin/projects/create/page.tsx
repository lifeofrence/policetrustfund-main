'use client';

import { useRouter } from 'next/navigation';
import { apiPostFormData } from '@/lib/api';
import ProjectForm from '@/components/admin/ProjectForm';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function CreateProjectPage() {
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        try {
            await apiPostFormData('/admin/projects', formData);
            router.push('/admin/projects');
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            <div className="mb-6">
                <Link href="/admin/projects" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
                    <FiArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Create Project</h1>
                <p className="text-gray-600 mt-1">Add a new trust fund project</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <ProjectForm onSubmit={handleSubmit} submitLabel="Create Project" />
            </div>
        </div>
    );
}
