import { FileText } from 'lucide-react';

interface SectionAData {
    surveyorName: string;
    surveyorRicsNumber: string;
    companyName: string;
    inspectionDate: string;
    reportReference: string;
    relatedPartyDisclosure: string;
    propertyAddress: string;
    weatherConditions: string;
    propertyStatus: string;
}

interface SectionAProps {
    id: string;
    data: SectionAData;
    onDataChange: (data: Partial<SectionAData>) => void;
    autoResponses?: Record<string, string[]>;
}

const AutoFillField = ({ label, value, onChange, autoResponses, placeholder, type = 'text' as 'text' | 'date' | 'textarea', rows = 4 }: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    autoResponses?: string[];
    placeholder?: string;
    type?: 'text' | 'date' | 'textarea';
    rows?: number;
}) => (
    <div>
        <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {label}
            </label>
            {autoResponses && autoResponses.length > 0 && (
                <select
                    onChange={(e) => {
                        if (e.target.value) {
                            onChange(value ? `${value}\n\n${e.target.value}` : e.target.value);
                            e.target.value = '';
                        }
                    }}
                    className="text-xs bg-gray-50 border border-gray-200 rounded px-3 py-1.5 cursor-pointer hover:border-survey-blue transition-colors font-semibold"
                >
                    <option value="">Auto-fill...</option>
                    {autoResponses.map((resp, idx) => (
                        <option key={idx} value={resp}>{resp}</option>
                    ))}
                </select>
            )}
        </div>
        {type === 'textarea' ? (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-survey-blue outline-none transition-all font-medium resize-none"
                style={{ height: `${rows * 1.5}rem` }}
                placeholder={placeholder}
            />
        ) : type === 'date' ? (
            <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-survey-blue outline-none transition-all font-medium"
            />
        ) : (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-survey-blue outline-none transition-all font-medium"
                placeholder={placeholder}
            />
        )}
    </div>
);

export function SectionA({ data, onDataChange, autoResponses }: SectionAProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-[#f8fbff] p-4 md:p-8 rounded-xl shadow-lg border border-blue-200 ring-1 ring-blue-100/50">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <FileText className="text-survey-blue" size={32} />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        A. About the Inspection
                    </h2>
                </div>

                <div className="space-y-6">
                    <AutoFillField
                        label="Surveyor's Name"
                        value={data.surveyorName}
                        onChange={(val) => onDataChange({ surveyorName: val })}
                        autoResponses={autoResponses?.surveyorName}
                        placeholder="e.g. Ross Richards, BEng(Hons), AssocRICS, MCIOB, MRPSA"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AutoFillField
                            label="Surveyor's RICS Number"
                            value={data.surveyorRicsNumber}
                            onChange={(val) => onDataChange({ surveyorRicsNumber: val })}
                            autoResponses={autoResponses?.surveyorRicsNumber}
                            placeholder="e.g. 0805190"
                        />

                        <AutoFillField
                            label="Company Name"
                            value={data.companyName}
                            onChange={(val) => onDataChange({ companyName: val })}
                            autoResponses={autoResponses?.companyName}
                            placeholder="e.g. Surveying People"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AutoFillField
                            label="Date of the Inspection"
                            value={data.inspectionDate}
                            onChange={(val) => onDataChange({ inspectionDate: val })}
                            autoResponses={autoResponses?.inspectionDate}
                            type="date"
                        />

                        <AutoFillField
                            label="Report Reference Number"
                            value={data.reportReference}
                            onChange={(val) => onDataChange({ reportReference: val })}
                            autoResponses={autoResponses?.reportReference}
                            placeholder="e.g. AU 111225IL"
                        />
                    </div>

                    <AutoFillField
                        label="Related Party Disclosure"
                        value={data.relatedPartyDisclosure}
                        onChange={(val) => onDataChange({ relatedPartyDisclosure: val })}
                        autoResponses={autoResponses?.relatedPartyDisclosure}
                        placeholder="e.g. There are no known relevant conflicts of interest"
                        type="textarea"
                        rows={4}
                    />

                    <AutoFillField
                        label="Full Address and Postcode of the Property"
                        value={data.propertyAddress}
                        onChange={(val) => onDataChange({ propertyAddress: val })}
                        autoResponses={autoResponses?.propertyAddress}
                        placeholder="Enter full property address including postcode..."
                        type="textarea"
                        rows={5}
                    />

                    <AutoFillField
                        label="Weather Conditions When the Inspection Took Place"
                        value={data.weatherConditions}
                        onChange={(val) => onDataChange({ weatherConditions: val })}
                        autoResponses={autoResponses?.weatherConditions}
                        placeholder="Describe the weather conditions and temperature..."
                        type="textarea"
                        rows={5}
                    />

                    <AutoFillField
                        label="Status of the Property When the Inspection Took Place"
                        value={data.propertyStatus}
                        onChange={(val) => onDataChange({ propertyStatus: val })}
                        autoResponses={autoResponses?.propertyStatus}
                        placeholder="e.g. The property was unoccupied and unfurnished"
                        type="textarea"
                        rows={4}
                    />
                </div>
            </div>
        </div>
    );
}

export type { SectionAData };
