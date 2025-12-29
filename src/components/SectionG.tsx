import { TreeDeciduous, ChevronDown, ChevronUp, Image as ImageIcon, MessageCircle, Plus } from 'lucide-react';
import { useState, useRef } from 'react';

// Subsection data interface
interface SubsectionData {
    rating: '1' | '2' | '3' | 'NI' | null;
    typeConstruction: string;
    condition: string;
    action: string;
}

// Section G Data interface
interface SectionGData {
    limitationsText: string;
    g1Garage: SubsectionData;
    g2Outbuildings: SubsectionData;
    g3Other: SubsectionData;
}

interface SectionGProps {
    data: SectionGData;
    onDataChange: (data: Partial<SectionGData>) => void;
    autoResponses?: Record<string, string[]>;
    onAddPhoto?: (id: string, file: File) => void;
}

// Condition Rating Component
const ConditionRating = ({ value, onChange }: { value: '1' | '2' | '3' | 'NI' | null; onChange: (val: '1' | '2' | '3' | 'NI') => void }) => {
    const ratings = [
        { value: '1' as const, label: '1', color: 'bg-green-500', desc: 'No repair needed' },
        { value: '2' as const, label: '2', color: 'bg-amber-500', desc: 'Repair/replacement needed' },
        { value: '3' as const, label: '3', color: 'bg-red-500', desc: 'Urgent repair needed' },
        { value: 'NI' as const, label: 'NI', color: 'bg-gray-400', desc: 'Not inspected' },
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {ratings.map((r) => (
                <button
                    key={r.value}
                    onClick={() => onChange(r.value)}
                    className={`px-6 py-2 rounded-full font-bold transition-all text-sm ${value === r.value ? `${r.color} text-white shadow-md` : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                    title={r.desc}
                >
                    {r.label}
                </button>
            ))}
        </div>
    );
};

// Subsection component
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
    const [activeAutoText, setActiveAutoText] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateField = (field: keyof SubsectionData, value: string | '1' | '2' | '3' | 'NI' | null) => {
        onChange({ ...data, [field]: value });
    };

    const handleAutoTextSelect = (field: keyof SubsectionData, text: string) => {
        const current = data[field] as string;
        updateField(field, current ? `${current}\n\n${text}` : text);
        setActiveAutoText(null);
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
                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${data.rating === '1' ? 'bg-green-500' :
                        data.rating === '2' ? 'bg-amber-500' :
                            data.rating === '3' ? 'bg-red-500' :
                                data.rating === 'NI' ? 'bg-gray-400' : 'bg-gray-200 text-gray-400'
                        }`}>
                        {data.rating || 'NR'}
                    </span>
                    {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                </div>
            </button>

            {isExpanded && (
                <div className="p-4 md:p-6 space-y-6">
                    {/* Condition Rating */}
                    <div className="flex justify-start">
                        <ConditionRating
                            value={data.rating}
                            onChange={(val) => updateField('rating', val)}
                        />
                    </div>

                    {/* Fields */}
                    {['typeConstruction', 'condition', 'action'].map((field) => (
                        <div key={field} className="relative group">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                {field === 'typeConstruction' ? 'Type / Construction' : field === 'condition' ? 'Condition' : 'Action Required'}
                            </label>
                            <div className="relative">
                                <textarea
                                    value={data[field as keyof SubsectionData] as string}
                                    onChange={(e) => updateField(field as keyof SubsectionData, e.target.value)}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-survey-blue outline-none transition-all font-medium resize-none text-gray-700"
                                    rows={field === 'condition' ? 5 : 3}
                                    placeholder={`Enter ${field}...`}
                                />

                                {/* Auto-text Button - Bottom Right of Textarea */}
                                {autoResponses?.[`${id}_${field}`] && (
                                    <div className="absolute bottom-2 right-2">
                                        <div className="relative">
                                            <button
                                                onClick={() => setActiveAutoText(activeAutoText === field ? null : field)}
                                                className="p-1.5 bg-white text-survey-blue rounded-full shadow-sm hover:shadow-md border border-gray-200 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
                                                title="Auto-text"
                                            >
                                                <MessageCircle size={16} />
                                                <div className="absolute -top-1 -right-1">
                                                    <Plus size={8} className="text-survey-blue bg-white rounded-full" />
                                                </div>
                                            </button>

                                            {/* Auto-text Menu */}
                                            {activeAutoText === field && (
                                                <div className="absolute bottom-full right-0 mb-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                    <div className="p-2 border-b border-gray-100 bg-gray-50">
                                                        <span className="text-xs font-bold text-gray-500 uppercase">Select Template</span>
                                                    </div>
                                                    <div className="max-h-64 overflow-y-auto">
                                                        {autoResponses[`${id}_${field}`].map((resp, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => handleAutoTextSelect(field as keyof SubsectionData, resp)}
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
                    ))}

                    {/* Toolbar at bottom */}
                    <div className="flex justify-end items-center pt-2 border-t border-gray-100 gap-2">
                        <button
                            onClick={() => setActiveAutoText(activeAutoText === 'condition' ? null : 'condition')}
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
    rating: null,
    typeConstruction: '',
    condition: '',
    action: ''
};

// Default Section G data
const defaultSectionGData: SectionGData = {
    limitationsText: `The condition of the boundary walls and fences, outbuildings and areas in common (shared) use was inspected from within the grounds and any public areas, but not from neighbouring private property. The report provides a summary of the general condition of any garden walls, fences and permanent outbuildings.`,
    g1Garage: { ...defaultSubsection },
    g2Outbuildings: { ...defaultSubsection },
    g3Other: { ...defaultSubsection }
};

export function SectionG({ data, onDataChange, autoResponses, onAddPhoto }: SectionGProps) {
    const subsections = [
        { key: 'g1Garage', id: 'g1', title: 'G1 Garage' },
        { key: 'g2Outbuildings', id: 'g2', title: 'G2 Permanent outbuildings and other structures' },
        { key: 'g3Other', id: 'g3', title: 'G3 Other' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <TreeDeciduous className="text-survey-blue" size={32} />
                    <h2 className="text-3xl font-bold text-gray-900">
                        G. Grounds
                    </h2>
                </div>

                {/* Limitations */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Limitations to Inspection
                    </label>
                    <textarea
                        value={data.limitationsText}
                        onChange={(e) => onDataChange({ limitationsText: e.target.value })}
                        className="w-full p-4 bg-amber-50 border border-amber-200 rounded-lg focus:ring-2 focus:ring-survey-blue outline-none transition-all font-medium resize-none"
                        rows={4}
                    />
                </div>

                {/* Subsections */}
                <div className="space-y-4">
                    {subsections.map(({ key, id, title }) => (
                        <Subsection
                            key={key}
                            id={id}
                            title={title}
                            data={data[key as keyof SectionGData] as SubsectionData}
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

export { defaultSectionGData };
export type { SectionGData };
