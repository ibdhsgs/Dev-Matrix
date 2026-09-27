/**
 * Dev Matrix — Games & Interactive Hub Script
 * Dedicated interactive script for games.html
 * Features:
 * - Responsive Navbar & Scroll Tracking
 * - Scroll Reveal Animations
 * - 1. Dev Matrix Challenges & Modal
 * - 2. Computer Science Quiz
 * - 3. Code Challenge
 * - 4. Guess the Technology
 * - 5. Matrix Game
 * - 6. Tech Memory
 * - 7. Dev Matrix Facts (Auto-rotating)
 * - 8. Tech Timeline (Interactive Explorer)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initPlayerIdentity();
  initLiveLeaderboard();
  initChallenges();
  initQuiz();
  initCodeChallenge();
  initGuessTech();
  initMatrixGame();
  initTechMemory();
  initFacts();
  initTimeline();
});

/* ===================================================================
   NAVIGATION & SCROLL TRACKING
=================================================================== */
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const toggle   = document.getElementById('navToggle');
  const links    = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  });

  toggle?.addEventListener('click', () => links?.classList.toggle('open'));
  navItems.forEach(a => a.addEventListener('click', () => links?.classList.remove('open')));

  function updateActiveNav() {
    const scrollPos = window.scrollY + 160;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  updateActiveNav();
}

