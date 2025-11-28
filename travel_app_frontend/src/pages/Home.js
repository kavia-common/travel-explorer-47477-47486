import Blits from '@lightningjs/blits'
import NavBar from '../components/NavBar.js'
import Hero from '../components/Hero.js'
import DestinationList from '../components/DestinationList.js'
import { Theme } from '../theme.js'
import { fetchDestinations, stubDestinations } from '../data/destinations.js'
import Loader from '../components/Loader.js'

export default Blits.Component('Home', {
  components: { NavBar, Hero, DestinationList, Loader },
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

      <!-- Destination list with loader -->
      <Element x="0" y="388" w="1920" h="680">
        <DestinationList :items="$destinations" />
        <!-- Loading indicator overlay -->
        <Element :alpha="$isLoading ? 1 : 0" x="48" y="8" w="400" h="60">
          <Loader loaderColor="#6B7280" />
          <Text x="160" y="12" size="26" color="#6B7280" content="Loading destinations..." />
        </Element>

        <!-- Fallback static row (renders only when items are empty) -->
        <Element :alpha="$destinations && $destinations.length ? 0 : 1" x="48" y="80">
          <DestinationList :items="[
            { id: 's1', title: 'Static One', location: 'Debug', blurb: 'Static card A', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&h=600&fit=crop&auto=format', cta: 'Explore' },
            { id: 's2', title: 'Static Two', location: 'Debug', blurb: 'Static card B', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d0?q=80&w=800&h=600&fit=crop&auto=format', cta: 'Explore' },
            { id: 's3', title: 'Static Three', location: 'Debug', blurb: 'Static card C', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&h=600&fit=crop&auto=format', cta: 'Explore' }
          ]" />
        </Element>
      </Element>
    </Element>
  `,
  state() {
    return {
      background: Theme.colors.background,
      destinations: [], // Set immediately in ready() before any await
      isLoading: true,
    }
  },
  hooks: {
    async ready() {
      // Paint ASAP with stub data; do not await before first paint
      this.destinations = stubDestinations.slice(0, 6)
      this.isLoading = true
      if (this.$refs?.nav?.setLoadingText) {
        this.$refs.nav.setLoadingText('Loading destinations…')
      }
      this.$log?.info?.('[Home] initial stub destinations:', this.destinations.length)

      try {
        const data = await fetchDestinations()
        if (Array.isArray(data) && data.length) {
          this.destinations = data
        }
        this.$log?.info?.('[Home] destinations loaded:', this.destinations.length)
      } catch (e) {
        this.$log?.warn?.('Failed to load destinations', e?.message || e)
        // Keep stub data if fetch failed
        this.destinations = this.destinations?.length ? this.destinations : stubDestinations.slice(0, 6)
        console.warn('[Home] destinations fallback used, count:', this.destinations.length)
      } finally {
        this.isLoading = false
        if (this.$refs?.nav?.setLoadingText) {
          this.$refs.nav.setLoadingText('')
        }
      }
    },
  },
})
