import { useState, useEffect } from 'react';
import { FileText, Settings, X, Trash2, ChevronLeft, Monitor, Smartphone, Eye, EyeOff, ArrowUp, Menu } from 'lucide-react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Section, type ConditionRating } from './components/Section';
import { SectionA, type SectionAData } from './components/SectionA';
import { SectionC, type SectionCData } from './components/SectionC';
import { SectionJ, type SectionJData } from './components/SectionJ';
import { SectionL, type SectionLData } from './components/SectionL';
import { SectionD, type SectionDData, defaultSectionDData } from './components/SectionD';
import { SectionE, type SectionEData, defaultSectionEData } from './components/SectionE';
import { SectionF, type SectionFData, defaultSectionFData } from './components/SectionF';
import { SectionG, type SectionGData, defaultSectionGData } from './components/SectionG';
import { SectionH, type SectionHData, defaultSectionHData } from './components/SectionH';
import { SectionI, type SectionIData, defaultSectionIData } from './components/SectionI';
import { PhotoManager } from './components/PhotoManager';
import { FrontCover } from './components/FrontCover';
import { Dashboard, type SavedReport, type ReportStatus, type ReportType } from './components/Dashboard';
import Login from './components/Login';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { arrayMove } from '@dnd-kit/sortable';
import logoImg from '/logo.jpg';

const SECTIONS_LEVEL3 = [
  'Front Cover', // 0
  'A About the inspection', // 1
  'B Overall opinion', // 2
  'C About the property', // 3
  'D Outside the property', // 4
  'E Inside the property', // 5
  'F Services', // 6
  'G Grounds', // 7
  'H Issues for your legal advisers', // 8
  'I Risks', // 9
  'J Energy matters', // 10
  'K Surveyor’s declaration', // 11
  'L What to do now', // 12
  'M Description of the RICS Home Survey – Level 3 service and terms of engagement', // 13
  'N Typical house diagram', // 14
  'RICS disclaimer', // 15
  'Valuation' // 16 - Optional add-on
];

const SECTIONS_LEVEL2 = [...SECTIONS_LEVEL3];
SECTIONS_LEVEL2[13] = 'M Description of the RICS Home Survey – Level 2 service and terms of engagement';

const INITIAL_AUTO_RESPONSES_COMMON: Record<string, string[]> = {
  'A About the inspection': [
    "General terms of the survey were agreed before the inspection.",
    "The purpose of the inspection is to provide a professional opinion on the property's condition.",
    "Weather conditions on the day were dry and bright.",
    "Access was generally unrestricted except where stated."
  ],
  'B Overall opinion': [
    "A brief overview of key findings: The property is in a satisfactory condition for its age.",
    "Urgent repairs are needed for the roof and damp issues.",
    "Potential risks identified include proximity to large trees.",
    "Executive summary: Satistfactory condition with specific maintenance required."
  ],
  'C About the property': [
    "The house is a two-storey detached property, built circa 1970.",
    "Construction: Traditional cavity brick walls with a pitched tiled roof.",
    "The property consists of 3 bedrooms, hallway, kitchen, and bathroom.",
    "Floor area is approximately 110 square meters."
  ],
  'D Outside the property': [
    "The main walls are of solid brick construction with a rendered finish.",
    "Chimney stacks appear stable but require minor repointing.",
    "Roof coverings consist of interlocking concrete tiles in fair condition.",
    "Windows and doors are uPVC double glazed and appear functional."
  ],
  'E Inside the property': [
    "Internal walls are a mixture of masonry and timber partitions.",
    "Floors: Suspended timber at first floor; solid concrete at ground floor.",
    "Ceilings appear level and are finished with plasterboard.",
    "Loft insulation was noted to be approximately 150mm deep."
  ],
  'F Services': [
    "Electricity: Modern consumer unit located in the hallway.",
    "Gas: Meter located externally; boiler in the kitchen.",
    "Water and Heating: Connected to mains; gas-fired central heating.",
    "Services observed in normal operation but not tested."
  ],
  'G Grounds': [
    "Gardens are mainly laid to lawn with mature borders.",
    "Boundary fences are timber panels and appear well-maintained.",
    "The driveway is block-paved and in good condition.",
    "A single detached garage is located at the side."
  ],
  'H Issues for your legal advisers': [
    "Confirm all necessary building regulations were obtained for the extension.",
    "Solicitor should check for shared maintenance responsibilities.",
    "Verify the tenure of the property is freehold.",
    "Check for any rights of access across the property."
  ],
  'I Risks': [
    "No significant environmental risks were identified.",
    "The property is located in an area with a low flood risk.",
    "No evidence of hazardous materials such as asbestos noted.",
    "Potential risk from large trees within influence of foundations."
  ],
  'J Energy matters': [
    "The property has an EPC rating of D.",
    "Improvements could include increasing loft insulation depth.",
    "Draft proofing of windows could improve energy performance.",
    "The boiler is a high-efficiency condensing model."
  ],
  'L What to do now': [
    "Obtain quotes for roof and damp repairs within 3 months.",
    "Instruct a solicitor to verify the legal matters identified.",
    "Further specialist investigation for the heating system is recommended.",
    "Proceed to exchange only after cost estimates are confirmed."
  ],
  'Valuation': [
    "Market value of the property in its current condition: £X,000.",
    "Estimated reinstatement cost for insurance purposes: £Y,000.",
    "Valuation based on conditions at the time of inspection."
  ]
};

