// ══════════════════════════════════════════════
//  ILM Dashboard — Google Apps Script API v3
// ══════════════════════════════════════════════

var SHEET_ID = "1LJxnQCKwzQHbwmnJ5SfhHsq9qcE2M73bjcmtr0-VWzo";
var SHEET_NAME = "Datos";

var AULA_COLORS = {
  "Aula 201":   "#E8F0FE",
  "Aula 202":   "#E6F4EA",
  "Aula 203":   "#FEF3E2",
  "Sala Disney":"#F3E8FD",
  "Aula 204":   "#FDE8EF"
};

var HEADERS = ["aula","n","estado","cpu","vel_base","vel_actual","nucleos",
               "proc_logicos","virtualizacion","cache_l1","cache_l2","cache_l3",
               "ram_gb","tipo_ram","vel_ram","ranuras","factor_forma",
               "disco_modelo","disco_tipo","disco_cap","observaciones"];

var LABELS  = ["Sala/Aula","N°","Estado","Modelo CPU","Vel.Base","Vel.Actual",
               "Núcleos","Proc.Lóg.","Virtualiz.","Caché L1","Caché L2","Caché L3",
               "RAM(GB)","Tipo RAM","Vel.RAM","Ranuras","Factor Forma",
               "Modelo Disco","Tipo Disco","Cap.Disco(GB)","Observaciones"];

// ── GET ──
function doGet(e) {
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      return jsonResponse({ data: {} });
    }
    return jsonResponse({ data: sheetToJSON(sheet) });
  } catch(e) { return jsonResponse({ error: e.toString() }); }
}

// ── POST ──
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (body.action === "save") {
      jsonToSheet(sheet, body.data);
      return jsonResponse({ ok: true });
    }
    return jsonResponse({ error: "Acción desconocida" });
  } catch(e) { return jsonResponse({ error: e.toString() }); }
}

// ── Sheet → JSON (simple: fila 1 = headers, fila 2+ = datos) ──
function sheetToJSON(sheet) {
  var rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return {};
  
  // La fila 1 siempre es HEADERS
  var headers = rows[0].map(function(h){ return String(h).trim(); });
  var db = {};
  
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var aula = String(row[0]).trim();
    if (!aula) continue;
    if (!db[aula]) db[aula] = [];
    var pc = {};
    for (var j = 0; j < headers.length; j++) {
      var key = headers[j];
      if (key === "aula") continue;
      var val = row[j];
      if (["n","nucleos","proc_logicos","ram_gb","vel_ram","disco_cap"].indexOf(key) !== -1) {
        var num = parseFloat(val);
        pc[key] = isNaN(num) ? (String(val)||"") : num;
      } else {
        pc[key] = (val !== undefined && val !== null) ? String(val) : "";
      }
    }
    if (pc.n !== "" && pc.n !== undefined) db[aula].push(pc);
  }
  return db;
}

// ── JSON → Sheet ──
function jsonToSheet(sheet, db) {
  // Limpiar todo incluyendo filtros
  sheet.clearContents();
  sheet.clearFormats();
  try { var f = sheet.getFilter(); if (f) f.remove(); } catch(e) {}

  var rows = [];

  // Fila 1: encabezados como texto plano
  rows.push(LABELS);

  // Filas de datos
  Object.keys(db).forEach(function(aula) {
    db[aula].forEach(function(pc) {
      rows.push(HEADERS.map(function(h) {
        if (h === "aula") return aula;
        return (pc[h] !== undefined && pc[h] !== null) ? pc[h] : "";
      }));
    });
  });

  // Escribir todo de una vez
  if (rows.length > 0) {
    sheet.getRange(1, 1, rows.length, HEADERS.length).setValues(rows);
  }

  // ── Formato sin tabla (no usa setBorder ni setFrozenRows que generan filtros) ──
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#1E2330");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontSize(9);
  headerRange.setHorizontalAlignment("center");

  // Colores por grupo de columnas en encabezado
  sheet.getRange(1,1,1,1).setBackground("#1A56DB");
  sheet.getRange(1,2,1,8).setBackground("#0F766E");
  sheet.getRange(1,10,1,6).setBackground("#7C3AED");
  sheet.getRange(1,16,1,4).setBackground("#B45309");
  sheet.getRange(1,20,1,2).setBackground("#374151");

  // Colores por aula en filas de datos
  var rowNum = 2;
  Object.keys(db).forEach(function(aula) {
    var bg = AULA_COLORS[aula] || "#F9FAFB";
    var bgAlt = shadeColor(bg, -8);
    db[aula].forEach(function(pc, idx) {
      var rowBg = idx % 2 === 0 ? bg : bgAlt;
      var rowRange = sheet.getRange(rowNum, 1, 1, HEADERS.length);
      rowRange.setBackground(rowBg).setFontSize(9);
      // Estado con color
      var estadoCell = sheet.getRange(rowNum, 3);
      if (String(pc.estado) === "Operativa") {
        estadoCell.setFontColor("#15803D").setFontWeight("bold");
      } else {
        estadoCell.setFontColor("#DC2626").setFontWeight("bold");
      }
      rowNum++;
    });
  });

  // Anchos de columna
  var widths = [85,32,78,210,60,60,52,60,70,60,60,60,52,58,58,65,70,190,68,68,190];
  for (var c = 0; c < widths.length; c++) sheet.setColumnWidth(c+1, widths[c]);

  // Asegurarse de quitar el filtro al final
  try { var f2 = sheet.getFilter(); if (f2) f2.remove(); } catch(e) {}
}

function shadeColor(hex, pct) {
  try {
    var num = parseInt(hex.slice(1), 16);
    var r = Math.min(255, Math.max(0, (num >> 16) + pct));
    var g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + pct));
    var b = Math.min(255, Math.max(0, (num & 0xFF) + pct));
    return "#" + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
  } catch(e) { return hex; }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
