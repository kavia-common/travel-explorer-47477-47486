import Blits from '@lightningjs/blits'
import App from './App.js'

/**
 * PUBLIC_INTERFACE
 * Entrypoint that boots the Blits Application and attaches to the #app host.
 * Ensures stage dimensions and debug level are set for predictable rendering.
 * Note: Do NOT await anything here to avoid blocking the first paint.
 */
Blits.Launch(App, 'app', {
  w: 1920,
  h: 1080,
  debugLevel: 1,
  deviceLogicalPixelRatio: 1,
  // Avoid any auto-scaling surprises; keep alpha and dimensions explicit
  stage: { clearColor: 0x000000ff },
})
