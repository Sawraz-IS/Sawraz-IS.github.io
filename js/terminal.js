/* ============================================
   TERMINAL — Hidden easter egg (press backtick)
   A fake terminal overlay with fun commands
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const commands = {
    help: () => `Available commands:
  whoami        — About me
  ls projects   — List projects
  cat research  — Research summary
  skills        — Technical skills
  experience    — Work history
  contact       — How to reach me
  ssh hire      — Let's talk!
  clear         — Clear terminal
  exit          — Close terminal`,

    whoami: () => `Shehabul Islam Sawraz
Software Engineer L2 @ Iron Software
CSE Graduate — BUET (CGPA: 3.68/4.00)
PhD Applicant — Systems Security & Energy-Efficient Computing
Dhaka, Bangladesh`,

    'ls projects': () => `drwxr-xr-x  Meetify/           2025  Next.js video conferencing
drwxr-xr-x  ChaatNChat/        2024  Real-time chat app
drwxr-xr-x  PicPred/           2024  AI image classifier
drwxr-xr-x  YACC/              2022  Compiler from scratch
drwxr-xr-x  YAPG/              2022  Hardware Pong on ATMega32
drwxr-xr-x  Chess/             2021  GameJam chess engine
drwxr-xr-x  eM-Client/         2021  Desktop email client
drwxr-xr-x  HelloDoctor/       2021  Doctor-patient Android app
drwxr-xr-x  RentaStay/         2021  Django room rental platform

 9 items — type 'help' for more commands`,

    'cat research': () => `=== Publication ===
"Zero-shot Prompting for Code Complexity Prediction Using GitHub Copilot"
IEEE/ACM NLBSE 2023 | DOI: 10.1109/NLBSE59153.2023.00018

=== Undergraduate Thesis ===
"Adaptive Duty Cycling Leveraging Heterogeneous Sleep Modes
for Modbus-Based Wired IoT Systems"
Supervisor: Dr. A.B.M. Alim Al Islam, Professor, BUET (2024)`,

    skills: () => `Languages:    C, C++, C#, Python, Java, JS, TS, x86 ASM, SQL
Frameworks:   .NET, Next.js, React, Express, Django, Redux
Databases:    PostgreSQL, MongoDB, Redis, Oracle, MySQL
Cloud/DevOps: Azure, Docker, WASM, Git
Security:     Wazuh, Wireshark, CodeQL, Semgrep, NMap`,

    experience: () => `[2026–Present] Software Engineer L2 @ Iron Software
[2025–2026]   Software Engineer @ Iron Software
[2024–2025]   Software Security Engineer @ OpenRefactory
[2024]        Embedded SW Engineer Intern @ Limbics AI`,

    contact: () => `Email:    shehabulislamsawraz@gmail.com
Phone:    +880 1627 230364
GitHub:   github.com/Shehabul-Islam-Sawraz
LinkedIn: linkedin.com/in/shehabul-islam-sawraz-ba03542ab`,

    'ssh hire': () => {
      setTimeout(() => {
        window.location.href = 'mailto:shehabulislamsawraz@gmail.com?subject=Let%27s%20Talk!';
      }, 500);
      return `Connecting to hire@sawraz.dev...
Connection established! Opening email client...`;
    },
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
