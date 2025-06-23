import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ElementRef } from '@angular/core';

export const generarPDF = async (pdfTable: ElementRef<any>) => {
  const DATA = pdfTable.nativeElement;

    html2canvas(DATA, { scale: 2 }).then(canvas => {
      const imgWidth = 210; // ancho A4 en mm
      const pageHeight = 295; // alto A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('odontograma-reporte.pdf');
    });
};
