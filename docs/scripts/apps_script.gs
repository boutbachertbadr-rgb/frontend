// ============================================================
// Vazlina — Google Sheet order intake (Costa Rica / Fufills)
//
// The frontend posts orders directly to this Web App — there is
// no backend/API in between anymore. One row = one SKU line
// (a mixed-color order sends 2 rows, sharing the same customer
// info) so the fulfillment team gets clean, atomic columns.
//
// Columns match exactly what the fulfillment service asked for:
// country, full name, phone, departamento, municipio, dirección
// completa, punto de referencia, SKU, quantity, price — plus a
// shipping column (0 = free/standard, 2000 = express).
//
// SETUP (once):
//   1. Open the Google Sheet -> Extensions -> Apps Script
//   2. Paste this entire file, save
//   3. Deploy -> Manage deployments -> edit existing deployment
//      -> Version: New version -> Deploy
//      (keeps the same Web App URL already in use)
// ============================================================

var HEADERS = [
  'Fecha',                 // A  1
  'Country',                // B  2
  'Full Name',               // C  3
  'Phone Number',            // D  4
  'Departamento',            // E  5
  'Municipio',               // F  6
  'Dirección Completa',      // G  7
  'Punto de Referencia',     // H  8
  'SKU',                     // I  9
  'Quantity',                // J  10
  'Price',                   // K  11
  'Shipping'                 // L  12
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
      sheet.setColumnWidth(2, 100);   // Country
      sheet.setColumnWidth(3, 160);   // Full Name
      sheet.setColumnWidth(4, 130);   // Phone Number
      sheet.setColumnWidth(5, 110);   // Departamento
      sheet.setColumnWidth(6, 110);   // Municipio
      sheet.setColumnWidth(7, 220);   // Dirección Completa
      sheet.setColumnWidth(8, 180);   // Punto de Referencia
      sheet.setColumnWidth(9, 140);   // SKU
      sheet.setColumnWidth(10, 90);   // Quantity
      sheet.setColumnWidth(11, 90);   // Price
      sheet.setColumnWidth(12, 90);   // Shipping
    }

    var newRow = [
      data.fecha              || new Date().toLocaleString('en-GB'),
      data.country             || 'Costa Rica',
      data.full_name           || '',
      data.phone               || '',
      data.departamento        || '',
      data.municipio           || '',
      data.direccion_completa  || '',
      data.punto_referencia    || '',
      data.sku                 || '',
      data.quantity            || '',
      data.price               || '',
      data.shipping            || 0
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
