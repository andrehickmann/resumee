import { jsPDF } from 'jspdf';

// Farben
const ACCENT = '#ff6b3d';
const TEXT = '#1f1f1f';
const MUTED = '#666666';

export function usePdfGenerator() {
  function generatePDF(content: any, lang: 'de' | 'en' = 'de') {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    let y = 20;
    const margin = 20;
    const pageWidth = 210;
    const contentWidth = pageWidth - (2 * margin);

    // Header
    doc.setFontSize(24);
    doc.setTextColor(TEXT);
    doc.setFont('helvetica', 'bold');
    doc.text('André Hickmann Kuschnereit', margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(MUTED);
    doc.text('Senior Fullstack Engineer', margin, y);
    y += 10;

    // Kontaktinfo
    doc.setFontSize(9);
    doc.setTextColor(MUTED);
    const contactY = 20;
    doc.text('Berlin, ' + (lang === 'de' ? 'Deutschland' : 'Germany'), pageWidth - margin, contactY, { align: 'right' });
    doc.text('andre@hickmann-kuschnereit.de', pageWidth - margin, contactY + 4, { align: 'right' });
    doc.text('linkedin.com/in/ahickmann', pageWidth - margin, contactY + 8, { align: 'right' });

    // Linie
    doc.setDrawColor(ACCENT);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Intro
    doc.setFontSize(10);
    doc.setTextColor(TEXT);
    const intro = lang === 'de' 
      ? 'Senior Fullstack Engineer mit 23+ Jahren Erfahrung in der Entwicklung komplexer, skalierbarer Softwarelösungen. Spezialisiert auf moderne Technologien, Cloud-Architektur und durchgängige Produktentwicklung.'
      : 'Senior Fullstack Engineer with 23+ years of experience developing complex, scalable software solutions. Specialized in modern technologies, cloud architecture, and end-to-end product development.';
    
    const introLines = doc.splitTextToSize(intro, contentWidth);
    doc.text(introLines, margin, y);
    y += introLines.length * 5 + 3;

    // Highlight Box
    doc.setFillColor(255, 245, 240);
    doc.rect(margin, y, contentWidth, 15, 'F');
    doc.setDrawColor(ACCENT);
    doc.setLineWidth(1);
    doc.line(margin, y, margin, y + 15);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(TEXT);
    doc.text(lang === 'de' ? 'Kernkompetenzen:' : 'Core Competencies:', margin + 3, y + 5);
    
    doc.setFont('helvetica', 'normal');
    const skills = lang === 'de'
      ? 'Fullstack-Entwicklung • Requirements Engineering • Testing & Qualitätssicherung'
      : 'Fullstack Development • Requirements Engineering • Testing & Quality Assurance';
    const skillLines = doc.splitTextToSize(skills, contentWidth - 6);
    doc.text(skillLines, margin + 3, y + 10);
    y += 18;

    // Technologie-Stack Section
    addSection(doc, lang === 'de' ? 'Technologie-Stack' : 'Technology Stack', y);
    y += 8;

    const stackItems = content.stackItems.slice(0, 6);
    doc.setFontSize(9);
    
    for (let i = 0; i < stackItems.length; i += 2) {
      const item1 = stackItems[i];
      const item2 = stackItems[i + 1];
      
      // Linke Spalte
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(TEXT);
      doc.text(item1.title, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(MUTED);
      const tools1 = doc.splitTextToSize(item1.tools, (contentWidth / 2) - 5);
      doc.text(tools1, margin, y + 4);
      
      // Rechte Spalte
      if (item2) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(TEXT);
        doc.text(item2.title, margin + (contentWidth / 2), y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(MUTED);
        const tools2 = doc.splitTextToSize(item2.tools, (contentWidth / 2) - 5);
        doc.text(tools2, margin + (contentWidth / 2), y + 4);
      }
      
      y += Math.max(tools1.length, item2 ? doc.splitTextToSize(item2.tools, (contentWidth / 2) - 5).length : 0) * 4 + 8;
    }

    y += 5;

    // Berufserfahrung
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    addSection(doc, lang === 'de' ? 'Berufserfahrung' : 'Work Experience', y);
    y += 8;

    content.careerTimeline.forEach((item: any) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(9);
      doc.setTextColor(ACCENT);
      doc.setFont('helvetica', 'bold');
      doc.text(item.period, margin, y);
      y += 5;

      doc.setFontSize(11);
      doc.setTextColor(TEXT);
      doc.setFont('helvetica', 'bold');
      doc.text(item.role, margin, y);
      y += 5;

      doc.setFontSize(9);
      doc.setTextColor(MUTED);
      doc.setFont('helvetica', 'normal');
      const summaryLines = doc.splitTextToSize(item.summary, contentWidth);
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 4 + 6;
    });

    // Branchen
    if (y > 220) {
      doc.addPage();
      y = 20;
    }

    addSection(doc, lang === 'de' ? 'Branchen- und Domänenerfahrung' : 'Industry & Domain Experience', y);
    y += 8;

    doc.setFontSize(8);
    doc.setTextColor(MUTED);
    const industries = content.industries.join(' • ');
    const industryLines = doc.splitTextToSize(industries, contentWidth);
    doc.text(industryLines, margin, y);
    y += industryLines.length * 4 + 8;

    // Ausbildung
    if (y > 220) {
      doc.addPage();
      y = 20;
    }

    addSection(doc, lang === 'de' ? 'Ausbildung' : 'Education', y);
    y += 8;

    doc.setFontSize(9);
    doc.setTextColor(MUTED);
    const eduLines = doc.splitTextToSize(content.educationNote, contentWidth);
    doc.text(eduLines, margin, y);
    y += eduLines.length * 4 + 10;

    // Projekte
    if (y > 200) {
      doc.addPage();
      y = 20;
    }

    addSection(doc, lang === 'de' ? 'Ausgewählte Projekte (Auszug)' : 'Selected Projects (Excerpt)', y);
    y += 8;

    const selectedProjects = content.projects
      .filter((p: any) => !p.tags.includes('Opportunity'))
      .slice(0, 8);

    selectedProjects.forEach((project: any) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(9);
      doc.setTextColor(ACCENT);
      doc.setFont('helvetica', 'bold');
      doc.text(project.period, margin, y);
      y += 5;

      doc.setFontSize(10);
      doc.setTextColor(TEXT);
      doc.setFont('helvetica', 'bold');
      const titleLines = doc.splitTextToSize(project.title, contentWidth);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 5 + 1;

      doc.setFontSize(9);
      doc.setTextColor(MUTED);
      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(project.description, contentWidth);
      doc.text(descLines, margin, y);
      y += descLines.length * 4 + 5;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor('#999999');
    const footer = lang === 'de' 
      ? 'Lebenslauf · André Hickmann Kuschnereit · Stand: März 2026'
      : 'Resume · André Hickmann Kuschnereit · March 2026';
    doc.text(footer, pageWidth / 2, 287, { align: 'center' });

    return doc;

    function addSection(doc: jsPDF, title: string, yPos: number) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(ACCENT);
      doc.text(title, margin, yPos);
      doc.setDrawColor('#e5e5e5');
      doc.setLineWidth(0.2);
      doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);
    }
  }

  function downloadPDF(content: any, lang: 'de' | 'en', filename: string) {
    const doc = generatePDF(content, lang);
    doc.save(filename);
  }

  return {
    generatePDF,
    downloadPDF
  };
}
