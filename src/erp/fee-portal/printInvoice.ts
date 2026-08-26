import { StudentType } from "./types";

const fmt = (v: string | number) =>
  Number(v || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const numWords = (n: number): string => {
  if (n === 0) return "Zero";
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const toW = (num: number): string => {
    if (num === 0) return "";
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
    if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + toW(num % 100) : "");
    if (num < 100000) return toW(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + toW(num % 1000) : "");
    if (num < 10000000) return toW(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + toW(num % 100000) : "");
    return toW(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + toW(num % 10000000) : "");
  };
  const intPart = Math.floor(Math.abs(n));
  return toW(intPart) + " Rupees Only";
};

export function printInvoice(student: StudentType, fee: any, allFees: any[], sessionStr?: string) {
  if (!student || !fee) {
    alert("No student or fee data selected.");
    return;
  }

  const formatMonthWithYear = (monthName: string) => {
    if (!monthName || monthName.includes("-")) return monthName;
    const academicMonths = [
      "April", "May", "June", "July", "August", "September", 
      "October", "November", "December", "January", "February", "March"
    ];
    const idx = academicMonths.indexOf(monthName);
    if (idx === -1 || !sessionStr) return monthName;
    let [startYear, endYear] = sessionStr.split("-");
    if (endYear && endYear.length === 2) endYear = `20${endYear}`;
    const year = idx < 9 ? startYear : endYear;
    return `${monthName} ${year}`;
  };

  const origin = window.location.origin;

  const academicMonths = [
    "April", "May", "June", "July", "August", "September", 
    "October", "November", "December", "January", "February", "March"
  ];

  const sortedAllFees = [...(allFees || [])].sort((a, b) => {
    const aMonth = a.month.split("-")[0];
    const bMonth = b.month.split("-")[0];
    const aIdx = academicMonths.indexOf(aMonth);
    const bIdx = academicMonths.indexOf(bMonth);
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
  });

  const getCurrentMonthIdx = (monthName: string) => {
    return academicMonths.indexOf(monthName.split("-")[0]);
  };
  const currentMonthIdx = getCurrentMonthIdx(fee.month || "");

  // ─── Calculate previous arrears (unpaid balance before this month) ───
  let previousArrears = 0;
  for (const f of sortedAllFees) {
    if (getCurrentMonthIdx(f.month) < currentMonthIdx) {
      const fPaid = f.payments?.reduce((s: number, p: any) => s + (Number(p.amountPaid) || 0), 0) ?? 0;
      previousArrears += Math.max(0, Number(f.total || 0) - fPaid);
    }
  }
  previousArrears = Math.round(previousArrears * 100) / 100;

  // ─── Student details ───
  const cardNo = student.cardNo || (student as any).studentSessionId?.cardNo || "—";
  const studentClassName = student.studentClass || (student as any).studentclass?.className || "—";
  const fatherName = student.fatherName || (student as any).studentProfile?.fatherName || "—";
  const contactNo = student.contactNo || (student as any).studentProfile?.fatherMobile || "—";

  // ─── Receipt details ───
  const latestPayment = fee.payments?.length ? fee.payments[fee.payments.length - 1] : null;
  const receiptNo = latestPayment?.receiptNo || `REC-GV-${cardNo}-${(fee.month || "").replace(/[^a-zA-Z0-9]/g, "")}`;
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  // ─── Current month numbers ───
  const currentMonthTotal = Number(fee.total || 0);
  const currentMonthPaid = fee.payments?.reduce((s: number, p: any) => s + (Number(p.amountPaid) || 0), 0) ?? 0;
  const currentMonthDue = Math.max(0, Math.round((currentMonthTotal - currentMonthPaid) * 100) / 100);
  const grandTotal = Math.round((currentMonthTotal + previousArrears) * 100) / 100;

  // ─── Current month fee head breakdown (only non-zero heads) ───
  const heads: [string, number][] = [
    ["Admission Fee", Number(fee.admissionFee || 0)],
    ["Tuition Fee", Number(fee.tuitionFee || 0)],
    ["Exam Fee", Number(fee.examFee || 0)],
    ["School Bus Charges", Number(fee.schoolBusCharges || 0)],
    ["Computer Fee", Number(fee.computerFee || 0)],
    ["Smart Class Fee", Number(fee.smartClassFee || 0)],
    ["Sports Fee", Number(fee.sportsFee || 0)],
    ["PTM Fine", Number(fee.ptmFine || 0)],
    ["Late Fee", Number(fee.lateFee || 0)],
    ["Annual Charges", Number(fee.annualCharges || 0)],
    ["Other Charges", Number(fee.otherCharges || 0)],
    ["Previous Session Dues", Number(fee.previousSessionDues || 0)],
  ];
  const activeHeads = heads.filter(([, v]) => v > 0);
  let headIdx = 0;
  const breakdownRows = activeHeads
    .map(([name, val]) => {
      headIdx++;
      return `<tr><td class="sn">${headIdx}</td><td>${name}</td><td class="amt">₹ ${fmt(val)}</td></tr>`;
    })
    .join("");

  // Add previous arrears row if > 0
  const arrearsRow = previousArrears > 0
    ? `<tr class="arrears-row"><td class="sn">${headIdx + 1}</td><td>Previous Month(s) Arrears</td><td class="amt">₹ ${fmt(previousArrears)}</td></tr>`
    : "";

  // ─── Full session statement (admission month to current month) ───
  const statementRows = sortedAllFees.map((h, i) => {
    const total = Number(h.total || 0);
    const paid = h.payments?.reduce((s: number, p: any) => s + (Number(p.amountPaid) || 0), 0) ?? 0;
    const bal = Math.max(0, Math.round((total - paid) * 100) / 100);
    const isCurrent = h.month === fee.month;
    const statusLabel = h.status === "PAID" ? "Paid" : h.status === "PARTIALLY_PAID" ? "Partial" : "Due";
    const statusClass = h.status === "PAID" ? "st-paid" : h.status === "PARTIALLY_PAID" ? "st-partial" : "st-due";
    return `<tr class="${isCurrent ? 'current-month' : ''}">
      <td class="sn">${i + 1}</td>
      <td class="month-name">${formatMonthWithYear(h.month)}</td>
      <td class="amt">₹ ${fmt(total)}</td>
      <td class="amt paid">₹ ${fmt(paid)}</td>
      <td class="amt ${bal > 0 ? 'due' : 'paid'}">₹ ${fmt(bal)}</td>
      <td class="status-cell"><span class="status-badge ${statusClass}">${statusLabel}</span></td>
    </tr>`;
  }).join("");

  // ─── Session totals ───
  const totalBilling = sortedAllFees.reduce((s, h) => s + Number(h.total || 0), 0);
  const totalPaid = sortedAllFees.reduce((s, h) => s + (h.payments?.reduce((ps: number, p: any) => ps + (Number(p.amountPaid) || 0), 0) ?? 0), 0);
  const totalDues = Math.max(0, Math.round((totalBilling - totalPaid) * 100) / 100);

  // ─── Open new window for print ───
  const printWin = window.open("", "_blank", "width=820,height=1100,scrollbars=yes");
  if (!printWin) {
    alert("Please allow pop-ups to print the receipt.");
    return;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fee Receipt — ${student.name} — ${formatMonthWithYear(fee.month)}</title>
<style>
  @page { size: A4; margin: 12mm 14mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #1a1a2e;
    font-size: 11px;
    line-height: 1.5;
    background: #fff;
    padding: 16px 20px;
  }

  /* ━━━ HEADER ━━━ */
  .receipt-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 3px solid #0d6b3e;
    margin-bottom: 12px;
  }
  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .school-logo {
    width: 52px; height: 52px;
    border-radius: 8px;
    object-fit: contain;
    border: 1.5px solid #bbf0d0;
    background: #f0fdf4;
    padding: 3px;
  }
  .school-info h1 {
    font-size: 16px;
    font-weight: 800;
    color: #0d6b3e;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 1px;
  }
  .school-info .tagline {
    font-size: 8.5px;
    color: #047857;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .school-info .address {
    font-size: 8px;
    color: #64748b;
    margin-top: 1px;
  }
  .receipt-badge {
    text-align: right;
  }
  .receipt-badge h2 {
    font-size: 18px;
    font-weight: 900;
    color: #0d6b3e;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 2px solid #0d6b3e;
    padding: 3px 14px;
    border-radius: 4px;
    display: inline-block;
  }
  .receipt-meta {
    font-size: 8.5px;
    color: #475569;
    margin-top: 4px;
    line-height: 1.65;
    text-align: right;
  }
  .receipt-meta strong { color: #0f172a; }

  /* ━━━ STUDENT INFO GRID ━━━ */
  .student-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 12px;
  }
  .info-panel {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 8px 10px;
    background: #fafffe;
  }
  .info-panel .panel-title {
    font-size: 8px;
    font-weight: 800;
    text-transform: uppercase;
    color: #0d6b3e;
    letter-spacing: 0.6px;
    border-bottom: 1px solid #d1fae5;
    padding-bottom: 3px;
    margin-bottom: 5px;
  }
  .info-panel .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1.5px 0;
  }
  .info-panel .lbl { color: #64748b; font-weight: 500; font-size: 9.5px; }
  .info-panel .val { font-weight: 700; color: #0f172a; font-size: 9.5px; }

  /* ━━━ SECTION TITLES ━━━ */
  .section-title {
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    color: #0d6b3e;
    letter-spacing: 0.5px;
    background: #ecfdf5;
    border-left: 3px solid #0d6b3e;
    padding: 4px 8px;
    margin: 10px 0 5px;
  }

  /* ━━━ TABLES ━━━ */
  table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  th {
    background: #0d6b3e;
    color: #fff;
    font-size: 8px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    padding: 5px 8px;
    text-align: left;
  }
  th.amt, td.amt { text-align: right; }
  th.sn, td.sn { text-align: center; width: 28px; }
  th.status-cell, td.status-cell { text-align: center; }
  td {
    padding: 4px 8px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 9.5px;
  }
  .month-name { font-weight: 600; }
  tr.current-month td {
    background: #f0fdf4;
    font-weight: 700;
  }
  .arrears-row td {
    font-style: italic;
    color: #b45309;
  }
  .paid { color: #059669; }
  .due { color: #dc2626; }

  /* Total rows */
  .total-row td {
    background: #f1f5f9;
    font-weight: 800;
    border-top: 2px solid #0d6b3e;
    font-size: 10px;
    color: #0f172a;
    padding: 5px 8px;
  }
  .grand-total-row td {
    background: #0d6b3e;
    color: #fff;
    font-weight: 900;
    font-size: 10.5px;
    border: none;
    padding: 6px 8px;
  }

  /* Status badges */
  .status-badge {
    display: inline-block;
    padding: 1.5px 8px;
    border-radius: 10px;
    font-size: 7.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }
  .st-paid { background: #dcfce7; color: #166534; }
  .st-partial { background: #fef3c7; color: #92400e; }
  .st-due { background: #fee2e2; color: #991b1b; }

  /* ━━━ AMOUNT IN WORDS ━━━ */
  .words-bar {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 4px;
    padding: 5px 8px;
    font-size: 9px;
    color: #064e3b;
    margin: 6px 0 10px;
  }
  .words-bar strong { color: #0d6b3e; }

  /* ━━━ SUMMARY HIGHLIGHT BAR ━━━ */
  .highlight-bar {
    display: flex;
    justify-content: space-around;
    background: #064e3b;
    color: #fff;
    border-radius: 6px;
    padding: 7px 10px;
    margin: 8px 0;
  }
  .highlight-item { text-align: center; }
  .highlight-item .hl { font-size: 7.5px; text-transform: uppercase; font-weight: 700; color: #a7f3d0; letter-spacing: 0.4px; }
  .highlight-item .hv { font-size: 11px; font-weight: 900; margin-top: 1px; }

  /* ━━━ FOOTER ━━━ */
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 14px;
    padding-top: 8px;
    border-top: 1px dashed #94a3b8;
  }
  .terms {
    font-size: 7.5px;
    color: #64748b;
    max-width: 300px;
    line-height: 1.5;
  }
  .terms strong { color: #334155; }
  .sig-block {
    display: flex;
    gap: 30px;
  }
  .sig-box {
    text-align: center;
    width: 110px;
    margin-top: 20px;
  }
  .sig-line { border-top: 1px solid #94a3b8; margin-bottom: 3px; }
  .sig-label { font-size: 8px; font-weight: 700; color: #0f172a; }
  .sig-sub { font-size: 7px; color: #64748b; }

  /* ━━━ PRINT CONTROLS ━━━ */
  .no-print { text-align: center; padding: 12px; }
  .print-btn {
    background: #0d6b3e; color: #fff; border: none;
    padding: 10px 32px; border-radius: 6px;
    font-size: 13px; font-weight: 700;
    cursor: pointer; letter-spacing: 0.3px;
  }
  .print-btn:hover { background: #065f46; }
  @media print {
    .no-print { display: none !important; }
    body { padding: 0; }
  }
</style>
</head>
<body>

<!-- ═══ PRINT BUTTON ═══ -->
<div class="no-print">
  <button class="print-btn" onclick="window.print()">🖨️ Print Receipt</button>
</div>

<!-- ═══ HEADER ═══ -->
<div class="receipt-header">
  <div class="header-left">
    <img class="school-logo" src="${origin}/school_logo.png" alt="Logo" onerror="this.style.display='none'">
    <div class="school-info">
      <h1>Green View Public School</h1>
      <div class="tagline">Affiliated School — Nagrota Bagwan, H.P.</div>
      <div class="address">Lower Hatwas, Nagrota Bagwan, Himachal Pradesh – 176047 | Ph: +91 98051 69647</div>
    </div>
  </div>
  <div class="receipt-badge">
    <h2>Fee Receipt</h2>
    <div class="receipt-meta">
      Receipt No: <strong>${receiptNo}</strong><br>
      Date: <strong>${today}</strong><br>
      Billing Month: <strong>${formatMonthWithYear(fee.month) || "—"}</strong><br>
      Session: <strong>2025–2026</strong>
    </div>
  </div>
</div>

<!-- ═══ STUDENT DETAILS ═══ -->
<div class="student-grid">
  <div class="info-panel">
    <div class="panel-title">Student Details</div>
    <div class="row"><span class="lbl">Student Name</span><span class="val">${student.name}</span></div>
    <div class="row"><span class="lbl">Father's Name</span><span class="val">${fatherName}</span></div>
    <div class="row"><span class="lbl">Class</span><span class="val">${studentClassName}</span></div>
    <div class="row"><span class="lbl">Roll / Card No.</span><span class="val" style="font-family:monospace;color:#0d6b3e">${cardNo}</span></div>
    <div class="row"><span class="lbl">Contact</span><span class="val">${contactNo}</span></div>
  </div>
  <div class="info-panel">
    <div class="panel-title">Receipt Summary</div>
    <div class="row"><span class="lbl">Current Month Charges</span><span class="val">₹ ${fmt(currentMonthTotal)}</span></div>
    <div class="row"><span class="lbl">Previous Arrears</span><span class="val" style="color:${previousArrears > 0 ? '#dc2626' : '#059669'}">₹ ${fmt(previousArrears)}</span></div>
    <div class="row"><span class="lbl">Grand Total</span><span class="val" style="color:#0d6b3e;font-size:10.5px">₹ ${fmt(grandTotal)}</span></div>
    <div class="row"><span class="lbl">Amount Paid (This Month)</span><span class="val paid">₹ ${fmt(currentMonthPaid)}</span></div>
    <div class="row"><span class="lbl">Balance Due (This Month)</span><span class="val" style="color:${currentMonthDue > 0 ? '#dc2626' : '#059669'};font-size:10.5px">₹ ${fmt(currentMonthDue)}</span></div>
    <div class="row"><span class="lbl">Payment Status</span><span class="val" style="color:${fee.status === "PAID" ? "#059669" : "#dc2626"}">${(fee.status || "PENDING").replace("_", " ")}</span></div>
  </div>
</div>

<!-- ═══ CURRENT MONTH BREAKDOWN ═══ -->
<div class="section-title">Current Month Fee Breakdown — ${formatMonthWithYear(fee.month) || ""}</div>
<table>
  <thead>
    <tr>
      <th class="sn">S.No</th>
      <th>Fee Head</th>
      <th class="amt">Amount (₹)</th>
    </tr>
  </thead>
  <tbody>
    ${breakdownRows || '<tr><td class="sn">—</td><td>No charges for this period</td><td class="amt">—</td></tr>'}
    ${arrearsRow}
    <tr class="total-row">
      <td class="sn"></td>
      <td>Month Total (Excluding Arrears)</td>
      <td class="amt">₹ ${fmt(currentMonthTotal)}</td>
    </tr>
    <tr class="grand-total-row">
      <td class="sn"></td>
      <td>Grand Total (Including Arrears)</td>
      <td class="amt">₹ ${fmt(grandTotal)}</td>
    </tr>
  </tbody>
</table>

<!-- ═══ AMOUNT IN WORDS ═══ -->
<div class="words-bar">
  <strong>Amount in Words:</strong> ${numWords(grandTotal)}
</div>

<!-- ═══ HIGHLIGHT BAR ═══ -->
<div class="highlight-bar">
  <div class="highlight-item">
    <div class="hl">Month Billing</div>
    <div class="hv">₹ ${fmt(currentMonthTotal)}</div>
  </div>
  <div class="highlight-item">
    <div class="hl">Arrears</div>
    <div class="hv" style="color:${previousArrears > 0 ? '#fca5a5' : '#6ee7b7'}">₹ ${fmt(previousArrears)}</div>
  </div>
  <div class="highlight-item">
    <div class="hl">This Month Paid</div>
    <div class="hv" style="color:#6ee7b7">₹ ${fmt(currentMonthPaid)}</div>
  </div>
  <div class="highlight-item">
    <div class="hl">Session Total Dues</div>
    <div class="hv" style="color:${totalDues > 0 ? '#fca5a5' : '#6ee7b7'}">₹ ${fmt(totalDues)}</div>
  </div>
</div>

<!-- ═══ SESSION STATEMENT (Admission → Current Month) ═══ -->
<div class="section-title">Full Academic Session Statement (${sortedAllFees.length > 0 ? sortedAllFees[0].month : "—"} to ${sortedAllFees.length > 0 ? sortedAllFees[sortedAllFees.length - 1].month : "—"})</div>
<table>
  <thead>
    <tr>
      <th class="sn">#</th>
      <th>Billing Month</th>
      <th class="amt">Total</th>
      <th class="amt">Paid</th>
      <th class="amt">Balance</th>
      <th class="status-cell">Status</th>
    </tr>
  </thead>
  <tbody>
    ${statementRows}
    <tr class="total-row">
      <td class="sn"></td>
      <td>Session Total</td>
      <td class="amt">₹ ${fmt(totalBilling)}</td>
      <td class="amt paid">₹ ${fmt(totalPaid)}</td>
      <td class="amt ${totalDues > 0 ? 'due' : 'paid'}">₹ ${fmt(totalDues)}</td>
      <td></td>
    </tr>
  </tbody>
</table>

<!-- ═══ FOOTER ═══ -->
<div class="footer">
  <div class="terms">
    <strong>Terms & Conditions:</strong><br>
    1. This is a computer-generated receipt of Green View Public School.<br>
    2. Fees once paid are non-refundable under any circumstances.<br>
    3. Late fee will be applicable after the due date as per school policy.<br>
    4. For any discrepancy, contact the school accounts counter within 7 days.
  </div>
  <div class="sig-block">
    <div class="sig-box">
      <div class="sig-line"></div>
      <div class="sig-label">Parent / Guardian</div>
    </div>
    <div class="sig-box">
      <div class="sig-line"></div>
      <div class="sig-label">Accounts Cashier</div>
      <div class="sig-sub">Green View Public School</div>
    </div>
  </div>
</div>

</body>
</html>`;

  printWin.document.open();
  printWin.document.write(html);
  printWin.document.close();

  // Wait for content to render, then auto-trigger print
  printWin.onload = () => {
    setTimeout(() => {
      printWin.focus();
      printWin.print();
    }, 300);
  };

  // Fallback if onload doesn't fire (some browsers)
  setTimeout(() => {
    try {
      printWin.focus();
      printWin.print();
    } catch (_) { /* window may have been closed */ }
  }, 800);
}
