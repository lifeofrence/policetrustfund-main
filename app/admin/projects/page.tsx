'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiDelete } from '@/lib/api';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { ToastContainer } from '@/components/admin/Toast';

interface Project {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    location: string;
    start_date: string;
    end_date: string;
    image: string;
    impact: string;
}

export default function ProjectsListPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; item: Project | null }>({ isOpen: false, item: null });
    const [deleting, setDeleting] = useState(false);
    const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' }>>([]);

    useEffect(() => {
        fetchProjects();
    }, [categoryFilter, statusFilter]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            let endpoint = '/projects?';
            if (categoryFilter) endpoint += `category=${encodeURIComponent(categoryFilter)}&`;
            if (statusFilter) endpoint += `status=${encodeURIComponent(statusFilter)}&`;

            const response = await apiGet<Project[]>(endpoint, false);
            setProjects(response);
        } catch (error) {
            console.error('Error fetching projects:', error);
            addToast('Failed to load projects', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteDialog.item) return;

        try {
            setDeleting(true);
            await apiDelete(`/admin/projects/${deleteDialog.item.id}`);
            addToast('Project deleted successfully', 'success');
            setDeleteDialog({ isOpen: false, item: null });
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            addToast('Failed to delete project', 'error');
        } finally {
            setDeleting(false);
        }
    };

    const addToast = (message: string, type: 'success' | 'error' | 'warning') => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const statusColors: Record<string, string> = {
        completed: 'bg-green-100 text-green-800',
        ongoing: 'bg-blue-100 text-blue-800',
        upcoming: 'bg-yellow-100 text-yellow-800',
    };

    return (
        <div>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
                    <p className="text-gray-600 mt-1">Manage trust fund projects and initiatives</p>
                </div>
                <Link href="/admin/projects/create" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <FiPlus className="w-5 h-5" />
                    Create Project
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="">All Categories</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Training">Training</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Community">Community</option>
                    </select>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="">All Statuses</option>
                        <option value="completed">Completed</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="upcoming">Upcoming</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <LoadingSpinner size="lg" />
                </div>
            ) : projects.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-100">
                    <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No projects found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                            {project.image && (
                                <div className="relative w-full h-48 bg-gray-100">
                                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-bold text-lg text-gray-900">{project.title}</h3>
                                    <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[project.status] || 'bg-gray-100 text-gray-800'}`}>
                                        {project.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                                <div className="text-xs text-gray-500 space-y-1 mb-4">
                                    <p><strong>Location:</strong> {project.location}</p>
                                    <p><strong>Start:</strong> {project.start_date}</p>
                                    {project.impact && <p><strong>Impact:</strong> {project.impact}</p>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`/admin/projects/${project.id}/edit`} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                        <FiEdit2 className="w-4 h-4" />
                                        Edit
                                    </Link>
                                    <button onClick={() => setDeleteDialog({ isOpen: true, item: project })} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                        <FiTrash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <DeleteConfirmDialog isOpen={deleteDialog.isOpen} onClose={() => setDeleteDialog({ isOpen: false, item: null })} onConfirm={handleDelete} title="Delete Project" message="Are you sure you want to delete this project? This action cannot be undone." itemName={deleteDialog.item?.title} loading={deleting} />
        </div>
    );
}
