// src/utils/printWindowContent.ts
export function getPrintWindowContent(templateHtml: string): string {
  return `
    <html>
      <head>
        <title>In vé</title>
        <style>
          @media print {
            @page {
              size: 12.2cm 19.2cm;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${templateHtml}
      </body>
    </html>
  `
}
