import { Search, Image as ImageIcon, MessageCircle } from 'lucide-react';
import { useState, useRef } from 'react';

interface SectionLData {
    content: string;
}

interface SectionLProps {
    id: string;
    data: SectionLData;
    onDataChange: (data: Partial<SectionLData>) => void;
    autoResponses?: Record<string, string[]>;
    onAddPhoto?: (id: string, file: File) => void;
}

export function SectionL({ data, onDataChange, autoResponses, onAddPhoto }: SectionLProps) {
    const [activeAutoText, setActiveAutoText] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAutoTextSelect = (text: string) => {
        onDataChange({ content: data.content ? `${data.content}\n\n${text}` : text });
        setActiveAutoText(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <Search className="text-survey-blue" size={32} />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        L. Further Investigations and Getting Quotes
                    </h2>
                </div>

                <div className="space-y-6">
                    {/* Informational Content */}
                    <div className="prose prose-sm max-w-none space-y-4 text-gray-700">
                        <p className="leading-relaxed">
                            We have provided advice below on what to do next, now that you have an overview of any work to be carried out on the property. We recommend you make a note of any quotations you receive. This will allow you to check the amounts are in line with our estimates, if cost estimates have been provided.
                        </p>

                        <div className="bg-blue-50 p-4 md:p-6 rounded-lg border border-blue-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Getting Quotations</h3>
                            <p className="leading-relaxed mb-3">
                                The cost of repairs may influence the amount you are prepared to pay for the property. Before you make a legal commitment to buy the property, you should get reports and quotations for all the repairs and further investigations the surveyor may have identified. You should get at least two quotations from experienced contractors who are properly insured.
                            </p>
                            <p className="leading-relaxed mb-2">You should also:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>ask them for references from people they have worked for</li>
                                <li>describe in writing exactly what you will want them to do and</li>
                                <li>get the contractors to put their quotations in writing.</li>
                            </ul>
                            <p className="leading-relaxed mt-3">
                                Some repairs will need contractors who have specialist skills and who are members of regulated organisations (for example, electricians, gas engineers, plumbers and so on). You may also need to get Building Regulations permission or planning permission from your local authority for some work.
                            </p>
                        </div>

                        <div className="bg-amber-50 p-4 md:p-6 rounded-lg border border-amber-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Further Investigations and What They Involve</h3>
                            <p className="leading-relaxed mb-3">
                                If we are concerned about the condition of a hidden part of the building, could only see part of a defect or do not have the specialist knowledge to assess part of the property fully, we may have recommended that further investigations should be carried out to discover the true extent of the problem.
                            </p>
                            <p className="leading-relaxed mb-3">
                                This will depend on the type of problem, but to do this properly, parts of the home may have to be disturbed, so you should discuss this matter with the current owner. In some cases, the cost of investigation may be high.
                            </p>
                            <p className="leading-relaxed mb-2">When a further investigation is recommended, the following will be included in your report:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>a description of the affected element and why a further investigation is required</li>
                                <li>when a further investigation should be carried out and</li>
                                <li>a broad indication of who should carry out the further investigation.</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 p-4 md:p-6 rounded-lg border border-green-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Who You Should Use for Further Investigations</h3>
                            <p className="leading-relaxed">
                                You should ask an appropriately qualified person, although it is not possible to tell you which one. Specialists belonging to different types of organisations will be able to do this. For example, qualified electricians can belong to five different government-approved schemes. If you want further advice, please contact the surveyor.
                            </p>
                        </div>
                    </div>

                    {/* Editable Content Area */}
                    <div className="bg-[#f8fbff] border border-blue-200 rounded-xl overflow-hidden mb-6 shadow-md hover:shadow-lg transition-all ring-1 ring-blue-100/50 p-4 md:p-6">
                        <div className="relative group">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                                Further Investigation Notes
                            </label>
                            <div className="relative">
                                <textarea
                                    value={data.content}
                                    onChange={(e) => onDataChange({ content: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-survey-blue outline-none transition-all font-medium resize-none text-gray-700"
                                    style={{ height: '16rem' }}
                                    placeholder="Add specific recommendations for further investigations, quotations needed, or specialist contractors required..."
                                />

                                {/* Auto-text Menu */}
                                {activeAutoText && autoResponses?.content && (
                                    <div className="absolute bottom-full right-0 mb-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                        <div className="p-2 border-b border-gray-100 bg-gray-50">
                                            <span className="text-xs font-bold text-gray-500 uppercase">Select Template</span>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {autoResponses.content.map((resp, idx) => (
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

                            {/* Photo Button */}
                            <div className="flex justify-end items-center pt-2 mt-2 border-t border-gray-100 gap-2">
                                {autoResponses?.content && autoResponses.content.length > 0 && (
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
                                            onAddPhoto('l1', e.target.files[0]);
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
                </div>
            </div>
        </div>
    );
}

export type { SectionLData };
