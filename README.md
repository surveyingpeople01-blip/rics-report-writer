# RICS Home Survey Report Writer

A professional web application for creating RICS Level 2 and Level 3 Home Survey reports with comprehensive features for property surveyors.

![RICS Report Writer](https://img.shields.io/badge/RICS-Report%20Writer-blue)
![React](https://img.shields.io/badge/React-19.2.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8)

## Features

### Multi-Level Report Support
- **RICS Level 2** and **Level 3** survey types
- Dynamic section content based on report type
- Level-specific auto-response templates

### Custom Structured Sections
- **Section A**: About the Inspection (9 structured fields)
- **Section C**: About the Property (property details, accommodation table, energy efficiency)
- **Section J**: Energy Matters (J1-J5 subsections)
- **Section L**: Further Investigations and Getting Quotes

### Advanced Dashboard
- Search reports by property address or client name
- Sort by Date, Address, or Client (ascending/descending)
- Status management (Working, Complete, Archived)
- Grid/List view with localStorage persistence
- Report type labels and filtering

### Professional Features
- Front cover with inspection date and surveyor's RICS number
- Photo management with drag-and-drop sorting
- Condition ratings (Green/Amber/Red)
- Auto-fill templates for quick data entry
- Template management system
- PDF export functionality
- Site mode for on-site inspections

### Data Management
- All data stored locally in browser (localStorage)
- No server required - fully client-side
- Export/import capabilities
- Auto-save functionality

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/rics-report-writer.git

# Navigate to project directory
cd rics-report-writer

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The production files will be in the `dist/` folder.

## Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to GitHub Pages
3. Configure repository settings to serve from the appropriate branch

### Traditional Web Hosting (cPanel, Shared Hosting)
1. Build the project: `npm run build`
2. Upload all files from the `dist/` folder to your web server
3. Ensure `.htaccess` file is included for proper routing (Apache servers)
4. Access your domain to use the application

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Usage

### Creating a Report
1. Click "New Report" on the dashboard
2. Select report type (Level 2 or Level 3)
3. Fill in the front cover details
4. Navigate through sections using the sidebar
5. Use auto-fill dropdowns for quick data entry
6. Add photos via drag-and-drop
7. Export to PDF when complete

### Managing Templates
1. Click the "Templates" button in the sidebar
2. Add, edit, or delete auto-response templates
3. Templates are organized by section
4. Changes apply immediately to all reports

## Technology Stack

- **React 19.2.0** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Tailwind CSS 3.4.17** - Styling
- **Vite 7.2.4** - Build tool
- **@dnd-kit** - Drag and drop functionality
- **jsPDF** - PDF generation
- **Lucide React** - Icons

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is proprietary software. All rights reserved.

## Support

For support or questions, please contact the development team.

## Acknowledgments

Built for professional RICS surveyors to streamline the home survey reporting process.
