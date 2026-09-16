// ============================================================
// Vazlina — Google Sheet order intake (Costa Rica / Fufills)
//
// The frontend posts orders directly to this Web App — there is
// no backend/API in between anymore. Every submitted order is
// simply appended as a new row.
//
// SETUP (once):
//   1. Open the Google Sheet -> Extensions -> Apps Script
//   2. Paste this entire file, save
//   3. Deploy -> New deployment -> Web app
//        Execute as: Me
//        Who has access: Anyone
//   4. Copy the Web App URL into the frontend's
//      NEXT_PUBLIC_SHEET_WEBHOOK_URL env var
// ============================================================

var HEADERS = [
  'Fecha',                 // A  1
  'Nombre y Apellidos',    // B  2
  'Teléfono',              // C  3
  'Departamento',          // D  4
  'Municipio',             // E  5
  'Poblado/Colonia',       // F  6
  'Dirección Completa',    // G  7
  'Punto de Referencia',   // H  8
  'Productos (SKU)',       // I  9
  'Envío',                 // J  10
  'Precio Envío',          // K  11
  'Total',                 // L  12
  'Origen'                 // M  13
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Orders');

    if (!sheet) {
      sheet = ss.insertSheet('Orders');
      sheet.appendRow(HEADERS);
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground('#1a73e8');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 130);   // Fecha
      sheet.setColumnWidth(2, 160);   // Nombre y Apellidos
      sheet.setColumnWidth(3, 130);   // Teléfono
      sheet.setColumnWidth(4, 110);   // Departamento
      sheet.setColumnWidth(5, 110);   // Municipio
      sheet.setColumnWidth(6, 140);   // Poblado/Colonia
      sheet.setColumnWidth(7, 220);   // Dirección Completa
      sheet.setColumnWidth(8, 180);   // Punto de Referencia
      sheet.setColumnWidth(9, 300);   // Productos (SKU)
      sheet.setColumnWidth(10, 90);   // Envío
      sheet.setColumnWidth(11, 100);  // Precio Envío
      sheet.setColumnWidth(12, 100);  // Total
      sheet.setColumnWidth(13, 140);  // Origen
    }

    var newRow = [
      data.fecha            || new Date().toLocaleString('en-GB'),
      data.nombre_completo  || '',
      data.telefono         || '',
      data.departamento     || '',
      data.municipio        || '',
      data.poblado          || '',
      data.direccion        || '',
      data.referencia       || '',
      data.productos        || '',
      data.envio            || 'Standard',
      data.precio_envio     || 'Gratis',
      data.total            || '',
      data.origen           || ''
    ];

    sheet.appendRow(newRow);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