/* ===================================================================
   SCROLL REVEAL (INTERSECTION OBSERVER)
=================================================================== */
function initScrollReveal() {
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        o.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ===================================================================
   1. DEV MATRIX CHALLENGES — MODAL WITH QUESTIONS
=================================================================== */
function initChallenges() {
  const challengeData = {
    algorithms: {
      icon: `<svg class="ch-icon-svg" viewBox="0 0 36 36" fill="none"><defs><linearGradient id="ch_al_icon_m" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#1565C0"/><stop offset="1" stop-color="#29B6F6"/></linearGradient></defs><rect x="10" y="10" width="16" height="16" rx="3" stroke="url(#ch_al_icon_m)" stroke-width="2.2"/><rect x="13" y="13" width="10" height="10" rx="1" fill="url(#ch_al_icon_m)" opacity=".2"/><path d="M13 4v6M18 4v6M23 4v6M13 26v6M18 26v6M23 26v6M4 13h6M4 18h6M4 23h6M26 13h6M26 18h6M26 23h6" stroke="url(#ch_al_icon_m)" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      title: 'تحدي الخوارزميات',
      desc: 'أسئلة تحليلية حول الخوارزميات وتقييم التعقيد الزمني والمكاني.',
      questions: [
        { q: 'ما هو التعقيد الزمني لخوارزمية Binary Search في أسوأ الحالات؟', opts: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], ans: 1 },
        { q: 'أي خوارزمية فرز تعمل بتعقيد O(n log n) في المتوسط والأسوأ دائماً؟', opts: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort'], ans: 2 },
        { q: 'ما هو التعقيد المكاني لخوارزمية DFS في الرسم البياني؟', opts: ['O(1)', 'O(V)', 'O(E)', 'O(V+E)'], ans: 1 },
        { q: 'ما نوع المشكلات التي تُحل باستخدام خوارزمية Dijkstra؟', opts: ['Sorting', 'Shortest Path', 'String Matching', 'Graph Coloring'], ans: 1 },
      ]
    },
    coding: {
      icon: `<svg class="ch-icon-svg" viewBox="0 0 36 36" fill="none"><defs><linearGradient id="ch_co_icon_m" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#1565C0"/><stop offset="1" stop-color="#29B6F6"/></linearGradient></defs><path d="M11 11L4 18l7 7" stroke="url(#ch_co_icon_m)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M25 11l7 7-7 7" stroke="url(#ch_co_icon_m)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 8L15 28" stroke="url(#ch_co_icon_m)" stroke-width="2" stroke-linecap="round" opacity=".6"/></svg>`,
      title: 'تحدي البرمجة',
      desc: 'تحديات برمجية عملية تقيس مهاراتك في التفكير المنطقي والصياغة البرمجية.',
      questions: [
        { q: 'ما ناتج التعبير: 2 ** 10 في لغة Python؟', opts: ['20', '1024', '100', '512'], ans: 1 },
        { q: 'ما الفرق الأساسي بين list و tuple في Python؟', opts: ['لا فرق بينهما', 'Tuple قابل للتعديل', 'List قابلة للتعديل و Tuple غير قابلة', 'Tuple أسرع فقط'], ans: 2 },
        { q: 'في JavaScript، ماذا يرجع: console.log(typeof null)؟', opts: ['"null"', '"undefined"', '"object"', '"boolean"'], ans: 2 },
        { q: 'ما ناتج: [1,2,3].length في JavaScript؟', opts: ['2', '3', '4', 'undefined'], ans: 1 },
      ]
    },
    debug: {
      icon: `<svg class="ch-icon-svg" viewBox="0 0 36 36" fill="none"><defs><linearGradient id="ch_db_icon_m" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#1565C0"/><stop offset="1" stop-color="#29B6F6"/></linearGradient></defs><circle cx="15" cy="15" r="9.5" stroke="url(#ch_db_icon_m)" stroke-width="2.4"/><path d="M22 22l9 9" stroke="url(#ch_db_icon_m)" stroke-width="2.5" stroke-linecap="round"/><path d="M12 15h6M15 12v6" stroke="url(#ch_db_icon_m)" stroke-width="2" stroke-linecap="round"/></svg>`,
      title: 'اكتشف الخطأ',
      desc: 'ابحث عن الأخطاء البرمجية والمنطقية في مقاطع كود واقعية وصحّحها.',
      questions: [
        { q: 'ما الخطأ في: for(int i=0; i<=10; i++) إذا كان المطلوب التكرار 10 مرات فقط؟', opts: ['لا يوجد خطأ', 'i<=10 ينفذ التكرار 11 مرة', 'يجب أن تبدأ الحلقة من 1', 'الحلقة لا تنتهي أبداً'], ans: 1 },
        { q: 'في Python: x = [1,2,3]; x.append(4,5) — ما سبب الخطأ؟', opts: ['لا يوجد خطأ', 'append تقبل وسيطاً واحداً فقط', 'القائمة لا تقبل أرقاماً', 'يجب استخدام remove'], ans: 1 },
        { q: 'ما المشكلة في الجملة الشرطية: if (x = 5) بلغة C؟', opts: ['لا مشكلة صياغية', 'تستخدم إسناد = بدلاً من المقارنة ==', 'المتغير غير معرف', 'الأقواس غير صحيحة'], ans: 1 },
        { q: 'في SQL: SELECT * FROM users WHERE name = Ahmed — ما الخطأ؟', opts: ['لا خطأ', 'يجب وضع علامات تنصيص فردية حول \'Ahmed\'', 'جملة SELECT غير صحيحة', 'اسم الجدول غير موجود'], ans: 1 },
      ]
    },
    logic: {
      icon: `<svg class="ch-icon-svg" viewBox="0 0 36 36" fill="none"><defs><linearGradient id="ch_lg_icon_m" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#1565C0"/><stop offset="1" stop-color="#29B6F6"/></linearGradient></defs><path d="M15 4h-6a3 3 0 00-3 3v6h3a3 3 0 010 6H6v6a3 3 0 003 3h6v-3a3 3 0 016 0v3h6a3 3 0 003-3v-6h-3a3 3 0 010-6h3V7a3 3 0 00-3-3h-6v3a3 3 0 01-6 0V4z" stroke="url(#ch_lg_icon_m)" stroke-width="2" stroke-linejoin="round" fill="url(#ch_lg_icon_m)" fill-opacity="0.12"/></svg>`,
      title: 'تحدي المنطق',
      desc: 'ألغاز منطقية مستوحاة من مفاهيم علوم الحاسوب والمنطق البولياني.',
      questions: [
        { q: 'إذا كان: NOT (A AND B) = TRUE، فأي مما يلي صحيح دائماً؟', opts: ['A=TRUE و B=TRUE', 'A=FALSE أو B=FALSE', 'A=TRUE فقط', 'B=TRUE فقط'], ans: 1 },
        { q: 'ما قيمة التعبير الثنائي: 5 XOR 3؟', opts: ['6', '7', '8', '2'], ans: 0 },
        { q: 'الرقم 255 في النظام الثنائي (Binary) يُمثل بـ:', opts: ['11111110', '11111111', '11110000', '10000000'], ans: 1 },
        { q: 'إذا كان A=TRUE و B=FALSE. ما ناتج: A OR (NOT B)؟', opts: ['FALSE', 'TRUE', 'NULL', 'Error'], ans: 1 },
      ]
    },
    speed: {
      icon: `<svg class="ch-icon-svg" viewBox="0 0 36 36" fill="none"><defs><linearGradient id="ch_sp_icon_m" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#1565C0"/><stop offset="1" stop-color="#29B6F6"/></linearGradient></defs><path d="M21 3L7 20h11L13 33 29 16H18L21 3z" fill="url(#ch_sp_icon_m)" fill-opacity=".18" stroke="url(#ch_sp_icon_m)" stroke-width="2.2" stroke-linejoin="round"/></svg>`,
      title: 'تحدي السرعة',
      desc: 'أجب عن أكبر عدد من الأسئلة في أقل وقت ممكن مع الحفاظ على الدقة.',
      questions: [
        { q: 'لماذا يبدأ المبرمجون العد من 0 في مصفوفات الذاكرة؟', opts: ['عادة فقط', 'لأن عنوان البداية في الذاكرة يبدأ بإزاحة 0', 'لتوفير الذاكرة', 'خاص بلغة C فقط'], ans: 1 },
        { q: 'ما هي البيئة الرسمية الأشهر لتطوير تطبيقات Android الأصلية؟', opts: ['Xcode', 'Android Studio', 'Visual Studio', 'NetBeans'], ans: 1 },
        { q: 'اختصار HTTP يرمز إلى:', opts: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'Hyper Technology Transfer Protocol', 'None'], ans: 0 },
        { q: 'أي لغة تُستخدم للاستعلام عن قواعد البيانات العلائقية؟', opts: ['Python', 'SQL', 'HTML', 'CSS'], ans: 1 },
      ]
    }
  };

  window.openChallenge = function(type) {
    const data = challengeData[type];
    if (!data) return;
    const modal = document.getElementById('challengeModal');
    const content = document.getElementById('challengeContent');
    let score = 0;
    let answered = Array(data.questions.length).fill(false);

    let html = `
      <div class="modal-challenge-header">
        <div class="modal-challenge-icon">${data.icon}</div>
        <div class="modal-challenge-title">${data.title}</div>
      </div>
      <div class="modal-challenge-desc">${data.desc}</div>
      <div class="modal-qlist">`;

    data.questions.forEach((q, qi) => {
      html += `
        <div class="modal-q" id="mq${qi}">
          <div class="modal-q-text">${qi + 1}. ${q.q}</div>
          <div class="modal-opts">
            ${q.opts.map((opt, oi) => `<button class="modal-opt" data-qi="${qi}" data-oi="${oi}">${opt}</button>`).join('')}
          </div>
        </div>`;
    });

    html += `
      </div>
      <div class="modal-score-bar">
        <span>النقاط: <span id="modalScore">0</span> / ${data.questions.length}</span>
        <span id="modalStatus">أجب عن الأسئلة</span>
      </div>`;

    content.innerHTML = html;

    content.querySelectorAll('.modal-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = parseInt(btn.dataset.qi, 10);
        const oi = parseInt(btn.dataset.oi, 10);
        if (answered[qi]) return;
        answered[qi] = true;

        const correct = data.questions[qi].ans;
        content.querySelectorAll(`.modal-opt[data-qi="${qi}"]`).forEach((o, i) => {
          if (i === correct) o.classList.add('correct');
          else if (i === oi && oi !== correct) o.classList.add('wrong');
          o.style.pointerEvents = 'none';
        });

        if (oi === correct) score++;
        const scoreEl = content.querySelector('#modalScore');
        if (scoreEl) scoreEl.textContent = score;

        if (answered.every(Boolean)) {
          const pct = Math.round((score / data.questions.length) * 100);
          const statusEl = content.querySelector('#modalStatus');
          if (statusEl) {
            statusEl.textContent = pct >= 75 ? '🎉 نتيجة ممتازة!' : pct >= 50 ? '👍 نتيجة جيدة!' : '📚 حاول مرة أخرى لتحسين نتيجتك';
          }
          recordGameScore(`challenge_${key}`, data.title, score, data.questions.length, `${pct}%`);
        }
      });
    });

    modal?.classList.add('open');
  };

  window.closeChallenge = function() {
    document.getElementById('challengeModal')?.classList.remove('open');
  };

  document.getElementById('challengeModal')?.addEventListener('click', e => {
    if (e.target.id === 'challengeModal') closeChallenge();
  });
}

