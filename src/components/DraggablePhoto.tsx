import { useDraggable } from '@dnd-kit/core';
import { X } from 'lucide-react';

interface PhotoProps {
    id: string;
    url: string;
    onRemove: () => void;
}

export function DraggablePhoto({ id, url, onRemove }: PhotoProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="relative group w-24 h-24 rounded-md overflow-hidden border border-gray-200 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
        >
            <img src={url} alt="Evidence" className="w-full h-full object-cover" />
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="absolute top-1 right-1 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-red-500"
            >
                <X size={12} />
            </button>
        </div>
    );
}
