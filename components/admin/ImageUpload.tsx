'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import Image from 'next/image';

interface ImageUploadProps {
    value?: string | null; // Base64 or URL
    onChange: (file: File | null) => void;
    label?: string;
    maxSizeMB?: number;
    className?: string;
}

export default function ImageUpload({
    value,
    onChange,
    label = 'Upload Image',
    maxSizeMB = 5,
    className = '',
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(value || null);
    const [error, setError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setError('');

        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            setError(`File size must be less than ${maxSizeMB}MB`);
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        onChange(file);
    };

    const handleClear = () => {
        setPreview(null);
        setError('');
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            {preview ? (
                <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
                    <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-contain"
                    />
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                    >
                        <FiX className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div
                    onClick={handleClick}
                    className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                    <FiImage className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-600 mb-1">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to {maxSizeMB}MB
                    </p>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
