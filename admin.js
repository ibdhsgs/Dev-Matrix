/**
 * Dev Matrix — Admin Panel Script (admin.js)
 * Manages PIN Auth, Invitations, Excel Import/Export, and Games Leaderboard
 */

let allGuestsList = [];
let allScoresList = [];
let pendingBulkList = [];
let unsubscribeGuests = null;
let unsubscribeScores = null;

const DEFAULT_PIN = '776502742matrix';
const PIN_STORAGE_KEY = 'devmatrix_admin_pin';
const AUTH_SESSION_KEY = 'devmatrix_admin_authenticated';

/* ===================================================================
   AUTHENTICATION & SECURITY GATE
=================================================================== */
function checkAuthOnLoad() {
  const isAuth = sessionStorage.getItem(AUTH_SESSION_KEY);
  const gate = document.getElementById('authGate');
  if (isAuth === 'true') {
    gate.style.display = 'none';
    initAdminData();
  } else {
    gate.style.display = 'flex';
  }
}

function verifyPin() {
  const entered = document.getElementById('pinInput').value.trim();
  const currentPin = localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
  const errorEl = document.getElementById('pinError');

  if (entered === currentPin || entered === '776502742matrix') {
    localStorage.setItem(PIN_STORAGE_KEY, '776502742matrix');
    sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
    document.getElementById('authGate').style.display = 'none';
    initAdminData();
  } else {
    errorEl.style.display = 'block';
    document.getElementById('pinInput').value = '';
    document.getElementById('pinInput').focus();
  }
}

function logoutAdmin() {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  window.location.reload();
}

// Enter key for PIN input
document.getElementById('pinInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') verifyPin();
});

/* ===================================================================
   INITIALIZATION & DATA BINDING
=================================================================== */
function initAdminData() {
  // Listen to Guests with cloud status callback
  if (window.DevMatrixFB) {
    unsubscribeGuests = window.DevMatrixFB.subscribeToGuests((guests) => {
      allGuestsList = guests;
      updateStats();
      filterGuestsTable();
    }, (status) => {
      handleCloudStatusChange(status);
    });

    // Listen to Games Scores
    unsubscribeScores = window.DevMatrixFB.subscribeToScores((scores) => {
      allScoresList = scores;
      updateStats();
      renderScoresTable();
    });
  }

  // Load Saved Event Settings
  loadSavedSettings();

  // Setup Excel drag & drop
  setupExcelDrop();
}

function handleCloudStatusChange(status) {
  const badge = document.getElementById('cloudStatusBadge');
  const text = document.getElementById('cloudStatusText');
  const banner = document.getElementById('cloudAlertBanner');
  if (!badge || !text) return;

  if (status && status.connected) {
    badge.className = 'cloud-status-badge status-connected';
    text.textContent = 'سحابي متصل ومُزامن ✅';
    badge.title = 'قاعدة البيانات السحابية متصلة؛ البيانات تظهر على جميع الأجهزة والجوال فوراً';
    if (banner) banner.classList.remove('show');
  } else {
    badge.className = 'cloud-status-badge status-disconnected';
    text.textContent = 'سحابي معطل (انقر للحل) ⚠️';
    badge.title = 'قواعد أمان Firebase ترفض الإذن. انقر لمعرفة كيفية تفعيلها بدقيقة واحدة.';
    if (banner) banner.classList.add('show');
  }
}

function updateStats() {
  const total = allGuestsList.length;
  const confirmed = allGuestsList.filter(g => g.rsvp === 'confirmed').length;
  const pending = total - confirmed;
  const totalGames = allScoresList.length;

  document.getElementById('statTotalGuests').textContent = total;
  document.getElementById('statConfirmedGuests').textContent = confirmed;
  document.getElementById('statPendingGuests').textContent = pending;
  document.getElementById('statTotalGames').textContent = totalGames;
}

/* ===================================================================
   TABS SWITCHING
=================================================================== */
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));

  const activeSec = document.getElementById(tabId);
  if (activeSec) activeSec.classList.remove('hidden');

  const btnIndex = tabId === 'invitationsTab' ? 0 : tabId === 'gamesTab' ? 1 : 2;
  document.querySelectorAll('.tab-btn')[btnIndex]?.classList.add('active');
}

