import { Home } from 'lucide-react';

interface SectionCData {
    propertyType: string;
    yearBuilt: string;
    yearExtended: string;
    yearConverted: string;
    flatsInfo: string;
    construction: string;
    accommodation: {
        groundLivingRooms: string;
        groundBedrooms: string;
        groundBathShower: string;
        groundToilet: string;
        groundKitchen: string;
        groundUtility: string;
        groundConservatory: string;
        groundOther: string;
        groundOtherName: string;
        firstLivingRooms: string;
        firstBedrooms: string;
        firstBathShower: string;
        firstToilet: string;
        firstKitchen: string;
        firstUtility: string;
        firstConservatory: string;
        firstOther: string;
        firstOtherName: string;
    };
    meansOfEscape: string;
    epcRating: string;
    epcPotential: string;
    energyImprovements: string;
    energyIssues: string;
    gasService: boolean;
    electricService: boolean;
    waterService: boolean;
    drainageService: boolean;
    heatingGas: boolean;
    heatingElectric: boolean;
    heatingSolidFuel: boolean;
    heatingOil: boolean;
    heatingNone: boolean;
    otherServices: string;
    otherEnergyMatters: string;
}

interface SectionCProps {
    id: string;
    data: SectionCData;
    onDataChange: (data: Partial<SectionCData>) => void;
    autoResponses?: Record<string, string[]>;
}

const AutoFillField = ({ label, value, onChange, autoResponses, placeholder, type = 'text' as 'text' | 'textarea', rows = 4 }: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    autoResponses?: string[];
    placeholder?: string;
    type?: 'text' | 'textarea';
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
        ) : (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-survey-blue outline-none transition-all font-medium"
                placeholder={placeholder}
            />
        )}
    </div>
);

