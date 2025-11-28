import Blits from '@lightningjs/blits'

import Home from './pages/Home.js'

export default Blits.Application({
  template: `
    <Element w="1920" h="1080" color="#0b0c0f">
      <!-- App root background to ensure visible canvas -->
      <Element w="1920" h="1080" color="#f9fafb" />
      <RouterView />
    </Element>
  `,
  routes: [{ path: '/', component: Home }],
})