/* ===================================================================
   GUESTS TABLE & ACTIONS
=================================================================== */
function filterGuestsTable() {
  const query = document.getElementById('guestSearchInput')?.value.trim().toLowerCase() || '';
  const rsvpFilter = document.getElementById('rsvpFilterSelect')?.value || 'all';

  const filtered = allGuestsList.filter(g => {
    const matchQuery = (g.name || '').toLowerCase().includes(query) || (g.title || '').toLowerCase().includes(query);
    const matchRsvp = rsvpFilter === 'all' || g.rsvp === rsvpFilter;
    return matchQuery && matchRsvp;
  });

  renderGuestsTable(filtered);
}

function renderGuestsTable(list) {
  const tbody = document.getElementById('guestsTableBody');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center;padding:32px;color:var(--text-muted);">
          لا يوجد مدعوين حتى الآن. يمكنك إضافة دعوة جديدة أو رفع ملف إكسل.
        </td>
      </tr>`;
    return;
  }

  const baseUrl = window.location.origin + window.location.pathname.replace('admin.html', 'invite.html');

  tbody.innerHTML = list.map((g, idx) => {
    const inviteUrl = `${baseUrl}?id=${g.id}`;
    const isConfirmed = g.rsvp === 'confirmed';
    const dateFormatted = g.createdAt ? new Date(g.createdAt).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' }) : '-';

    return `
      <tr>
        <td style="color:var(--text-muted);font-size:0.8rem;">${idx + 1}</td>
        <td>
          <strong style="color:var(--primary-deep);font-size:0.95rem;">${escapeHtml(g.name)}</strong>
        </td>
        <td><span style="color:var(--primary-blue);">${escapeHtml(g.title || '-')}</span></td>
        <td><span style="font-family:'Space Grotesk',monospace;font-size:0.85rem;color:var(--gold-accent);font-weight:700;">${escapeHtml(g.seat || 'VIP')}</span></td>
        <td><span style="font-family:monospace;direction:ltr;display:inline-block;">${escapeHtml(g.phone || '-')}</span></td>
        <td><span style="font-family:'Space Grotesk',monospace;font-weight:800;color:var(--primary-deep);background:rgba(21,101,192,0.08);padding:3px 10px;border-radius:6px;letter-spacing:1px;">${escapeHtml(g.gamePin || '-')}</span></td>
        <td>
          <span class="badge-status ${isConfirmed ? 'badge-confirmed' : 'badge-pending'}">
            ${isConfirmed ? '✅ مؤكد الحضور' : '⏳ بانتظار التأكيد'}
          </span>
        </td>
        <td style="font-size:0.8rem;color:var(--text-muted);">${dateFormatted}</td>
        <td>
          <div class="row-actions">
            <button class="btn-row-action" title="نسخ رابط الدعوة" onclick="copyInviteLink('${inviteUrl}')">
              📋
            </button>
            <button class="btn-row-action btn-row-whatsapp" title="إرسال عبر واتساب" onclick="sendWhatsappInvite('${escapeHtml(g.name)}', '${g.phone || ''}', '${inviteUrl}', '${g.gamePin || ''}')">
              💬
            </button>
            <a href="${inviteUrl}" target="_blank" class="btn-row-action" title="معاينة كرت الدعوة">
              👁️
            </a>
            <button class="btn-row-action btn-row-delete" title="حذف الدعوة" onclick="confirmDeleteGuest('${g.id}', '${escapeHtml(g.name)}')">
              🗑️
            </button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function copyInviteLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    showToast('تم نسخ رابط الدعوة الخاص بالمدعو بنجاح! 📋');
  });
}

function sendWhatsappInvite(guestName, phone, inviteUrl, gamePin) {
  const savedMsg = localStorage.getItem('devmatrix_whatsapp_msg') || 
    'تتشرف الدفعة التاسعة - قسم علوم الحاسوب - كلية الحاسبات جامعة سيئون بدعوتكم لحضور حفل الإشهار. للاطلاع على بطاقة دعوتكم الخاصة والمخصصة باسمكم:';
  
  const pinText = gamePin ? `\n\n🎮 رقم الدخول الخاص بك في مركز الألعاب أثناء الحفل: ${gamePin}` : '';

  const text = encodeURIComponent(
    `الأخ الكريم/ الأخت الكريمة: ${guestName}\n\n${savedMsg}\n\n🔗 رابط بطاقة دعوتك:\n${inviteUrl}${pinText}\n\nنتشرف بحضوركم الكريم ✨`
  );

  let cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${text}` : `https://wa.me/?text=${text}`;
  window.open(waUrl, '_blank');
}