/* ===================================================================
   2. COMPUTER SCIENCE QUIZ
=================================================================== */
function initQuiz() {
  const allQ = [
    { cat: 'programming', lbl: 'Programming', q: 'ما هي الوظيفة الأساسية للخوارزمية؟', opts: ['تخزين البيانات', 'حل مشكلة عبر خطوات منطقية محددة', 'تصميم واجهة المستخدم', 'إدارة الذاكرة العشوائية'], ans: 1 },
    { cat: 'programming', lbl: 'Programming', q: 'ما الفرق الرئيسي بين Compiler و Interpreter؟', opts: ['لا يوجد فرق', 'Compiler يترجم الكود كاملاً دفعة واحدة، Interpreter سطراً بسطر', 'Interpreter أسرع دائماً', 'Compiler للويب فقط'], ans: 1 },
    { cat: 'algorithms', lbl: 'Algorithms', q: 'ما هو تعقيد خوارزمية Bubble Sort في أسوأ الحالات؟', opts: ['O(n)', 'O(log n)', 'O(n²)', 'O(n log n)'], ans: 2 },
    { cat: 'algorithms', lbl: 'Algorithms', q: 'خوارزمية BFS (Breadth-First Search) تعتمد على أي بنية بيانات؟', opts: ['Stack', 'Queue', 'Array', 'Tree'], ans: 1 },
    { cat: 'databases', lbl: 'Databases', q: 'ما هو المعنى الكامل لاختصار SQL؟', opts: ['Structured Query Language', 'Simple Query Language', 'System Query Logic', 'Structured Quick Language'], ans: 0 },
    { cat: 'databases', lbl: 'Databases', q: 'ما هو المفتاح الأساسي (Primary Key) في قواعد البيانات؟', opts: ['حقل مكرر', 'حقل فريد يعرّف كل سجل بدون تكرار', 'أول عمود في الجدول', 'حقل نصي فقط'], ans: 1 },
    { cat: 'networks', lbl: 'Networks', q: 'ما هو البروتوكول القياسي المستخدم لنقل الملفات عبر الشبكة؟', opts: ['HTTP', 'FTP', 'SMTP', 'SSH'], ans: 1 },
    { cat: 'networks', lbl: 'Networks', q: 'كم عدد البتات (Bits) في عنوان IPv4؟', opts: ['16', '32', '64', '128'], ans: 1 },
    { cat: 'cybersecurity', lbl: 'Cyber Security', q: 'ما هو هجوم Man-in-the-Middle (MitM)؟', opts: ['هجوم على قاعدة البيانات', 'اعتراض والتنصت على الاتصال بين طرفين', 'هجوم حجب الخدمة', 'تخمين كلمة المرور'], ans: 1 },
    { cat: 'cybersecurity', lbl: 'Cyber Security', q: 'ما الذي يوفره بروتوكول HTTPS مقارنة بـ HTTP؟', opts: ['تشفير البيانات عبر SSL/TLS', 'زيادة سرعة التحميل فقط', 'نقل ملفات أكبر', 'حماية الخادم من التوقف'], ans: 0 },
    { cat: 'ai', lbl: 'Artificial Intelligence', q: 'ما هو المفهوم الأساسي للتعلم الآلي (Machine Learning)؟', opts: ['كتابة قواعد يدوية مسبقة', 'تمكين الحاسوب من التعلم واستخراج الأنماط من البيانات', 'بناء الروبوتات الميكانيكية', 'معالجة النصوص فقط'], ans: 1 },
    { cat: 'ai', lbl: 'Artificial Intelligence', q: 'أي نوع من التعلم الآلي يُستخدم عند وجود بيانات موسومة (Labeled Data)؟', opts: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Semi-Random'], ans: 2 },
    { cat: 'web', lbl: 'Web Development', q: 'ما هي اللغة المسؤولة عن الهيكل الأساسي لصفحات الويب؟', opts: ['CSS', 'JavaScript', 'HTML', 'Python'], ans: 2 },
    { cat: 'web', lbl: 'Web Development', q: 'ما هو دور لغة CSS في تطوير الويب؟', opts: ['المنطق والتفاعل', 'تنسيق المظهر والخطوط والألوان والتخطيط', 'التواصل مع قواعد البيانات', 'معالجة النماذج'], ans: 1 },
    { cat: 'programming', lbl: 'Computer Science', q: 'ما هي وظيفة ذاكرة الوصول العشوائي (RAM)؟', opts: ['التخزين الدائم للبيانات', 'تخزين مؤقت سريع للبيانات والبرامج قيد التشغيل', 'معالجة العمليات الحسابية', 'تزويد الجهاز بالطاقة'], ans: 1 },
    { cat: 'algorithms', lbl: 'Computer Science', q: 'هيكل البيانات Stack يعمل وفق أي مبدأ؟', opts: ['FIFO (First In First Out)', 'LIFO (Last In First Out)', 'Random Access', 'Priority First'], ans: 1 },
  ];

  let selectedCat = 'all', activeQ = [], curQ = 0, score = 0, answered = false;

  document.querySelectorAll('.quiz-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCat = btn.dataset.cat;
    });
  });

  document.getElementById('startQuizBtn')?.addEventListener('click', () => {
    let pool = selectedCat === 'all' ? allQ : allQ.filter(q => q.cat === selectedCat);
    if (pool.length < 10) pool = [...allQ];
    activeQ = shuffle(pool).slice(0, 10);
    curQ = 0; score = 0; answered = false;
    show('quizPlay'); hide('quizStart'); hide('quizResult');
    renderQ();
  });

  document.getElementById('quizNextBtn')?.addEventListener('click', () => {
    curQ++;
    if (curQ >= activeQ.length) endQuiz(); else renderQ();
  });

  document.getElementById('quizRetryBtn')?.addEventListener('click', () => {
    show('quizStart'); hide('quizPlay'); hide('quizResult');
  });

  function renderQ() {
    const q = activeQ[curQ], total = activeQ.length;
    const progressFill = document.getElementById('quizProgressFill');
    const progressText = document.getElementById('quizProgressText');
    const scoreLive = document.getElementById('quizScoreLive');
    const catTag = document.getElementById('quizCatTag');
    const questionEl = document.getElementById('quizQuestion');
    const optsEl = document.getElementById('quizOptions');

    if (progressFill) progressFill.style.width = ((curQ / total) * 100) + '%';
    if (progressText) progressText.textContent = `${curQ + 1} / ${total}`;
    if (scoreLive) scoreLive.textContent = score;
    if (catTag) catTag.textContent = q.lbl;
    if (questionEl) questionEl.textContent = q.q;

    if (optsEl) {
      optsEl.innerHTML = '';
      q.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectQ(i));
        optsEl.appendChild(btn);
      });
    }

    hide('quizFeedback'); hide('quizNextBtn'); answered = false;
  }

  function selectQ(chosen) {
    if (answered) return;
    answered = true;
    const q = activeQ[curQ];
    document.querySelectorAll('.quiz-option').forEach((btn, i) => {
      btn.style.pointerEvents = 'none';
      if (i === q.ans) btn.classList.add('correct');
      else if (i === chosen && chosen !== q.ans) btn.classList.add('wrong');
    });

    const fb = document.getElementById('quizFeedback');
    if (fb) {
      if (chosen === q.ans) {
        score++;
        fb.textContent = '✅ إجابة صحيحة!';
        fb.className = 'quiz-feedback correct-feedback';
      } else {
        fb.textContent = `❌ الإجابة الصحيحة: ${q.opts[q.ans]}`;
        fb.className = 'quiz-feedback wrong-feedback';
      }
    }

    const scoreLive = document.getElementById('quizScoreLive');
    if (scoreLive) scoreLive.textContent = score;

    show('quizFeedback'); show('quizNextBtn');
  }

  function endQuiz() {
    hide('quizPlay'); show('quizResult');
    const total = activeQ.length;
    const pct = Math.round((score / total) * 100);

    const scoreEl = document.getElementById('resultScore');
    if (scoreEl) scoreEl.textContent = `${score} / ${total}`;

    const labels = [
      [100, 'Perfect Score! 🌟', '🏆'],
      [80, 'Great Job! 🎉', '🎉'],
      [60, 'Good Work! 👍', '👍'],
      [40, 'Keep Practicing! 📚', '📚'],
      [0, 'Try Again! 💪', '💪']
    ];
    const [, lbl, icon] = labels.find(([t]) => pct >= t) || ['', 'Nice Try!', '⭐'];

    const labelEl = document.getElementById('resultLabel');
    const iconEl = document.getElementById('resultIcon');
    if (labelEl) labelEl.textContent = lbl;
    if (iconEl) iconEl.textContent = icon;

    recordGameScore('cs_quiz', 'الكويز البرمجي', score, total, `${pct}%`);
  }
}