const AUTO_RESPONSES_LEVEL2 = {
  ...INITIAL_AUTO_RESPONSES_COMMON,
  'M Description of the RICS Home Survey – Level 2 service and terms of engagement': [
    "This report provides an assessment of the condition of the property at is current state.",
    "The inspection is a general overview suitable for conventional properties.",
    "We have highlighted significant issues that might affect the value.",
    "Full terms and conditions of the Level 2 service apply."
  ]
};

const AUTO_RESPONSES_LEVEL3 = {
  ...INITIAL_AUTO_RESPONSES_COMMON,
  'M Description of the RICS Home Survey – Level 3 service and terms of engagement': [
    "This is a comprehensive structural assessment of the property.",
    "We have examined all accessible parts of the building fabric in detail.",
    "Our analysis includes probable causes of defects and repair advice.",
    "Full terms and conditions of the Level 3 service apply."
  ],
  // Section A templates
  surveyorName: [
    "Ross Richards, BEng(Hons), AssocRICS, MCIOB, MRPSA"
  ],
  surveyorRicsNumber: [
    "0805190"
  ],
  companyName: [
    "Surveying People"
  ],
  reportReference: [
    "AU 111225IL"
  ],
  relatedPartyDisclosure: [
    "There are no known relevant conflicts of interest",
    "No conflicts of interest have been identified in relation to this instruction"
  ],
  weatherConditions: [
    "When I inspected the property, the weather was wet following a period of raining weather. The temperature was recorded at 11°C.",
    "When I inspected the property, the weather was dry and sunny. The temperature was recorded at 15°C.",
    "When I inspected the property, the weather was overcast with light rain. The temperature was recorded at 8°C."
  ],
  propertyStatus: [
    "The property was unoccupied and unfurnished",
    "The property was occupied and furnished",
    "The property was vacant with some furniture remaining"
  ],
  // Section C templates
  propertyType: [
    "The property is a detached house arranged over two floors.",
    "The property is a semi-detached house arranged over two floors.",
    "The property is a terraced house arranged over two floors.",
    "The property is a mid-terrace house arranged over three floors."
  ],
  yearBuilt: [
    "Based on my knowledge of the area and housing styles, I think the property was constructed pre-1900's.",
    "Based on my knowledge of the area and housing styles, I think the property was constructed in the 1930s.",
    "Based on my knowledge of the area and housing styles, I think the property was constructed in the 1960s.",
    "Based on my knowledge of the area and housing styles, I think the property was constructed in the 1980s."
  ],
  yearExtended: [
    "The property has been extended to the side. The year of construction is unknown.",
    "The property has been extended to the rear. The year of construction is unknown.",
    "The property has not been extended.",
    "The property has been extended to the side and rear. The year of construction is unknown."
  ],
  yearConverted: [
    "The property has not been converted.",
    "The property has been converted from commercial to residential use. The year of conversion is unknown."
  ],
  flatsInfo: [
    "Not applicable.",
    "The property is a flat on the ground floor of a converted building.",
    "The property is a flat on the first floor of a purpose-built block."
  ],
  construction: [
    "The property is built using traditional materials and techniques. The main walls are of stone construction. The ground floor is a mix of suspended timber and solid concrete construction. The floor construction on the first floor is of suspended timber. The main roof is pitched and covered with plain clay tiles. The windows have uPVC frames with double glazing. A conservatory has been added to the rear of the property.",
    "The property is built using traditional materials and techniques. The main walls are of solid brick construction. The ground floor is of suspended timber construction. The floor construction on the first floor is of suspended timber. The main roof is pitched and covered with concrete tiles. The windows have timber frames with single glazing.",
    "The property is built using cavity wall construction. The main walls are of brick and block construction. The ground floor is of solid concrete construction. The floor construction on the first floor is of suspended timber. The main roof is pitched and covered with interlocking concrete tiles. The windows have uPVC frames with double glazing."
  ],
  meansOfEscape: [
    "The means of escape for this property are the front and rear doors.",
    "The means of escape for this property are the front door and rear patio doors.",
    "The means of escape for this property are the front door, rear door, and side door."
  ],
  epcRating: [
    "31, band F",
    "45, band E",
    "58, band D",
    "72, band C"
  ],
  epcPotential: [
    "81, band B",
    "75, band C",
    "88, band B"
  ],
  energyImprovements: [
    "- Increase loft insulation to 270mm\n- Install internal wall insulation\n- Install floor insulation\n- Install low energy lighting\n- Install heating controls (room thermostat and TRVs)\n- Replace boiler with new condensing boiler\n- Install solar water heating\n- Install solar photovoltaic panels, 2.5 kWp",
    "- Increase loft insulation to 270mm\n- Install cavity wall insulation\n- Install low energy lighting\n- Upgrade heating controls",
    "- Install double glazing\n- Increase loft insulation\n- Install condensing boiler"
  ],
  energyIssues: [
    "No issues have been identified",
    "The property has poor insulation which affects energy efficiency",
    "The heating system is outdated and inefficient"
  ],
  otherServices: [
    "None noted.",
    "Solar panels installed on the roof",
    "Heat pump system installed"
  ],
  otherEnergyMatters: [
    "Not applicable",
    "The property benefits from solar panels which provide electricity",
    "The property has a ground source heat pump"
  ],
  // Section J templates
  insulation: [
    "Not applicable.",
    "The loft insulation is approximately 100mm thick and should be increased to 270mm for improved energy efficiency.",
    "The property has cavity wall insulation which appears to be in satisfactory condition.",
    "The property lacks adequate insulation. I recommend installing loft insulation to at least 270mm and considering cavity wall insulation."
  ],
  heating: [
    "Not applicable.",
    "The property has a gas-fired central heating system with a combination boiler. The boiler appears to be approximately 10 years old and should be serviced regularly.",
    "The property has an oil-fired central heating system. The boiler is located in the utility room and appears to be in working order.",
    "The heating system is outdated and inefficient. I recommend replacing the boiler with a modern condensing boiler to improve energy efficiency."
  ],
  lighting: [
    "Not applicable.",
    "The property has a mix of traditional and LED lighting. I recommend replacing all remaining traditional bulbs with LED alternatives for improved energy efficiency.",
    "The property uses predominantly traditional incandescent lighting. Upgrading to LED lighting throughout would significantly reduce energy consumption."
  ],
  ventilation: [
    "Not applicable.",
    "The property has trickle vents in the windows and extractor fans in the kitchen and bathroom, which appear adequate for ventilation.",
    "Ventilation appears limited. I recommend installing trickle vents in windows and ensuring extractor fans are fitted in the kitchen and bathrooms.",
    "The property has mechanical ventilation with heat recovery (MVHR) system which appears to be functioning correctly."
  ],
  general: [
    "Not applicable",
    "Overall, the property's energy efficiency could be improved through the measures outlined above. Implementing these recommendations would reduce energy costs and improve comfort.",
    "The property has good energy efficiency features including modern double glazing, adequate insulation, and an efficient heating system."
  ],
  // Section D
  d1_typeConstruction: ["Brick built chimney stack(s) with lead flashings.", "Rendered masonry chimney stack.", "No chimney stacks present."],
  d1_condition: ["Appears straight and plumb with no significant defects visible from ground level.", "Weathered pointing noted.", "Some vegetation growth observed."],
  d1_action: ["None required.", "Instruct a roofing contractor to repoint.", "Clear vegetation."],
  d2_typeConstruction: ["Pitched roof covered with interlocking concrete tiles.", "Pitched roof covered with natural slate.", "Flat roof covered with mineral felt."],
  d2_condition: ["No significant defects visually identified.", "One or two slipped/broken tiles noted.", "Moss growth evident on roof slopes."],
  d2_action: ["None required.", "Replace broken tiles.", "Clear moss."],
  d3_typeConstruction: ["uPVC gutters and downpipes.", "Cast iron gutters and downpipes."],
  d3_condition: ["Appear free from blockage and leakage.", "Evidence of leakage at joints.", "Vegetation/debris in gutters."],
  d3_action: ["None required.", "Clean out gutters.", "Repair leaking joints."],
  d4_mainWalls_typeConstruction: ["Traditional cavity brickwork.", "Solid brickwork.", "Timber frame with masonry skin."],
  d5_windows_typeConstruction: ["uPVC double glazed.", "Timber single glazed.", "Aluminium double glazed."],
  d6_outsideDoors_typeConstruction: ["uPVC composite door.", "Timber panelled door.", "uPVC french doors."],
  d7_conservatory_typeConstruction: ["uPVC frame on brick dwarf walls.", "Timber frame."],
  d8_joinery_typeConstruction: ["Timber fascias and soffits.", "uPVC fascias and soffits."],
  d9_other_typeConstruction: ["None noted."],
  // Section E
  e1_typeConstruction: ["Traditional cut timber roof structure.", "Trussed rafter roof structure."],
  e1_condition: ["No significant defects visually identified.", "High moisture readings recorded to timbers.", "Evidence of past woodworm infestation."],
  e1_action: ["None required.", "Treat for woodworm.", "Improve ventilation."],
  e2_typeConstruction: ["Plasterboard ceilings.", "Lath and plaster ceilings."],
  e2_condition: ["Hairline cracks noted.", "Water staining observed."],
  e2_action: ["Monitor condition.", "Investigate source of leak."],
  e3_typeConstruction: ["Solid masonry walls.", "Timber stud partitions."],
  e3_condition: ["Satisfactory condition.", "Uneven plasterwork."],
  e3_action: ["None required.", "re-plaster."],
  e4_typeConstruction: ["Suspended timber floor.", "Solid concrete floor."],
  e4_condition: ["Level and firm.", "Springy in areas.", "Uneven surface."],
  e4_action: ["None required.", "Investigate sub-floor ventilation.", "Lift floorboards to check timbers."],
  e5_typeConstruction: ["Open fireplace.", "Gas fire installed.", "Wood burner installed."],
  e5_condition: ["Appears serviceable.", "Blocked/disused."],
  e5_action: ["Sweep chimney.", "Commission test."],
  e6_typeConstruction: ["Fitted kitchen units.", "Built-in wardrobes."],
  e6_condition: ["General wear and tear.", "Good condition."],
  e6_action: ["None required.", "Adjust hinges."],
  e7_typeConstruction: ["Timber staircase.", "Softwood skirtings and architraves."],
  e7_condition: ["Satisfactory condition.", "Wear and tear to treads."],
  e7_action: ["None required.", "Decorate."],
  e8_typeConstruction: ["White bathroom suite.", "Walk-in shower."],
  e8_condition: ["Seals appear intact.", "Sealant failing around bath."],
  e8_action: ["None required.", "Replace sealant."],
  e9_typeConstruction: ["None noted."],
  // Section F
  f1_typeConstruction: ["Mains electricity connected. Consumer unit in hallway.", "Mains electricity connected. Old fuse wire board."],
  f1_condition: ["Modern installation.", "Dated installation."],
  f1_action: ["None required.", "Full electrical test recommended."],
  f2_typeConstruction: ["Mains gas connected.", "Oil tank in garden.", "No gas supply."],
  f2_condition: ["Meter access clear.", "Regulator appears old."],
  f2_action: ["None required."],
  f3_typeConstruction: ["Mains water connected. Stopcock under sink."],
  f3_condition: ["Flow pressure adequate."],
  f3_action: ["None required."],
  f4_typeConstruction: ["Gas fired combination boiler.", "Electric storage heaters."],
  f4_condition: ["Working order assumed.", "Not tested."],
  f4_action: ["Service boiler."],
  f5_typeConstruction: ["Provided by boiler.", "Immersion heater."],
  f5_condition: ["Hot water available."],
  f5_action: ["None required."],
  f6_typeConstruction: ["Mains drainage assumed."],
  f6_condition: ["Free flowing."],
  f6_action: ["None required."],
  f7_typeConstruction: ["None known."],
  // Section G
  g1_typeConstruction: ["Detached brick garage.", "Integral garage.", "No garage."],
  g1_condition: ["Sound condition.", "Roof leaking.", "Door jammed."],
  g1_action: ["None required.", "Repair roof.", "Service door."],
  g2_typeConstruction: ["Timber shed.", "Greenhouse."],
  g2_condition: ["Fair condition.", "Rotten timbers."],
  g2_action: ["None required.", "Replace shed."],
  g3_typeConstruction: ["Paved driveway.", "Lawned garden."],
  // Section H
  h1_text: ["Confirm building regulations approval for extension.", "Verify FENSA certificates for windows."],
  h2_text: ["Check validity of boiler warranty.", "Check damp proofing guarantee."],
  h3_text: ["Verify boundaries.", "Check for shared services."],
  // Section I
  i1_text: ["Damp penetration causes risk of decay.", "Structural movement noted."],
  i2_text: ["Large trees nearby may affect foundations.", "Uneven paving causes trip hazard."],
  i3_text: ["Lack of safety glass in doors.", "Handrail loose on stairs."],
  i4_text: ["None noted."]
};

