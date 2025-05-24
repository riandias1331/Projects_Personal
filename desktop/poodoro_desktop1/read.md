# Creating a Pomodoro Timer with Electron.js

This guide walks you through building a simple Pomodoro timer application using Electron.js.

---

## 1. Project Setup

Create a new directory and initialize your project:

```bash
mkdir pomodoro-electron
cd pomodoro-electron
npm init -y
npm install electron --save-dev
```

---

## 2. Project Structure

```
pomodoro-electron/
├── node_modules/          # Installed dependencies
├── main.js               # Main Electron process
├── index.html            # Renderer process HTML
├── renderer.js           # Renderer process JavaScript
├── styles.css            # CSS styles
├── package.json          # Project configuration
└── package-lock.json     # Auto-generated (after npm install)
```

---

## 3. File Details

### main.js (Main Process)

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        resizable: false
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
```

---

### index.html (Renderer Process)

```html
<!DOCTYPE html>
<html>
<head>
        <meta charset="UTF-8">
        <title>Pomodoro Timer</title>
        <link rel="stylesheet" href="styles.css">
</head>
<body>
        <div class="container">
                <h1>Pomodoro Timer</h1>
                <div class="timer" id="timer">25:00</div>
                <div class="controls">
                        <button id="startBtn">Start</button>
                        <button id="pauseBtn" disabled>Pause</button>
                        <button id="resetBtn">Reset</button>
                </div>
                <div class="mode-selector">
                        <button class="mode-btn active" id="pomodoroBtn">Pomodoro</button>
                        <button class="mode-btn" id="shortBreakBtn">Short Break</button>
                        <button class="mode-btn" id="longBreakBtn">Long Break</button>
                </div>
                <div class="counter" id="counter">Pomodoros: 0</div>
        </div>
        <script src="renderer.js"></script>
</body>
</html>
```

---

### styles.css

```css
body {
        font-family: 'Arial', sans-serif;
        background-color: #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        color: #333;
}

.container {
        text-align: center;
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 300px;
}

h1 {
        margin-top: 0;
        color: #e74c3c;
}

.timer {
        font-size: 48px;
        font-weight: bold;
        margin: 20px 0;
        color: #2c3e50;
}

.controls {
        margin: 20px 0;
}

button {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 0 5px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
}

button:hover {
        background-color: #2980b9;
}

button:disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
}

.mode-selector {
        margin: 20px 0;
}

.mode-btn {
        background-color: #ecf0f1;
        color: #2c3e50;
        margin: 0 5px;
}

.mode-btn.active {
        background-color: #e74c3c;
        color: white;
}

.counter {
        margin-top: 20px;
        font-size: 14px;
        color: #7f8c8d;
}
```

---

### renderer.js (Renderer Process)

```javascript
let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let pomodoroCount = 0;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const pomodoroBtn = document.getElementById('pomodoroBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');
const counterDisplay = document.getElementById('counter');

function updateDisplay() {
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
        if (isRunning) return;
        
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        
        timer = setInterval(() => {
                if (seconds === 0) {
                        if (minutes === 0) {
                                clearInterval(timer);
                                isRunning = false;
                                notifyCompletion();
                                return;
                        }
                        minutes--;
                        seconds = 59;
                } else {
                        seconds--;
                }
                updateDisplay();
        }, 1000);
}

function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
}

function resetTimer() {
        pauseTimer();
        setMode('pomodoro');
        updateDisplay();
}

function setMode(mode) {
        // Reset all buttons to inactive
        pomodoroBtn.classList.remove('active');
        shortBreakBtn.classList.remove('active');
        longBreakBtn.classList.remove('active');
        
        // Set the selected mode
        switch (mode) {
                case 'pomodoro':
                        minutes = 25;
                        seconds = 0;
                        pomodoroBtn.classList.add('active');
                        break;
                case 'shortBreak':
                        minutes = 5;
                        seconds = 0;
                        shortBreakBtn.classList.add('active');
                        break;
                case 'longBreak':
                        minutes = 15;
                        seconds = 0;
                        longBreakBtn.classList.add('active');
                        break;
        }
        
        updateDisplay();
}

function notifyCompletion() {
        const notification = new Notification('Pomodoro Timer', {
                body: pomodoroBtn.classList.contains('active') ? 
                            'Time for a break!' : 'Time to work!',
                silent: false
        });
        
        if (pomodoroBtn.classList.contains('active')) {
                pomodoroCount++;
                counterDisplay.textContent = `Pomodoros: ${pomodoroCount}`;
                
                if (pomodoroCount % 4 === 0) {
                        setMode('longBreak');
                } else {
                        setMode('shortBreak');
                }
        } else {
                setMode('pomodoro');
        }
        
        startTimer(); // Auto-start the next session
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

pomodoroBtn.addEventListener('click', () => {
        if (!isRunning) setMode('pomodoro');
});

shortBreakBtn.addEventListener('click', () => {
        if (!isRunning) setMode('shortBreak');
});

longBreakBtn.addEventListener('click', () => {
        if (!isRunning) setMode('longBreak');
});

// Initialize
updateDisplay();

// Request notification permission
if (Notification.permission !== 'granted') {
        Notification.requestPermission();
}
```

---

### package.json

```json
{
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

---

## 4. Running the Application

Install dependencies (only needed once):

```bash
npm install
```

Start your Electron application:

```bash
npm start
```

---

## 5. Features

- **Three Modes:** Pomodoro (25 min), Short Break (5 min), Long Break (15 min)
- **Controls:** Start, Pause, Reset buttons
- **Automatic Mode Switching:** After a Pomodoro, switches to a break; after 4 Pomodoros, switches to a long break
- **Notification System:** Desktop notifications when a session ends
- **Pomodoro Counter:** Tracks completed Pomodoro sessions

---

## 6. Customization & Packaging

- Modify timer durations, appearance, and behavior in the respective files.
- To package as a distributable app, use tools like `electron-packager` or `electron-builder`.

---

## 7. Additional Suggestions

- Add an `assets/` folder for images/icons
- Use `preload.js` for secure context isolation
- Add an `icons/` folder for platform-specific icons
- Organize code in a `src/` folder as the app grows
- Use `build/` or `dist/` for packaged files

---

This structure follows Electron's basic architecture and is ideal for a single-window Pomodoro timer app. As your project grows, consider further organizing your files.