/* ===================================================================
   3. CODE CHALLENGE
=================================================================== */
function initCodeChallenge() {
  const ch = [
    { lang: 'JavaScript', code: `let x = 5;\nlet y = 10;\nconsole.log(x + y);`, opts: ['10', '15', '20', '510'], ans: 1 },
    { lang: 'Python', code: `x = "Dev"\ny = "Matrix"\nprint(x + " " + y)`, opts: ['Dev Matrix', 'DevMatrix', 'Error', 'Dev + Matrix'], ans: 0 },
    { lang: 'JavaScript', code: `let arr = [1, 2, 3, 4];\nconsole.log(arr.length);`, opts: ['3', '4', '5', 'undefined'], ans: 1 },
    { lang: 'Python', code: `x = 10\ny = 3\nprint(x // y)`, opts: ['3.33', '3', '4', '3.0'], ans: 1 },
    { lang: 'JavaScript', code: `let a = "5";\nlet b = 3;\nconsole.log(a + b);`, opts: ['8', '53', '15', 'Error'], ans: 1 },
    { lang: 'Python', code: `lst = [10, 20, 30]\nprint(lst[-1])`, opts: ['10', '20', '30', 'Error'], ans: 2 },
    { lang: 'JavaScript', code: `console.log(Boolean(0));\nconsole.log(Boolean(""));`, opts: ['true true', 'false false', 'false true', 'true false'], ans: 1 },
    { lang: 'Python', code: `x = 2 ** 8\nprint(x)`, opts: ['16', '256', '64', '512'], ans: 1 },
  ];

  let idx = 0, score = 0, answered = false;

  document.getElementById('startCCBtn')?.addEventListener('click', () => {
    idx = 0; score = 0; answered = false;
    show('ccPlay'); hide('ccStart'); hide('ccResult');
    renderCC();
  });

  document.getElementById('ccNextBtn')?.addEventListener('click', nextCC);
  document.getElementById('ccRetryBtn')?.addEventListener('click', () => {
    show('ccStart'); hide('ccPlay'); hide('ccResult');
  });

  function renderCC() {
    const c = ch[idx];
    const progressEl = document.getElementById('ccProgress');
    const scoreEl = document.getElementById('ccScore');
    const langEl = document.getElementById('ccLang');
    const codeEl = document.getElementById('ccCode');
    const optionsEl = document.getElementById('ccOptions');

    if (progressEl) progressEl.textContent = `${idx + 1} / ${ch.length}`;
    if (scoreEl) scoreEl.textContent = score;
    if (langEl) langEl.textContent = c.lang;
    if (codeEl) codeEl.textContent = c.code;

    if (optionsEl) {
      optionsEl.innerHTML = '';
      c.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'cc-opt';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectCC(i));
        optionsEl.appendChild(btn);
      });
    }

    hide('ccFeedback'); hide('ccNextBtn'); answered = false;
  }

  function selectCC(chosen) {
    if (answered) return;
    answered = true;
    const c = ch[idx];
    document.querySelectorAll('.cc-opt').forEach((btn, i) => {
      btn.style.pointerEvents = 'none';
      if (i === c.ans) btn.classList.add('correct');
      else if (i === chosen && chosen !== c.ans) btn.classList.add('wrong');
    });

    const fb = document.getElementById('ccFeedback');
    if (fb) {
      if (chosen === c.ans) {
        score++;
        fb.textContent = '✅ إجابة صحيحة!';
        fb.className = 'cc-feedback correct-feedback';
      } else {
        fb.textContent = `❌ الإجابة الصحيحة: ${c.opts[c.ans]}`;
        fb.className = 'cc-feedback wrong-feedback';
      }
    }

    const scoreEl = document.getElementById('ccScore');
    if (scoreEl) scoreEl.textContent = score;

    show('ccFeedback'); show('ccNextBtn');
  }

  function nextCC() {
    idx++;
    if (idx >= ch.length) {
      hide('ccPlay'); show('ccResult');
      const pct = Math.round((score / ch.length) * 100);
      const resScoreEl = document.getElementById('ccResultScore');
      const resLabelEl = document.getElementById('ccResultLabel');
      if (resScoreEl) resScoreEl.textContent = `${score} / ${ch.length}`;
      if (resLabelEl) resLabelEl.textContent = pct >= 80 ? 'Excellent Coder! 🏆' : pct >= 60 ? 'Good Job! 👍' : 'Keep Practicing! 💪';

      recordGameScore('code_challenge', 'تحدي الكود', score, ch.length, `${pct}%`);
    } else {
      renderCC();
    }
  }
}

