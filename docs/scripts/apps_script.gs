// ============================================================
// CONFIG — update SHEET_WEBHOOK_SECRET if changed in backend
// ============================================================
var BACKEND_URL = 'https://api.vazlina.shop';
var SHEET_WEBHOOK_SECRET = 'vzl_sheet_2024xK9';

// Order ID column index — col 2 = "Order ID"
var ORDER_ID_COL = 2;

// Colors for each status
var STATUS_STYLES = {
  'pending_confirmation': { bg: '#fef3c7', fg: '#92400e' },
  'confirmed':            { bg: '#dbeafe', fg: '#1e40af' },
  'shipped':              { bg: '#ede9fe', fg: '#6d28d9' },
  'delivered':            { bg: '#d1fae5', fg: '#065f46' },
  'returned':             { bg: '#ffedd5', fg: '#9a3412' },
  'cancelled':            { bg: '#fee2e2', fg: '#991b1b' },
};

/**
 * INSTALLABLE TRIGGER — run this once to register:
 *   function setupTrigger() {
 *     ScriptApp.newTrigger('onSheetEdit').forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
 *   }
 *
 * Then delete the simple onEdit if present to avoid conflicts.
 */
function onSheetEdit(e) {
  try {
    var sheet = e.source.getActiveSheet();
    if (sheet.getName() !== 'Orders') return;

    var range = e.range;
    if (range.getColumn() !== STATUS_COL || range.getRow() === 1) return;

    var row = range.getRow();
    var newStatus = String(range.getValue()).trim();
    var orderId = sheet.getRange(row, ORDER_ID_COL).getValue();

    if (!orderId || !newStatus) return;

    // Call backend webhook
    var payload = JSON.stringify({
      order_id: parseInt(orderId),
      status: newStatus,
      secret: SHEET_WEBHOOK_SECRET
    });

    var response = UrlFetchApp.fetch(BACKEND_URL + '/webhook/sheet-status', {
      method: 'POST',
      contentType: 'application/json',
      payload: payload,
      muteHttpExceptions: true
    });

    var result = JSON.parse(response.getContentText());

    // Color the cell based on returned normalized status
    var style = STATUS_STYLES[result.status];
    if (style) {
      range.setBackground(style.bg).setFontColor(style.fg).setFontWeight('bold');
    }

    // Show brief toast confirmation
    e.source.toast('Status updated: ' + result.status, 'Vazlina ✓', 3);

  } catch (err) {
    e.source.toast('Error: ' + err.message, 'Vazlina ✗', 5);
  }
}

// ============================================================
// STATUS DROPDOWN — applied to every new row + existing rows
// ============================================================
var STATUS_CHOICES = [
  'pending confirmation',
  'confirmed',
  'shipped',
  'in transit',
  'delivered',
  'returned',
  'cancelled'
];

function applyStatusDropdown(sheet, row) {
  var cell = sheet.getRange(row, STATUS_COL);
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_CHOICES, true)
    .setAllowInvalid(false)
    .setHelpText('Choose a status from the list')
    .build();
  cell.setDataValidation(rule);
}

// Run this ONCE to apply dropdown to all existing rows
function setupStatusDropdowns() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Orders');
  if (!sheet) { Logger.log('Sheet "Orders" not found'); return; }
  var lastRow = sheet.getLastRow();
  for (var r = 2; r <= lastRow; r++) {
    applyStatusDropdown(sheet, r);
  }
  Logger.log('Dropdowns applied to ' + (lastRow - 1) + ' rows');
}

// Run this ONCE from the Apps Script editor to set up the trigger
function setupTrigger() {
  // Remove existing triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'onSheetEdit') ScriptApp.deleteTrigger(t);
  });
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('No active spreadsheet. Open this script from the Google Sheet: Extensions > Apps Script');
  }
  ScriptApp.newTrigger('onSheetEdit')
    .forSpreadsheet(ss)
    .onEdit()
    .create();
  Logger.log('Installable trigger created');
}

// ============================================================

var HEADERS = [
  'Date',           // A  1
  'Order ID',       // B  2
  'First Name',     // C  3
  'Last Name',      // D  4
  'Phone',          // E  5
  'Province',       // F  6
  'Province ID',    // G  7
  'City',           // H  8
  'City ID',        // I  9
  'Address',        // J  10
  'Products',       // K  11  (SKU · qty · price)
  'Reference',      // L  12
  'Note',           // M  13
  'Color',          // N  14
  'Shipping',       // O  15
  'Product Price',  // P  16
  'Shipping Price', // Q  17
  'Total',          // R  18
  'Status',         // S  19
  'Fufills ID'      // T  20
];

// Update column index for Status (now col 19)
var STATUS_COL = 19;

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
      sheet.setColumnWidth(1, 130);   // Date
      sheet.setColumnWidth(2, 80);    // Order ID
      sheet.setColumnWidth(3, 120);   // First Name
      sheet.setColumnWidth(4, 120);   // Last Name
      sheet.setColumnWidth(5, 140);   // Phone
      sheet.setColumnWidth(6, 100);   // Province
      sheet.setColumnWidth(7, 200);   // Province ID
      sheet.setColumnWidth(8, 110);   // City
      sheet.setColumnWidth(9, 200);   // City ID
      sheet.setColumnWidth(10, 220);  // Address
      sheet.setColumnWidth(11, 280);  // Products
      sheet.setColumnWidth(12, 180);  // Reference
      sheet.setColumnWidth(13, 150);  // Note
      sheet.setColumnWidth(14, 100);  // Color
      sheet.setColumnWidth(15, 90);   // Shipping
      sheet.setColumnWidth(16, 110);  // Product Price
      sheet.setColumnWidth(17, 110);  // Shipping Price
      sheet.setColumnWidth(18, 110);  // Total
      sheet.setColumnWidth(19, 130);  // Status
      sheet.setColumnWidth(20, 100);  // Fufills ID
    }

    var newRow = [
      data.fecha        || new Date().toLocaleString('en-GB'),
      data.order_id     || '',
      data.first_name   || '',
      data.last_name    || '',
      data.telefono     || '',
      data.estado       || '',
      data.province_id  || '',
      data.ciudad       || '',
      data.city_id      || '',
      data.direccion    || '',
      data.products     || '',
      data.reference    || '',
      data.note         || '',
      data.color        || '',
      data.envio        || 'Standard',
      data.precio_producto || '',
      data.precio_envio    || 'Free',
      data.total_cobrar    || '',
      data.status       || 'Pending confirmation',
      data.fufills_id   || ''
    ];

    sheet.appendRow(newRow);
    applyStatusDropdown(sheet, sheet.getLastRow());

    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', row: sheet.getLastRow()}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
