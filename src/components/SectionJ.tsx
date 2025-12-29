import { Zap, Image as ImageIcon, MessageCircle } from 'lucide-react';
import { useState, useRef } from 'react';

interface SectionJData {
    insulation: string;
    heating: string;
    lighting: string;
    ventilation: string;
    general: string;
}

interface SectionJProps {
    id: string;
    data: SectionJData;
    onDataChange: (data: Partial<SectionJData>) => void;
    autoResponses?: Record<string, string[]>;
    onAddPhoto?: (id: string, file: File) => void;
}

const AutoFillField = ({
    label,
    id,
    value,
    onChange,
    autoResponses,
    placeholder,
    onAddPhoto
}: {
    label: string;
    id: string;
    value: string;
    onChange: (val: string) => void;
    autoResponses?: string[];
    placeholder?: string;
    onAddPhoto?: (id: string, file: File) => void;
}) => {
    const [activeAutoText, setActiveAutoText] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAutoTextSelect = (text: string) => {
        onChange(value ? `${value}\n\n${text}` : text);
        setActiveAutoText(false);
    };

    return (
        <div className="bg-[#f8fbff] border border-blue-200 rounded-xl overflow-hidden mb-6 shadow-md hover:shadow-lg transition-all ring-1 ring-blue-100/50 p-4 md:p-6">
            <div className="relative group">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                    {label}
                </label>
                <div className="relative">
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-survey-blue outline-none transition-all font-medium resize-none text-gray-700 h-32"
                        placeholder={placeholder}
                    />

                    {/* Auto-text Menu - positioned relative to container */}
                    {activeAutoText && autoResponses && (
                        <div className="absolute bottom-full right-0 mb-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-2 border-b border-gray-100 bg-gray-50">
                                <span className="text-xs font-bold text-gray-500 uppercase">Select Template</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {autoResponses.map((resp, idx) => (
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

                {/* Toolbar at bottom */}
                <div className="flex justify-end items-center pt-2 mt-2 border-t border-gray-100 gap-2">
                    {autoResponses && autoResponses.length > 0 && (
                        <button
                            onClick={() => setActiveAutoText(!activeAutoText)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-survey-blue hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <MessageCircle size={18} />
                            <span>Auto-fill</span>
                        </button>
                    )}
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
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-survey-blue hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <ImageIcon size={16} />
                        <span>Add Photo</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export function SectionJ({ data, onDataChange, autoResponses, onAddPhoto }: SectionJProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <Zap className="text-survey-blue" size={32} />
                    <h2 className="text-3xl font-bold text-gray-900">
                        J. Energy Matters
                    </h2>
                </div>

                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-sm text-gray-700 leading-relaxed">
                        This section describes energy-related matters for the property as a whole. It takes into account a broad range of energy-related features and issues already identified in the previous sections of this report, and discusses how they may be affected by the condition of the property.
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mt-2">
                        This is not a formal energy assessment of the building, but part of the report that will help you get a broader view of this topic. Although this may use information obtained from an available EPC, it does not check the certificate's validity or accuracy.
                    </p>
                </div>

                <div className="space-y-6">
                    <AutoFillField
                        label="J1 Insulation"
                        id="j1"
                        value={data.insulation}
                        onChange={(val) => onDataChange({ insulation: val })}
                        autoResponses={autoResponses?.insulation}
                        placeholder="Describe insulation conditions and recommendations..."
                        onAddPhoto={onAddPhoto}
                    />

                    <AutoFillField
                        label="J2 Heating"
                        id="j2"
                        value={data.heating}
                        onChange={(val) => onDataChange({ heating: val })}
                        autoResponses={autoResponses?.heating}
                        placeholder="Describe heating system and efficiency..."
                        onAddPhoto={onAddPhoto}
                    />

                    <AutoFillField
                        label="J3 Lighting"
                        id="j3"
                        value={data.lighting}
                        onChange={(val) => onDataChange({ lighting: val })}
                        autoResponses={autoResponses?.lighting}
                        placeholder="Describe lighting efficiency and recommendations..."
                        onAddPhoto={onAddPhoto}
                    />

                    <AutoFillField
                        label="J4 Ventilation"
                        id="j4"
                        value={data.ventilation}
                        onChange={(val) => onDataChange({ ventilation: val })}
                        autoResponses={autoResponses?.ventilation}
                        placeholder="Describe ventilation systems and air quality..."
                        onAddPhoto={onAddPhoto}
                    />

                    <AutoFillField
                        label="J5 General"
                        id="j5"
                        value={data.general}
                        onChange={(val) => onDataChange({ general: val })}
                        autoResponses={autoResponses?.general}
                        placeholder="General energy-related observations..."
                        onAddPhoto={onAddPhoto}
                    />
                </div>
            </div>
        </div>
    );
}

export type { SectionJData };