/* ===================================================================
   4. GUESS THE TECHNOLOGY
================================================================== */
function initGuessTech() {
  const rounds = [
    { clue: 'أنا لغة تُستخدم لبناء صفحات ويب تفاعلية. أعمل مباشرة في المتصفح وأتفاعل مع المستخدم.\nWho Am I?', opts: ['HTML', 'CSS', 'JavaScript', 'SQL'], ans: 2 },
    { clue: 'أنا نظام تتبع الإصدارات الأوسع استخداماً في العالم. أحفظ تاريخ التغييرات وأسهّل التعاون.\nWho Am I?', opts: ['GitHub', 'Docker', 'Git', 'SVN'], ans: 2 },
    { clue: 'أنا إطار عمل JavaScript صممته شركة Google مبني على TypeScript ويناسب مشاريع الـ Enterprise.\nWho Am I?', opts: ['React', 'Vue', 'Angular', 'Svelte'], ans: 2 },
    { clue: 'أنا لغة برمجة مفسَّرة بسيطة الصياغة، أتصدر مجالات الذكاء الاصطناعي وعلوم البيانات.\nWho Am I?', opts: ['Java', 'Python', 'C++', 'Go'], ans: 1 },
    { clue: 'أنا تقنية حاويات معزولة تتيح للمطورين تشغيل التطبيقات في أي بيئة دون مشاكل التوافق.\nWho Am I?', opts: ['Kubernetes', 'Docker', 'Nginx', 'Linux'], ans: 1 },
    { clue: 'أنا قاعدة بيانات NoSQL مستنداتية، أخزن البيانات بتنسيق JSON-like وسريعة التوسع.\nWho Am I?', opts: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'], ans: 2 },
    { clue: 'أنا لغة التنسيق والتصميم الأهم في الويب. أتحكم بالألوان والخطوط والحركات وتخطيط الشاشات.\nWho Am I?', opts: ['HTML', 'CSS', 'JavaScript', 'SQL'], ans: 1 },
    { clue: 'أنا المنصة السحابية الأكبر عالمياً لاستضافة مستودعات Git والتعاون المفتوح بين المطورين.\nWho Am I?', opts: ['Git', 'GitLab', 'GitHub', 'Bitbucket'], ans: 2 },
  ];

  let idx = 0, score = 0, answered = false;

  document.getElementById('startGTBtn')?.addEventListener('click', () => {
    idx = 0; score = 0; answered = false;
    show('gtPlay'); hide('gtStart'); hide('gtResult');
    renderGT();
  });

  document.getElementById('gtNextBtn')?.addEventListener('click', nextGT);
  document.getElementById('gtRetryBtn')?.addEventListener('click', () => {
    show('gtStart'); hide('gtPlay'); hide('gtResult');
  });

  function renderGT() {
    const r = rounds[idx];
    const progressEl = document.getElementById('gtProgress');
    const scoreEl = document.getElementById('gtScore');
    const clueEl = document.getElementById('gtClue');
    const optionsEl = document.getElementById('gtOptions');

    if (progressEl) progressEl.textContent = `${idx + 1} / ${rounds.length}`;
    if (scoreEl) scoreEl.textContent = score;
    if (clueEl) clueEl.textContent = r.clue;

    if (optionsEl) {
      optionsEl.innerHTML = '';
      r.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'gt-opt';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectGT(i));
        optionsEl.appendChild(btn);
      });
    }

    hide('gtFeedback'); hide('gtNextBtn'); answered = false;
  }

  function selectGT(chosen) {
    if (answered) return;
    answered = true;
    const r = rounds[idx];
    document.querySelectorAll('.gt-opt').forEach((btn, i) => {
      btn.style.pointerEvents = 'none';
      if (i === r.ans) btn.classList.add('correct');
      else if (i === chosen && chosen !== r.ans) btn.classList.add('wrong');
    });

    const fb = document.getElementById('gtFeedback');
    if (fb) {
      if (chosen === r.ans) {
        score++;
        fb.textContent = `✅ إجابة صحيحة! أنا ${r.opts[r.ans]}`;
        fb.className = 'gt-feedback correct-feedback';
      } else {
        fb.textContent = `❌ الإجابة الصحيحة هي: ${r.opts[r.ans]}`;
        fb.className = 'gt-feedback wrong-feedback';
      }
    }

    const scoreEl = document.getElementById('gtScore');
    if (scoreEl) scoreEl.textContent = score;

    show('gtFeedback'); show('gtNextBtn');
  }

  function nextGT() {
    idx++;
    if (idx >= rounds.length) {
      hide('gtPlay'); show('gtResult');
      const pct = Math.round((score / rounds.length) * 100);
      const resScoreEl = document.getElementById('gtResultScore');
      const resLabelEl = document.getElementById('gtResultLabel');
      if (resScoreEl) resScoreEl.textContent = `${score} / ${rounds.length}`;
      if (resLabelEl) resLabelEl.textContent = pct >= 80 ? 'Tech Expert! 🌐' : pct >= 50 ? 'Good Guesser! 👍' : 'Keep Learning! 📚';

      recordGameScore('guess_tech', 'خمن التقنية', score, rounds.length, `${pct}%`);
    } else {
      renderGT();
    }
  }
}