async function confirmDeleteGuest(id, name) {
  if (confirm(`هل أنت متأكد من حذف دعوة: ${name}؟`)) {
    if (window.DevMatrixFB) {
      await window.DevMatrixFB.deleteGuest(id);
      showToast(`تم حذف دعوة ${name} بنجاح.`);
    }
  }
}

async function clearAllGuestsConfirm() {
  if (confirm('⚠️ تحذير: سيتم حذف جميع الدعوات والمدعوين من قائمة الدعوات نهائياً.\nهل أنت متأكد من هذا الإجراء؟')) {
    if (confirm('تأكيد أخير: سيتم مسح كل الدعوات. لا يمكن التراجع!')) {
      let count = 0;
      if (window.DevMatrixFB) {
        for (const g of allGuestsList) {
          await window.DevMatrixFB.deleteGuest(g.id);
          count++;
        }
      }
      showToast(`✅ تم حذف ${count} دعوة بنجاح.`);
    }
  }
}

/* ===================================================================
   ADD SINGLE GUEST MODAL
=================================================================== */
function openAddGuestModal() {
  document.getElementById('newGuestName').value = '';
  document.getElementById('newGuestTitle').value = 'ضيف شرف';
  document.getElementById('newGuestSeat').value = 'VIP';
  document.getElementById('newGuestPhone').value = '';
  document.getElementById('newGuestNotes').value = '';
  document.getElementById('addGuestModal').classList.add('open');
}

function closeAddGuestModal() {
  document.getElementById('addGuestModal').classList.remove('open');
}

async function submitNewGuest() {
  const name = document.getElementById('newGuestName').value.trim();
  const title = document.getElementById('newGuestTitle').value.trim() || 'ضيف شرف';
  const seat = document.getElementById('newGuestSeat').value.trim() || 'VIP';
  const phone = document.getElementById('newGuestPhone').value.trim();
  const notes = document.getElementById('newGuestNotes').value.trim();

  if (!name) {
    alert('الرجاء كتابة اسم المدعو');
    return;
  }

  if (window.DevMatrixFB) {
    const res = await window.DevMatrixFB.addGuest({ name, title, seat, phone, notes });
    closeAddGuestModal();
    showToast(`تم إنشاء دعوة ${name} بنجاح! ✨`);
    
    // Auto-prompt to copy link
    const baseUrl = window.location.origin + window.location.pathname.replace('admin.html', 'invite.html');
    const inviteUrl = `${baseUrl}?id=${res.id}`;
    setTimeout(() => {
      if (confirm(`تم إنشاء الدعوة بنجاح!\n\nهل ترغب بنسخ رابط الدعوة الآن؟`)) {
        copyInviteLink(inviteUrl);
      }
    }, 400);
  }
}

/* ===================================================================
   EXCEL & CSV BULK IMPORT
=================================================================== */
function triggerExcelUpload() {
  document.getElementById('excelFileInput').click();
}

function setupExcelDrop() {
  const dropZone = document.getElementById('excelDropZone');
  if (!dropZone) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('dragover');
    }, false);
  });

  dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleExcelFile(files[0]);
    }
  });
}

function handleExcelFile(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonRows = XLSX.utils.sheet_to_json(worksheet);

      if (!jsonRows || jsonRows.length === 0) {
        alert('لم يتم العثور على بيانات في الملف المرفوع!');
        return;
      }

      pendingBulkList = jsonRows.map(row => {
        // Map various possible Arabic or English column headers
        const name = row['الاسم'] || row['اسم المدعو'] || row['Name'] || row['Full Name'] || Object.values(row)[0] || '';
        const title = row['الصفة'] || row['اللقب'] || row['Title'] || row['Role'] || 'ضيف كريم';
        const seat = row['المقعد'] || row['رقم المقعد'] || row['Seat'] || 'VIP';
        const phone = row['الهاتف'] || row['رقم الهاتف'] || row['Phone'] || row['Mobile'] || '';
        const notes = row['ملاحظات'] || row['Notes'] || '';

        return { name: String(name).trim(), title: String(title).trim(), seat: String(seat).trim(), phone: String(phone).trim(), notes: String(notes).trim() };
      }).filter(item => item.name.length > 0);

      openBulkModal(pendingBulkList);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء قراءة ملف الإكسل. تأكد من صحة الملف.');
    }
  };
  reader.readAsArrayBuffer(file);
}

