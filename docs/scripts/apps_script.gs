// ============================================================
// CONFIG — update SHEET_WEBHOOK_SECRET if changed in backend
// ============================================================
var BACKEND_URL = 'https://api.vazlina.shop';
var SHEET_WEBHOOK_SECRET = 'vzl_sheet_2024xK9';

// Status column index (1-based) — col 12 = "Status"
var STATUS_COL = 12;
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
  'Date',
  'Order ID',
  'Customer Name',
  'Phone',
  'State',
  'City',
  'Address',
  'Main Product',
  'Upsell (Yes/No)',
  'Upsell Product',
  'Total to Collect',
  'Status'
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Orders');

    if (!sheet) {
      sheet = ss.insertSheet('Orders');
      sheet.appendRow(HEADERS);
      // Style header row
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground('#1a73e8');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
      // Column widths
      sheet.setColumnWidth(1, 130);  // Fecha
      sheet.setColumnWidth(2, 80);   // Order ID
      sheet.setColumnWidth(3, 160);  // Nombre
      sheet.setColumnWidth(4, 130);  // Teléfono
      sheet.setColumnWidth(5, 100);  // Estado
      sheet.setColumnWidth(6, 120);  // Ciudad
      sheet.setColumnWidth(7, 220);  // Dirección
      sheet.setColumnWidth(8, 200);  // Producto Principal
      sheet.setColumnWidth(9, 90);   // Upsell
      sheet.setColumnWidth(10, 180); // Producto Upsell
      sheet.setColumnWidth(11, 130); // Total
      sheet.setColumnWidth(12, 130); // Status
    }

    var upsellYesNo = data.upsell || (data.is_upsell_accepted === true ? 'Yes' : (data.is_upsell_accepted === false ? 'No' : 'No'));
    var upsellProduct = (data.producto_upsell && data.producto_upsell !== 'No') ? data.producto_upsell : '';
    var mainProduct = data.producto_principal || data.products_ordered || '';
    var total = data.total_cobrar || (data.total_price ? ('$' + parseFloat(data.total_price).toFixed(2) + ' MXN') : '');

    var newRow = [
      data.fecha        || data.timestamp || new Date().toLocaleString('en-GB'),
      data.order_id     || '',
      data.nombre       || data.customer_name     || '',
      data.telefono     || data.customer_phone    || '',
      data.estado       || data.customer_state    || '',
      data.ciudad       || data.customer_city     || '',
      data.direccion    || data.customer_address  || '',
      mainProduct,
      upsellYesNo,
      upsellProduct,
      total,
      data.status       || 'Pending confirmation'
    ];

    sheet.appendRow(newRow);
    applyStatusDropdown(sheet, sheet.getLastRow());

    // Color upsell cell green if accepted
    var lastRow = sheet.getLastRow();
    if (data.upsell === 'Yes') {
      sheet.getRange(lastRow, 9).setBackground('#d4edda').setFontColor('#155724');
      sheet.getRange(lastRow, 10).setBackground('#d4edda').setFontColor('#155724');
    }

    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', row: lastRow}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
