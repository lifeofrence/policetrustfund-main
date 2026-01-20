'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPut, PaginatedResponse } from '@/lib/api';
import { FiMail, FiPhone, FiUser, FiMessageSquare } from 'react-icons/fi';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import { ToastContainer } from '@/components/admin/Toast';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: string;
    created_at: string;
}

export default function ContactsListPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' }>>([]);

    useEffect(() => {
        fetchContacts();
    }, [statusFilter]);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            let endpoint = '/admin/contacts?per_page=100';
            if (statusFilter) endpoint += `&status=${statusFilter}`;

            const response = await apiGet<PaginatedResponse<Contact>>(endpoint);
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            addToast('Failed to load contacts', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: number, status: string) => {
        try {
            await apiPut(`/admin/contacts/${id}`, { status });
            addToast('Contact status updated', 'success');
            fetchContacts();
            if (selectedContact?.id === id) {
                setSelectedContact({ ...selectedContact, status });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            addToast('Failed to update status', 'error');
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
        pending: 'bg-yellow-100 text-yellow-800',
        read: 'bg-blue-100 text-blue-800',
        resolved: 'bg-green-100 text-green-800',
    };

    return (
        <div>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Contacts Management</h1>
                <p className="text-gray-600 mt-1">View and manage contact form submissions</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-100">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="read">Read</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <LoadingSpinner size="lg" />
                </div>
            ) : contacts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-100">
                    <p className="text-gray-600">No contact submissions found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Contacts List */}
                    <div className="space-y-4">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => setSelectedContact(contact)}
                                className={`bg-white rounded-lg shadow-md p-4 border cursor-pointer transition-all ${selectedContact?.id === contact.id ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-100 hover:border-red-300'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900">{contact.subject}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{contact.name}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[contact.status] || 'bg-gray-100 text-gray-800'}`}>
                                        {contact.status}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">{new Date(contact.created_at).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 sticky top-6 h-fit">
                        {selectedContact ? (
                            <>
                                <div className="flex items-start justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
                                    <span className={`px-3 py-1 text-sm font-medium rounded ${statusColors[selectedContact.status] || 'bg-gray-100 text-gray-800'}`}>
                                        {selectedContact.status}
                                    </span>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <FiUser className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Name</p>
                                            <p className="font-medium">{selectedContact.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700">
                                        <FiMail className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <a href={`mailto:${selectedContact.email}`} className="font-medium text-blue-600 hover:underline">{selectedContact.email}</a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700">
                                        <FiPhone className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="font-medium">{selectedContact.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 text-gray-700">
                                        <FiMessageSquare className="w-5 h-5 text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">Subject</p>
                                            <p className="font-medium">{selectedContact.subject}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Message</p>
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-sm font-medium text-gray-700 mb-3">Update Status</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleStatusChange(selectedContact.id, 'pending')} disabled={selectedContact.status === 'pending'} className="flex-1 px-3 py-2 text-sm text-yellow-600 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                            Pending
                                        </button>
                                        <button onClick={() => handleStatusChange(selectedContact.id, 'read')} disabled={selectedContact.status === 'read'} className="flex-1 px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                            Read
                                        </button>
                                        <button onClick={() => handleStatusChange(selectedContact.id, 'resolved')} disabled={selectedContact.status === 'resolved'} className="flex-1 px-3 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                            Resolved
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <FiMail className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <p>Select a contact to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
