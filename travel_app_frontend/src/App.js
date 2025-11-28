import Blits from '@lightningjs/blits'
import Home from './pages/Home.js'

export default Blits.Application({
  template: `
    <Element w="1920" h="1080" color="#0b0c0f" alpha="1">
      <!-- App root background to ensure visible canvas -->
      <Element w="1920" h="1080" color="#f9fafb" />

      <!-- Debug banner to ensure something visible renders -->
      <Element x="0" y="0" w="1920" h="28" color="#111827">
        <Text x="16" y="2" size="20" color="#F59E0B" content="App Mounted • Router active" />
      </Element>

      <!-- Routed content -->
      <RouterView />
    </Element>
  `,
  routes: [{ path: '/', component: Home }],
})