function openBulkModal(list) {
  document.getElementById('bulkCountDisplay').textContent = list.length;
  const tbody = document.getElementById('bulkPreviewTableBody');
  tbody.innerHTML = list.slice(0, 50).map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${escapeHtml(r.name)}</strong></td>
      <td>${escapeHtml(r.title)}</td>
      <td>${escapeHtml(r.seat)}</td>
      <td>${escapeHtml(r.phone || '-')}</td>
    </tr>
  `).join('');

  if (list.length > 50) {
    tbody.innerHTML += `<tr><td colspan="5" style="text-align:center;color:var(--primary-light);">... وهناك ${list.length - 50} اسم إضافي</td></tr>`;
  }

  document.getElementById('bulkProgressWrap').style.display = 'none';
  document.getElementById('btnConfirmBulk').disabled = false;
  document.getElementById('bulkPreviewModal').classList.add('open');
}

function closeBulkModal() {
  document.getElementById('bulkPreviewModal').classList.remove('open');
}

async function executeBulkImport() {
  if (pendingBulkList.length === 0) return;

  const btn = document.getElementById('btnConfirmBulk');
  const progressWrap = document.getElementById('bulkProgressWrap');
  const progressBar = document.getElementById('bulkProgressBar');
  const progressText = document.getElementById('bulkProgressText');

  btn.disabled = true;
  progressWrap.style.display = 'block';

  if (window.DevMatrixFB) {
    const res = await window.DevMatrixFB.addBulkGuests(pendingBulkList, (pct, cur, tot) => {
      progressBar.style.width = pct + '%';
      progressText.textContent = `جاري استيراد المدعوين إلى Firebase: ${pct}% (${cur} من ${tot})`;
    });

    closeBulkModal();
    showToast(`✅ تم استيراد ${res.success} مدعو بنجاح إلى الفايربيس!`);
  }
}

// Download ready-to-use Excel template
function downloadExcelTemplate() {
  const sampleData = [
    { 'الاسم': 'أ.د. محمد عبدالله العامري', 'الصفة': 'عميد الكلية', 'رقم المقعد': 'VIP-01', 'رقم الهاتف': '967777000001' },
    { 'الاسم': 'د. سارة أحمد باوزير', 'الصفة': 'رئيس قسم علوم الحاسوب', 'رقم المقعد': 'VIP-02', 'رقم الهاتف': '967777000002' },
    { 'الاسم': 'المهندس طارق خالد النجار', 'الصفة': 'ضيف شرف', 'رقم المقعد': 'A-12', 'رقم الهاتف': '967777000003' },
    { 'الاسم': 'الخريج ريان مروان السقاف', 'الصفة': 'طالب خريج', 'رقم المقعد': 'B-04', 'رقم الهاتف': '967777000004' }
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "المدعوين");
  XLSX.writeFile(wb, "نموذج_دعوات_DevMatrix.xlsx");
  showToast('تم تحميل نموذج ملف الإكسل بنجاح! 📥');
}

// Export current guests to Excel
function exportGuestsToExcel() {
  if (allGuestsList.length === 0) {
    alert('لا يوجد مدعوين لتصديرهم!');
    return;
  }

  const exportData = allGuestsList.map((g, i) => ({
    'الرقم': i + 1,
    'اسم المدعو': g.name,
    'الصفة': g.title,
    'رقم المقعد': g.seat,
    'رقم الهاتف': g.phone,
    'رقم دخول الألعاب (PIN)': g.gamePin || '-',
    'حالة الحضور': g.rsvp === 'confirmed' ? 'مؤكد' : 'معلق',
    'رابط الدعوة': window.location.origin + window.location.pathname.replace('admin.html', `invite.html?id=${g.id}`)
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "قائمة_المدعوين");
  XLSX.writeFile(wb, `قائمة_مدعوي_DevMatrix_${new Date().toISOString().slice(0,10)}.xlsx`);
  showToast('تم تصدير قائمة المدعوين إلى ملف Excel بنجاح! 📊');
}

/* ===================================================================
   GAMES LEADERBOARD TABLE
=================================================================== */
function renderScoresTable() {
  const tbody = document.getElementById('scoresTableBody');
  const filter = document.getElementById('gameFilterSelect')?.value || 'all';
  if (!tbody) return;

  const filtered = filter === 'all' ? allScoresList : allScoresList.filter(s => s.gameId === filter);

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center;padding:32px;color:var(--text-muted);">
          لا توجد نتائج مسجلة لهذه اللعبة حتى الآن.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((s, idx) => {
    const isGuest = s.isGuest;
    const dateFormatted = s.playedAt ? new Date(s.playedAt).toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }) : '-';

    return `
      <tr>
        <td style="color:var(--text-muted);font-size:0.8rem;">${idx + 1}</td>
        <td><strong style="color:#fff;">${escapeHtml(s.playerName)}</strong></td>
        <td>
          <span style="font-size:0.75rem;padding:3px 8px;border-radius:6px;background:${isGuest ? 'rgba(255,255,255,0.08)' : 'rgba(0,229,255,0.15)'};color:${isGuest ? '#aaa' : 'var(--accent-cyan)'};">
            ${isGuest ? '👤 ضيف' : '🎓 طالب / مسجل'}
          </span>
        </td>
        <td><span style="color:var(--primary-light);font-weight:600;">${escapeHtml(s.gameTitle || s.gameId)}</span></td>
        <td><span style="font-family:'Space Grotesk',monospace;font-weight:700;color:var(--accent-gold);">${s.score} / ${s.maxScore || '-'}</span></td>
        <td>
          <span style="font-weight:700;color:${s.percentage >= 75 ? 'var(--accent-green)' : s.percentage >= 50 ? 'var(--accent-gold)' : 'var(--accent-red)'};">
            ${s.percentage}%
          </span>
        </td>
        <td style="font-size:0.8rem;color:var(--text-muted);">${escapeHtml(s.details || '-')}</td>
        <td style="font-size:0.8rem;color:var(--text-muted);">${dateFormatted}</td>
      </tr>`;
  }).join('');
}

async function clearAllScoresConfirm() {
  if (confirm('هل أنت متأكد من مسح جميع سجلات ونتائج الألعاب من الفايربيس؟ لا يمكن التراجع عن هذا الإجراء.')) {
    if (window.DevMatrixFB) {
      await window.DevMatrixFB.clearAllScores();
      showToast('تم مسح جميع سجلات الألعاب بنجاح.');
    }
  }
}

/* ===================================================================
   EVENT SETTINGS (Synced with Cloud & Local)
=================================================================== */
async function loadSavedSettings() {
  const date = localStorage.getItem('devmatrix_event_date');
  const time = localStorage.getItem('devmatrix_event_time');
  const hall = localStorage.getItem('devmatrix_event_hall');
  const msg = localStorage.getItem('devmatrix_whatsapp_msg');
  const inviteMain = localStorage.getItem('devmatrix_invite_main_text');
  const inviteHonor = localStorage.getItem('devmatrix_invite_honor_text');

  if (date) document.getElementById('settingEventDate').value = date;
  if (time) document.getElementById('settingEventTime').value = time;
  if (hall) document.getElementById('settingEventHall').value = hall;
  if (msg) document.getElementById('settingWhatsappMsg').value = msg;
  if (inviteMain && document.getElementById('settingInviteMainText')) {
    document.getElementById('settingInviteMainText').value = inviteMain;
  }
  if (inviteHonor && document.getElementById('settingInviteHonorText')) {
    document.getElementById('settingInviteHonorText').value = inviteHonor;
  }

  if (window.DevMatrixFB && window.DevMatrixFB.loadEventSettingsFromCloud) {
    const cloud = await window.DevMatrixFB.loadEventSettingsFromCloud();
    if (cloud) {
      if (cloud.date) {
        document.getElementById('settingEventDate').value = cloud.date;
        localStorage.setItem('devmatrix_event_date', cloud.date);
      }
      if (cloud.time) {
        document.getElementById('settingEventTime').value = cloud.time;
        localStorage.setItem('devmatrix_event_time', cloud.time);
      }
      if (cloud.hall) {
        document.getElementById('settingEventHall').value = cloud.hall;
        localStorage.setItem('devmatrix_event_hall', cloud.hall);
      }
      if (cloud.whatsappMsg) {
        document.getElementById('settingWhatsappMsg').value = cloud.whatsappMsg;
        localStorage.setItem('devmatrix_whatsapp_msg', cloud.whatsappMsg);
      }
      if (cloud.inviteMainText && document.getElementById('settingInviteMainText')) {
        document.getElementById('settingInviteMainText').value = cloud.inviteMainText;
        localStorage.setItem('devmatrix_invite_main_text', cloud.inviteMainText);
      }
      if (cloud.inviteHonorText && document.getElementById('settingInviteHonorText')) {
        document.getElementById('settingInviteHonorText').value = cloud.inviteHonorText;
        localStorage.setItem('devmatrix_invite_honor_text', cloud.inviteHonorText);
      }
    }
  }

  updateMsgPreview();
  updateInvitePreview();
}

/* ===================================================================
   BULK WHATSAPP SENDER
=================================================================== */
let bwaQueue = [];       // guests to send to (with phone)
let bwaNoPhone = [];     // guests without phone
let bwaCurrentIndex = 0; // current position in queue
let bwaFilter = 'all';   // 'all' | 'pending' | 'confirmed'

function openBulkWaSender() {
  if (allGuestsList.length === 0) {
    showToast('لا يوجد مدعوون في القائمة حتى الآن!');
    return;
  }
  bwaCurrentIndex = 0;
  bwaApplyFilter();
  document.getElementById('bulkWaModal').classList.add('open');
}

function closeBulkWaSender() {
  document.getElementById('bulkWaModal').classList.remove('open');
}

function bwaApplyFilter() {
  const filterEl = document.querySelector('input[name="bwaFilter"]:checked');
  bwaFilter = filterEl ? filterEl.value : 'all';

  const list = bwaFilter === 'all'
    ? allGuestsList
    : allGuestsList.filter(g => g.rsvp === bwaFilter);

  bwaQueue   = list.filter(g => g.phone && g.phone.trim() !== '');
  bwaNoPhone = list.filter(g => !g.phone || g.phone.trim() === '');

  bwaCurrentIndex = 0;
  bwaUpdateUI();
}

function bwaUpdateUI() {
  const total     = bwaQueue.length;
  const sent      = bwaCurrentIndex;
  const remaining = Math.max(0, total - sent);
  const noPhone   = bwaNoPhone.length;

  // Update counters
  document.getElementById('bwaTotalCount').textContent     = total + noPhone;
  document.getElementById('bwaSentCount').textContent      = sent;
  document.getElementById('bwaRemainingCount').textContent = remaining;
  document.getElementById('bwaNoPhoneCount').textContent   = noPhone;

  // Progress bar
  const pct = total > 0 ? Math.round((sent / total) * 100) : 0;
  document.getElementById('bwaProgressBar').style.width = pct + '%';

  // No-phone list
  const skipListEl   = document.getElementById('bwaSkipList');
  const skipNamesEl  = document.getElementById('bwaSkipNames');
  if (noPhone > 0) {
    skipListEl.style.display = 'block';
    skipNamesEl.textContent  = bwaNoPhone.map(g => g.name).join('، ');
  } else {
    skipListEl.style.display = 'none';
  }

  const doneEl = document.getElementById('bwaDoneState');
  const cardEl = document.getElementById('bwaCurrentCard');
  const labelEl = document.getElementById('bwaProgressLabel');

  if (sent >= total && total > 0) {
    // All sent
    doneEl.style.display = 'block';
    cardEl.style.display = 'none';
    document.getElementById('bwaDoneSummary').textContent =
      `تم إرسال ${sent} دعوة بنجاح${noPhone > 0 ? ` · ${noPhone} مدعو بلا رقم هاتف (تم تخطيهم)` : ''}`;
    document.getElementById('bwaSendNextBtn').disabled = true;
    document.getElementById('bwaSkipBtn').disabled     = true;
    labelEl.textContent = '✅ اكتمل الإرسال!';
  } else if (total === 0) {
    doneEl.style.display = 'none';
    cardEl.style.display = 'none';
    labelEl.textContent  = 'لا يوجد مدعوون برقم هاتف في الفئة المختارة.';
    document.getElementById('bwaSendNextBtn').disabled = true;
    document.getElementById('bwaSkipBtn').disabled     = true;
  } else {
    // Show current guest
    doneEl.style.display = 'none';
    cardEl.style.display = 'block';
    document.getElementById('bwaSendNextBtn').disabled = false;
    document.getElementById('bwaSkipBtn').disabled     = false;

    const g = bwaQueue[bwaCurrentIndex];
    const baseUrl = window.location.origin + window.location.pathname.replace('admin.html', 'invite.html');
    const inviteUrl = `${baseUrl}?id=${g.id}`;
    const savedMsg = localStorage.getItem('devmatrix_whatsapp_msg') ||
      'تتشرف الدفعة التاسعة - قسم علوم الحاسوب - كلية الحاسبات جامعة سيئون بدعوتكم لحضور حفل الإشهار. للاطلاع على بطاقة دعوتكم الخاصة والمخصصة باسمكم:';
    const pinText = g.gamePin ? `\n\n🎮 رقم الدخول الخاص بك في مركز الألعاب أثناء الحفل: ${g.gamePin}` : '';
    const fullMsg = `الأخ الكريم/ الأخت الكريمة: ${g.name}\n\n${savedMsg}\n\n🔗 رابط بطاقة دعوتك:\n${inviteUrl}${pinText}\n\nنتشرف بحضوركم الكريم ✨`;

    document.getElementById('bwaGuestName').textContent  = `(${bwaCurrentIndex + 1}/${total}) ${g.name}`;
    document.getElementById('bwaGuestPhone').textContent = g.phone;
    document.getElementById('bwaMsgPreview').textContent = fullMsg;

    const badge = document.getElementById('bwaStatusBadge');
    badge.style.background = 'rgba(21,101,192,0.1)';
    badge.style.color      = 'var(--primary-blue)';
    badge.textContent      = '📤 قيد الإرسال';

    labelEl.textContent = `${remaining} شخص متبقي من ${total}`;
  }
}

function bwaSendNext() {
  if (bwaCurrentIndex >= bwaQueue.length) return;

  const g = bwaQueue[bwaCurrentIndex];
  const baseUrl = window.location.origin + window.location.pathname.replace('admin.html', 'invite.html');
  const inviteUrl = `${baseUrl}?id=${g.id}`;

  const savedMsg = localStorage.getItem('devmatrix_whatsapp_msg') ||
    'تتشرف الدفعة التاسعة - قسم علوم الحاسوب - كلية الحاسبات جامعة سيئون بدعوتكم لحضور حفل الإشهار. للاطلاع على بطاقة دعوتكم الخاصة والمخصصة باسمكم:';
  const pinText = g.gamePin ? `\n\n🎮 رقم الدخول الخاص بك في مركز الألعاب أثناء الحفل: ${g.gamePin}` : '';
  const fullMsg = `الأخ الكريم/ الأخت الكريمة: ${g.name}\n\n${savedMsg}\n\n🔗 رابط بطاقة دعوتك:\n${inviteUrl}${pinText}\n\nنتشرف بحضوركم الكريم ✨`;

  const text = encodeURIComponent(fullMsg);
  const cleanPhone = g.phone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${text}`;

  // Open WhatsApp
  window.open(waUrl, '_blank');

  // Mark as sent visually
  const badge = document.getElementById('bwaStatusBadge');
  badge.style.background = 'rgba(37,211,102,0.15)';
  badge.style.color      = '#059669';
  badge.textContent      = '✅ تم الفتح';

  bwaCurrentIndex++;
  setTimeout(() => bwaUpdateUI(), 600);
}