interface SectionData {
  content: string;
  rating: ConditionRating;
  photos: Array<{ id: string; url: string }>;
}

interface ReportState {
  id: string;
  propertyAddress: string;
  clientName: string;
  inspectionDate: string;
  ricsNumber: string;
  status: ReportStatus;
  type: ReportType;
  includeValuation: boolean;
  coverPhoto: { id: string; url: string } | null;
  sections: Record<string, SectionData>;
  sectionAData: SectionAData;
  sectionCData: SectionCData;
  sectionJData: SectionJData;
  sectionLData: SectionLData;
  sectionDData: SectionDData;
  sectionEData: SectionEData;
  sectionFData: SectionFData;
  sectionGData: SectionGData;
  sectionHData: SectionHData;
  sectionIData: SectionIData;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [view, setView] = useState<'dashboard' | 'report'>('dashboard');
  const [reports, setReports] = useState<SavedReport[]>(() => {
    const saved = localStorage.getItem('survey-reports-metadata');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeSectionId, setActiveSectionId] = useState('Front Cover');
  const [reportState, setReportState] = useState<ReportState | null>(null);
  const [photoLibrary, setPhotoLibrary] = useState<Array<{ id: string; url: string }>>([]);
  const [managedAutoResponses, setManagedAutoResponses] = useState<Record<string, string[]>>(AUTO_RESPONSES_LEVEL3);
  const [isManagingTemplates, setIsManagingTemplates] = useState(false);

  const [isSiteMode, setIsSiteMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled down 300px
      const mainContent = document.querySelector('main');
      if (mainContent) {
        setShowScrollTop(mainContent.scrollTop > 300);
      }
    };

    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      return () => mainContent.removeEventListener('scroll', handleScroll);
    }
  }, [view]);

  const scrollToTop = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const SECTIONS = reportState?.type === 'level2' ? SECTIONS_LEVEL2 : SECTIONS_LEVEL3;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const saveReportToStorage = (state: ReportState) => {
    localStorage.setItem(`report-data-${state.id}`, JSON.stringify(state));
    const metadata: SavedReport = {
      id: state.id,
      propertyAddress: state.propertyAddress || 'No Address',
      clientName: state.clientName || 'No Client',
      inspectionDate: state.inspectionDate || '',
      ricsNumber: state.ricsNumber || '',
      lastModified: Date.now(),
      status: state.status || 'working',
      type: state.type || 'level3'
    };
    const newReports = [metadata, ...reports.filter(r => r.id !== state.id)];
    setReports(newReports);
    localStorage.setItem('survey-reports-metadata', JSON.stringify(newReports));
  };

  const createNewReport = (type: ReportType) => {
    const newId = crypto.randomUUID();
    const newState: ReportState = {
      id: newId,
      propertyAddress: '',
      clientName: '',
      inspectionDate: new Date().toISOString().split('T')[0],
      ricsNumber: '',
      status: 'working',
      type: type,
      includeValuation: false,
      coverPhoto: null,
      sections: {},
      sectionAData: {
        surveyorName: '',
        surveyorRicsNumber: '',
        companyName: '',
        inspectionDate: new Date().toISOString().split('T')[0],
        reportReference: '',
        relatedPartyDisclosure: '',
        propertyAddress: '',
        weatherConditions: '',
        propertyStatus: ''
      },
      sectionCData: {
        propertyType: '',
        yearBuilt: '',
        yearExtended: '',
        yearConverted: '',
        flatsInfo: '',
        construction: '',
        accommodation: {
          groundLivingRooms: '',
          groundBedrooms: '',
          groundBathShower: '',
          groundToilet: '',
          groundKitchen: '',
          groundUtility: '',
          groundConservatory: '',
          groundOther: '',
          groundOtherName: '',
          firstLivingRooms: '',
          firstBedrooms: '',
          firstBathShower: '',
          firstToilet: '',
          firstKitchen: '',
          firstUtility: '',
          firstConservatory: '',
          firstOther: '',
          firstOtherName: ''
        },
        meansOfEscape: '',
        epcRating: '',
        epcPotential: '',
        energyImprovements: '',
        energyIssues: '',
        gasService: false,
        electricService: false,
        waterService: false,
        drainageService: false,
        heatingGas: false,
        heatingElectric: false,
        heatingSolidFuel: false,
        heatingOil: false,
        heatingNone: false,
        otherServices: '',
        otherEnergyMatters: ''
      },
      sectionJData: {
        insulation: '',
        heating: '',
        lighting: '',
        ventilation: '',
        general: ''
      },
      sectionLData: {
        content: ''
      },
      sectionDData: defaultSectionDData,
      sectionEData: defaultSectionEData,
      sectionFData: defaultSectionFData,
      sectionGData: defaultSectionGData,
      sectionHData: defaultSectionHData,
      sectionIData: defaultSectionIData
    };
    setReportState(newState);
    setManagedAutoResponses(type === 'level2' ? AUTO_RESPONSES_LEVEL2 : AUTO_RESPONSES_LEVEL3);
    setActiveSectionId('Front Cover');
    setView('report');
  };

  const openReport = (id: string) => {
    const saved = localStorage.getItem(`report-data-${id}`);
    if (saved) {
      const data = JSON.parse(saved);
      setReportState(data);
      setManagedAutoResponses(data.type === 'level2' ? AUTO_RESPONSES_LEVEL2 : AUTO_RESPONSES_LEVEL3);
      setActiveSectionId('Front Cover');
      setView('report');
    }
  };

  const deleteReport = (id: string) => {
    const newReports = reports.filter(r => r.id !== id);
    setReports(newReports);
    localStorage.setItem('survey-reports-metadata', JSON.stringify(newReports));
    localStorage.removeItem(`report-data-${id}`);
  };

  /* Auto-save Logic */
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  // Debounced auto-save
  useEffect(() => {
    if (!reportState) return;

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      saveReportToStorage(reportState);
      setSaveStatus('saved');
    }, 2000); // 2 second debounce

    return () => clearTimeout(timer);
  }, [reportState]);

  const handleStatusChange = (id: string, newStatus: ReportStatus) => {
    // 1. Update individual report data if it exists in memory or storage
    const saved = localStorage.getItem(`report-data-${id}`);
    if (saved) {
      const data = JSON.parse(saved);
      data.status = newStatus;
      localStorage.setItem(`report-data-${id}`, JSON.stringify(data));

      // If this is the currently open report, update its state
      if (reportState?.id === id) {
        setReportState(data);
        setManagedAutoResponses(data.type === 'level2' ? AUTO_RESPONSES_LEVEL2 : AUTO_RESPONSES_LEVEL3);
      }
    }

    // 2. Update metadata list
    const newReports = reports.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setReports(newReports);
    localStorage.setItem('survey-reports-metadata', JSON.stringify(newReports));
  };

  const updateReportState = (updates: Partial<ReportState>) => {
    setReportState(prev => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  };

  const updateSectionData = (sectionId: string, updates: Partial<SectionData>) => {
    setReportState(prev => {
      if (!prev) return null;
      const section = prev.sections[sectionId] || { content: '', rating: null, photos: [] };
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: { ...section, ...updates }
        }
      };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file)
      }));
      setPhotoLibrary(prev => [...prev, ...newPhotos]);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (typeof active.id === 'string' && typeof over.id === 'string') {
      const sectionId = activeSectionId;
      const currentPhotos = reportState?.sections[sectionId]?.photos || [];
      const activeIdx = currentPhotos.findIndex(p => p.id === active.id);
      const overIdx = currentPhotos.findIndex(p => p.id === over.id);

      if (activeIdx !== -1 && overIdx !== -1) {
        const reordered = arrayMove(currentPhotos, activeIdx, overIdx);
        updateSectionData(sectionId, { photos: reordered });
        return;
      }
    }

    if (active.id !== over.id) {
      const photo = photoLibrary.find(p => p.id === active.id);
      if (photo) {
        const targetSectionId = over.id as string;

        if (targetSectionId === 'Front Cover') {
          updateReportState({ coverPhoto: photo });
          return;
        }

        const currentSectionPhotos = reportState?.sections[targetSectionId]?.photos || [];
        if (currentSectionPhotos.find(p => p.id === photo.id)) return;

        updateSectionData(targetSectionId, {
          photos: [...currentSectionPhotos, photo]
        });
      }
    }
  }


  const handleAddPhotoFromSection = (sectionId: string, _subsectionId: string, file: File) => {
    // Subsection ID is currently not used for photo storage, but could be useful for tagging in future
    const photo = {
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file)
    };

    // Add to main section photos
    const currentSectionPhotos = reportState?.sections[sectionId]?.photos || [];
    updateSectionData(sectionId, {
      photos: [...currentSectionPhotos, photo]
    });

    // Also add to library for reuse
    setPhotoLibrary(prev => [...prev, photo]);
  };

  const handleRemovePhotoFromSection = (sectionId: string, photoId: string) => {
    const section = reportState?.sections[sectionId] || { content: '', rating: null, photos: [] };
    updateSectionData(sectionId, {
      photos: section.photos.filter(p => p.id !== photoId)
    });
  };

  const handleRemovePhotoFromLibrary = (photoId: string) => {
    setPhotoLibrary(prev => prev.filter(p => p.id !== photoId));
  };

  const handleDownloadPDF = async () => {
    const reportElement = document.getElementById('report-content');
    if (!reportElement) return;

    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`RICS_Home_Survey_Report_${reportState?.propertyAddress || 'No_Address'}.pdf`);
  };

  if (view === 'dashboard') {
    return (
      <Dashboard
        reports={reports}
        onNewReport={createNewReport}
        onOpenReport={openReport}
        onDeleteReport={deleteReport}
        onStatusChange={handleStatusChange}
        onLogout={handleLogout}
      />
    );
  }

  const currentSectionData = reportState?.sections[activeSectionId] || { content: '', rating: null, photos: [] };
  const currentSectionIdx = SECTIONS.indexOf(activeSectionId);

  // Restriction: photos and condition ratings should only be on sections 0, 4, 5, 6, 7
  const allowPhotos = [0, 4, 5, 6, 7].includes(currentSectionIdx);
  const allowRatings = [4, 5, 6, 7].includes(currentSectionIdx);

  const visibleSections = SECTIONS.filter(s => {
    if (s === 'Valuation' && !reportState?.includeValuation) return false;
    return true;
  });

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={`min-h-screen flex flex-col bg-gray-50 text-gray-900 ${isSiteMode ? 'touch-none' : ''}`}>
        <header className="bg-[#002d62] py-4 px-6 mb-6 shadow-lg mx-4 mt-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setView('dashboard');
                }}
                className="p-2 hover:bg-white/10 rounded-lg text-white flex items-center gap-1 font-bold text-sm transition-colors"
              >
                <ChevronLeft size={20} /> Dashboard
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-lg text-white transition-colors"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
              <div className="h-8 w-px bg-white/20 mx-2"></div>
              <div className="bg-white p-2 rounded-lg">
                <img src={logoImg} alt="Logo" className="h-10 object-contain" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-white text-base md:text-xl font-semibold leading-tight">
                  RICS Report Writer
                </h1>
                <span className="text-[#d4b88a] text-xs md:text-sm leading-none">
                  {reportState?.type === 'level2' ? 'Level 2' : 'Level 3'} Survey Report
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Status Switcher */}
              <div className="hidden md:flex bg-white/10 p-1 rounded-lg border border-white/20 mr-2">
                {(['working', 'complete', 'archived'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateReportState({ status: s })}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${reportState?.status === s
                      ? 'bg-white text-[#002d62] shadow-sm'
                      : 'text-white/60 hover:text-white'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsSiteMode(!isSiteMode)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isSiteMode
                  ? 'bg-white text-[#002d62] border-white'
                  : 'text-white border-white/30 hover:bg-white/10'
                  }`}
              >
                {isSiteMode ? <Smartphone size={14} /> : <Monitor size={14} />}
                {isSiteMode ? 'SITE MODE' : 'OFFICE MODE'}
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-lg border border-white/10">
                <div className={`w-2 h-2 rounded-full ${saveStatus === 'saved' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`}></div>
                <span className="text-xs font-medium text-white/80">
                  {saveStatus === 'saved' ? 'All changes saved' : 'Saving...'}
                </span>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="bg-[#d4b88a] text-[#1a1a1a] px-4 py-2 rounded-md font-bold text-sm hover:bg-[#c4a87a] transition-all flex items-center gap-2 shadow-sm"
              >
                <FileText size={16} /> Export PDF
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden relative">

          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 md:hidden animate-in fade-in"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`
              fixed md:relative z-40 h-full md:h-auto
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
              ${isSiteMode ? 'w-16' : 'w-72'} 
              bg-white border-r border-gray-200 transition-all duration-300 flex flex-col
          `}>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {visibleSections.map((section) => {
                const idx = SECTIONS.indexOf(section);
                const labels = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', '!', '$'];
                return (
                  <button
                    key={section}
                    onClick={() => {
                      setActiveSectionId(section);
                      setIsSidebarOpen(false); // Close mobile sidebar on selection
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-3 ${activeSectionId === section
                      ? 'bg-survey-blue text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activeSectionId === section ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                      {idx === 0 ? '0' : labels[idx] || idx}
                    </div>
                    {!isSiteMode && <span className="truncate">{section}</span>}
                  </button>
                );
              })}
            </nav>
            <div className={`mt-auto p-4 border-t border-gray-100 space-y-2 ${isSiteMode ? 'flex flex-col items-center' : ''}`}>
              {!isSiteMode && (
                <button
                  onClick={() => updateReportState({ includeValuation: !reportState?.includeValuation })}
                  className={`flex items-center justify-between w-full p-2 rounded-md border text-xs font-bold transition-all ${reportState?.includeValuation
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-gray-50 text-gray-400'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    {reportState?.includeValuation ? <Eye size={14} /> : <EyeOff size={14} />}
                    Valuation Section
                  </span>
                  <div className={`w-4 h-4 rounded-full border-2 border-current transition-all ${reportState?.includeValuation ? 'bg-green-600' : 'bg-transparent'}`} />
                </button>
              )}

              <button
                onClick={() => setIsManagingTemplates(true)}
                className={`flex items-center justify-center gap-2 p-2 rounded-md border border-survey-blue text-survey-blue text-xs font-bold hover:bg-blue-50 transition-colors ${isSiteMode ? 'aspect-square' : 'w-full px-4'}`}
                title="Templates"
              >
                <Settings size={isSiteMode ? 20 : 16} />
                {!isSiteMode && 'Templates'}
              </button>
            </div>
          </aside>

          <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50">
            <div className={`max-w-4xl mx-auto ${isSiteMode ? 'p-0' : ''}`} id="report-content">
              {activeSectionId === 'Front Cover' ? (
                <FrontCover
                  id="Front Cover"
                  photo={reportState?.coverPhoto || null}
                  propertyAddress={reportState?.propertyAddress || ''}
                  clientName={reportState?.clientName || ''}
                  inspectionDate={reportState?.inspectionDate || ''}
                  ricsNumber={reportState?.ricsNumber || ''}
                  reportType={reportState?.type || 'level3'}
                  onAddressChange={(val) => updateReportState({ propertyAddress: val })}
                  onClientChange={(val) => updateReportState({ clientName: val })}
                  onDateChange={(val) => updateReportState({ inspectionDate: val })}
                  onRicsChange={(val) => updateReportState({ ricsNumber: val })}
                  onPhotoRemove={() => updateReportState({ coverPhoto: null })}
                />
              ) : activeSectionId === 'A About the inspection' ? (
                <SectionA
                  id="A About the inspection"
                  data={reportState?.sectionAData || {
                    surveyorName: '',
                    surveyorRicsNumber: '',
                    companyName: '',
                    inspectionDate: '',
                    reportReference: '',
                    relatedPartyDisclosure: '',
                    propertyAddress: '',
                    weatherConditions: '',
                    propertyStatus: ''
                  }}
                  onDataChange={(data) => updateReportState({ sectionAData: { ...reportState?.sectionAData, ...data } as SectionAData })}
                  autoResponses={managedAutoResponses}
                />
              ) : activeSectionId === 'C About the property' ? (
                <SectionC
                  id="C About the property"
                  data={reportState?.sectionCData || {
                    propertyType: '',
                    yearBuilt: '',
                    yearExtended: '',
                    yearConverted: '',
                    flatsInfo: '',
                    construction: '',
                    accommodation: {
                      groundLivingRooms: '',
                      groundBedrooms: '',
                      groundBathShower: '',
                      groundToilet: '',
                      groundKitchen: '',
                      groundUtility: '',
                      groundConservatory: '',
                      groundOther: '',
                      groundOtherName: '',
                      firstLivingRooms: '',
                      firstBedrooms: '',
                      firstBathShower: '',
                      firstToilet: '',
                      firstKitchen: '',
                      firstUtility: '',
                      firstConservatory: '',
                      firstOther: '',
                      firstOtherName: ''
                    },
                    meansOfEscape: '',
                    epcRating: '',
                    epcPotential: '',
                    energyImprovements: '',
                    energyIssues: '',
                    gasService: false,
                    electricService: false,
                    waterService: false,
                    drainageService: false,
                    heatingGas: false,
                    heatingElectric: false,
                    heatingSolidFuel: false,
                    heatingOil: false,
                    heatingNone: false,
                    otherServices: '',
                    otherEnergyMatters: ''
                  }}
                  onDataChange={(data) => updateReportState({ sectionCData: { ...reportState?.sectionCData, ...data } as SectionCData })}
                  autoResponses={managedAutoResponses}
                />
              ) : activeSectionId === 'D Outside the property' ? (
                <SectionD
                  data={reportState?.sectionDData || defaultSectionDData}
                  onDataChange={(data) => updateReportState({ sectionDData: { ...reportState?.sectionDData, ...data } as SectionDData })}
                  autoResponses={managedAutoResponses}
                  onAddPhoto={(id, file) => handleAddPhotoFromSection('D Outside the property', id, file)}
                />
              ) : activeSectionId === 'E Inside the property' ? (
                <SectionE
                  data={reportState?.sectionEData || defaultSectionEData}
                  onDataChange={(data) => updateReportState({ sectionEData: { ...reportState?.sectionEData, ...data } as SectionEData })}
                  autoResponses={managedAutoResponses}
                  onAddPhoto={(id, file) => handleAddPhotoFromSection('E Inside the property', id, file)}
                />
              ) : activeSectionId === 'F Services' ? (
                <SectionF
                  data={reportState?.sectionFData || defaultSectionFData}
                  onDataChange={(data) => updateReportState({ sectionFData: { ...reportState?.sectionFData, ...data } as SectionFData })}
                  autoResponses={managedAutoResponses}
                  onAddPhoto={(id, file) => handleAddPhotoFromSection('F Services', id, file)}
                />
              ) : activeSectionId === 'G Grounds' ? (
                <SectionG
                  data={reportState?.sectionGData || defaultSectionGData}
                  onDataChange={(data) => updateReportState({ sectionGData: { ...reportState?.sectionGData, ...data } as SectionGData })}
                  autoResponses={managedAutoResponses}
                  onAddPhoto={(id, file) => handleAddPhotoFromSection('G Grounds', id, file)}
                />
              ) : activeSectionId === 'H Issues for your legal advisers' ? (
                <SectionH
                  data={reportState?.sectionHData || defaultSectionHData}
                  onDataChange={(data) => updateReportState({ sectionHData: { ...reportState?.sectionHData, ...data } as SectionHData })}
                  autoResponses={managedAutoResponses}
                  onAddPhoto={(id, file) => handleAddPhotoFromSection('H Issues for your legal advisers', id, file)}
                />
              ) : activeSectionId === 'I Risks' ? (
                <SectionI
                  data={reportState?.sectionIData || defaultSectionIData}
                  onDataChange={(data) => updateReportState({ sectionIData: { ...reportState?.sectionIData, ...data } as SectionIData })}
                  autoResponses={managedAutoResponses}
                  onAddPhoto={(id, file) => handleAddPhotoFromSection('I Risks', id, file)}
                />
              ) : activeSectionId === 'J Energy matters' ? (
                <SectionJ
                  id="J Energy matters"
                  data={reportState?.sectionJData || {
                    insulation: '',
                    heating: '',
                    lighting: '',
                    ventilation: '',
                    general: ''
                  }}
                  onDataChange={(data) => updateReportState({ sectionJData: { ...reportState?.sectionJData, ...data } as SectionJData })}
                  autoResponses={managedAutoResponses}
                  onAddPhoto={(id, file) => handleAddPhotoFromSection('J Energy matters', id, file)}
                />
              ) : activeSectionId === 'L Further investigations and getting quotes' ? (
                <SectionL
                  id="L Further investigations and getting quotes"
                  data={reportState?.sectionLData || { content: '' }}
                  onDataChange={(data) => updateReportState({ sectionLData: { ...reportState?.sectionLData, ...data } as SectionLData })}
                  autoResponses={managedAutoResponses}
                  onAddPhoto={(id, file) => handleAddPhotoFromSection('L Further investigations and getting quotes', id, file)}
                />
              ) : (
                <Section
                  id={activeSectionId}
                  title={activeSectionId}
                  content={currentSectionData.content}
                  rating={currentSectionData.rating}
                  photos={currentSectionData.photos}
                  autoResponses={managedAutoResponses[activeSectionId] || []}
                  onContentChange={(val) => updateSectionData(activeSectionId, { content: val })}
                  onRatingChange={(val) => updateSectionData(activeSectionId, { rating: val })}
                  onPhotoRemove={(id) => handleRemovePhotoFromSection(activeSectionId, id)}
                  allowPhotos={allowPhotos}
                  allowRatings={allowRatings}
                />
              )}
            </div>
          </main>

          {!isSiteMode && (
            <PhotoManager
              photos={photoLibrary}
              onUpload={handleFileUpload}
              onRemove={handleRemovePhotoFromLibrary}
            />
          )}

          {isSiteMode && (
            <div className="fixed bottom-8 right-8 z-30">
              <button
                onClick={() => document.getElementById('site-photo-upload')?.click()}
                className="w-16 h-16 bg-survey-blue text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform active:scale-95 border-4 border-white"
              >
                <Smartphone size={32} />
                <input
                  id="site-photo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                />
              </button>
            </div>
          )}
        </div>

        {isManagingTemplates && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Manage Auto-Text Templates</h2>
                  <p className="text-sm text-gray-500">Edit the pre-populated responses for each report section.</p>
                </div>
                <button
                  onClick={() => setIsManagingTemplates(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-hidden flex">
                <div className="w-1/3 border-r border-gray-100 overflow-y-auto p-4 bg-gray-50/50">
                  {SECTIONS.filter(s => s !== 'Front Cover').map(section => (
                    <button
                      key={section}
                      onClick={() => setActiveSectionId(section)}
                      className={`w-full text-left px-4 py-2 rounded-md mb-1 text-sm font-medium transition-colors ${activeSectionId === section
                        ? 'bg-white shadow-sm border border-gray-200 text-survey-blue'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {section}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-8 bg-white">
                  <h3 className="font-bold text-lg mb-4 text-gray-900">{activeSectionId}</h3>
                  <div className="space-y-4">
                    {(managedAutoResponses[activeSectionId] || []).map((resp, index) => (
                      <div key={index} className="flex gap-2">
                        <textarea
                          readOnly
                          value={resp}
                          className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 h-20 resize-none"
                        />
                        <button
                          onClick={() => {
                            const newResps = [...(managedAutoResponses[activeSectionId] || [])];
                            newResps.splice(index, 1);
                            setManagedAutoResponses(prev => ({ ...prev, [activeSectionId]: newResps }));
                          }}
                          className="p-2 self-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-gray-100">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Add New Template</label>
                      <div className="flex gap-2">
                        <textarea
                          id="new-template-text"
                          className="flex-1 p-3 border border-gray-300 rounded-lg text-sm h-24 focus:ring-2 focus:ring-survey-blue outline-none"
                          placeholder="Type a new auto-response here..."
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById('new-template-text') as HTMLTextAreaElement;
                            if (input.value.trim()) {
                              const newResps = [...(managedAutoResponses[activeSectionId] || []), input.value.trim()];
                              setManagedAutoResponses(prev => ({ ...prev, [activeSectionId]: newResps }));
                              input.value = '';
                            }
                          }}
                          className="px-6 py-2 bg-survey-blue text-white rounded-lg font-semibold hover:bg-blue-800 transition-all self-end"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end bg-gray-50">
                <button
                  onClick={() => setIsManagingTemplates(false)}
                  className="px-8 py-3 bg-survey-blue text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Finished Editing
                </button>
              </div>
            </div>
          </div>
        )}



        {/* Scroll to Top Button */}
        {showScrollTop && activeSectionId !== 'Front Cover' && !isManagingTemplates && (
          <button
            onClick={scrollToTop}
            className={`fixed ${isSiteMode ? 'bottom-24 right-8' : 'bottom-8 right-8'} z-40 bg-survey-blue text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-all hover:scale-110 active:scale-95 border-2 border-white`}
            title="Scroll to Top"
          >
            <ArrowUp size={24} />
          </button>
        )}
      </div>
    </DndContext>
  );
}

