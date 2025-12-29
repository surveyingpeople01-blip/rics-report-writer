import { Scale, ChevronDown, ChevronUp, Image as ImageIcon, MessageCircle, Plus } from 'lucide-react';
import { useState, useRef } from 'react';

// Subsection data interface for Section H (Simpler, no rating/action, mainly text)
interface SubsectionData {
    text: string;
}

// Section H Data interface
interface SectionHData {
    h1Regulation: SubsectionData;
    h2Guarantees: SubsectionData;
    h3OtherMatters: SubsectionData;
}

interface SectionHProps {
    data: SectionHData;
    onDataChange: (data: Partial<SectionHData>) => void;
    autoResponses?: Record<string, string[]>;
    onAddPhoto?: (id: string, file: File) => void;
}

// Subsection component (Simplified for Text Only)
const Subsection = ({
    title,
    id,
    data,
    onChange,
    autoResponses,
    onAddPhoto
}: {
    title: string;
    id: string;
    data: SubsectionData;
    onChange: (data: SubsectionData) => void;
    autoResponses?: Record<string, string[]>;
    onAddPhoto?: (id: string, file: File) => void;
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [activeAutoText, setActiveAutoText] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateField = (field: keyof SubsectionData, value: string) => {
        onChange({ ...data, [field]: value });
    };

    const handleAutoTextSelect = (text: string) => {
        const current = data.text;
        updateField('text', current ? `${current}\n\n${text}` : text);
        setActiveAutoText(false);
    };

    return (
        <div className="bg-[#f8fbff] border border-blue-200 rounded-xl overflow-hidden mb-6 shadow-md hover:shadow-lg transition-all ring-1 ring-blue-100/50">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100 gap-3"
            >
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="font-bold text-gray-900 text-lg">{title}</span>
                </div>
                {isExpanded ? <ChevronUp size={20} className="text-gray-400 self-end md:self-auto" /> : <ChevronDown size={20} className="text-gray-400 self-end md:self-auto" />}
            </button>

            {isExpanded && (
                <div className="p-4 md:p-6 space-y-6">
                    <div className="relative group">
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                            Details
                        </label>
                        <div className="relative">
                            <textarea
                                value={data.text}
                                onChange={(e) => updateField('text', e.target.value)}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-survey-blue outline-none transition-all font-medium resize-none text-gray-700"
                                rows={6}
                                placeholder="Enter details..."
                            />

                            {/* Auto-text Button - Bottom Right of Textarea */}
                            {autoResponses?.[`${id}_text`] && (
                                <div className="absolute bottom-2 right-2">
                                    <div className="relative">
                                        <button
                                            onClick={() => setActiveAutoText(!activeAutoText)}
                                            className="p-1.5 bg-white text-survey-blue rounded-full shadow-sm hover:shadow-md border border-gray-200 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
                                            title="Auto-text"
                                        >
                                            <MessageCircle size={16} />
                                            <div className="absolute -top-1 -right-1">
                                                <Plus size={8} className="text-survey-blue bg-white rounded-full" />
                                            </div>
                                        </button>

                                        {/* Auto-text Menu */}
                                        {activeAutoText && (
                                            <div className="absolute bottom-full right-0 mb-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                <div className="p-2 border-b border-gray-100 bg-gray-50">
                                                    <span className="text-xs font-bold text-gray-500 uppercase">Select Template</span>
                                                </div>
                                                <div className="max-h-64 overflow-y-auto">
                                                    {autoResponses[`${id}_text`].map((resp, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleAutoTextSelect(resp)}
                                                            className="w-full text-left p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-survey-blue border-b border-gray-50 last:border-0 transition-colors"
                                                        >
                                                            {resp}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Toolbar at bottom */}
                    <div className="flex justify-end items-center pt-2 border-t border-gray-100 gap-2">
                        <button
                            onClick={() => setActiveAutoText(!activeAutoText)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-survey-blue hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <MessageCircle size={18} />
                            <span>Auto-fill</span>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files?.[0] && onAddPhoto) {
                                    onAddPhoto(id, e.target.files[0]);
                                }
                            }}
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-survey-blue hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <ImageIcon size={18} />
                            <span>Add Photo</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Default subsection data
const defaultSubsection: SubsectionData = {
    text: ''
};

// Default Section H data
const defaultSectionHData: SectionHData = {
    h1Regulation: { ...defaultSubsection },
    h2Guarantees: { ...defaultSubsection },
    h3OtherMatters: { ...defaultSubsection }
};

export function SectionH({ data, onDataChange, autoResponses, onAddPhoto }: SectionHProps) {
    const subsections = [
        { key: 'h1Regulation', id: 'h1', title: 'H1 Regulation' },
        { key: 'h2Guarantees', id: 'h2', title: 'H2 Guarantees' },
        { key: 'h3OtherMatters', id: 'h3', title: 'H3 Other Matters' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <Scale className="text-survey-blue" size={32} />
                    <h2 className="text-3xl font-bold text-gray-900">
                        H. Issues for your legal advisers
                    </h2>
                </div>

                <p className="text-gray-600 mb-8 italic">
                    We do not act as "the legal adviser" and will not comment on any legal documents. However, if during the inspection we identify issues that your legal advisers may need to investigate further, we may refer to these in the report (for example, check whether there is a warranty covering replacement windows).
                </p>

                {/* Subsections */}
                <div className="space-y-4">
                    {subsections.map(({ key, id, title }) => (
                        <Subsection
                            key={key}
                            id={id}
                            title={title}
                            data={data[key as keyof SectionHData] as SubsectionData}
                            onChange={(newData) => onDataChange({ [key]: newData })}
                            autoResponses={autoResponses}
                            onAddPhoto={onAddPhoto}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export { defaultSectionHData };
export type { SectionHData };
