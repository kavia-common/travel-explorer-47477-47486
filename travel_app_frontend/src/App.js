import Blits from '@lightningjs/blits'
import Home from './pages/Home.js'

export default Blits.Application({
  template: `
    <Element w="1920" h="1080" color="#0b0c0f" alpha="1">
      <!-- App root background to ensure visible canvas -->
      <Element w="1920" h="1080" color="#f9fafb" />

      <!-- High-visibility debug banner -->
      <Element x="0" y="0" w="1920" h="40" color="#111827">
        <Text x="20" y="6" size="26" color="#F59E0B" content="App Mounted • Router bypassed - Home mounted directly" />
      </Element>

      <!-- Directly mount Home page to remove routing as a variable -->
      <Element x="0" y="40" w="1920" h="1040">
        <Home />
      </Element>
    </Element>
  `,
  // Keep routing disabled for now; we mount Home directly to avoid any async route guards
  routes: [],
  components: { Home },
})
