/**
 * Dev Matrix — Firebase Configuration & Firestore Services
 * Centralized Firebase connector for:
 * 1. Guests & Invitations Management
 * 2. Excel Bulk Import
 * 3. RSVP Confirmation
 * 4. Games Leaderboard & Live Scores
 */

const firebaseConfig = {
  apiKey: "AIzaSyASYzJX3QuK0TlmNnjVA4Ec3LkRwJiJ1Mc",
  authDomain: "dev-matrix-app.firebaseapp.com",
  projectId: "dev-matrix-app",
  storageBucket: "dev-matrix-app.firebasestorage.app",
  messagingSenderId: "986439631011",
  appId: "1:986439631011:web:66dfa65c1189e981be7f16",
  measurementId: "G-B0VYRH2N8F"
};

// Initialize Firebase
let firebaseApp = null;
let db = null;
let isFirebaseReady = false;

try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      firebaseApp = firebase.app();
    }
    db = firebase.firestore();
    // Enable offline persistence if possible
    db.enablePersistence({ synchronizeTabs: true }).catch(err => {
      console.warn("Firestore persistence warning (benign):", err.code);
    });
    isFirebaseReady = true;
    console.log("⚡ Dev Matrix Firebase successfully connected!");
  } else {
    console.warn("⚠️ Firebase SDK not loaded in window. Falling back to local storage.");
  }
} catch (e) {
  console.warn("⚠️ Firebase initialization notice:", e);
}

/* ===================================================================
   LOCAL FALLBACK STORAGE (Ensures app NEVER breaks even offline)
=================================================================== */
const LOCAL_STORAGE_GUESTS_KEY = 'devmatrix_local_guests';
const LOCAL_STORAGE_SCORES_KEY = 'devmatrix_local_scores';

function getLocalGuests() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_GUESTS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function setLocalGuests(list) {
  try {
    localStorage.setItem(LOCAL_STORAGE_GUESTS_KEY, JSON.stringify(list));
  } catch (e) {}
}

function getLocalScores() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCORES_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function setLocalScores(list) {
  try {
    localStorage.setItem(LOCAL_STORAGE_SCORES_KEY, JSON.stringify(list));
  } catch (e) {}
}

/* ===================================================================
   GUEST & INVITATION API
=================================================================== */

/**
 * Add a single guest invitation
 */
async function addGuest(guest) {
  const generatedPin = guest.gamePin || String(Math.floor(1000 + Math.random() * 9000));
  const newGuest = {
    name: guest.name.trim(),
    title: guest.title ? guest.title.trim() : 'ضيف كريم',
    category: guest.category || 'guest',
    seat: guest.seat ? String(guest.seat).trim() : 'A-01',
    phone: guest.phone ? String(guest.phone).trim() : '',
    notes: guest.notes ? guest.notes.trim() : '',
    gamePin: generatedPin, // Dedicated PIN for Games Center access
    rsvp: guest.rsvp || 'pending',
    rsvpTime: null,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseReady && db) {
    try {
      const docRef = await db.collection('guests').add(newGuest);
      newGuest.id = docRef.id;
      const list = getLocalGuests();
      list.unshift(newGuest);
      setLocalGuests(list);
      return { success: true, id: docRef.id, guest: newGuest };
    } catch (err) {
      console.warn("Firestore error adding guest, using local fallback:", err);
    }
  }

  newGuest.id = 'loc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  const list = getLocalGuests();
  list.unshift(newGuest);
  setLocalGuests(list);
  return { success: true, id: newGuest.id, guest: newGuest, fallback: true };
}

/**
 * Bulk add guests from Excel / CSV import
 */
