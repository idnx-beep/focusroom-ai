const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

export const STORAGE_KEYS = {
  goal: "focusroom.todayGoal",
  scene: "focusroom.lastScene",
  pomodoro: "focusroom.pomodoroSettings",
  sound: "focusroom.soundSettings",
  stats: "focusroom.studyStats",
  preferences: "focusroom.preferences",
  session: "focusroom.focusSession",
  history: "focusroom.studyHistory"
};

export const scenes = [
  {
    id: "morning-window",
    title: "清晨窗边",
    description: "雪山远景、晨光和安静书桌，把一天最稳定的专注力留在这里。",
    tags: ["晨光", "雪山", "轻钢琴"],
    image: assetPath("scenes/morning-window.webp"),
    music: "晨间钢琴",
    ambience: "窗外微风"
  },
  {
    id: "rainy-cafe",
    title: "雨天咖啡店",
    description: "雨声、暖灯和咖啡香气，适合阅读、刷题和长时间整理笔记。",
    tags: ["雨声", "暖灯", "Lo-fi"],
    image: assetPath("scenes/rainy-cafe.webp"),
    music: "Lo-fi Beats",
    ambience: "雨落玻璃"
  },
  {
    id: "midnight-library",
    title: "深夜图书馆",
    description: "木质书桌和幽暗书架，让复杂内容回到一页一页的秩序里。",
    tags: ["深夜", "图书馆", "白噪音"],
    image: assetPath("scenes/midnight-library.webp"),
    music: "低频环境音",
    ambience: "翻页白噪"
  },
  {
    id: "seaside-study",
    title: "海边书房",
    description: "海面、木纹和浅色窗帘，适合轻计划、语言学习和复盘。",
    tags: ["海风", "明亮", "氛围电子"],
    image: assetPath("scenes/seaside-study.webp"),
    music: "Ambient Flow",
    ambience: "海浪与风"
  }
];

export const durations = [25, 45, 50, 90];

export const musicPresets = [
  { id: "morning-piano", label: "晨间钢琴", wave: "sine", padWave: "triangle", notes: [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 392], chord: [261.63, 329.63, 392, 523.25], tempo: 620, filter: 2800, attack: 0.025, release: 1.35, delay: 0.22, feedback: 0.18, warmth: 0.82, shimmer: 0.42 },
  { id: "lofi-beats", label: "Lo-fi Beats", wave: "triangle", padWave: "sine", notes: [220, 277.18, 329.63, 415.3, 369.99, 329.63, 277.18, 329.63], chord: [110, 164.81, 220, 277.18], tempo: 470, filter: 2100, attack: 0.018, release: 0.92, delay: 0.31, feedback: 0.24, warmth: 0.72, shimmer: 0.18, pulse: true },
  { id: "deep-ambient", label: "深度氛围", wave: "sine", padWave: "sine", notes: [146.83, 196, 246.94, 293.66, 246.94, 196, 174.61, 196], chord: [73.42, 146.83, 196, 246.94], tempo: 780, filter: 1500, attack: 0.08, release: 1.8, delay: 0.42, feedback: 0.36, warmth: 0.95, shimmer: 0.12 },
  { id: "soft-synth", label: "柔和合成器", wave: "sawtooth", padWave: "triangle", notes: [174.61, 261.63, 349.23, 440, 392, 349.23, 293.66, 349.23], chord: [87.31, 174.61, 261.63, 349.23], tempo: 560, filter: 1900, attack: 0.04, release: 1.28, delay: 0.34, feedback: 0.28, warmth: 0.68, shimmer: 0.32 },
  { id: "study-bell", label: "清透铃音", wave: "sine", padWave: "sine", notes: [329.63, 392, 493.88, 659.25, 587.33, 493.88, 392, 493.88], chord: [164.81, 329.63, 392, 493.88], tempo: 690, filter: 3600, attack: 0.012, release: 1.5, delay: 0.38, feedback: 0.3, warmth: 0.62, shimmer: 0.72 },
  { id: "focus-strings", label: "专注弦乐垫", wave: "triangle", padWave: "sawtooth", notes: [196, 246.94, 293.66, 392, 349.23, 293.66, 246.94, 293.66], chord: [98, 196, 246.94, 293.66], tempo: 720, filter: 1750, attack: 0.075, release: 1.7, delay: 0.36, feedback: 0.32, warmth: 0.9, shimmer: 0.22 },
  { id: "nocturne", label: "夜读钢片琴", wave: "sine", padWave: "triangle", notes: [246.94, 293.66, 369.99, 493.88, 440, 369.99, 293.66, 369.99], chord: [123.47, 246.94, 293.66, 369.99], tempo: 640, filter: 3000, attack: 0.018, release: 1.45, delay: 0.33, feedback: 0.24, warmth: 0.7, shimmer: 0.65 },
  { id: "minimal-pulse", label: "极简脉冲", wave: "triangle", padWave: "sine", notes: [174.61, 220, 261.63, 329.63, 293.66, 261.63, 220, 261.63], chord: [87.31, 174.61, 220, 261.63], tempo: 520, filter: 2300, attack: 0.02, release: 0.86, delay: 0.24, feedback: 0.2, warmth: 0.66, shimmer: 0.28, pulse: true }
];

export const ambiencePresets = [
  { id: "window-breeze", label: "窗外微风", type: "lowpass", frequency: 620, q: 0.32, level: 0.13, noise: 0.72, motion: 0.18, air: 0.035 },
  { id: "rain-window", label: "雨落玻璃", type: "bandpass", frequency: 760, q: 0.86, level: 0.22, noise: 0.92, motion: 0.28, air: 0.075 },
  { id: "page-noise", label: "翻页白噪", type: "lowpass", frequency: 330, q: 0.36, level: 0.1, noise: 0.52, motion: 0.1, air: 0.02 },
  { id: "ocean-waves", label: "海浪与风", type: "lowpass", frequency: 520, q: 0.24, level: 0.2, noise: 0.9, motion: 0.52, air: 0.05 },
  { id: "cafe-hum", label: "咖啡店低语", type: "bandpass", frequency: 430, q: 0.62, level: 0.15, noise: 0.58, motion: 0.14, air: 0.025 },
  { id: "fireplace", label: "壁炉微响", type: "bandpass", frequency: 690, q: 0.82, level: 0.13, noise: 0.48, motion: 0.16, air: 0.02, crackle: true },
  { id: "forest-dawn", label: "清晨林间", type: "lowpass", frequency: 700, q: 0.3, level: 0.12, noise: 0.55, motion: 0.2, air: 0.04 },
  { id: "train-night", label: "夜行列车", type: "lowpass", frequency: 360, q: 0.42, level: 0.17, noise: 0.7, motion: 0.34, air: 0.025 }
];

export const defaultMusicByScene = {
  "morning-window": "morning-piano",
  "rainy-cafe": "lofi-beats",
  "midnight-library": "deep-ambient",
  "seaside-study": "soft-synth"
};

export const defaultAmbienceByScene = {
  "morning-window": "window-breeze",
  "rainy-cafe": "rain-window",
  "midnight-library": "page-noise",
  "seaside-study": "ocean-waves"
};

export const getMusicPreset = (sound, scene) =>
  musicPresets.find((preset) => preset.id === (sound.musicType || defaultMusicByScene[scene.id])) || musicPresets[0];

export const getAmbiencePreset = (sound, scene) =>
  ambiencePresets.find((preset) => preset.id === (sound.ambienceType || defaultAmbienceByScene[scene.id])) || ambiencePresets[0];
