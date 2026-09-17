// ============================================================
// Vazlina — Google Sheet order intake (Costa Rica / Fufills)
//
// The frontend posts orders directly to this Web App — there is
// no backend/API in between anymore. One row = one SKU line
// (a mixed-color order sends 2 rows, sharing the same customer
// info) so the fulfillment team gets clean, atomic columns.
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
  'Nombre y Apellidos',      // C  3
  'Teléfono',                // D  4
  'Departamento',            // E  5
  'Municipio',               // F  6
  'Poblado/Colonia',         // G  7
  'Dirección Completa',      // H  8
  'Punto de Referencia',     // I  9
  'SKU',                     // J  10
  'Quantity',                // K  11
  'Price',                   // L  12
  'Shipping',                // M  13
  'Total Price'              // N  14
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Orders');

    if (!sheet) {
      sheet = ss.insertSheet('Orders');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 130);   // Fecha
      sheet.setColumnWidth(2, 100);   // Country
      sheet.setColumnWidth(3, 160);   // Nombre y Apellidos
      sheet.setColumnWidth(4, 130);   // Teléfono
      sheet.setColumnWidth(5, 110);   // Departamento
      sheet.setColumnWidth(6, 110);   // Municipio
      sheet.setColumnWidth(7, 140);   // Poblado/Colonia
      sheet.setColumnWidth(8, 220);   // Dirección Completa
      sheet.setColumnWidth(9, 180);   // Punto de Referencia
      sheet.setColumnWidth(10, 140);  // SKU
      sheet.setColumnWidth(11, 90);   // Quantity
      sheet.setColumnWidth(12, 90);   // Price
      sheet.setColumnWidth(13, 90);   // Shipping
      sheet.setColumnWidth(14, 100);  // Total Price
    }

    // Always keep row 1 in sync with HEADERS, even if this tab already
    // existed from an older version of this script — this prevents the
    // classic "columns look shifted" bug when the header row is stale.
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    headerRange.setBackground('#1a73e8');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');

    var newRow = [
      data.fecha              || new Date().toLocaleString('en-GB'),
      data.country             || 'Costa Rica',
      data.full_name           || '',
      data.phone               || '',
      data.departamento        || '',
      data.municipio           || '',
      data.poblado_colonia     || '',
      data.direccion_completa  || '',
      data.punto_referencia    || '',
      data.sku                 || '',
      data.quantity            || '',
      data.price               || '',
      data.shipping            || 0,
      data.total_price         || ''
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