/* ===================================================================
   5. MATRIX GAME
=================================================================== */
function initMatrixGame() {
  const symbols = ['A','B','C','D','E','F','G','H','0','1','2','3','4','5','6','7','8','9','DM','CS','AI','ML','WEB','JS','PY','DB','OS','ALG','NET','SEC','BIT','HEX'];
  let target = '', timerVal = 30, timerInterval = null, gameScore = 0, gameLevel = 1, gameRunning = false, startTime = 0;

  document.getElementById('mgStartBtn')?.addEventListener('click', startMG);
  document.getElementById('mgPlayAgain')?.addEventListener('click', startMG);

  function startMG() {
    gameScore = 0; gameLevel = 1; gameRunning = true;
    document.getElementById('mgResult')?.classList.add('hidden');
    const scoreEl = document.getElementById('mgScore');
    const levelEl = document.getElementById('mgLevel');
    if (scoreEl) scoreEl.textContent = 0;
    if (levelEl) levelEl.textContent = 1;
    startTime = Date.now();
    startRound();
  }

  function startRound() {
    timerVal = Math.max(10, 35 - (gameLevel - 1) * 5);
    const timerEl = document.getElementById('mgTimer');
    if (timerEl) timerEl.textContent = timerVal;
    clearInterval(timerInterval);

    const pool = gameLevel <= 2 ? symbols.slice(0, 10) : gameLevel <= 4 ? symbols.slice(0, 20) : symbols;
    target = pool[Math.floor(Math.random() * pool.length)];
    const targetEl = document.getElementById('mgTarget');
    if (targetEl) targetEl.textContent = target;

    buildGrid();

    timerInterval = setInterval(() => {
      timerVal--;
      if (timerEl) timerEl.textContent = timerVal;
      if (timerVal <= 0) {
        clearInterval(timerInterval);
        endMG();
      }
    }, 1000);
  }

  function buildGrid() {
    const grid = document.getElementById('mgGrid');
    if (!grid) return;
    const cols = Math.min(8 + (gameLevel - 1) * 2, 14);
    const rows = Math.min(4 + (gameLevel - 1), 8);
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.innerHTML = '';

    const pool = gameLevel <= 2 ? symbols.slice(0, 15) : symbols;
    const total = cols * rows;
    const targetPos = Math.floor(Math.random() * total);

    const cells = Array.from({ length: total }, (_, i) => {
      if (i === targetPos) return target;
      let s;
      do { s = pool[Math.floor(Math.random() * pool.length)]; } while (s === target);
      return s;
    });

    cells.forEach(sym => {
      const cell = document.createElement('div');
      cell.className = 'mg-cell';
      cell.textContent = sym;
      cell.addEventListener('click', () => {
        if (!gameRunning) return;
        if (sym === target) {
          cell.classList.add('target-hit');
          gameScore += Math.max(10, timerVal * gameLevel);
          const scoreEl = document.getElementById('mgScore');
          if (scoreEl) scoreEl.textContent = gameScore;
          gameLevel++;
          const levelEl = document.getElementById('mgLevel');
          if (levelEl) levelEl.textContent = gameLevel;
          clearInterval(timerInterval);
          setTimeout(startRound, 650);
        } else {
          cell.classList.add('wrong-hit');
          gameScore = Math.max(0, gameScore - 5);
          const scoreEl = document.getElementById('mgScore');
          if (scoreEl) scoreEl.textContent = gameScore;
          setTimeout(() => cell.classList.remove('wrong-hit'), 400);
        }
      });
      grid.appendChild(cell);
    });
  }

  function endMG() {
    gameRunning = false;
    clearInterval(timerInterval);
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const finalScoreEl = document.getElementById('mgFinalScore');
    const finalTimeEl = document.getElementById('mgFinalTime');
    const gridEl = document.getElementById('mgGrid');
    const resultEl = document.getElementById('mgResult');

    if (finalScoreEl) finalScoreEl.textContent = gameScore;
    if (finalTimeEl) finalTimeEl.textContent = elapsed;
    if (gridEl) gridEl.innerHTML = '';
    resultEl?.classList.remove('hidden');

    recordGameScore('matrix_game', 'لعبة المصفوفة', gameScore, 500, `مستوى ${gameLevel} - زمن ${elapsed} ث`);
  }
}

/* ===================================================================
   6. TECH MEMORY
=================================================================== */
function initTechMemory() {
  const items = [
    { label: 'HTML',     color: '#E34F26' },
    { label: 'CSS',      color: '#1572B6' },
    { label: 'JS',       color: '#F7DF1E' },
    { label: 'Python',   color: '#3776AB' },
    { label: 'Flutter',  color: '#02569B' },
    { label: 'Firebase', color: '#FFCA28' },
    { label: 'Git',      color: '#F05032' },
    { label: 'GitHub',   color: '#181717' },
  ];
  let attempts = 0, pairs = 0, timerVal = 0, timerInterval = null, flipped = [], locked = false, timerStarted = false;

  document.getElementById('tmRestartBtn')?.addEventListener('click', buildMemory);
  buildMemory();

  function buildMemory() {
    attempts = 0; pairs = 0; timerVal = 0; flipped = []; locked = false; timerStarted = false;
    clearInterval(timerInterval);
    ['tmAttempts','tmPairs','tmTime'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = 0;
    });

    const board = document.getElementById('tmBoard');
    if (!board) return;
    board.innerHTML = '';

    shuffle([...items, ...items]).forEach(item => {
      const card = document.createElement('div');
      card.className = 'tm-card';
      card.dataset.label = item.label;
      card.innerHTML = `
        <div class="tm-card-inner">
          <div class="tm-card-face tm-card-back">
            <div class="tm-card-back-pattern">DM</div>
          </div>
          <div class="tm-card-face tm-card-front">
            <div class="tm-card-chip" style="background:${item.color};color:${item.label === 'JS' ? '#000' : '#fff'}">${item.label.slice(0, 2)}</div>
            <div class="tm-card-label">${item.label}</div>
          </div>
        </div>`;
      card.addEventListener('click', () => flipCard(card));
      board.appendChild(card);
    });
  }

  function flipCard(card) {
    if (locked || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    if (!timerStarted) {
      timerStarted = true;
      timerInterval = setInterval(() => {
        timerVal++;
        const el = document.getElementById('tmTime');
        if (el) el.textContent = timerVal;
      }, 1000);
    }

    card.classList.add('flipped');
    flipped.push(card);

    if (flipped.length === 2) {
      locked = true;
      attempts++;
      const el = document.getElementById('tmAttempts');
      if (el) el.textContent = attempts;

      const [a, b] = flipped;
      if (a.dataset.label === b.dataset.label) {
        a.classList.add('matched');
        b.classList.add('matched');
        pairs++;
        const pe = document.getElementById('tmPairs');
        if (pe) pe.textContent = pairs;
        flipped = [];
        locked = false;
        if (pairs === items.length) {
          clearInterval(timerInterval);
          recordGameScore('tech_memory', 'لعبة الذاكرة', 100, 100, `محاولات: ${attempts} - زمن: ${timerVal} ث`);
        }
      } else {
        setTimeout(() => {
          a.classList.remove('flipped');
          b.classList.remove('flipped');
          flipped = [];
          locked = false;
        }, 900);
      }
    }
  }
}

