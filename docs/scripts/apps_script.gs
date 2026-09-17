// ============================================================
// Vazlina — Google Sheet order intake (Costa Rica / Fufills)
//
// The frontend posts orders directly to this Web App — there is
// no backend/API in between. One row = one order (SKU column
// lists every item in the order, e.g. "2x ORONGEADAPTACR, 1x
// GRISADAPTADORCR").
//
// Exactly 12 columns, no more no less:
// Country, Full Name, Phone Number, Departamento, Municipio,
// Dirección Completa, Punto de Referencia, SKU, Quantity,
// Total Price, Price, Shipping
//
// SETUP (once):
//   1. Open the Google Sheet -> Extensions -> Apps Script
//   2. Paste this entire file, save
//   3. Deploy -> Manage deployments -> edit existing deployment
//      -> Version: New version -> Deploy
//      (keeps the same Web App URL already in use)
// ============================================================

var HEADERS = [
  'Country',                // A  1
  'Full Name',               // B  2
  'Phone Number',            // C  3
  'Departamento',            // D  4
  'Municipio',               // E  5
  'Dirección Completa',      // F  6
  'Punto de Referencia',     // G  7
  'SKU',                     // H  8
  'Quantity',                // I  9
  'Total Price',             // J  10
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
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 100);   // Country
      sheet.setColumnWidth(2, 160);   // Full Name
      sheet.setColumnWidth(3, 130);   // Phone Number
      sheet.setColumnWidth(4, 110);   // Departamento
      sheet.setColumnWidth(5, 110);   // Municipio
      sheet.setColumnWidth(6, 220);   // Dirección Completa
      sheet.setColumnWidth(7, 180);   // Punto de Referencia
      sheet.setColumnWidth(8, 260);   // SKU
      sheet.setColumnWidth(9, 90);    // Quantity
      sheet.setColumnWidth(10, 100);  // Total Price
      sheet.setColumnWidth(11, 90);   // Price
      sheet.setColumnWidth(12, 90);   // Shipping
    }

    // Always keep row 1 in sync with HEADERS, even if this tab already
    // existed from an older version of this script — prevents stale
    // headers from making the columns look shifted.
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    headerRange.setBackground('#1a73e8');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');

    var newRow = [
      data.country             || 'Costa Rica',
      data.full_name           || '',
      data.phone               || '',
      data.departamento        || '',
      data.municipio           || '',
      data.direccion_completa  || '',
      data.punto_referencia    || '',
      data.sku                 || '',
      data.quantity            || '',
      data.total_price         || '',
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
