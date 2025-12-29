interface AutoFillInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    autoResponses?: string[];
    placeholder?: string;
    type?: 'text' | 'date' | 'textarea';
    rows?: number;
}

export function AutoFillInput({ label, value, onChange, autoResponses, placeholder, type = 'text', rows = 4 }: AutoFillInputProps) {
    return (
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
                            <option key={idx} value={resp}>{resp.substring(0, 40)}...</option>
                        ))}
                    </select>
                )}
            </div>
            {type === 'textarea' ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-survey-blue outline-none transition-all font-medium resize-none`}
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
}