/* ===================================================================
   7. DEV MATRIX FACTS
=================================================================== */
function initFacts() {
  const facts = [
    { icon: '🐛', text: 'The first computer bug was an actual moth found inside a computer at Harvard University in 1947 by Grace Hopper.', source: 'Computer History Museum' },
    { icon: '🌐', text: 'Tim Berners-Lee invented the World Wide Web in 1991, and he made it freely available — no patents, no royalties.', source: 'W3C Foundation' },
    { icon: '💾', text: 'The first 1GB hard drive, made by IBM in 1980, weighed over 500 pounds and cost $40,000.', source: 'IBM Archives' },
    { icon: '⌨️', text: 'The QWERTY keyboard layout was designed in 1873 to prevent typewriter keys from jamming by slowing down typists.', source: 'Smithsonian Magazine' },
    { icon: '🤖', text: 'Alan Turing proposed the Turing Test in 1950 to evaluate whether a machine can exhibit intelligent behavior.', source: 'ACM Computing' },
    { icon: '🖥️', text: 'ENIAC (1945) was the first general-purpose computer. It could perform 5,000 additions per second.', source: 'Penn Engineering' },
    { icon: '📱', text: 'There are more mobile phones on Earth than there are people. Over 8.9 billion mobile connections exist globally.', source: 'GSMA Report' },
    { icon: '🔐', text: 'The most common password in the world is still "123456". Over 23 million accounts use it globally.', source: 'NCSC Report' },
    { icon: '🐧', text: 'Linux runs over 96.3% of the world\'s top one million web servers.', source: 'W3Techs' },
    { icon: '🧮', text: 'Ada Lovelace designed the first programming language in the 1840s — over 100 years before the first computer!', source: 'Computer History Museum' },
    { icon: '🌍', text: 'Google processes over 8.5 billion searches per day — about 99,000 per second.', source: 'Internet Live Stats' },
    { icon: '🎮', text: 'The video game industry generates more revenue than movies and music combined — over $200 billion in 2023.', source: 'Newzoo Report' },
  ];

  let cur = 0;
  const dotsEl = document.getElementById('factsDots');
  if (!dotsEl) return;

  facts.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'facts-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => { showFact(i); resetAuto(); });
    dotsEl.appendChild(d);
  });

  showFact(0);

  document.getElementById('factsNextBtn')?.addEventListener('click', () => { cur = (cur + 1) % facts.length; showFact(cur); resetAuto(); });
  document.getElementById('factsPrevBtn')?.addEventListener('click', () => { cur = (cur - 1 + facts.length) % facts.length; showFact(cur); resetAuto(); });

  let autoTimer = setInterval(() => { cur = (cur + 1) % facts.length; showFact(cur); }, 6500);

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => { cur = (cur + 1) % facts.length; showFact(cur); }, 6500);
  }

  const factsCard = document.querySelector('.facts-card');
  factsCard?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  factsCard?.addEventListener('mouseleave', resetAuto);

  function showFact(i) {
    cur = i;
    const f = facts[i];
    const elems = [document.getElementById('factsIcon'), document.getElementById('factsText'), document.getElementById('factsSource')];
    elems.forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        el.style.transition = 'all 0.25s ease';
      }
    });

    setTimeout(() => {
      if (elems[0]) elems[0].textContent = f.icon;
      if (elems[1]) elems[1].textContent = f.text;
      if (elems[2]) elems[2].textContent = '— ' + f.source;
      elems.forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, 180);

    document.querySelectorAll('.facts-dot').forEach((d, j) => d.classList.toggle('active', j === i));
  }
}

/* ===================================================================
   8. TECH TIMELINE
=================================================================== */
function initTimeline() {
  const items = document.querySelectorAll('.tl-item');
  const panel = document.getElementById('tlDetailInner');
  if (!panel) return;

  const activeItem = document.querySelector('.tl-item.active') || items[items.length - 1];
  if (activeItem) {
    const detail = activeItem.querySelector('.tl-detail');
    if (detail) panel.innerHTML = detail.innerHTML;
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const detail = item.querySelector('.tl-detail');
      if (detail) {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(8px)';
        panel.style.transition = 'all 0.25s ease';
        setTimeout(() => {
          panel.innerHTML = detail.innerHTML;
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0)';
        }, 180);
      }
    });
  });
}

/* ===================================================================
   UTILITIES
=================================================================== */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function show(id) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  el?.classList.remove('hidden');
}

function hide(id) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  el?.classList.add('hidden');
}

/* ===================================================================
   PLAYER IDENTITY & FIREBASE REAL-TIME LEADERBOARD
=================================================================== */
const PLAYER_STORAGE_KEY = 'devmatrix_player_name';
const PLAYER_GUEST_KEY   = 'devmatrix_player_is_guest';

let activeLeaderboardFilter = 'all';
let cachedScores = [];

function initPlayerIdentity() {
  updateNavPlayerUI();

  // Load guests list into player dropdown if available
  if (window.DevMatrixFB) {
    window.DevMatrixFB.subscribeToGuests(guests => {
      const select = document.getElementById('playerDropdownSelect');
      if (!select) return;
      select.innerHTML = '<option value="">-- اختر اسمك من القائمة --</option>';
      guests.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.name;
        opt.textContent = `${g.name} (${g.title || 'طالب/مدعو'})`;
        select.appendChild(opt);
      });
    });
  }
}

function updateNavPlayerUI() {
  const name = localStorage.getItem(PLAYER_STORAGE_KEY);
  const isGuest = localStorage.getItem(PLAYER_GUEST_KEY) === 'true';
  const navNameEl = document.getElementById('navPlayerName');

  if (navNameEl) {
    if (name) {
      navNameEl.textContent = isGuest ? `ضيف: ${name}` : `🎓 ${name}`;
    } else {
      navNameEl.textContent = 'تسجيل اللاعب';
    }
  }
}

window.openPlayerModal = function() {
  const errorEl = document.getElementById('playerAuthError');
  if (errorEl) errorEl.style.display = 'none';
  document.getElementById('playerModal')?.classList.add('open');
};

window.closePlayerModal = function() {
  document.getElementById('playerModal')?.classList.remove('open');
};

window.togglePlayerTypeUI = function() {
  const isReg = document.getElementById('pTypeReg')?.checked;
  const wrap = document.getElementById('registeredInputsWrap');
  if (wrap) wrap.style.display = isReg ? 'block' : 'none';
};

