/* ==========================================================================
   AYITI QUIZ - MOTEUR DE JEU JAVASCRIPT (MULTILINGUE & INTERACTIF)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. TRADUCTIONS DES INTERFACES (5 LANGUES)
  // ------------------------------------------------------------------------
  const UI_TEXTS = {
    ht: {
      slogan: "Apreann pandan w ap jwe • Kilti ak Istwa Ayiti",
      easy: "Fasil (30s)", hard: "Difisil (20s)", pro: "Pro (10s)",
      tickets: "Tikè", score: "Sipò", winMsg: "Bravo !",
      streakMsg: "Bèl rekò ! (+10 Pwen)", loseMsg: "Echèk ! Bonn repons lan se toujou vèt.",
      timeOutMsg: "Tan an fini !", noTickets: "Ou pa gen tikè ankò ! Rann ou nan boutik la oswa tann.",
      geniusMode: "Match de Jenik", passRemaining: "Pase", bulbRemaining: "Anpoul",
      p1Turn: "Jwè 1 - Tour ou", p2Turn: "Jwè 2 - Tour ou", winnerP1: "Jwè 1 Genyen !", winnerP2: "Jwè 2 Genyen !", draw: "Egalite !",
      shareText: "Mwen fè {score} pwen nan Ayiti Quiz! Ou ka bat mwen?"
    },
    fr: {
      slogan: "Apprendre en jouant • Culture et Histoire d'Haïti",
      easy: "Facile (30s)", hard: "Difficile (20s)", pro: "Pro (10s)",
      tickets: "Tickets", score: "Score", winMsg: "Bravo !",
      streakMsg: "Beau record ! (+10 Pts)", loseMsg: "Échec ! La bonne réponse est surlignée en vert.",
      timeOutMsg: "Temps écoulé !", noTickets: "Plus de tickets ! Rechargez vos tickets pour continuer.",
      geniusMode: "Match de Génie", passRemaining: "Passer", bulbRemaining: "Ampoule",
      p1Turn: "Joueur 1 - À vous", p2Turn: "Joueur 2 - À vous", winnerP1: "Joueur 1 Gagne !", winnerP2: "Joueur 2 Gagne !", draw: "Égalité !",
      shareText: "J'ai obtenu {score} points sur Ayiti Quiz ! Peux-tu faire mieux ?"
    },
    en: {
      slogan: "Learn through play • Haiti History & Culture",
      easy: "Easy (30s)", hard: "Hard (20s)", pro: "Pro (10s)",
      tickets: "Tickets", score: "Score", winMsg: "Bravo!",
      streakMsg: "Great record! (+10 Pts)", loseMsg: "Failed! The correct answer is highlighted in green.",
      timeOutMsg: "Time's up!", noTickets: "Out of tickets! Refill tickets to keep playing.",
      geniusMode: "Genius Match", passRemaining: "Pass", bulbRemaining: "Bulb",
      p1Turn: "Player 1 - Your Turn", p2Turn: "Player 2 - Your Turn", winnerP1: "Player 1 Wins!", winnerP2: "Player 2 Wins!", draw: "Draw!",
      shareText: "I scored {score} points on Ayiti Quiz! Can you beat me?"
    },
    es: {
      slogan: "Aprender jugando • Historia y Cultura de Haití",
      easy: "Fácil (30s)", hard: "Difícil (20s)", pro: "Pro (10s)",
      tickets: "Boletos", score: "Puntos", winMsg: "¡Bravo!",
      streakMsg: "¡Gran récord! (+10 Pts)", loseMsg: "¡Fallaste! La respuesta correcta está resaltada en verde.",
      timeOutMsg: "¡Tiempo agotado!", noTickets: "¡Sin boletos! Recarga para seguir jugando.",
      geniusMode: "Duelo de Genios", passRemaining: "Pasar", bulbRemaining: "Ampolleta",
      p1Turn: "Jugador 1 - Tu Turno", p2Turn: "Jugador 2 - Tu Turno", winnerP1: "¡Gana Jugador 1!", winnerP2: "¡Gana Jugador 2!", draw: "¡Empate!",
      shareText: "¡Conseguí {score} puntos en Ayiti Quiz! ¿Puedes superarme?"
    },
    pt: {
      slogan: "Aprender jogando • História e Cultura do Haiti",
      easy: "Fácil (30s)", hard: "Difícil (20s)", pro: "Pro (10s)",
      tickets: "Ingressos", score: "Pontos", winMsg: "Bravo!",
      streakMsg: "Belo recorde! (+10 Pts)", loseMsg: "Falhou! A resposta correta está destacada em verde.",
      timeOutMsg: "Tempo esgotado!", noTickets: "Sem ingressos! Recarregue para continuar.",
      geniusMode: "Partida de Gênios", passRemaining: "Passar", bulbRemaining: "Lâmpada",
      p1Turn: "Jogador 1 - Sua Vez", p2Turn: "Jogador 2 - Sua Vez", winnerP1: "Jogador 1 Venceu!", winnerP2: "Jogador 2 Venceu!", draw: "Empate!",
      shareText: "Fiz {score} pontos no Ayiti Quiz! Consegue superar?"
    }
  };

  // ------------------------------------------------------------------------
  // 2. BASE DE DONNÉES DES QUESTIONS (MULTILINGUE HAÏTI)
  // ------------------------------------------------------------------------
  const QUESTION_BANK = [
    {
      category: "Histoire / Istwa",
      question: {
        ht: "Nan ki ane Haïti te deklawe endepandans li ?",
        fr: "En quelle année Haïti a-t-elle proclamé son indépendance ?",
        en: "In which year did Haiti declare its independence?",
        es: "¿En qué año declaró Haití su independencia?",
        pt: "Em que ano o Haiti declarou sua independência?"
      },
      options: ["1791", "1804", "1806", "1820"],
      answer: 1
    },
    {
      category: "Histoire / Istwa",
      question: {
        ht: "Kiyès ki te premye anperè nan peyi d Ayiti ?",
        fr: "Qui fut le premier empereur d'Haïti ?",
        en: "Who was the first Emperor of Haiti?",
        es: "¿Quién fue el primer emperador de Haití?",
        pt: "Quem foi o primeiro imperador do Haiti?"
      },
      options: ["Toussaint Louverture", "Jean-Jacques Dessalines", "Henri Christophe", "Alexandre Pétion"],
      answer: 1
    },
    {
      category: "Géographie / Jewografi",
      question: {
        ht: "Ki dezyèm pi gwo vil nan peyi d Ayiti ?",
        fr: "Quelle est la deuxième plus grande ville d'Haïti ?",
        en: "What is the second largest city in Haiti?",
        es: "¿Cuál es la segunda ciudad más grande de Haití?",
        pt: "Qual é a segunda maior cidade do Haiti?"
      },
      options: ["Les Cayes", "Cap-Haïtien", "Gonaïves", "Jacmel"],
      answer: 1
    },
    {
      category: "Culture / Kilti",
      question: {
        ht: "Ki soup tradisyonèl ayisyen ki senbolize libète ?",
        fr: "Quelle soupe traditionnelle haïtienne symbolise la liberté ?",
        en: "Which traditional Haitian soup symbolizes freedom?",
        es: "¿Qué sopa tradicional haitiana simboliza la libertad?",
        pt: "Qual sopa tradicional haitiana simboliza a liberdade?"
      },
      options: ["Soup Makawoni", "Soup Joumou", "Soup Pwa", "Soup Legim"],
      answer: 1
    },
    {
      category: "Musique / Muzik",
      question: {
        ht: "Kiyès ki kreye ritm Konpa Dirèk an 1955 ?",
        fr: "Qui a créé le genre Konpa Dirèk en 1955 ?",
        en: "Who created the Konpa Dirèk genre in 1955?",
        es: "¿Quién creó el género Konpa Dirèk en 1955?",
        pt: "Quem criou o gênero Konpa Dirèk em 1955?"
      },
      options: ["Coupe Cloué", "Nemours Jean-Baptiste", "Weber Sicot", "Arly Larivière"],
      answer: 1
    },
    {
      category: "Patrimoine / Eritaj",
      question: {
        ht: "Ki fòtrès majestuez ki sitiye nan Milot, nan nò peyi d Ayiti ?",
        fr: "Quelle citadelle majestueuse est située à Milot, dans le Nord d'Haïti ?",
        en: "Which majestic fortress is located in Milot, Northern Haiti?",
        es: "¿Qué fortaleza majestuosa está ubicada en Milot, al norte de Haití?",
        pt: "Qual majestosa fortaleza está localizada em Milot, no norte do Haiti?"
      },
      options: ["Fort Jacques", "Citadelle Laferrière", "Fort Alexandre", "Citadelle Platons"],
      answer: 1
    },
    {
      category: "Actualités & Économie",
      question: {
        ht: "Ki non lajan ofisyèl peyi d Ayiti ?",
        fr: "Quel est le nom de la monnaie officielle d'Haïti ?",
        en: "What is the official currency of Haiti?",
        es: "¿Cuál es el nombre de la moneda oficial de Haití?",
        pt: "Qual é o nome da moeda oficial do Haiti?"
      },
      options: ["Peso", "Gourde", "Dollar", "Franc"],
      answer: 1
    },
    {
      category: "Sport / Espò",
      question: {
        ht: "Nan ki ane ekip foutbòl ayisyen an te jwe nan Coupe du Monde nan peyi Almay ?",
        fr: "En quelle année l'équipe haïtienne de football a-t-elle disputé la Coupe du Monde en Allemagne ?",
        en: "In which year did the Haitian football team play in the World Cup in Germany?",
        es: "¿En qué año jugó la selección haitiana de fútbol en la Copa del Mundo de Alemania?",
        pt: "Em que ano a seleção haitiana de futebol jogou a Copa do Mundo na Alemanha?"
      },
      options: ["1970", "1974", "1982", "1998"],
      answer: 1
    }
  ];

  // ------------------------------------------------------------------------
  // 3. ÉTAT DU JEU & VARIABLES GLOBALES
  // ------------------------------------------------------------------------
  let currentLang = "ht";
  let currentDifficulty = "easy"; // easy (30s), hard (20s), pro (10s)
  let score = 0;
  let streak = 0;
  let tickets = 5;
  let passesLeft = 5;
  let bulbsLeft = 3;

  let isSoundMuted = false;
  let isGamePaused = false;
  let isGeniusMode = false;

  // Timers & Questions
  let timerInterval = null;
  let timeLeft = 30;
  let maxTime = 30;
  let currentQuestionIndex = 0;
  let shuffledQuestions = [];

  // Variables Mode 2 Joueurs (Match de Génie)
  let p1Score = 0;
  let p2Score = 0;
  let activePlayer = 1; // 1 ou 2
  let geniusQuestionCount = 0;

  // ------------------------------------------------------------------------
  // 4. ÉLÉMENTS DU DOM
  // ------------------------------------------------------------------------
  const typewriterText = document.getElementById("typewriterText");
  const splashScreen = document.getElementById("splashScreen");
  const langSelect = document.getElementById("langSelect");
  const diffSelect = document.getElementById("diffSelect");

  const ticketCountEl = document.getElementById("ticketCount");
  const scoreCountEl = document.getElementById("scoreCount");
  const streakBoxEl = document.getElementById("streakBox");

  const timerBadgeEl = document.getElementById("timerBadge");
  const categoryBadgeEl = document.getElementById("categoryBadge");
  const questionTextEl = document.getElementById("questionText");
  const optionsGridEl = document.getElementById("optionsGrid");

  const geniusBannerEl = document.getElementById("geniusBanner");
  const geniusStatusEl = document.getElementById("geniusStatus");

  const passBtn = document.getElementById("passBtn");
  const bulbBtn = document.getElementById("bulbBtn");
  const passCountEl = document.getElementById("passCount");
  const bulbCountEl = document.getElementById("bulbCount");

  const feedbackMsgEl = document.getElementById("feedbackMsg");

  // Boutons de contrôle
  const muteBtn = document.getElementById("muteBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const restartBtn = document.getElementById("restartBtn");
  const nightModeBtn = document.getElementById("nightModeBtn");
  const geniusModeBtn = document.getElementById("geniusModeBtn");
  const shareBtn = document.getElementById("shareBtn");

  // Personnalisation RGB & Opacité
  const bgRedEl = document.getElementById("bgRed");
  const bgGreenEl = document.getElementById("bgGreen");
  const bgBlueEl = document.getElementById("bgBlue");
  const boxOpacityEl = document.getElementById("boxOpacity");

  // ------------------------------------------------------------------------
  // 5. SYNTHÉTISEUR AUDIO (WEB AUDIO API - HYMNE NATIONAL & SFX)
  // ------------------------------------------------------------------------
  let audioCtx = null;
  let anthemOsc = null;
  let isAnthemPlaying = false;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  // Jouer un effet sonore (Clic, Succès, Échec)
  function playSFX(type) {
    if (isSoundMuted) return;
    initAudioContext();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === "click") {
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "success") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === "error") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.setValueAtTime(164.81, now + 0.15); // E3
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  }

  // Mélodie douce "La Dessalinienne" (Style Sonnerie/Gaming 8-bit)
  function playAnthemMelody() {
    if (isSoundMuted || isAnthemPlaying) return;
    initAudioContext();
    isAnthemPlaying = true;

    // Notes douces de la Dessalinienne (fréquences Hz)
    const notes = [
      { f: 392.00, d: 0.3 }, { f: 392.00, d: 0.3 }, { f: 392.00, d: 0.3 },
      { f: 523.25, d: 0.6 }, { f: 440.00, d: 0.3 }, { f: 392.00, d: 0.6 },
      { f: 349.23, d: 0.3 }, { f: 329.63, d: 0.6 }, { f: 293.66, d: 0.6 }
    ];

    let startTime = audioCtx.currentTime + 0.1;

    notes.forEach((note) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine"; // Sonnerie douce
      osc.frequency.setValueAtTime(note.f, startTime);

      gain.gain.setValueAtTime(0.05, startTime);
      gain.gain.linearRampToValueAtTime(0.001, startTime + note.d - 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + note.d);

      startTime += note.d + 0.05;
    });

    setTimeout(() => {
      isAnthemPlaying = false;
    }, (startTime - audioCtx.currentTime) * 1000);
  }

  // ------------------------------------------------------------------------
  // 6. INITIALISATION ET ANIMATION D'ENTRÉE (TYPEWRITER)
  // ------------------------------------------------------------------------
  function initGame() {
    setupEventListeners();
    startTypewriterAnimation();
    updateUIStrings();
    resetGame();
  }

  function startTypewriterAnimation() {
    const textToType = "Ayiti Quiz...";
    let index = 0;
    typewriterText.textContent = "";

    const interval = setInterval(() => {
      typewriterText.textContent += textToType[index];
      index++;
      if (index >= textToType.length) {
        clearInterval(interval);
        setTimeout(() => {
          splashScreen.style.opacity = "0";
          setTimeout(() => {
            splashScreen.style.display = "none";
            playAnthemMelody();
          }, 500);
        }, 1200);
      }
    }, 200);
  }

  // ------------------------------------------------------------------------
  // 7. GESTION DES ÉVÉNEMENTS & REGLAGES
  // ------------------------------------------------------------------------
  function setupEventListeners() {
    // Changement de langue
    langSelect.addEventListener("change", (e) => {
      currentLang = e.target.value;
      updateUIStrings();
      renderQuestion();
    });

    // Changement de difficulté
    diffSelect.addEventListener("change", (e) => {
      currentDifficulty = e.target.value;
      if (currentDifficulty === "easy") maxTime = 30;
      else if (currentDifficulty === "hard") maxTime = 20;
      else if (currentDifficulty === "pro") maxTime = 10;
      resetTimer();
    });

    // Contrôles du menu
    muteBtn.addEventListener("click", () => {
      isSoundMuted = !isSoundMuted;
      muteBtn.textContent = isSoundMuted ? "🔇 Unmute" : "🔊 Mute";
      if (!isSoundMuted) playSFX("click");
    });

    pauseBtn.addEventListener("click", () => {
      isGamePaused = !isGamePaused;
      pauseBtn.textContent = isGamePaused ? "▶️ Resume" : "⏸️ Pause";
      if (isGamePaused) {
        clearInterval(timerInterval);
      } else {
        startTimer();
      }
    });

    restartBtn.addEventListener("click", () => {
      playSFX("click");
      resetGame();
    });

    nightModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("night-mode");
      playSFX("click");
    });

    // Mode Match de Génie (2 Joueurs)
    geniusModeBtn.addEventListener("click", () => {
      playSFX("click");
      isGeniusMode = !isGeniusMode;
      if (isGeniusMode) {
        geniusBannerEl.style.display = "block";
        geniusModeBtn.classList.add("active-mode");
        p1Score = 0;
        p2Score = 0;
        activePlayer = 1;
        geniusQuestionCount = 0;
      } else {
        geniusBannerEl.style.display = "none";
        geniusModeBtn.classList.remove("active-mode");
      }
      resetGame();
    });

    // Aides : Passer & Ampoule
    passBtn.addEventListener("click", handlePassHelp);
    bulbBtn.addEventListener("click", handleBulbHelp);

    // Bouton Partage
    shareBtn.addEventListener("click", () => {
      const shareData = {
        title: "Ayiti Quiz",
        text: UI_TEXTS[currentLang].shareText.replace("{score}", score),
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(shareData.text);
        alert("Texte de partage copié dans le presse-papier !");
      }
    });

    // Personnalisation Fond RGB & Opacité
    [bgRedEl, bgGreenEl, bgBlueEl].forEach(slider => {
      slider.addEventListener("input", updateCustomBackground);
    });

    boxOpacityEl.addEventListener("input", (e) => {
      const alpha = e.target.value;
      document.body.style.setProperty("--box-opacity", alpha);
    });
  }

  function updateCustomBackground() {
    const r = bgRedEl.value;
    const g = bgGreenEl.value;
    const b = bgBlueEl.value;
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }

  function updateUIStrings() {
    const t = UI_TEXTS[currentLang];
    document.getElementById("appSlogan").textContent = t.slogan;
    document.getElementById("ticketLabel").textContent = t.tickets + ":";
    document.getElementById("scoreLabel").textContent = t.score + ":";
    passCountEl.textContent = passesLeft;
    bulbCountEl.textContent = bulbsLeft;

    if (isGeniusMode) {
      geniusStatusEl.textContent = activePlayer === 1 ? t.p1Turn : t.p2Turn;
    }
  }

  // ------------------------------------------------------------------------
  // 8. LOGIQUE DU JEU & BOUCLE PRINCIPALE
  // ------------------------------------------------------------------------
  function resetGame() {
    score = 0;
    streak = 0;
    tickets = 5;
    passesLeft = 5;
    bulbsLeft = 3;

    ticketCountEl.textContent = tickets;
    scoreCountEl.textContent = score;
    streakBoxEl.style.display = "none";

    shuffledQuestions = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;

    loadQuestion();
  }

  function loadQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
      shuffledQuestions = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
      currentQuestionIndex = 0;
    }

    feedbackMsgEl.style.display = "none";
    feedbackMsgEl.className = "feedback-msg";

    renderQuestion();
    startTimer();
  }

  function renderQuestion() {
    const q = shuffledQuestions[currentQuestionIndex];
    categoryBadgeEl.textContent = q.category;
    questionTextEl.textContent = q.question[currentLang] || q.question.fr;

    optionsGridEl.innerHTML = "";
    q.options.forEach((optText, index) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = optText;
      btn.addEventListener("click", () => handleAnswerSelect(index));
      optionsGridEl.appendChild(btn);
    });

    if (isGeniusMode) {
      const t = UI_TEXTS[currentLang];
      geniusStatusEl.textContent = activePlayer === 1 
        ? `${t.p1Turn} (Pts: ${p1Score})` 
        : `${t.p2Turn} (Pts: ${p2Score})`;
    }
  }

  function startTimer() {
    clearInterval(timerInterval);
    timeLeft = maxTime;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      if (!isGamePaused) {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          handleTimeOut();
        }
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = maxTime;
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    timerBadgeEl.textContent = `${timeLeft}s`;
    if (timeLeft <= 5) {
      timerBadgeEl.style.background = "var(--color-danger)";
    } else {
      timerBadgeEl.style.background = "var(--color-accent)";
    }
  }

  // ------------------------------------------------------------------------
  // 9. VALIDATION DES RÉPONSES ET POINTS
  // ------------------------------------------------------------------------
  function handleAnswerSelect(selectedIndex) {
    if (isGamePaused) return;
    clearInterval(timerInterval);

    const q = shuffledQuestions[currentQuestionIndex];
    const buttons = optionsGridEl.querySelectorAll(".option-btn");
    const t = UI_TEXTS[currentLang];

    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.answer) {
      // BONNE RÉPONSE
      playSFX("success");
      buttons[selectedIndex].classList.add("correct");

      if (isGeniusMode) {
        if (activePlayer === 1) p1Score += 5;
        else p2Score += 5;
        showFeedback(t.winMsg, "success");
      } else {
        streak++;
        let pointsEarned = 5;

        if (streak >= 10) {
          pointsEarned += 5; // Bonus +5 (Total +10)
          showFeedback(t.streakMsg, "success");
        } else {
          showFeedback(t.winMsg, "success");
        }

        score += pointsEarned;
        scoreCountEl.textContent = score;

        if (streak >= 3) {
          streakBoxEl.style.display = "inline-block";
          streakBoxEl.textContent = `🔥 ${streak} Win Streak!`;
        }
      }
    } else {
      // MAUVAISE RÉPONSE
      playSFX("error");
      buttons[selectedIndex].classList.add("wrong");
      buttons[q.answer].classList.add("correct"); // Surbrillance verte de la bonne réponse

      if (isGeniusMode) {
        if (activePlayer === 1) p1Score = Math.max(0, p1Score - 5);
        else p2Score = Math.max(0, p2Score - 5);
        showFeedback(t.loseMsg, "error");
      } else {
        streak = 0;
        streakBoxEl.style.display = "none";
        tickets = Math.max(0, tickets - 1);
        ticketCountEl.textContent = tickets;
        showFeedback(t.loseMsg, "error");
      }
    }

    // Passage au tour suivant
    setTimeout(() => {
      if (!isGeniusMode && tickets <= 0) {
        alert(t.noTickets);
        return;
      }

      if (isGeniusMode) {
        geniusQuestionCount++;
        activePlayer = activePlayer === 1 ? 2 : 1;

        if (geniusQuestionCount >= 20) {
          let winnerMsg = p1Score > p2Score ? t.winnerP1 : (p2Score > p1Score ? t.winnerP2 : t.draw);
          alert(`Match de Génie Terminé !\n${winnerMsg}\nScore: J1 (${p1Score}) - J2 (${p2Score})`);
          isGeniusMode = false;
          geniusBannerEl.style.display = "none";
          resetGame();
          return;
        }
      }

      currentQuestionIndex++;
      loadQuestion();
    }, 2000);
  }

  function handleTimeOut() {
    playSFX("error");
    const q = shuffledQuestions[currentQuestionIndex];
    const buttons = optionsGridEl.querySelectorAll(".option-btn");
    const t = UI_TEXTS[currentLang];

    buttons.forEach(btn => btn.disabled = true);
    buttons[q.answer].classList.add("correct");

    if (!isGeniusMode) {
      streak = 0;
      streakBoxEl.style.display = "none";
      tickets = Math.max(0, tickets - 1);
      ticketCountEl.textContent = tickets;
    }

    showFeedback(t.timeOutMsg, "error");

    setTimeout(() => {
      if (!isGeniusMode && tickets <= 0) {
        alert(t.noTickets);
        return;
      }
      currentQuestionIndex++;
      loadQuestion();
    }, 2000);
  }

  // ------------------------------------------------------------------------
  // 10. SYSTÈME D'AIDE (PASSER & AMPOULE)
  // ------------------------------------------------------------------------
  function handlePassHelp() {
    if (passesLeft <= 0 || isGamePaused) return;
    playSFX("click");
    passesLeft--;
    passCountEl.textContent = passesLeft;
    currentQuestionIndex++;
    loadQuestion();
  }

  function handleBulbHelp() {
    if (bulbsLeft <= 0 || isGamePaused) return;
    playSFX("click");
    bulbsLeft--;
    bulbCountEl.textContent = bulbsLeft;

    const q = shuffledQuestions[currentQuestionIndex];
    handleAnswerSelect(q.answer); // Sélectionne automatiquement la bonne réponse
  }

  function showFeedback(msg, type) {
    feedbackMsgEl.textContent = msg;
    feedbackMsgEl.style.display = "block";
    feedbackMsgEl.className = `feedback-msg ${type}`;
  }

  // Démarrage de l'application
  initGame();
});