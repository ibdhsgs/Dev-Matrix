/**
 * Dev Matrix — Brand Identity Presentation Interactive Script
 * Features:
 * - Geometric Background Canvas (Digital Network Grid)
 * - Navigation Scroll & Mobile Toggle
 * - Scroll Reveal Animations
 * - Anatomy Hotspots & Legend Interactivity
 * - Color Swatch Copy with Toast
 * - DM Pattern Canvas Rendering (Hero & Variants)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initHeroGridCanvas();
  initColorCopy();
  initAnatomyInteraction();
  initPatternCanvases();
});

/* ===================================================================
   NEW SECTIONS — DEV MATRIX INTERACTIVE JAVASCRIPT
   Sections: Challenges, Quiz, Code Challenge, Guess Tech,
             Matrix Game, Tech Memory, Facts, Timeline, Gallery, Coming Soon
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Dev Matrix Challenges
  initChallenges();
  // Computer Science Quiz
  initQuiz();
  // Code Challenge
  initCodeChallenge();
  // Guess the Technology
  initGuessTech();
  // Matrix Game
  initMatrixGame();
  // Tech Memory
  initTechMemory();
  // Dev Matrix Facts
  initFacts();
  // Tech Timeline
  initTimeline();
});

/* ===================================================================
   1. DEV MATRIX CHALLENGES — Modal with inline Q&A
=================================================================== */
function initChallenges() {
  const challengeData = {
    algorithms: {
      icon: '🧠', title: 'تحدي الخوارزميات',
      desc: 'أسئلة تحليلية حول الخوارزميات وتقييم التعقيد الزمني والمكاني.',
      questions: [
        { q: 'ما هو التعقيد الزمني لخوارزمية Binary Search في أسوأ الحالات؟', opts: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], ans: 1 },
        { q: 'أي خوارزمية فرز تعمل بتعقيد O(n log n) في المتوسط والأسوأ؟', opts: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort'], ans: 2 },
        { q: 'ما هو التعقيد المكاني لخوارزمية DFS (Depth-First Search)؟', opts: ['O(1)', 'O(V)', 'O(E)', 'O(V+E)'], ans: 1 },
        { q: 'ما نوع المشكلة التي تحلها خوارزمية Dijkstra؟', opts: ['Sorting', 'Shortest Path', 'String Matching', 'Graph Coloring'], ans: 1 },
      ]
    },
    coding: {
      icon: '💻', title: 'تحدي البرمجة',
      desc: 'تحديات برمجية عملية تقيس مهاراتك في التفكير المنطقي.',
      questions: [
        { q: 'ما ناتج: 2 ** 10 في Python؟', opts: ['20', '1024', '100', '512'], ans: 1 },
        { q: 'ما الفرق بين list و tuple في Python؟', opts: ['لا فرق', 'Tuple قابل للتعديل، List لا', 'List قابل للتعديل، Tuple لا', 'Tuple أسرع فقط'], ans: 2 },
        { q: 'في JavaScript، ماذا يطبع: console.log(typeof null)؟', opts: ['"null"', '"undefined"', '"object"', '"boolean"'], ans: 2 },
        { q: 'ما ناتج: [1,2,3].length في JavaScript؟', opts: ['2', '3', '4', 'undefined'], ans: 1 },
      ]
    },
    debug: {
      icon: '🔍', title: 'اكتشف الخطأ',
      desc: 'ابحث عن الخطأ في الكود التالي.',
      questions: [
        { q: 'ما الخطأ في: for(int i=0; i<=10; i++) { print(i); }  — بدأ من 0 وطباعة 10 أرقام فقط؟', opts: ['لا خطأ — يطبع 0-10', 'i<=10 يطبع 11 رقماً', 'print خاطئة', 'الحلقة لا تعمل'], ans: 1 },
        { q: 'في Python: x = [1,2,3]; x.append(4,5) — ما المشكلة؟', opts: ['لا مشكلة', 'append تأخذ وسيطًا واحدًا فقط', 'القائمة لا تقبل أرقام', 'يجب استخدام extend'], ans: 1 },
        { q: 'ما مشكلة هذا الكود: if (x = 5) { }  في C؟', opts: ['لا مشكلة', 'يجب استخدام == للمقارنة', 'x غير معرّف', 'الأقواس خاطئة'], ans: 1 },
        { q: 'في SQL: SELECT * FROM users WHERE name = Ahmed — ما الخطأ؟', opts: ['لا خطأ', 'يجب استخدام علامات اقتباس حول Ahmed', 'SELECT خاطئة', 'FROM خاطئة'], ans: 1 },
      ]
    },
    logic: {
      icon: '🧩', title: 'تحدي المنطق',
      desc: 'ألغاز منطقية مستوحاة من علوم الحاسوب.',
      questions: [
        { q: 'إذا كان: NOT (A AND B) = TRUE، فأي من التالي صحيح؟', opts: ['A=TRUE و B=TRUE', 'A=FALSE أو B=FALSE', 'A=TRUE و B=FALSE فقط', 'A=FALSE و B=FALSE فقط'], ans: 1 },
        { q: 'ما قيمة: 5 XOR 3 بالنظام الثنائي؟', opts: ['6', '7', '8', '2'], ans: 0 },
        { q: 'الرقم 255 في النظام العشري يساوي في النظام الثنائي:', opts: ['11111110', '11111111', '11110000', '10000000'], ans: 1 },
        { q: 'A = TRUE, B = FALSE. ما قيمة A OR (NOT B)؟', opts: ['FALSE', 'TRUE', 'NULL', 'Error'], ans: 1 },
      ]
    },
    speed: {
      icon: '⚡', title: 'تحدي السرعة',
      desc: 'أجب عن أكبر عدد ممكن من الأسئلة — الدقة والسرعة!',
      questions: [
        { q: 'لماذا يبدأ المبرمجون العد من 0؟', opts: ['عادة قديمة', 'لأن العناوين تبدأ من 0', 'لتوفير ذاكرة', 'بسبب لغة C فقط'], ans: 1 },
        { q: 'ما الـ IDE الأشهر لتطوير Android؟', opts: ['Xcode', 'Android Studio', 'Visual Studio', 'Eclipse'], ans: 1 },
        { q: 'HTTP يرمز إلى؟', opts: ['Hyper Text Transfer Protocol', 'High Transfer Text Protocol', 'Hyper Transfer Tech Protocol', 'None'], ans: 0 },
        { q: 'أي لغة تُستخدم لتصميم قواعد بيانات علائقية؟', opts: ['Python', 'SQL', 'HTML', 'CSS'], ans: 1 },
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
      <div class="modal-qlist">
    `;

    data.questions.forEach((q, qi) => {
      html += `<div class="modal-q" id="mq${qi}">
        <div class="modal-q-text">${qi+1}. ${q.q}</div>
        <div class="modal-opts">
          ${q.opts.map((opt, oi) => `<button class="modal-opt" data-qi="${qi}" data-oi="${oi}">${opt}</button>`).join('')}
        </div>
      </div>`;
    });

    html += `</div><div class="modal-score-bar" id="modalScoreBar"><span>النقاط: <span id="modalScore">0</span> / ${data.questions.length}</span><span id="modalStatus">أجب عن الأسئلة</span></div>`;
    content.innerHTML = html;

    content.querySelectorAll('.modal-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = parseInt(btn.dataset.qi);
        const oi = parseInt(btn.dataset.oi);
        if (answered[qi]) return;
        answered[qi] = true;

        const correct = data.questions[qi].ans;
        const allOpts = content.querySelectorAll(`.modal-opt[data-qi="${qi}"]`);
        allOpts.forEach((o, i) => {
          if (i === correct) o.classList.add('correct');
          else if (i === oi && oi !== correct) o.classList.add('wrong');
          o.style.pointerEvents = 'none';
        });

        if (oi === correct) score++;
        content.querySelector('#modalScore').textContent = score;

        const allDone = answered.every(Boolean);
        if (allDone) {
          const pct = Math.round((score / data.questions.length) * 100);
          content.querySelector('#modalStatus').textContent = pct >= 75 ? '🎉 ممتاز!' : pct >= 50 ? '👍 جيد!' : '📚 حاول مجدداً';
        }
      });
    });

    modal.classList.add('open');
  };

  window.closeChallenge = function() {
    document.getElementById('challengeModal').classList.remove('open');
  };

  // Close on overlay click
  document.getElementById('challengeModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'challengeModal') closeChallenge();
  });
}

/* ===================================================================
   2. COMPUTER SCIENCE QUIZ
=================================================================== */
function initQuiz() {
  const allQuestions = [
    { cat: 'programming', catLabel: 'Programming', q: 'ما هي وظيفة الخوارزمية؟', opts: ['تخزين البيانات', 'حل مشكلة بخطوات محددة', 'تصميم واجهة المستخدم', 'إدارة الذاكرة'], ans: 1 },
    { cat: 'programming', catLabel: 'Programming', q: 'ما الفرق بين Compiler وInterpreter؟', opts: ['لا فرق', 'Compiler يترجم كاملاً، Interpreter سطراً بسطر', 'Interpreter أسرع', 'Compiler للـ Web فقط'], ans: 1 },
    { cat: 'algorithms', catLabel: 'Algorithms', q: 'ما تعقيد Bubble Sort في أسوأ الحالات؟', opts: ['O(n)', 'O(log n)', 'O(n²)', 'O(n log n)'], ans: 2 },
    { cat: 'algorithms', catLabel: 'Algorithms', q: 'ما هي خوارزمية BFS تستخدم؟', opts: ['Stack', 'Queue', 'Array', 'Tree'], ans: 1 },
    { cat: 'databases', catLabel: 'Databases', q: 'ما اختصار SQL؟', opts: ['Structured Query Language', 'Simple Query Language', 'System Query Logic', 'Structured Quick Language'], ans: 0 },
    { cat: 'databases', catLabel: 'Databases', q: 'ما المفتاح الأساسي (Primary Key)؟', opts: ['حقل مكرر', 'حقل فريد يعرّف السجل', 'أول عمود في الجدول', 'حقل مطلوب فقط'], ans: 1 },
    { cat: 'networks', catLabel: 'Networks', q: 'ما بروتوكول نقل الملفات عبر الإنترنت؟', opts: ['HTTP', 'FTP', 'SMTP', 'SSH'], ans: 1 },
    { cat: 'networks', catLabel: 'Networks', q: 'كم عدد بتات عنوان IPv4؟', opts: ['16', '32', '64', '128'], ans: 1 },
    { cat: 'cybersecurity', catLabel: 'Cyber Security', q: 'ما هجوم Man-in-the-Middle؟', opts: ['هجوم على قاعدة البيانات', 'اعتراض الاتصال بين طرفين', 'هجوم رفض الخدمة', 'اختراق كلمة المرور'], ans: 1 },
    { cat: 'cybersecurity', catLabel: 'Cyber Security', q: 'ما هو HTTPS؟', opts: ['بروتوكول HTTP مشفّر', 'نسخة أسرع من HTTP', 'بروتوكول نقل ملفات', 'بروتوكول بريد'], ans: 0 },
    { cat: 'ai', catLabel: 'Artificial Intelligence', q: 'ما هو Machine Learning؟', opts: ['برمجة قواعد يدوية', 'تعليم الحاسوب من البيانات', 'تصميم الروبوتات', 'معالجة اللغة فقط'], ans: 1 },
    { cat: 'ai', catLabel: 'Artificial Intelligence', q: 'ما نوع تعلم يُستخدم في تصنيف الصور؟', opts: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Transfer Only'], ans: 2 },
    { cat: 'web', catLabel: 'Web Development', q: 'ما لغة هيكلة صفحات الويب؟', opts: ['CSS', 'JavaScript', 'HTML', 'Python'], ans: 2 },
    { cat: 'web', catLabel: 'Web Development', q: 'ما دور CSS في الويب؟', opts: ['التفاعل والمنطق', 'تنسيق المظهر والشكل', 'التواصل مع الخادم', 'هيكلة المحتوى'], ans: 1 },
    { cat: 'programming', catLabel: 'Computer Science', q: 'ما الـ RAM؟', opts: ['ذاكرة القراءة فقط', 'ذاكرة عشوائية للوصول السريع المؤقت', 'وحدة المعالجة المركزية', 'قرص التخزين'], ans: 1 },
    { cat: 'algorithms', catLabel: 'Computer Science', q: 'ما الـ Stack يعتمد على مبدأ؟', opts: ['FIFO', 'LIFO', 'Random', 'Priority'], ans: 1 },
  ];

  let selectedCat = 'all';
  let activeQuestions = [];
  let currentQ = 0;
  let score = 0;
  let answered = false;

  const catBtns = document.querySelectorAll('.quiz-cat-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCat = btn.dataset.cat;
    });
  });

  document.getElementById('startQuizBtn')?.addEventListener('click', startQuiz);
  document.getElementById('quizNextBtn')?.addEventListener('click', nextQuestion);
  document.getElementById('quizRetryBtn')?.addEventListener('click', resetQuiz);

  function startQuiz() {
    let pool = selectedCat === 'all' ? allQuestions : allQuestions.filter(q => q.cat === selectedCat);
    if (pool.length < 10) pool = [...allQuestions];
    activeQuestions = shuffle(pool).slice(0, 10);
    currentQ = 0; score = 0; answered = false;
    show('quizPlay'); hide('quizStart'); hide('quizResult');
    renderQuestion();
  }

  function renderQuestion() {
    const q = activeQuestions[currentQ];
    const total = activeQuestions.length;
    const pct = (currentQ / total) * 100;

    document.getElementById('quizProgressFill').style.width = pct + '%';
    document.getElementById('quizProgressText').textContent = `${currentQ + 1} / ${total}`;
    document.getElementById('quizScoreLive').textContent = score;
    document.getElementById('quizCatTag').textContent = q.catLabel;
    document.getElementById('quizQuestion').textContent = q.q;

    const optsEl = document.getElementById('quizOptions');
    optsEl.innerHTML = '';
    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(i));
      optsEl.appendChild(btn);
    });

    hide('quizFeedback');
    hide('quizNextBtn');
    answered = false;
  }

  function selectAnswer(chosen) {
    if (answered) return;
    answered = true;
    const q = activeQuestions[currentQ];
    const opts = document.querySelectorAll('.quiz-option');
    const fb = document.getElementById('quizFeedback');

    opts.forEach((btn, i) => {
      btn.style.pointerEvents = 'none';
      if (i === q.ans) btn.classList.add('correct');
      else if (i === chosen && chosen !== q.ans) btn.classList.add('wrong');
    });

    if (chosen === q.ans) {
      score++;
      fb.textContent = '✅ إجابة صحيحة!';
      fb.className = 'quiz-feedback correct-feedback';
    } else {
      fb.textContent = `❌ الإجابة الصحيحة: ${q.opts[q.ans]}`;
      fb.className = 'quiz-feedback wrong-feedback';
    }

    document.getElementById('quizScoreLive').textContent = score;
    show('quizFeedback');
    show('quizNextBtn');
  }

  function nextQuestion() {
    currentQ++;
    if (currentQ >= activeQuestions.length) {
      showResult();
    } else {
      renderQuestion();
    }
  }

  function showResult() {
    hide('quizPlay');
    show('quizResult');
    const total = activeQuestions.length;
    const pct = Math.round((score / total) * 100);
    document.getElementById('resultScore').textContent = `${score} / ${total}`;
    let label = '', icon = '';
    if (pct === 100) { label = 'Perfect Score! 🌟'; icon = '🏆'; }
    else if (pct >= 80) { label = 'Great Job! 🎉'; icon = '🎉'; }
    else if (pct >= 60) { label = 'Good Work! 👍'; icon = '👍'; }
    else if (pct >= 40) { label = 'Keep Practicing! 📚'; icon = '📚'; }
    else { label = 'Try Again! 💪'; icon = '💪'; }
    document.getElementById('resultLabel').textContent = label;
    document.getElementById('resultIcon').textContent = icon;
  }

  function resetQuiz() {
    show('quizStart'); hide('quizPlay'); hide('quizResult');
  }
}

/* ===================================================================
   3. CODE CHALLENGE
=================================================================== */
function initCodeChallenge() {
  const challenges = [
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

  document.getElementById('startCCBtn')?.addEventListener('click', startCC);
  document.getElementById('ccNextBtn')?.addEventListener('click', nextCC);
  document.getElementById('ccRetryBtn')?.addEventListener('click', resetCC);

  function startCC() {
    idx = 0; score = 0; answered = false;
    show('ccPlay'); hide('ccStart'); hide('ccResult');
    renderCC();
  }

  function renderCC() {
    const c = challenges[idx];
    document.getElementById('ccProgress').textContent = `${idx+1} / ${challenges.length}`;
    document.getElementById('ccScore').textContent = score;
    document.getElementById('ccLang').textContent = c.lang;
    document.getElementById('ccCode').textContent = c.code;

    const optsEl = document.getElementById('ccOptions');
    optsEl.innerHTML = '';
    c.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'cc-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectCC(i));
      optsEl.appendChild(btn);
    });

    hide('ccFeedback'); hide('ccNextBtn');
    answered = false;
  }

  function selectCC(chosen) {
    if (answered) return;
    answered = true;
    const c = challenges[idx];
    const opts = document.querySelectorAll('.cc-opt');
    const fb = document.getElementById('ccFeedback');

    opts.forEach((btn, i) => {
      btn.style.pointerEvents = 'none';
      if (i === c.ans) btn.classList.add('correct');
      else if (i === chosen && chosen !== c.ans) btn.classList.add('wrong');
    });

    if (chosen === c.ans) {
      score++;
      fb.textContent = '✅ Correct!';
      fb.className = 'cc-feedback correct-feedback';
    } else {
      fb.textContent = `❌ The answer was: ${c.opts[c.ans]}`;
      fb.className = 'cc-feedback wrong-feedback';
    }

    document.getElementById('ccScore').textContent = score;
    show('ccFeedback'); show('ccNextBtn');
  }

  function nextCC() {
    idx++;
    if (idx >= challenges.length) {
      hide('ccPlay'); show('ccResult');
      const pct = Math.round((score / challenges.length) * 100);
      document.getElementById('ccResultScore').textContent = `${score} / ${challenges.length}`;
      document.getElementById('ccResultLabel').textContent = pct >= 80 ? 'Excellent Coder! 🏆' : pct >= 60 ? 'Good Job! 👍' : 'Keep Practicing! 💪';
    } else {
      renderCC();
    }
  }

  function resetCC() {
    show('ccStart'); hide('ccPlay'); hide('ccResult');
  }
}

/* ===================================================================
   4. GUESS THE TECHNOLOGY
=================================================================== */
function initGuessTech() {
  const rounds = [
    { clue: 'أنا لغة تُستخدم لبناء صفحات ويب تفاعلية. أعمل في المتصفح وأغيّر المحتوى دون إعادة تحميل الصفحة.\nWho Am I?', opts: ['HTML', 'CSS', 'JavaScript', 'SQL'], ans: 2 },
    { clue: 'أنا أُعرَّف البيانات بأسماء وأنواع مثل int، String، وFloat. أتعامل مع قواعد بيانات علائقية مباشرة.\nWho Am I?', opts: ['Python', 'SQL', 'HTML', 'Java'], ans: 1 },
    { clue: 'أنا نظام تتبع الإصدارات الأشهر في العالم. يستخدمني المطورون لحفظ تاريخ التغييرات في الكود.\nWho Am I?', opts: ['GitHub', 'Docker', 'Git', 'SVN'], ans: 2 },
    { clue: 'أنا منصة استضافة للمشاريع مبنية على Git. أتيح التعاون بين المطورين حول العالم.\nWho Am I?', opts: ['Git', 'GitLab', 'GitHub', 'Bitbucket'], ans: 2 },
    { clue: 'أنا إطار عمل JavaScript لبناء واجهات مستخدم. طورتني شركة Google. أعتمد على TypeScript.\nWho Am I?', opts: ['React', 'Vue', 'Angular', 'Svelte'], ans: 2 },
    { clue: 'أنا لغة برمجة مفسَّرة عالية المستوى، بسيطة الصياغة، ومشهورة في الذكاء الاصطناعي وعلوم البيانات.\nWho Am I?', opts: ['Java', 'Python', 'C++', 'Go'], ans: 1 },
    { clue: 'أنا تقنية حاوية (Container) تُستخدم لتشغيل التطبيقات بيئيًا معزولة وقابلة للنقل.\nWho Am I?', opts: ['Kubernetes', 'Docker', 'Nginx', 'Linux'], ans: 1 },
    { clue: 'أنا قاعدة بيانات NoSQL. أخزّن البيانات بتنسيق JSON-like. طورتني MongoDB Inc.\nWho Am I?', opts: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase'], ans: 2 },
  ];

  let idx = 0, score = 0, answered = false;

  document.getElementById('startGTBtn')?.addEventListener('click', startGT);
  document.getElementById('gtNextBtn')?.addEventListener('click', nextGT);
  document.getElementById('gtRetryBtn')?.addEventListener('click', resetGT);

  function startGT() {
    idx = 0; score = 0; answered = false;
    show('gtPlay'); hide('gtStart'); hide('gtResult');
    renderGT();
  }

  function renderGT() {
    const r = rounds[idx];
    document.getElementById('gtProgress').textContent = `${idx+1} / ${rounds.length}`;
    document.getElementById('gtScore').textContent = score;
    document.getElementById('gtClue').textContent = r.clue;

    const optsEl = document.getElementById('gtOptions');
    optsEl.innerHTML = '';
    r.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'gt-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectGT(i));
      optsEl.appendChild(btn);
    });

    hide('gtFeedback'); hide('gtNextBtn');
    answered = false;
  }

  function selectGT(chosen) {
    if (answered) return;
    answered = true;
    const r = rounds[idx];
    const opts = document.querySelectorAll('.gt-opt');
    const fb = document.getElementById('gtFeedback');

    opts.forEach((btn, i) => {
      btn.style.pointerEvents = 'none';
      if (i === r.ans) btn.classList.add('correct');
      else if (i === chosen && chosen !== r.ans) btn.classList.add('wrong');
    });

    if (chosen === r.ans) {
      score++;
      fb.textContent = `✅ صحيح! أنا ${r.opts[r.ans]}`;
      fb.className = 'gt-feedback correct-feedback';
    } else {
      fb.textContent = `❌ الإجابة: ${r.opts[r.ans]}`;
      fb.className = 'gt-feedback wrong-feedback';
    }

    document.getElementById('gtScore').textContent = score;
    show('gtFeedback'); show('gtNextBtn');
  }

  function nextGT() {
    idx++;
    if (idx >= rounds.length) {
      hide('gtPlay'); show('gtResult');
      const pct = Math.round((score / rounds.length) * 100);
      document.getElementById('gtResultScore').textContent = `${score} / ${rounds.length}`;
      document.getElementById('gtResultLabel').textContent = pct >= 80 ? 'Tech Expert! 🌐' : pct >= 50 ? 'Good Guesser! 👍' : 'Keep Learning! 📚';
    } else {
      renderGT();
    }
  }

  function resetGT() {
    show('gtStart'); hide('gtPlay'); hide('gtResult');
  }
}

/* ===================================================================
   5. MATRIX GAME
=================================================================== */
function initMatrixGame() {
  const symbols = ['A','B','C','D','E','F','G','H','0','1','2','3','4','5','6','7','8','9','DM','CS','AI','ML','WEB','JS','PY','DB','OS','ALG','NET','SEC','BIT','HEX'];
  let target = '';
  let timerVal = 30;
  let timerInterval = null;
  let gameScore = 0;
  let gameLevel = 1;
  let gameRunning = false;
  let startTime = 0;

  const mgStartBtn = document.getElementById('mgStartBtn');
  const mgPlayAgain = document.getElementById('mgPlayAgain');

  mgStartBtn?.addEventListener('click', startMG);
  mgPlayAgain?.addEventListener('click', startMG);

  function startMG() {
    gameScore = 0; gameLevel = 1; gameRunning = true;
    hide('mgResult');
    document.getElementById('mgResult')?.classList.add('hidden');
    document.getElementById('mgScore').textContent = 0;
    document.getElementById('mgLevel').textContent = 1;
    startTime = Date.now();
    startRound();
  }

  function startRound() {
    timerVal = Math.max(10, 35 - (gameLevel - 1) * 5);
    document.getElementById('mgTimer').textContent = timerVal;
    clearInterval(timerInterval);

    // Pick target
    const combo = generateTarget(gameLevel);
    target = combo;
    document.getElementById('mgTarget').textContent = target;

    buildGrid();

    timerInterval = setInterval(() => {
      timerVal--;
      document.getElementById('mgTimer').textContent = timerVal;
      if (timerVal <= 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);
  }

  function generateTarget(level) {
    const pool = level <= 2 ? symbols.slice(0, 10) : level <= 4 ? symbols.slice(0, 20) : symbols;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function buildGrid() {
    const grid = document.getElementById('mgGrid');
    const cols = Math.min(8 + (gameLevel - 1) * 2, 14);
    const rows = Math.min(4 + (gameLevel - 1), 8);
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.innerHTML = '';

    const pool = gameLevel <= 2 ? symbols.slice(0, 15) : symbols;
    const total = cols * rows;
    const cells = [];

    // Place target randomly
    const targetPos = Math.floor(Math.random() * total);
    for (let i = 0; i < total; i++) {
      if (i === targetPos) {
        cells.push(target);
      } else {
        let sym;
        do { sym = pool[Math.floor(Math.random() * pool.length)]; } while (sym === target);
        cells.push(sym);
      }
    }

    cells.forEach((sym, i) => {
      const cell = document.createElement('div');
      cell.className = 'mg-cell';
      cell.textContent = sym;
      cell.addEventListener('click', () => {
        if (!gameRunning) return;
        if (sym === target) {
          cell.classList.add('target-hit');
          gameScore += Math.max(10, timerVal * gameLevel);
          document.getElementById('mgScore').textContent = gameScore;
          gameLevel++;
          document.getElementById('mgLevel').textContent = gameLevel;
          clearInterval(timerInterval);
          setTimeout(startRound, 700);
        } else {
          cell.classList.add('wrong-hit');
          gameScore = Math.max(0, gameScore - 5);
          document.getElementById('mgScore').textContent = gameScore;
          setTimeout(() => cell.classList.remove('wrong-hit'), 400);
        }
      });
      grid.appendChild(cell);
    });
  }

  function endGame() {
    gameRunning = false;
    clearInterval(timerInterval);
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    document.getElementById('mgFinalScore').textContent = gameScore;
    document.getElementById('mgFinalTime').textContent = elapsed;
    document.getElementById('mgGrid').innerHTML = '';
    document.getElementById('mgResult').classList.remove('hidden');
  }
}

/* ===================================================================
   6. TECH MEMORY GAME
=================================================================== */
function initTechMemory() {
  const techItems = [
    { emoji: '🌐', label: 'HTML' },
    { emoji: '🎨', label: 'CSS' },
    { emoji: '⚡', label: 'JS' },
    { emoji: '🐍', label: 'Python' },
    { emoji: '📱', label: 'Flutter' },
    { emoji: '🔥', label: 'Firebase' },
    { emoji: '🌿', label: 'Git' },
    { emoji: '🐙', label: 'GitHub' },
  ];

  let attempts = 0, pairs = 0, tmTimerVal = 0, tmInterval = null;
  let flipped = [], locked = false;

  document.getElementById('tmRestartBtn')?.addEventListener('click', buildMemory);
  buildMemory();

  function buildMemory() {
    attempts = 0; pairs = 0; tmTimerVal = 0; flipped = []; locked = false;
    document.getElementById('tmAttempts').textContent = 0;
    document.getElementById('tmPairs').textContent = 0;
    document.getElementById('tmTime').textContent = 0;
    clearInterval(tmInterval);
    tmInterval = setInterval(() => {
      tmTimerVal++;
      document.getElementById('tmTime').textContent = tmTimerVal;
    }, 1000);

    const board = document.getElementById('tmBoard');
    board.innerHTML = '';
    const cards = shuffle([...techItems, ...techItems]);
    cards.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'tm-card';
      card.dataset.label = item.label;
      card.innerHTML = `
        <div class="tm-card-inner">
          <div class="tm-card-face tm-card-back">
            <div class="tm-card-back-pattern">DM</div>
          </div>
          <div class="tm-card-face tm-card-front">
            <div class="tm-card-emoji">${item.emoji}</div>
            <div class="tm-card-label">${item.label}</div>
          </div>
        </div>`;
      card.addEventListener('click', () => flipCard(card));
      board.appendChild(card);
    });
  }

  function flipCard(card) {
    if (locked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    flipped.push(card);
    if (flipped.length === 2) {
      locked = true;
      attempts++;
      document.getElementById('tmAttempts').textContent = attempts;
      const [a, b] = flipped;
      if (a.dataset.label === b.dataset.label) {
        a.classList.add('matched'); b.classList.add('matched');
        pairs++;
        document.getElementById('tmPairs').textContent = pairs;
        flipped = []; locked = false;
        if (pairs === techItems.length) {
          clearInterval(tmInterval);
        }
      } else {
        setTimeout(() => {
          a.classList.remove('flipped'); b.classList.remove('flipped');
          flipped = []; locked = false;
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
    { icon: '🌐', text: 'Tim Berners-Lee invented the World Wide Web in 1991, and he made it freely available to everyone — no patents, no royalties.', source: 'W3C Foundation' },
    { icon: '💾', text: 'The first 1GB hard drive, made by IBM in 1980, weighed over 500 pounds and cost $40,000.', source: 'IBM Archives' },
    { icon: '⌨️', text: 'The QWERTY keyboard layout was designed in 1873 to slow typists down so typewriter keys wouldn\'t jam.', source: 'Smithsonian Magazine' },
    { icon: '🤖', text: 'Alan Turing proposed the Turing Test in 1950 to evaluate whether a machine can exhibit intelligent behavior equivalent to a human.', source: 'ACM Computing' },
    { icon: '🖥️', text: 'ENIAC (1945) was the first general-purpose computer. It could perform 5,000 additions per second. Today\'s CPUs do billions.', source: 'Penn Engineering' },
    { icon: '📱', text: 'There are more mobile phones on Earth than there are people. As of 2024, there are over 8.9 billion mobile connections.', source: 'GSMA Report' },
    { icon: '🔐', text: 'The most common password in the world is still "123456". Over 23 million accounts use it globally.', source: 'NCSC Report' },
    { icon: '🐧', text: 'Linux, created by Linus Torvalds in 1991, now runs over 96.3% of the world\'s top one million web servers.', source: 'W3Techs' },
    { icon: '🧮', text: 'The first programming language was Ada, designed by Ada Lovelace in the 1840s — over 100 years before the first computer!', source: 'Computer History Museum' },
    { icon: '🌍', text: 'Google processes over 8.5 billion searches per day — that\'s about 99,000 per second.', source: 'Internet Live Stats' },
    { icon: '🎮', text: 'The video game industry generates more revenue than movies and music combined. In 2023, it exceeded $200 billion globally.', source: 'Newzoo Report' },
  ];

  let currentFact = 0;

  const dotsEl = document.getElementById('factsDots');
  if (!dotsEl) return;

  // Build dots
  facts.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'facts-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => showFact(i));
    dotsEl.appendChild(dot);
  });

  showFact(0);

  document.getElementById('factsNextBtn')?.addEventListener('click', () => {
    currentFact = (currentFact + 1) % facts.length;
    showFact(currentFact);
  });

  document.getElementById('factsPrevBtn')?.addEventListener('click', () => {
    currentFact = (currentFact - 1 + facts.length) % facts.length;
    showFact(currentFact);
  });

  function showFact(idx) {
    currentFact = idx;
    const f = facts[idx];
    const iconEl = document.getElementById('factsIcon');
    const textEl = document.getElementById('factsText');
    const srcEl = document.getElementById('factsSource');

    // Animate out/in
    [iconEl, textEl, srcEl].forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(10px)'; el.style.transition = 'all 0.3s ease'; });
    setTimeout(() => {
      iconEl.textContent = f.icon;
      textEl.textContent = f.text;
      srcEl.textContent = '— ' + f.source;
      [iconEl, textEl, srcEl].forEach(el => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
    }, 200);

    document.querySelectorAll('.facts-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }
}

/* ===================================================================
   8. TECH TIMELINE
=================================================================== */
function initTimeline() {
  const items = document.querySelectorAll('.tl-item');
  const panel = document.getElementById('tlDetailInner');
  if (!panel) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const detail = item.querySelector('.tl-detail');
      if (detail) {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(8px)';
        panel.style.transition = 'all 0.3s ease';
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
   UTILITY HELPERS
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
  if (el) el.classList.remove('hidden');
}

function hide(id) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (el) el.classList.add('hidden');
}


/* ===================================================================
   1. NAVIGATION & SCROLL TRACKING
=================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  // Navbar glass background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Active section tracking
  function updateActiveNav() {
    const scrollPos = window.scrollY + 160;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
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
}

/* ===================================================================
   2. SCROLL REVEAL (INTERSECTION OBSERVER)
=================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ===================================================================
   3. HERO CANVAS — DIGITAL NETWORK GRID
=================================================================== */
function initHeroGridCanvas() {
  const canvas = document.getElementById('gridCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let mouse = { x: width / 2, y: height / 2, radius: 150 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initPoints();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Create geometric nodes
  let points = [];
  const pointCount = Math.min(Math.floor((width * height) / 16000), 75);

  function initPoints() {
    points = [];
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.5,
        baseX: 0,
        baseY: 0
      });
    }
  }
  initPoints();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle isometric grid lines
    ctx.strokeStyle = 'rgba(21, 101, 192, 0.035)';
    ctx.lineWidth = 1;
    const gridSize = 60;

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Update and draw points
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw point
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30, 136, 229, 0.4)';
      ctx.fill();

      // Connect near points
      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const opacity = (1 - dist / 130) * 0.18;
          ctx.strokeStyle = `rgba(21, 101, 192, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Mouse proximity interaction
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < mouse.radius) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(41, 182, 246, ${(1 - mdist / mouse.radius) * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
}

/* ===================================================================
   4. COLOR PALETTE COPY SYSTEM
=================================================================== */
function initColorCopy() {
  const cards = document.querySelectorAll('.color-card');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  cards.forEach(card => {
    const hex = card.getAttribute('data-hex');
    const btn = card.querySelector('.copy-btn');
    if (!hex) return;

    // Card click or button click
    card.addEventListener('click', () => {
      copyColorCode(hex);
    });

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyColorCode(hex);
      });
    }
  });

  function copyColorCode(color) {
    navigator.clipboard.writeText(color).then(() => {
      showToast(`تم نسخ الكود: ${color}`);
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = color;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(`تم نسخ الكود: ${color}`);
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }
}

// Global copy function called from inline onclick fallback
window.copyColor = function(hex, btn) {
  navigator.clipboard.writeText(hex);
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = `تم نسخ الكود: ${hex}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }
};

/* ===================================================================
   5. ANATOMY OF THE LOGO (HOTSPOTS & LEGEND)
=================================================================== */
function initAnatomyInteraction() {
  const hotspots = document.querySelectorAll('.hotspot');
  const legendItems = document.querySelectorAll('.legend-item');

  legendItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      highlightItem(index);
    });

    item.addEventListener('mouseleave', () => {
      resetHighlights();
    });

    item.addEventListener('click', () => {
      highlightItem(index);
    });
  });

  hotspots.forEach((spot, index) => {
    spot.addEventListener('mouseenter', () => {
      highlightItem(index);
    });

    spot.addEventListener('mouseleave', () => {
      resetHighlights();
    });
  });

  function highlightItem(idx) {
    hotspots.forEach((spot, i) => {
      if (i === idx) {
        spot.classList.add('active');
      } else {
        spot.classList.remove('active');
      }
    });

    legendItems.forEach((item, i) => {
      if (i === idx) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function resetHighlights() {
    hotspots.forEach(spot => spot.classList.remove('active'));
    legendItems.forEach(item => item.classList.remove('active'));
  }
}

/* ===================================================================
   6. DM PATTERN CANVASES GENERATION
=================================================================== */
function initPatternCanvases() {
  // Main Pattern Canvas
  const mainCanvas = document.getElementById('dmPatternCanvas');
  if (mainCanvas) {
    drawDMPattern(mainCanvas, {
      bg: '#F8FAFD',
      stroke: 'rgba(21, 101, 192, 0.18)',
      accent: 'rgba(41, 182, 246, 0.28)',
      size: 70
    });
  }

  // Mini preview in visual style
  const miniCanvas = document.getElementById('miniPattern');
  if (miniCanvas) {
    drawDMPattern(miniCanvas, {
      bg: '#FFFFFF',
      stroke: 'rgba(21, 101, 192, 0.2)',
      accent: 'rgba(41, 182, 246, 0.3)',
      size: 45
    });
  }

  // Dark variant
  const pvDark = document.getElementById('pvDark');
  if (pvDark) {
    drawDMPattern(pvDark, {
      bg: '#0A1224',
      stroke: 'rgba(41, 182, 246, 0.22)',
      accent: 'rgba(30, 136, 229, 0.35)',
      size: 50
    });
  }

  // Light variant
  const pvLight = document.getElementById('pvLight');
  if (pvLight) {
    drawDMPattern(pvLight, {
      bg: '#FFFFFF',
      stroke: 'rgba(21, 101, 192, 0.15)',
      accent: 'rgba(41, 182, 246, 0.25)',
      size: 50
    });
  }

  // Blue variant
  const pvMid = document.getElementById('pvMid');
  if (pvMid) {
    drawDMPattern(pvMid, {
      bg: '#0D2B8E',
      stroke: 'rgba(255, 255, 255, 0.22)',
      accent: 'rgba(41, 182, 246, 0.4)',
      size: 50
    });
  }

  /**
   * Helper function to draw the isometric geometric DM pattern
   */
  function drawDMPattern(canvas, options) {
    const parent = canvas.parentElement;
    const width = canvas.width = parent.clientWidth || 300;
    const height = canvas.height = parent.clientHeight || 150;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = options.bg;
    ctx.fillRect(0, 0, width, height);

    const s = options.size;
    const rowHeight = s * 0.86;

    let row = 0;
    for (let y = -s; y < height + s * 2; y += rowHeight) {
      const offsetX = (row % 2 === 0) ? 0 : s * 0.75;
      for (let x = -s; x < width + s * 2; x += s * 1.5) {
        drawDMSymbol(ctx, x + offsetX, y, s * 0.45, options);
      }
      row++;
    }
  }

  /**
   * Draw an individual geometric DM isometric emblem
   */
  function drawDMSymbol(ctx, cx, cy, r, opts) {
    ctx.save();
    ctx.translate(cx, cy);

    // Hexagon border
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const hx = r * Math.cos(angle);
      const hy = r * Math.sin(angle);
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.strokeStyle = opts.stroke;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Geometric DM inner details
    ctx.beginPath();
    // Human head dot at top
    ctx.arc(0, -r * 0.42, r * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = opts.accent;
    ctx.fill();

    // D and M stylized lines
    ctx.beginPath();
    // Left D spine
    ctx.moveTo(-r * 0.5, -r * 0.15);
    ctx.lineTo(-r * 0.5, r * 0.5);
    ctx.lineTo(-r * 0.15, r * 0.3);
    ctx.lineTo(-r * 0.15, 0);
    ctx.lineTo(-r * 0.5, -r * 0.15);

    // Right M polygon
    ctx.moveTo(0, 0);
    ctx.lineTo(r * 0.25, -r * 0.3);
    ctx.lineTo(r * 0.5, 0);
    ctx.lineTo(r * 0.5, r * 0.5);
    ctx.lineTo(r * 0.3, r * 0.4);
    ctx.lineTo(r * 0.3, r * 0.15);
    ctx.lineTo(r * 0.1, r * 0.3);

    ctx.strokeStyle = opts.accent;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    ctx.restore();
  }
}

