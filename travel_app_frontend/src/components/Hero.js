import Blits from '@lightningjs/blits'
import { Theme } from '../theme.js'

export default Blits.Component('Hero', {
  template: `
    <Element w="1920" h="220">
      <!-- Subtle gradient bar -->
      <Element x="48" y="16" w="1824" h="188" :color="$heroBg" :effects="[$shader('radius',{radius: 16})]">
        <Element x="24" y="24">
          <Text size="36" :color="$subtitleColor" content="Discover your next destination" />
          <Text y="56" size="64" :color="$titleColor" content="Find places to love and explore" />
          <Text y="132" size="28" :color="$descColor" content="Curated destinations, minimal design, smooth browsing." />
        </Element>
      </Element>
    </Element>
  `,
  state() {
    return {
      heroBg: { top: '#eaf2ff', bottom: Theme.colors.surface },
      subtitleColor: Theme.colors.secondary,
      titleColor: Theme.colors.text,
      descColor: '#4B5563',
    }
  },
})