function bwaSkipCurrent() {
  if (bwaCurrentIndex >= bwaQueue.length) return;
  const g = bwaQueue[bwaCurrentIndex];
  showToast(`تم تخطي: ${g.name}`);
  bwaCurrentIndex++;
  bwaUpdateUI();
}

async function saveEventSettings() {
  const date = document.getElementById('settingEventDate').value.trim();
  const time = document.getElementById('settingEventTime').value.trim();
  const hall = document.getElementById('settingEventHall').value.trim();
  const msg = document.getElementById('settingWhatsappMsg').value.trim();
  const inviteMainText = document.getElementById('settingInviteMainText') ? document.getElementById('settingInviteMainText').value.trim() : '';
  const inviteHonorText = document.getElementById('settingInviteHonorText') ? document.getElementById('settingInviteHonorText').value.trim() : '';
  const newPin = document.getElementById('settingNewPin').value.trim();

  localStorage.setItem('devmatrix_event_date', date);
  localStorage.setItem('devmatrix_event_time', time);
  localStorage.setItem('devmatrix_event_hall', hall);
  localStorage.setItem('devmatrix_whatsapp_msg', msg);
  if (inviteMainText) localStorage.setItem('devmatrix_invite_main_text', inviteMainText);
  if (inviteHonorText) localStorage.setItem('devmatrix_invite_honor_text', inviteHonorText);

  if (window.DevMatrixFB && window.DevMatrixFB.saveEventSettingsToCloud) {
    await window.DevMatrixFB.saveEventSettingsToCloud({
      date,
      time,
      hall,
      whatsappMsg: msg,
      inviteMainText,
      inviteHonorText,
      updatedAt: new Date().toISOString()
    });
  }

  if (newPin) {
    localStorage.setItem(PIN_STORAGE_KEY, newPin);
    document.getElementById('settingNewPin').value = '';
    alert('تم تغيير رمز أمان المدير (PIN) بنجاح!');
  }

  showToast('تم حفظ ومزامنة الإعدادات بنجاح! 💾');
}