async function addBulkGuests(guestsList, onProgress) {
  const results = { total: guestsList.length, success: 0, failed: 0, items: [] };

  if (isFirebaseReady && db) {
    try {
      const batchSize = 400;
      let currentBatch = db.batch();
      let countInBatch = 0;

      for (let i = 0; i < guestsList.length; i++) {
        const g = guestsList[i];
        const docRef = db.collection('guests').doc();
        const generatedPin = g.gamePin || String(Math.floor(1000 + Math.random() * 9000));
        const guestData = {
          name: (g.name || g['الاسم'] || g['اسم المدعو'] || 'بدون اسم').trim(),
          title: (g.title || g['الصفة'] || g['اللقب'] || 'ضيف كريم').trim(),
          category: g.category || 'guest',
          seat: String(g.seat || g['رقم المقعد'] || g['المقعد'] || 'VIP').trim(),
          phone: String(g.phone || g['رقم الهاتف'] || g['الهاتف'] || '').trim(),
          notes: (g.notes || g['ملاحظات'] || '').trim(),
          gamePin: generatedPin,
          rsvp: 'pending',
          rsvpTime: null,
          createdAt: new Date().toISOString()
        };

        currentBatch.set(docRef, guestData);
        guestData.id = docRef.id;
        results.items.push(guestData);
        results.success++;
        countInBatch++;

        if (countInBatch >= batchSize || i === guestsList.length - 1) {
          await currentBatch.commit();
          currentBatch = db.batch();
          countInBatch = 0;
        }

        if (onProgress) {
          onProgress(Math.round(((i + 1) / guestsList.length) * 100), i + 1, guestsList.length);
        }
      }

      const cached = getLocalGuests();
      setLocalGuests([...results.items, ...cached]);
      return results;
    } catch (err) {
      console.warn("Firestore bulk batch failed, falling back to local storage:", err);
    }
  }

  const currentLocal = getLocalGuests();
  guestsList.forEach((g, i) => {
    const generatedPin = g.gamePin || String(Math.floor(1000 + Math.random() * 9000));
    const item = {
      id: 'loc_' + Date.now() + '_' + i,
      name: (g.name || g['الاسم'] || g['اسم المدعو'] || 'بدون اسم').trim(),
      title: (g.title || g['الصفة'] || g['اللقب'] || 'ضيف كريم').trim(),
      category: g.category || 'guest',
      seat: String(g.seat || g['رقم المقعد'] || g['المقعد'] || 'A-01').trim(),
      phone: String(g.phone || g['رقم الهاتف'] || g['الهاتف'] || '').trim(),
      notes: (g.notes || g['ملاحظات'] || '').trim(),
      gamePin: generatedPin,
      rsvp: 'pending',
      rsvpTime: null,
      createdAt: new Date().toISOString()
    };
    results.items.push(item);
    results.success++;
  });
  setLocalGuests([...results.items, ...currentLocal]);
  return results;
}

/**
 * Verify player identity with Name and Game PIN
 */
async function verifyPlayerByPin(name, pin) {
  const cleanName = (name || '').trim().toLowerCase();
  const cleanPin = String(pin || '').trim();

  if (!cleanPin) return { valid: false, message: 'الرجاء إدخال رقم الدخول الخاص بك' };

  // 1. Check local cache first
  const localList = getLocalGuests();
  let match = localList.find(g => {
    const pinMatches = String(g.gamePin || '').trim() === cleanPin || (g.id && g.id.slice(-4).toUpperCase() === cleanPin.toUpperCase());
    const nameMatches = !cleanName || (g.name || '').toLowerCase().includes(cleanName) || cleanName.includes((g.name || '').toLowerCase());
    return pinMatches && nameMatches;
  });

  if (match) {
    return { valid: true, guest: match };
  }

  // 2. Query Firestore if connected
  if (isFirebaseReady && db) {
    try {
      const snap = await db.collection('guests').where('gamePin', '==', cleanPin).get();
      if (!snap.empty) {
        const doc = snap.docs[0];
        const g = { id: doc.id, ...doc.data() };
        return { valid: true, guest: g };
      }
    } catch (e) {
      console.warn("Firestore query error:", e);
    }
  }

  // Check match by PIN alone
  match = localList.find(g => String(g.gamePin || '').trim() === cleanPin);
  if (match) return { valid: true, guest: match };

  return { valid: false, message: 'رقم الدخول أو الاسم غير متطابق. تأكد من الرقم المكتوب في بطاقة دعوتك.' };
}

/**
 * Get single guest by Document ID
 */
async function getGuestById(id) {
  if (!id) return null;

  if (isFirebaseReady && db && !id.startsWith('loc_')) {
    try {
      const doc = await db.collection('guests').doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (err) {
      console.warn("Firestore error fetching guest:", err);
    }
  }

  const list = getLocalGuests();
  return list.find(g => g.id === id) || null;
}

/**
 * Listen to all guests (Real-time update)
 */
function subscribeToGuests(callback) {
  if (isFirebaseReady && db) {
    try {
      return db.collection('guests').orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const guests = [];
          snapshot.forEach(doc => {
            guests.push({ id: doc.id, ...doc.data() });
          });
          setLocalGuests(guests);
          callback(guests);
        }, err => {
          console.warn("Firestore realtime guests error:", err);
          callback(getLocalGuests());
        });
    } catch (e) {
      console.warn("Subscribe error:", e);
    }
  }

  callback(getLocalGuests());
  return () => {};
}

