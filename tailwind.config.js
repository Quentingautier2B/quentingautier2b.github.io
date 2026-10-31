export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { ink: '#0b0c0e', panel: '#14161a', line: '#262a31', accent: '#c6ff3d', hot: '#ff5a36' },
    fontFamily: { display: ['"Space Grotesk"', 'system-ui', 'sans-serif'], body: ['Inter', 'system-ui', 'sans-serif'] },
  } },
}
