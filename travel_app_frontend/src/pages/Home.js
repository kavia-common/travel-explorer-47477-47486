import Blits from '@lightningjs/blits'
import NavBar from '../components/NavBar.js'
import Hero from '../components/Hero.js'
import DestinationList from '../components/DestinationList.js'
import { Theme } from '../theme.js'
import { fetchDestinations } from '../data/destinations.js'

export default Blits.Component('Home', {
  components: { NavBar, Hero, DestinationList },
  template: `
    <Element w="1920" h="1080" :color="$background">
      <!-- Top Nav -->
      <Element x="0" y="0" w="1920" h="96" :effects="[$shader('shadow',{color: 'rgba(0,0,0,0.12)', blur: 18, spread: 2})]">
        <NavBar />
      </Element>

      <!-- Hero/Header -->
      <Element x="0" y="112" w="1920" h="220">
        <Hero />
      </Element>

      <!-- Destination list -->
      <Element x="0" y="352" w="1920" h="680">
        <DestinationList :items="$destinations" />
      </Element>
    </Element>
  `,
  state() {
    return {
      background: Theme.colors.background,
      destinations: [],
    }
  },
  hooks: {
    async ready() {
      const data = await fetchDestinations()
      this.destinations = data
    },
  },
})
