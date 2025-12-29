import { useDroppable } from '@dnd-kit/core';
import { Camera, Home, MapPin } from 'lucide-react';

interface FrontCoverProps {
    id: string;
    photo: { id: string; url: string } | null;
    propertyAddress: string;
    clientName: string;
    inspectionDate: string;
    ricsNumber: string;
    reportType: 'level2' | 'level3';
    onAddressChange: (val: string) => void;
    onClientChange: (val: string) => void;
    onDateChange: (val: string) => void;
    onRicsChange: (val: string) => void;
    onPhotoRemove: () => void;
}

export function FrontCover({
    id,
    photo,
    propertyAddress,
    clientName,
    inspectionDate,
    ricsNumber,
    reportType,
    onAddressChange,
    onClientChange,
    onDateChange,
    onRicsChange,
    onPhotoRemove
}: FrontCoverProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-rics-burgundy"></div>

                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <Home className="text-rics-burgundy" />
                    RICS Home Survey {reportType === 'level2' ? 'Level 2' : 'Level 3'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <MapPin size={14} /> Property Address
                            </label>
                            <textarea
                                value={propertyAddress}
                                onChange={(e) => onAddressChange(e.target.value)}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rics-purple outline-none transition-all h-32 resize-none text-lg font-medium"
                                placeholder="Enter full property address..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Client Name
                            </label>
                            <input
                                type="text"
                                value={clientName}
                                onChange={(e) => onClientChange(e.target.value)}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rics-purple outline-none transition-all text-lg font-medium"
                                placeholder="Enter client name..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Inspection Date
                                </label>
                                <input
                                    type="date"
                                    value={inspectionDate}
                                    onChange={(e) => onDateChange(e.target.value)}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rics-purple outline-none transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Surveyor's RICS No.
                                </label>
                                <input
                                    type="text"
                                    value={ricsNumber}
                                    onChange={(e) => onRicsChange(e.target.value)}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rics-purple outline-none transition-all font-medium"
                                    placeholder="e.g. 1234567"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Camera size={14} /> Cover Image
                        </label>
                        <div
                            ref={setNodeRef}
                            className={`aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden relative ${isOver ? 'border-analytics-burgundy bg-rose-50' : 'border-gray-200 bg-gray-50'
                                }`}
                        >
                            {photo ? (
                                <>
                                    <img src={photo.url} className="w-full h-full object-cover" alt="Front Cover" />
                                    <button
                                        onClick={onPhotoRemove}
                                        className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-red-600 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                    >
                                        <Camera size={20} />
                                    </button>
                                </>
                            ) : (
                                <div className="text-center p-6">
                                    <Camera size={48} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-400 font-medium">Drag a photo here for the cover</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
