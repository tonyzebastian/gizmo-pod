module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'geist': ['Geist Sans', 'system-ui', 'sans-serif'],
        'geist-mono': ['Geist Mono', 'monospace'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          700: '#0369a1',
        },
        device: {
          active: '#10b981',
          inactive: '#6b7280',
          error: '#ef4444',
        },
        light: '#f59e0b',
        speaker: '#06b6d4',
        purifier: '#8b5cf6',
        thermostat: '#f97316',
        camera: '#ef4444',
        gizmopod: '#3b82f6',
      }
    },
  },
  plugins: [],
}