import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { DraggablePhoto } from './DraggablePhoto';

interface PhotoManagerProps {
    photos: Array<{ id: string; url: string }>;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (id: string) => void;
}

export function PhotoManager({ photos, onUpload, onRemove }: PhotoManagerProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="bg-white p-4 border-l border-gray-200 w-64 flex flex-col h-full shadow-lg z-10">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Photo Library</h3>

            <div className="flex-1 overflow-y-auto p-2 space-y-4 min-h-0 bg-gray-50 rounded-lg border border-gray-100 mb-4">
                {photos.length === 0 && (
                    <div className="text-center text-gray-400 text-sm mt-10 p-4">
                        No photos yet. Click below to add.
                    </div>
                )}
                <div className="flex flex-wrap gap-2">
                    {photos.map((photo) => (
                        <DraggablePhoto
                            key={photo.id}
                            id={photo.id}
                            url={photo.url}
                            onRemove={() => onRemove(photo.id)}
                        />
                    ))}
                </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onUpload}
                    className="hidden"
                    ref={fileInputRef}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-rics-purple hover:bg-opacity-90 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                    <Upload size={18} />
                    <span className="font-semibold text-sm">Upload Photos</span>
                </button>
            </div>
        </div>
    );
}
