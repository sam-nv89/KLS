import type { LearningResource } from '../types/studio';

function sanitizePdfText(text: string): string {
  return text
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function buildWorksheetActivityStream(resource: LearningResource): string {
  const lines: string[] = [];

  // Page header bar
  lines.push('0.96 0.95 0.93 rg 40 725 532 45 re f');
  lines.push('0.06 0.16 0.37 rg BT /F2 14 Tf 54 745 Td (Kids Learning Studio - Printable Activity Sheet) Tj ET');
  lines.push(`0.32 0.38 0.48 rg BT /F1 10 Tf 54 731 Td (${sanitizePdfText(resource.title)} | Ages ${sanitizePdfText(resource.ageGroup)}) Tj ET`);

  // Name & Date line
  lines.push('0.06 0.16 0.37 rg BT /F1 11 Tf 40 695 Td (Name: ___________________________    Date: _______________) Tj ET');

  // Outer dashed activity border
  lines.push('0.80 0.82 0.86 RG 1.2 w [4 4] 0 d 40 85 532 590 re S [] 0 d');

  switch (resource.category) {
    case 'alphabet-letters': {
      lines.push('0.11 0.46 0.91 rg BT /F2 16 Tf 60 635 Td (Trace the Letters and Say Each Sound!) Tj ET');
      const letters = ['A a', 'B b', 'C c', 'D d'];
      letters.forEach((pair, idx) => {
        const y = 565 - idx * 115;
        lines.push(`0.94 0.97 1.0 rg 60 ${y - 25} 492 85 re f`);
        lines.push(`0.06 0.16 0.37 rg BT /F2 36 Tf 80 ${y + 5} Td (${pair}) Tj ET`);
        lines.push('0.70 0.75 0.82 RG 1 w [3 4] 0 d');
        lines.push(`175 ${y + 30} m 530 ${y + 30} l S`);
        lines.push(`175 ${y + 12} m 530 ${y + 12} l S`);
        lines.push(`175 ${y - 6} m 530 ${y - 6} l S`);
        lines.push('[] 0 d');
        lines.push(`0.55 0.62 0.72 rg BT /F2 26 Tf 190 ${y + 4} Td (${pair}    ${pair}    ${pair}) Tj ET`);
      });
      break;
    }
    case 'math-numbers': {
      lines.push('0.11 0.46 0.91 rg BT /F2 16 Tf 60 635 Td (Count the Circles and Trace the Number!) Tj ET');
      for (let num = 1; num <= 5; num++) {
        const y = 570 - (num - 1) * 95;
        lines.push(`0.95 0.97 0.99 rg 60 ${y - 18} 492 72 re f`);
        lines.push(`0.06 0.16 0.37 rg BT /F2 32 Tf 82 ${y + 6} Td (${num}) Tj ET`);
        for (let c = 0; c < num; c++) {
          const cx = 170 + c * 46;
          const cy = y + 18;
          lines.push(`0.96 0.72 0.0 rg ${cx - 14} ${cy - 14} 28 28 re f`);
          lines.push(`0.06 0.16 0.37 RG 1.2 w ${cx - 14} ${cy - 14} 28 28 re S`);
        }
        lines.push(`0.55 0.62 0.72 rg BT /F2 24 Tf 430 ${y + 8} Td (${num}   ${num}   ${num}) Tj ET`);
      }
      break;
    }
    case 'shapes-colors': {
      lines.push('0.11 0.46 0.91 rg BT /F2 16 Tf 60 635 Td (Trace and Color Each Shape!) Tj ET');
      lines.push('0.06 0.16 0.37 RG 2 w [5 5] 0 d');
      // Square
      lines.push('90 430 150 150 re S');
      // Rectangle
      lines.push('320 445 210 120 re S');
      // Triangle
      lines.push('165 360 m 85 210 l 245 210 l h S');
      // Diamond
      lines.push('425 365 m 345 285 l 425 205 l 505 285 l h S');
      lines.push('[] 0 d');
      lines.push('0.06 0.16 0.37 rg BT /F2 13 Tf 135 405 Td (SQUARE) Tj ET');
      lines.push('0.06 0.16 0.37 rg BT /F2 13 Tf 385 405 Td (RECTANGLE) Tj ET');
      lines.push('0.06 0.16 0.37 rg BT /F2 13 Tf 130 180 Td (TRIANGLE) Tj ET');
      lines.push('0.06 0.16 0.37 rg BT /F2 13 Tf 395 180 Td (DIAMOND) Tj ET');
      break;
    }
    case 'fine-motor-skills': {
      lines.push('0.11 0.46 0.91 rg BT /F2 16 Tf 60 635 Td (Follow the Dotted Paths with Scissors or Pencil!) Tj ET');
      // Straight path
      lines.push('0.06 0.16 0.37 RG 2.2 w [6 6] 0 d 80 545 m 520 545 l S');
      // Step path
      lines.push('80 435 m 190 435 l 190 475 l 300 475 l 300 435 l 410 435 l 410 475 l 520 475 l S');
      // Zigzag path
      lines.push('80 325 m 150 375 l 220 325 l 290 375 l 360 325 l 430 375 l 520 325 l S');
      // Tall zigzag
      lines.push('80 205 m 160 270 l 240 205 l 320 270 l 400 205 l 480 270 l 520 235 l S');
      lines.push('[] 0 d');
      lines.push('0.96 0.45 0.09 rg 72 537 16 16 re f 72 427 16 16 re f 72 317 16 16 re f 72 197 16 16 re f');
      break;
    }
    default: {
      // Coloring, puzzles, creative activities printable frame
      lines.push('0.11 0.46 0.91 rg BT /F2 16 Tf 60 635 Td (Creative Activity & Coloring Canvas) Tj ET');
      lines.push('0.06 0.16 0.37 RG 2.2 w');
      // Friendly Rocket / House / Geometric illustration to color
      lines.push('246 250 120 180 re S');
      lines.push('236 430 m 306 520 l 376 430 l h S');
      lines.push('286 250 40 70 re S');
      lines.push('266 355 30 30 re S 316 355 30 30 re S');
      // Clouds & sun
      lines.push('120 480 45 45 re S');
      lines.push('440 490 65 35 re S');
      lines.push('0.32 0.38 0.48 rg BT /F1 12 Tf 130 165 Td (Color the picture, count the windows, and draw your favorite sky!) Tj ET');
      break;
    }
  }

  // Footer
  lines.push('0.45 0.50 0.58 rg BT /F1 9 Tf 40 58 Td (Kids Learning Studio | Free for Home & Single Classroom Printing | klstudio.org) Tj ET');

  return lines.join('\n');
}

export function generateResourcePdfBlob(resource: LearningResource): Blob {
  const coverStream = [
    '0.11 0.46 0.91 rg 40 705 532 65 re f',
    '1 1 1 rg BT /F2 22 Tf 58 738 Td (Kids Learning Studio) Tj ET',
    '0.92 0.96 1.0 rg BT /F1 11 Tf 58 718 Td (Learn  *  Play  *  Create  |  Printable Educational Resource) Tj ET',
    `0.06 0.16 0.37 rg BT /F2 22 Tf 40 645 Td (${sanitizePdfText(resource.title)}) Tj ET`,
    `0.30 0.36 0.46 rg BT /F1 12 Tf 40 615 Td (Ages ${sanitizePdfText(resource.ageGroup)}  |  ${resource.pages} Pages  |  ${sanitizePdfText(resource.fileFormat)}) Tj ET`,
    '0.97 0.96 0.94 rg 40 430 532 155 re f',
    '0.06 0.16 0.37 rg BT /F2 13 Tf 58 558 Td (About This Pack) Tj ET',
    `0.22 0.28 0.38 rg BT /F1 11 Tf 58 534 Td (${sanitizePdfText(resource.shortDescription.slice(0, 88))}) Tj ET`,
    `0.22 0.28 0.38 rg BT /F1 11 Tf 58 516 Td (${sanitizePdfText(resource.shortDescription.slice(88, 176))}) Tj ET`,
    '0.06 0.16 0.37 rg BT /F2 12 Tf 58 482 Td (Skills Developed:) Tj ET',
    `0.11 0.46 0.91 rg BT /F1 11 Tf 58 462 Td (${sanitizePdfText(resource.skills.join('  *  '))}) Tj ET`,
    '0.06 0.16 0.37 rg BT /F2 13 Tf 40 385 Td (What Is Included:) Tj ET',
    ...resource.whatsIncluded.slice(0, 4).map(
      (item, i) => `0.22 0.28 0.38 rg BT /F1 11 Tf 52 ${360 - i * 22} Td (- ${sanitizePdfText(item.slice(0, 85))}) Tj ET`
    ),
    '0.96 0.97 0.99 rg 40 120 532 115 re f',
    '0.06 0.16 0.37 rg BT /F2 12 Tf 58 205 Td (Printing Tip for Parents & Teachers) Tj ET',
    '0.28 0.34 0.44 rg BT /F1 10 Tf 58 184 Td (Select "Fit to Printable Area" for US Letter or A4 paper. Laminate sheets to reuse with dry-erase markers!) Tj ET',
    '0.28 0.34 0.44 rg BT /F1 10 Tf 58 166 Td (Personal & single-classroom license included. Thank you for learning with Kids Learning Studio!) Tj ET',
    '0.45 0.50 0.58 rg BT /F1 9 Tf 40 58 Td (Page 1 of 2 - Cover & Activity Guide) Tj ET',
  ].join('\n');

  const page2Stream = buildWorksheetActivityStream(resource);

  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> >>\nendobj\n',
    '4 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 6 0 R /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> >>\nendobj\n',
    `5 0 obj\n<< /Length ${coverStream.length} >>\nstream\n${coverStream}\nendstream\nendobj\n`,
    `6 0 obj\n<< /Length ${page2Stream.length} >>\nstream\n${page2Stream}\nendstream\nendobj\n`,
    '7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '8 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];

  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (const off of offsets) {
    pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

export function triggerResourcePdfDownload(resource: LearningResource): void {
  const blob = generateResourcePdfBlob(resource);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${resource.slug}-kids-learning-studio.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