export function SectionC({ data, onDataChange, autoResponses }: SectionCProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-[#f8fbff] p-4 md:p-8 rounded-xl shadow-lg border border-blue-200 ring-1 ring-blue-100/50">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <Home className="text-survey-blue" size={32} />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        C. About the Property
                    </h2>
                </div>

                <div className="space-y-8">
                    <AutoFillField
                        label="Type of Property"
                        value={data.propertyType}
                        onChange={(val) => onDataChange({ propertyType: val })}
                        autoResponses={autoResponses?.propertyType}
                        placeholder="e.g. The property is a detached house arranged over two floors."
                        type="textarea"
                        rows={4}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AutoFillField
                            label="Approximate Year Built"
                            value={data.yearBuilt}
                            onChange={(val) => onDataChange({ yearBuilt: val })}
                            autoResponses={autoResponses?.yearBuilt}
                            placeholder="e.g. pre-1900's"
                            type="textarea"
                            rows={4}
                        />
                        <AutoFillField
                            label="Approximate Year Extended"
                            value={data.yearExtended}
                            onChange={(val) => onDataChange({ yearExtended: val })}
                            autoResponses={autoResponses?.yearExtended}
                            placeholder="e.g. Extended to the side, year unknown"
                            type="textarea"
                            rows={4}
                        />
                        <AutoFillField
                            label="Approximate Year Converted"
                            value={data.yearConverted}
                            onChange={(val) => onDataChange({ yearConverted: val })}
                            autoResponses={autoResponses?.yearConverted}
                            placeholder="e.g. Not converted"
                            type="textarea"
                            rows={4}
                        />
                    </div>

                    <AutoFillField
                        label="Information Relevant to Flats and Maisonettes"
                        value={data.flatsInfo}
                        onChange={(val) => onDataChange({ flatsInfo: val })}
                        autoResponses={autoResponses?.flatsInfo}
                        placeholder="e.g. Not applicable"
                        type="textarea"
                        rows={4}
                    />

                    <AutoFillField
                        label="Construction"
                        value={data.construction}
                        onChange={(val) => onDataChange({ construction: val })}
                        autoResponses={autoResponses?.construction}
                        placeholder="Describe construction materials and techniques..."
                        type="textarea"
                        rows={8}
                    />

                    {/* Accommodation Table */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Accommodation
                        </label>
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Floor</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Living Rooms</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Bedrooms</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Bath/Shower</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Toilet</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Kitchen</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Utility</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Conservatory</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Other</th>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Name of Other</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-semibold text-gray-700">Ground</td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.groundLivingRooms} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, groundLivingRooms: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.groundBedrooms} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, groundBedrooms: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.groundBathShower} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, groundBathShower: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.groundToilet} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, groundToilet: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.groundKitchen} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, groundKitchen: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.groundUtility} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, groundUtility: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.groundConservatory} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, groundConservatory: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.groundOther} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, groundOther: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.groundOtherName} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, groundOtherName: e.target.value } })} className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" placeholder="e.g. Dining room" /></td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-semibold text-gray-700">First</td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.firstLivingRooms} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, firstLivingRooms: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.firstBedrooms} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, firstBedrooms: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.firstBathShower} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, firstBathShower: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.firstToilet} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, firstToilet: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.firstKitchen} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, firstKitchen: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.firstUtility} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, firstUtility: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.firstConservatory} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, firstConservatory: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.firstOther} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, firstOther: e.target.value } })} className="w-full text-center p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                        <td className="px-4 py-3"><input type="text" value={data.accommodation.firstOtherName} onChange={(e) => onDataChange({ accommodation: { ...data.accommodation, firstOtherName: e.target.value } })} className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-survey-blue outline-none" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <AutoFillField
                        label="Means of Escape"
                        value={data.meansOfEscape}
                        onChange={(val) => onDataChange({ meansOfEscape: val })}
                        autoResponses={autoResponses?.meansOfEscape}
                        placeholder="e.g. The means of escape for this property are the front and rear doors."
                        type="textarea"
                        rows={4}
                    />

                    {/* Energy Efficiency */}
                    <div className="space-y-6 p-6 bg-[#f8fbff] border border-blue-200 rounded-xl mb-6 shadow-md hover:shadow-lg transition-all ring-1 ring-blue-100/50">
                        <h3 className="text-lg font-bold text-gray-900">Energy Efficiency</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AutoFillField
                                label="Current EPC Rating"
                                value={data.epcRating}
                                onChange={(val) => onDataChange({ epcRating: val })}
                                autoResponses={autoResponses?.epcRating}
                                placeholder="e.g. 31, band F"
                            />
                            <AutoFillField
                                label="Potential EPC Rating"
                                value={data.epcPotential}
                                onChange={(val) => onDataChange({ epcPotential: val })}
                                autoResponses={autoResponses?.epcPotential}
                                placeholder="e.g. 81, band B"
                            />
                        </div>

                        <AutoFillField
                            label="Energy Improvements"
                            value={data.energyImprovements}
                            onChange={(val) => onDataChange({ energyImprovements: val })}
                            autoResponses={autoResponses?.energyImprovements}
                            placeholder="List recommended energy improvements..."
                            type="textarea"
                            rows={8}
                        />

                        <AutoFillField
                            label="Issues Relating to Energy Efficiency"
                            value={data.energyIssues}
                            onChange={(val) => onDataChange({ energyIssues: val })}
                            autoResponses={autoResponses?.energyIssues}
                            placeholder="e.g. No issues have been identified"
                            type="textarea"
                            rows={4}
                        />
                    </div>

                    {/* Mains Services */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">Mains Services</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={data.gasService}
                                    onChange={(e) => onDataChange({ gasService: e.target.checked })}
                                    className="w-5 h-5 text-survey-blue rounded focus:ring-2 focus:ring-survey-blue"
                                />
                                <span className="font-semibold text-gray-700">Gas</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={data.electricService}
                                    onChange={(e) => onDataChange({ electricService: e.target.checked })}
                                    className="w-5 h-5 text-survey-blue rounded focus:ring-2 focus:ring-survey-blue"
                                />
                                <span className="font-semibold text-gray-700">Electric</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={data.waterService}
                                    onChange={(e) => onDataChange({ waterService: e.target.checked })}
                                    className="w-5 h-5 text-survey-blue rounded focus:ring-2 focus:ring-survey-blue"
                                />
                                <span className="font-semibold text-gray-700">Water</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={data.drainageService}
                                    onChange={(e) => onDataChange({ drainageService: e.target.checked })}
                                    className="w-5 h-5 text-survey-blue rounded focus:ring-2 focus:ring-survey-blue"
                                />
                                <span className="font-semibold text-gray-700">Drainage</span>
                            </label>
                        </div>
                    </div>

                    {/* Heating */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">Heating</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={data.heatingGas}
                                    onChange={(e) => onDataChange({ heatingGas: e.target.checked })}
                                    className="w-5 h-5 text-survey-blue rounded focus:ring-2 focus:ring-survey-blue"
                                />
                                <span className="font-semibold text-gray-700">Gas</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={data.heatingElectric}
                                    onChange={(e) => onDataChange({ heatingElectric: e.target.checked })}
                                    className="w-5 h-5 text-survey-blue rounded focus:ring-2 focus:ring-survey-blue"
                                />
                                <span className="font-semibold text-gray-700">Electric</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={data.heatingSolidFuel}
                                    onChange={(e) => onDataChange({ heatingSolidFuel: e.target.checked })}
                                    className="w-5 h-5 text-survey-blue rounded focus:ring-2 focus:ring-survey-blue"
                                />
                                <span className="font-semibold text-gray-700">Solid Fuel</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={data.heatingOil}
                                    onChange={(e) => onDataChange({ heatingOil: e.target.checked })}
                                    className="w-5 h-5 text-survey-blue rounded focus:ring-2 focus:ring-survey-blue"
                                />
                                <span className="font-semibold text-gray-700">Oil</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={data.heatingNone}
                                    onChange={(e) => onDataChange({ heatingNone: e.target.checked })}
                                    className="w-5 h-5 text-survey-blue rounded focus:ring-2 focus:ring-survey-blue"
                                />
                                <span className="font-semibold text-gray-700">None</span>
                            </label>
                        </div>
                    </div>

                    <AutoFillField
                        label="Other Services or Energy Sources"
                        value={data.otherServices}
                        onChange={(val) => onDataChange({ otherServices: val })}
                        autoResponses={autoResponses?.otherServices}
                        placeholder="e.g. None noted"
                        type="textarea"
                        rows={4}
                    />

                    <AutoFillField
                        label="Other Energy Matters"
                        value={data.otherEnergyMatters}
                        onChange={(val) => onDataChange({ otherEnergyMatters: val })}
                        autoResponses={autoResponses?.otherEnergyMatters}
                        placeholder="e.g. Not applicable"
                        type="textarea"
                        rows={4}
                    />
                </div>
            </div>
        </div>
    );
}

export type { SectionCData };