window.confirmPlayerIdentity = async function() {
  const isGuest = document.getElementById('pTypeGuest')?.checked;
  const errorEl = document.getElementById('playerAuthError');
  const btn = document.getElementById('btnPlayerLogin');
  if (errorEl) errorEl.style.display = 'none';

  if (isGuest) {
    const randomGuestId = Math.floor(100 + Math.random() * 900);
    const playerName = `ضيف_${randomGuestId}`;
    localStorage.setItem(PLAYER_STORAGE_KEY, playerName);
    localStorage.setItem(PLAYER_GUEST_KEY, 'true');
    updateNavPlayerUI();
    closePlayerModal();
    showToast(`أهلاً بك كـ ${playerName} في ساحة التحديات! 🚀`);
    return;
  }

  // Official Registered Player verification
  const name = document.getElementById('playerAuthName')?.value.trim();
  const pin = document.getElementById('playerAuthPin')?.value.trim();

  if (!name) {
    if (errorEl) {
      errorEl.textContent = 'الرجاء كتابة اسمك الكامل كما هو في بطاقة الدعوة.';
      errorEl.style.display = 'block';
    }
    return;
  }

  if (!pin) {
    if (errorEl) {
      errorEl.textContent = 'الرجاء إدخال رقم الدخول الخاص بك (الموجود في كرت دعوتك).';
      errorEl.style.display = 'block';
    }
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'جاري التحقق... ⏳';
  }

  let verified = false;
  let finalName = name;

  if (window.DevMatrixFB) {
    const res = await window.DevMatrixFB.verifyPlayerByPin(name, pin);
    if (res.valid) {
      verified = true;
      finalName = res.guest.name || name;
    } else {
      if (errorEl) {
        errorEl.textContent = res.message || 'رقم الدخول أو الاسم غير متطابق. تأكد من الرقم المكتوب في كرت دعوتك.';
        errorEl.style.display = 'block';
      }
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'التحقق وبدء اللعب 🚀';
      }
      return;
    }
  } else {
    verified = true;
  }

  if (btn) {
    btn.disabled = false;
    btn.textContent = 'التحقق وبدء اللعب 🚀';
  }

  localStorage.setItem(PLAYER_STORAGE_KEY, finalName);
  localStorage.setItem(PLAYER_GUEST_KEY, 'false');
  localStorage.setItem('devmatrix_player_pin', pin);

  updateNavPlayerUI();
  closePlayerModal();
  showToast(`تم التحقق بنجاح! أهلاً بك يا ${finalName} 🎓✨`);
};

function getActivePlayer() {
  const name = localStorage.getItem(PLAYER_STORAGE_KEY);
  const isGuest = localStorage.getItem(PLAYER_GUEST_KEY) === 'true';

  if (!name) {
    const randomGuestId = Math.floor(100 + Math.random() * 900);
    const guestName = `ضيف_${randomGuestId}`;
    localStorage.setItem(PLAYER_STORAGE_KEY, guestName);
    localStorage.setItem(PLAYER_GUEST_KEY, 'true');
    updateNavPlayerUI();
    return { name: guestName, isGuest: true };
  }

  return { name, isGuest };
}

// Record player score and push to Firebase
function recordGameScore(gameId, gameTitle, score, maxScore, details) {
  const player = getActivePlayer();

  if (window.DevMatrixFB) {
    window.DevMatrixFB.saveGameScore({
      playerName: player.name,
      isGuest: player.isGuest,
      gameId: gameId,
      gameTitle: gameTitle,
      score: score,
      maxScore: maxScore,
      details: details
    }).then(() => {
      showToast(`🎉 تم حفظ نتيجتك (${score}) باسم ${player.name} في لوحة الصدارة السحابية!`);
    });
  }
}

// Live Leaderboard Initializer
function initLiveLeaderboard() {
  if (window.DevMatrixFB) {
    window.DevMatrixFB.subscribeToScores(scores => {
      cachedScores = scores;
      renderLeaderboardUI();
    });
  }
}

window.switchLBFilter = function(gameId, btn) {
  activeLeaderboardFilter = gameId;
  document.querySelectorAll('#lbTabs .lb-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLeaderboardUI();
};

function renderLeaderboardUI() {
  const listEl = document.getElementById('leaderboardList');
  if (!listEl) return;

  let filtered = activeLeaderboardFilter === 'all' 
    ? cachedScores 
    : cachedScores.filter(s => s.gameId === activeLeaderboardFilter || s.gameId.startsWith(activeLeaderboardFilter));

  // Sort by highest score / percentage
  filtered.sort((a, b) => (b.score || 0) - (a.score || 0));

  const top10 = filtered.slice(0, 10);

  if (top10.length === 0) {
    listEl.innerHTML = `
      <div class="lb-loading">
        🎮 لا توجد نتائج مسجلة حتى الآن في هذه الفئة. كن أول من يتصدر اللوحة!
      </div>`;
    return;
  }

  listEl.innerHTML = top10.map((s, idx) => {
    const rankClass = idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'bronze' : '';
    const rankIcon = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`;
    const isGuest = s.isGuest;

    return `
      <div class="lb-row">
        <div class="lb-left">
          <div class="lb-rank ${rankClass}">${rankIcon}</div>
          <div>
            <div class="lb-player-name">
              ${escapeHtml(s.playerName)} 
              <span style="font-size:0.75rem;padding:2px 7px;border-radius:6px;background:${isGuest ? 'rgba(255,255,255,0.08)' : 'rgba(0,229,255,0.15)'};color:${isGuest ? '#aaa' : 'var(--accent-cyan)'};margin-right:6px;">
                ${isGuest ? 'ضيف' : 'طالب'}
              </span>
            </div>
            <div class="lb-player-tag">${escapeHtml(s.gameTitle || s.gameId)} · ${escapeHtml(s.details || '')}</div>
          </div>
        </div>
        <div class="lb-right">
          <div class="lb-score-val">${s.score} <span style="font-size:0.75rem;color:var(--text-muted);font-weight:400;">نقطة</span></div>
        </div>
      </div>`;
  }).join('');
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

function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(13, 43, 142, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid var(--accent-cyan);
      color: #fff;
      padding: 12px 24px;
      border-radius: 9999px;
      font-size: 0.95rem;
      font-weight: 600;
      z-index: 99999;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.opacity = '0';
  }, 4000);
}