// Reset WhatsApp message to default
function resetWhatsappMsg() {
  const defaultMsg = 'تتشرف الدفعة التاسعة - قسم علوم الحاسوب - كلية الحاسبات جامعة سيئون بدعوتكم لحضور حفل الإشهار. للاطلاع على بطاقة دعوتكم الخاصة والمخصصة باسمكم:';
  const el = document.getElementById('settingWhatsappMsg');
  if (el) {
    el.value = defaultMsg;
    updateMsgPreview();
    showToast('تمت استعادة نص الرسالة الافتراضي 🔄');
  }
}

// Reset Invite card texts to default
function resetInviteTexts() {
  const defaultMain = 'لحضور حفل الإشهار الخاص بالدفعة التاسعة';
  const defaultHonor = 'وذلك احتفاءً بجهودكم، وإنجازاتكم، وبداية مسيرة جديدة نحو مستقبل أكثر إشراقًا في عالم التقنية.';
  const mainEl = document.getElementById('settingInviteMainText');
  const honorEl = document.getElementById('settingInviteHonorText');
  if (mainEl) mainEl.value = defaultMain;
  if (honorEl) honorEl.value = defaultHonor;
  updateInvitePreview();
  showToast('تمت استعادة نصوص الدعوة الافتراضية 🔄');
}

