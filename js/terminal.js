/* ============================================
   TERMINAL — Hidden easter egg (press backtick)
   A fake terminal overlay with fun commands
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const quotes = [
    '"Programs must be written for people to read." — Hal Abelson',
    '"Any fool can write code that a computer can understand." — Martin Fowler',
    '"First, solve the problem. Then, write the code." — John Johnson',
    '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
    '"Simplicity is the soul of efficiency." — Austin Freeman',
    '"Talk is cheap. Show me the code." — Linus Torvalds',
    '"The best error message is the one that never shows up." — Thomas Fuchs',
    '"Security is always excessive until it\'s not enough." — Robbie Sinclair',
  ];

  const commands = {
    help: () => `Available commands:
  Navigation:
    whoami           — About me
    ls projects      — List all projects
    cat <project>    — Project details (e.g. cat meetify)
    cat research     — Research & publications
    skills           — Technical skills
    experience       — Work history
    education        — Academic background

  Actions:
    open github      — Open GitHub profile
    open linkedin    — Open LinkedIn profile
    ssh hire         — Send me an email
    theme            — Toggle dark/light mode
    contact          — Contact information

  Fun:
    neofetch         — System info display
    fortune          — Random programming quote
    date             — Current date & time
    echo <text>      — Echo text back
    history          — Command history
    sudo hire        — Try it ;)
    clear            — Clear terminal
    exit             — Close terminal`,

    whoami: () => `Shehabul Islam Sawraz
Software Engineer L2 @ Iron Software
CSE Graduate — BUET (CGPA: 3.68/4.00)
PhD Applicant — Systems Security & Energy-Efficient Computing
Dhaka, Bangladesh

President, BUET Cyber Security Club (2023-24)
Winner, BASIS National ICT Awards 2020`,

    'ls projects': () => `drwxr-xr-x  Meetify/            2025  Next.js video conferencing
drwxr-xr-x  ChaatNChat/         2024  Real-time chat + Socket.IO
drwxr-xr-x  PicPred/            2024  AI image classifier
drwxr-xr-x  MusicClassify/      2024  Audio ML pipeline
drwxr-xr-x  ParkedCar/          2023  Parking rental marketplace
drwxr-xr-x  YACC/               2022  Compiler from scratch
drwxr-xr-x  YAPG/               2022  Hardware Pong on ATMega32
drwxr-xr-x  Chess/              2021  GameJam chess engine
drwxr-xr-x  eM-Client/          2021  Desktop email client
drwxr-xr-x  HelloDoctor/        2021  Doctor-patient Android app
drwxr-xr-x  RentaStay/          2021  Django room rental platform

 11 items — use 'cat <name>' for details`,

    'cat meetify': () => `[Meetify — A Virtual Meeting Hub] (2025)
Stack: Next.js, TypeScript, Clerk, GetStream, Tailwind CSS, ShadCN

Production-grade video conferencing with real-time meetings,
screen sharing, session recording, participant controls,
role-based auth, personalized rooms with shareable links,
and future meeting scheduling.

→ github.com/Shehabul-Islam-Sawraz/Meetify`,

    'cat chaatnChat': () => `[ChaatNChat] (2024)
Stack: Express.js, React, Socket.IO, PostgreSQL, Redux, Redis

Full-stack real-time chat with Socket.IO bidirectional messaging,
JWT auth, Sequelize ORM, Redis session caching, Cloudinary
media storage, and Redux Toolkit for optimistic UI updates.

→ github.com/Shehabul-Islam-Sawraz/ChaatNChat`,

    'cat picpred': () => `[PicPred] (2024)
Stack: Django, React, TensorFlow, Keras, InceptionResNetV2

AI-powered image classification using Django REST + React.
Keras InceptionResNetV2 for high-accuracy multi-class prediction.
Drag-and-drop upload with clean RESTful API architecture.

→ github.com/Shehabul-Islam-Sawraz/PicPred`,

    'cat yacc': () => `[YACC — Yet Another Compiler Compiler] (2022)
Stack: C, Flex, Bison, x86 Assembly

Full compiler from scratch: symbol table manager, Flex lexer,
Bison semantic analyzer with type checking, and final x86
assembly code generator. One of the most rigorous academic
projects in the CSE curriculum.

→ github.com/Shehabul-Islam-Sawraz/CSE_310_Compiler_Sessional`,

    'cat yapg': () => `[YAPG — Yet Another Pong Game] (2022)
Stack: ATMega32, Embedded C, Ultrasonic Sonar, LED Matrix

Hardware-level Pong on ATMega32 — no OS, no framework.
Ultrasonic Sonar paddle control, haptic feedback via vibration
motor, and real-time game state on LED Matrix + LCD Display.

→ github.com/Shehabul-Islam-Sawraz/YAPG-Yet_Another_Pong_Game`,

    'cat research': () => `=== Publication ===
"Zero-shot Prompting for Code Complexity Prediction Using GitHub Copilot"
IEEE/ACM NLBSE 2023 | DOI: 10.1109/NLBSE59153.2023.00018
Authors: Santos, Siddiq, Samee, Azgor, Haider, Sawraz

=== Undergraduate Thesis ===
"Adaptive Duty Cycling Leveraging Heterogeneous Sleep Modes
for Modbus-Based Wired IoT Systems"
Supervisor: Dr. A.B.M. Alim Al Islam, Professor, BUET (2024)

• Duty cycling applied to energy-efficient wired networks
• Master-Slave hierarchy with RL-based adaptive cycling
• Significant reductions in energy usage under extreme conditions`,

    skills: () => `Languages:    C  C++  C#  Python  Java  JS  TS  x86 ASM  SQL  Bash  LaTeX
Frameworks:   .NET  Next.js  React  Express  Django  Redux  Tailwind
Databases:    PostgreSQL  MySQL  Oracle  MongoDB  Redis  Prisma  Sequelize
Cloud/DevOps: Azure  Docker  WASM  Git
Security:     Wazuh  Wireshark  CodeQL  Semgrep  Autopsy  NMap
Design:       Photoshop  Illustrator`,

    experience: () => `┌────────────────────────────────────────────────────────────┐
│  [2026–Present]  Software Engineer L2 @ Iron Software      │
│                  Leading product legacy, customer liaison   │
│                  WASM barcode engine, HTML rendering        │
├────────────────────────────────────────────────────────────┤
│  [2025–2026]     Software Engineer @ Iron Software         │
│                  PDF processing, digital signatures, OCR   │
│                  3.4x faster TIFF, PDF/UA compliance       │
├────────────────────────────────────────────────────────────┤
│  [2024–2025]     Software Security Engineer @ OpenRefactory│
│                  iCR product suite, SBOM analysis, CLI     │
│                  Backend architecture for 1000+ projects   │
├────────────────────────────────────────────────────────────┤
│  [2024]          Embedded SW Engineer Intern @ Limbics AI  │
│                  IoT architecture, Azure Cloud, sensors    │
└────────────────────────────────────────────────────────────┘`,

    education: () => `BUET — B.Sc CSE (2019–2024) | CGPA: 3.68/4.00
  Dean's Honor List (3x)
  Coursework: OOP, DSA, Embedded Systems, Discrete Math,
  Linear Algebra, Calculus, Probability & Statistics

Dhaka College — H.S.C (2016–2018) | GPA: 5.00/5.00`,

    contact: () => `Email:    shehabulislamsawraz@gmail.com
Phone:    +880 1627 230364
GitHub:   github.com/Shehabul-Islam-Sawraz
LinkedIn: linkedin.com/in/shehabul-islam-sawraz-ba03542ab`,

    neofetch: () => `
   ╭──────────────────╮    sawraz@portfolio
   │   ▄▄▄▄▄  ▄▄▄▄▄  │    ─────────────────
   │   █   █  █   █   │    OS:       Web/HTML5
   │   ▀▄▄▄▀ ▀▄▄▄▀   │    Host:    GitHub Pages
   │     ▄▄▄▄▄▄▄      │    Uptime:  Since 2025
   │     █     █       │    Shell:   vanilla.js
   │     ▀▀▀▀▀▀▀      │    Theme:   Emerald/Amber
   ╰──────────────────╯    Editor:   VS Code
                            Lang:     C# / JS / Python
                            Coffee:   ████████████ 100%`,

    fortune: () => quotes[Math.floor(Math.random() * quotes.length)],

    date: () => new Date().toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit',
      second: '2-digit'
    }),

    theme: () => {
      document.getElementById('theme-toggle').click();
      return 'Theme toggled!';
    },

    'open github': () => {
      window.open('https://github.com/Shehabul-Islam-Sawraz', '_blank');
      return 'Opening GitHub...';
    },

    'open linkedin': () => {
      window.open('https://www.linkedin.com/in/shehabul-islam-sawraz-ba03542ab/', '_blank');
      return 'Opening LinkedIn...';
    },

    'ssh hire': () => {
      setTimeout(() => {
        window.location.href = 'mailto:shehabulislamsawraz@gmail.com?subject=Let%27s%20Talk!';
      }, 500);
      return `Connecting to hire@sawraz.dev...
Connection established! Opening email client...`;
    },

    'sudo hire': () => `[sudo] password for visitor: ********
Access granted! ✨

Just kidding — no sudo needed.
Type 'ssh hire' to send me an email directly!`,

    pwd: () => '/home/visitor/sawraz-portfolio',
  };

  /* Build terminal DOM */
  const overlay = document.createElement('div');
  overlay.className = 'terminal-overlay';
  overlay.innerHTML = `
    <div class="terminal-box">
      <div class="terminal-header">
        <div class="terminal-dots">
          <span class="dot-red"></span>
          <span class="dot-yellow"></span>
          <span class="dot-green"></span>
        </div>
        <span class="terminal-title">sawraz@portfolio ~ $</span>
        <button class="terminal-close" aria-label="Close terminal">&times;</button>
      </div>
      <div class="terminal-body">
        <div class="terminal-output"></div>
        <div class="terminal-input-line">
          <span class="terminal-prompt">$ </span>
          <input type="text" class="terminal-input" autocomplete="off" spellcheck="false" autofocus>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const output = overlay.querySelector('.terminal-output');
  const input = overlay.querySelector('.terminal-input');
  const closeBtn = overlay.querySelector('.terminal-close');
  const history = [];
  let historyIdx = -1;

  function print(text, cls = '') {
    const div = document.createElement('div');
    div.className = 'terminal-line ' + cls;
    div.textContent = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  function printWelcome() {
    print('Welcome to Sawraz Terminal v1.0', 'terminal-accent');
    print("Type 'help' for available commands.", '');
    print('', '');
  }

  function execute(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    print('$ ' + cmd, 'terminal-cmd');

    if (trimmed === 'clear') {
      output.innerHTML = '';
      printWelcome();
      return;
    }

    if (trimmed === 'exit') {
      close();
      return;
    }

    /* echo command */
    if (trimmed.startsWith('echo ')) {
      print(cmd.trim().substring(5));
      print('', '');
      return;
    }

    /* history command */
    if (trimmed === 'history') {
      if (history.length === 0) {
        print('No commands in history.');
      } else {
        history.slice().reverse().forEach((h, i) => {
          print(`  ${i + 1}  ${h}`);
        });
      }
      print('', '');
      return;
    }

    /* cat <project> — try lowercase matching */
    if (trimmed.startsWith('cat ') && trimmed !== 'cat research') {
      const project = trimmed.substring(4).trim();
      const key = Object.keys(commands).find(k =>
        k.startsWith('cat ') && k.substring(4).toLowerCase().replace(/\s+/g, '') === project.replace(/\s+/g, '')
      );
      if (key) {
        const result = commands[key]();
        if (result) print(result);
        print('', '');
        return;
      }
    }

    const handler = commands[trimmed];
    if (handler) {
      const result = handler();
      if (result) print(result);
    } else if (trimmed) {
      print(`command not found: ${trimmed}. Type 'help' for commands.`, 'terminal-error');
    }
    print('', '');
  }

  function open() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (!output.children.length) printWelcome();
    setTimeout(() => input.focus(), 100);
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* Backtick toggle */
  document.addEventListener('keydown', (e) => {
    /* Don't trigger if typing in an input/textarea or palette is open */
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (document.querySelector('.palette-overlay.active')) return;

    if (e.key === '`') {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        close();
      } else {
        open();
      }
    }
  });

  /* Input handling */
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value;
      if (cmd.trim()) history.unshift(cmd);
      historyIdx = -1;
      execute(cmd);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        historyIdx++;
        input.value = history[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        historyIdx--;
        input.value = history[historyIdx];
      } else {
        historyIdx = -1;
        input.value = '';
      }
    } else if (e.key === 'Escape') {
      close();
    }
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
});
