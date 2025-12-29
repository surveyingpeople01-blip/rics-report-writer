import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AlertCircle, CheckCircle, AlertTriangle, GripVertical, Trash2 } from 'lucide-react';

export type ConditionRating = 1 | 2 | 3 | null;

interface SectionProps {
    id: string;
    title: string;
    content: string;
    rating: ConditionRating;
    photos: Array<{ id: string; url: string }>;
    autoResponses?: string[];
    onContentChange: (content: string) => void;
    onRatingChange: (rating: ConditionRating) => void;
    onPhotoRemove: (id: string) => void;
    allowPhotos?: boolean;
    allowRatings?: boolean;
}

const RatingButton = ({ currentRating, onRatingChange, type }: { currentRating: ConditionRating; onRatingChange: (r: ConditionRating) => void; type: 1 | 2 | 3 }) => {
    const colors = {
        1: currentRating === 1 ? 'bg-green-600 border-green-700 text-white shadow-md' : 'border-gray-200 text-gray-400 hover:border-green-200 hover:bg-green-50',
        2: currentRating === 2 ? 'bg-amber-500 border-amber-600 text-white shadow-md' : 'border-gray-200 text-gray-400 hover:border-amber-200 hover:bg-amber-50',
        3: currentRating === 3 ? 'bg-red-600 border-red-700 text-white shadow-md' : 'border-gray-200 text-gray-400 hover:border-red-200 hover:bg-red-50'
    };
    const Icons = { 1: CheckCircle, 2: AlertTriangle, 3: AlertCircle };
    const Icon = Icons[type];

    return (
        <button
            onClick={() => onRatingChange(type)}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${colors[type]}`}
        >
            <Icon size={20} />
            <span className="font-bold">{type}</span>
        </button>
    );
};

function SortablePhoto({ photo, onRemove }: { photo: { id: string; url: string }; onRemove: (id: string) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: photo.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 20 : 0,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative group aspect-square rounded-md overflow-hidden border border-gray-200 shadow-sm bg-white ${isDragging ? 'opacity-50 ring-2 ring-survey-blue' : ''}`}
        >
            <img src={photo.url} alt="Evidence" className="w-full h-full object-cover" />
            <div
                {...attributes} {...listeners}
                className="absolute top-2 left-2 p-1.5 bg-black/50 text-white rounded cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <GripVertical size={14} />
            </div>
            <button
                onClick={() => onRemove(photo.id)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
            >
                <Trash2 size={14} />
            </button>
        </div>
    );
}

export function Section({
    id, title, content, rating, photos, autoResponses, onContentChange, onRatingChange, onPhotoRemove,
    allowPhotos = false, allowRatings = false
}: SectionProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
    });

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>

                    {autoResponses && autoResponses.length > 0 && (
                        <div className="relative group">
                            <select
                                onChange={(e) => {
                                    if (e.target.value) {
                                        onContentChange(content ? `${content}\n\n${e.target.value}` : e.target.value);
                                        e.target.value = ''; // Reset select
                                    }
                                }}
                                className="text-xs bg-gray-50 border border-gray-200 rounded px-3 py-1.5 cursor-pointer hover:border-survey-blue transition-colors font-semibold"
                            >
                                <option value="">Auto-fill Text...</option>
                                {autoResponses.map((resp, idx) => (
                                    <option key={idx} value={resp}>{resp}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Condition Ratings */}
                {allowRatings && (
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Condition Rating</label>
                        <div className="flex gap-4">
                            <RatingButton type={1} currentRating={rating} onRatingChange={onRatingChange} />
                            <RatingButton type={2} currentRating={rating} onRatingChange={onRatingChange} />
                            <RatingButton type={3} currentRating={rating} onRatingChange={onRatingChange} />
                        </div>
                    </div>
                )}

                {/* Text Area */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Inspection Notes</label>
                    <textarea
                        value={content}
                        onChange={(e) => onContentChange(e.target.value)}
                        className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-survey-blue outline-none transition-all h-64 resize-none text-gray-700"
                        placeholder="Type inspection notes here or use auto-fill..."
                    />
                </div>

                {/* Photo Drop Zone */}
                {allowPhotos && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Attached Photos</label>
                        <div
                            ref={setNodeRef}
                            className={`min-h-[120px] p-4 rounded-lg border-2 border-dashed transition-colors ${isOver
                                ? 'border-survey-blue bg-blue-50'
                                : 'border-gray-300 bg-gray-50'
                                }`}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {photos.length === 0 && !isOver && (
                                    <div className="col-span-full py-8 text-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400 text-sm">
                                        Drag photos here from the library
                                    </div>
                                )}
                                <SortableContext items={photos.map(p => p.id)} strategy={verticalListSortingStrategy}>
                                    {photos.map((photo) => (
                                        <SortablePhoto key={photo.id} photo={photo} onRemove={onPhotoRemove} />
                                    ))}
                                </SortableContext>
                                {isOver && (
                                    <div className="aspect-square rounded-md border-2 border-dashed border-survey-blue bg-blue-50 animate-pulse" />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