/**
 * Update RSVP Status for a guest
 */
async function updateGuestRSVP(id, status = 'confirmed') {
  const rsvpTime = new Date().toISOString();

  if (isFirebaseReady && db && !id.startsWith('loc_')) {
    try {
      await db.collection('guests').doc(id).update({
        rsvp: status,
        rsvpTime: rsvpTime
      });
    } catch (err) {
      console.warn("Failed to update RSVP in Firestore:", err);
    }
  }

  const list = getLocalGuests();
  const found = list.find(g => g.id === id);
  if (found) {
    found.rsvp = status;
    found.rsvpTime = rsvpTime;
    setLocalGuests(list);
  }
  return { success: true, status, rsvpTime };
}

/**
 * Delete a guest
 */
async function deleteGuest(id) {
  if (isFirebaseReady && db && !id.startsWith('loc_')) {
    try {
      await db.collection('guests').doc(id).delete();
    } catch (err) {
      console.warn("Failed to delete from Firestore:", err);
    }
  }

  const list = getLocalGuests().filter(g => g.id !== id);
  setLocalGuests(list);
  return { success: true };
}

/* ===================================================================
   GAMES & LEADERBOARD API
=================================================================== */

/**
 * Save game score
 */
async function saveGameScore({ playerName, isGuest, gameId, gameTitle, score, maxScore, details }) {
  const scoreRecord = {
    playerName: (playerName || 'لاعب مجهول').trim(),
    isGuest: Boolean(isGuest),
    gameId: gameId || 'generic',
    gameTitle: gameTitle || 'لعبة تقنية',
    score: Number(score) || 0,
    maxScore: Number(maxScore) || 0,
    percentage: maxScore > 0 ? Math.round((Number(score) / Number(maxScore)) * 100) : 100,
    details: details || '',
    playedAt: new Date().toISOString()
  };

  if (isFirebaseReady && db) {
    try {
      const docRef = await db.collection('game_scores').add(scoreRecord);
      scoreRecord.id = docRef.id;
      const local = getLocalScores();
      local.unshift(scoreRecord);
      setLocalScores(local.slice(0, 100));
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn("Failed to save score to Firestore:", err);
    }
  }

  scoreRecord.id = 'loc_score_' + Date.now();
  const local = getLocalScores();
  local.unshift(scoreRecord);
  setLocalScores(local.slice(0, 100));
  return { success: true, id: scoreRecord.id, fallback: true };
}

/**
 * Listen to recent scores or leaderboard
 */
function subscribeToScores(callback, gameId = null) {
  if (isFirebaseReady && db) {
    try {
      let query = db.collection('game_scores');
      if (gameId) {
        query = query.where('gameId', '==', gameId);
      }
      return query.orderBy('playedAt', 'desc').limit(50)
        .onSnapshot(snapshot => {
          const scores = [];
          snapshot.forEach(doc => {
            scores.push({ id: doc.id, ...doc.data() });
          });
          setLocalScores(scores);
          callback(scores);
        }, err => {
          console.warn("Firestore realtime scores error:", err);
          let local = getLocalScores();
          if (gameId) local = local.filter(s => s.gameId === gameId);
          callback(local);
        });
    } catch (e) {
      console.warn("Scores subscribe notice:", e);
    }
  }

  let local = getLocalScores();
  if (gameId) local = local.filter(s => s.gameId === gameId);
  callback(local);
  return () => {};
}

/**
 * Clear all game scores (admin only)
 */
async function clearAllScores() {
  if (isFirebaseReady && db) {
    try {
      const snapshot = await db.collection('game_scores').get();
      const batch = db.batch();
      snapshot.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    } catch (err) {
      console.warn("Error clearing scores:", err);
    }
  }
  setLocalScores([]);
  return { success: true };
}

// Export to window
window.DevMatrixFB = {
  config: firebaseConfig,
  isReady: () => isFirebaseReady,
  addGuest,
  addBulkGuests,
  getGuestById,
  verifyPlayerByPin,
  subscribeToGuests,
  updateGuestRSVP,
  deleteGuest,
  saveGameScore,
  subscribeToScores,
  clearAllScores,
  getLocalGuests,
  getLocalScores
};