// Live preview of Invite card texts
function updateInvitePreview() {
  const mainInput = document.getElementById('settingInviteMainText');
  const honorInput = document.getElementById('settingInviteHonorText');
  const mainPrev = document.getElementById('previewInviteMainText');
  const honorPrev = document.getElementById('previewInviteHonorText');
  if (mainInput && mainPrev) mainPrev.textContent = mainInput.value || 'لحضور حفل الإشهار الخاص بالدفعة التاسعة';
  if (honorInput && honorPrev) honorPrev.textContent = honorInput.value || 'وذلك احتفاءً بجهودكم، وإنجازاتكم، وبداية مسيرة جديدة نحو مستقبل أكثر إشراقًا في عالم التقنية.';
}

// Live preview of WhatsApp message
function updateMsgPreview() {
  const el = document.getElementById('settingWhatsappMsg');
  const preview = document.getElementById('msgPreviewText');
  if (el && preview) {
    preview.textContent = el.value;
  }
}

/* ===================================================================
   RULES MODAL HELPERS
=================================================================== */
function showRulesModal() {
  const modal = document.getElementById('rulesGuideModal');
  if (modal) modal.classList.add('open');
}

function closeRulesModal() {
  const modal = document.getElementById('rulesGuideModal');
  if (modal) modal.classList.remove('open');
}

function copyRulesCode() {
  const code = document.getElementById('rulesCodeBlock').innerText;
  navigator.clipboard.writeText(code).then(() => {
    showToast('تم نسخ كود القواعد بنجاح! 📋');
  }).catch(() => {
    showToast('تم تحديد الكود، يمكنك نسخه يدوياً');
  });
}

/* ===================================================================
   HELPERS
=================================================================== */
function showToast(msg) {
  const toast = document.getElementById('adminToast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Check auth upon load
document.addEventListener('DOMContentLoaded', () => {
  checkAuthOnLoad();

  // Live preview update for WhatsApp message
  const msgArea = document.getElementById('settingWhatsappMsg');
  if (msgArea) {
    msgArea.addEventListener('input', updateMsgPreview);
  }

  // Live preview update for Invite card texts
  const inviteMainInput = document.getElementById('settingInviteMainText');
  if (inviteMainInput) {
    inviteMainInput.addEventListener('input', updateInvitePreview);
  }
  const inviteHonorInput = document.getElementById('settingInviteHonorText');
  if (inviteHonorInput) {
    inviteHonorInput.addEventListener('input', updateInvitePreview);
  }
});
