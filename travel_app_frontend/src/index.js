import Blits from '@lightningjs/blits'
import App from './App.js'

/**
 * PUBLIC_INTERFACE
 * Entrypoint that boots the Blits Application and attaches to the #app host.
 * Ensures stage dimensions and debug level are set for predictable rendering.
 */
Blits.Launch(App, 'app', {
  w: 1920,
  h: 1080,
  debugLevel: 2,
  deviceLogicalPixelRatio: 1,
})
