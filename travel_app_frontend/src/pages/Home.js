import Blits from '@lightningjs/blits'
import NavBar from '../components/NavBar.js'
import Hero from '../components/Hero.js'
import DestinationList from '../components/DestinationList.js'
import { Theme } from '../theme.js'
import { fetchDestinations } from '../data/destinations.js'

export default Blits.Component('Home', {
  components: { NavBar, Hero, DestinationList },
  template: `
    <Element w="1920" h="1080" :color="$background" alpha="1">
      <!-- Guaranteed visible banner -->
      <Element x="0" y="0" w="1920" h="36" color="#111827">
        <Text x="24" y="6" size="24" color="#F59E0B" content="Travel Explorer — UI Loaded" />
      </Element>

      <!-- Top Nav -->
      <Element x="0" y="36" w="1920" h="96" :effects="[$shader('shadow',{color: 'rgba(0,0,0,0.12)', blur: 18, spread: 2})]">
        <NavBar ref="nav" />
      </Element>

      <!-- Hero/Header -->
      <Element x="0" y="148" w="1920" h="220">
        <Hero />
      </Element>

      <!-- Destination list -->
      <Element x="0" y="388" w="1920" h="680">
        <DestinationList :items="$destinations" />
      </Element>
    </Element>
  `,
  state() {
    return {
      background: Theme.colors.background,
      destinations: [],
      isLoading: true,
    }
  },
  hooks: {
    async ready() {
      try {
        if (this.$refs?.nav?.setLoadingText) {
          this.$refs.nav.setLoadingText('Loading destinations…')
        }
        const data = await fetchDestinations()
        this.destinations = Array.isArray(data) ? data : []
      } catch (e) {
        this.$log && this.$log.warn && this.$log.warn('Failed to load destinations', e?.message || e)
        this.destinations = []
      } finally {
        this.isLoading = false
        if (this.$refs?.nav?.setLoadingText) {
          this.$refs.nav.setLoadingText('')
        }
      }
    },
  },
})
