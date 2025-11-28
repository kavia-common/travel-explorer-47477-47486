import Blits from '@lightningjs/blits'
import { Theme } from '../theme.js'

export default Blits.Component('DestinationCard', {
  /**
   * Props:
   * - item: { id, title, location, blurb, image, cta }
   * - onSelect: function(item)
   */
  props: ['item', 'onSelect'],
  template: `
    <Element :w="$cardW" :h="$cardH" :x="$x" :y="$y" :effects="[$shader('radius',{radius: 16})]" :alpha.transition="$alpha" :scale.transition="$scale">
      <!-- Card background -->
      <Element :w="$cardW" :h="$cardH" :color="$bgColor" />

      <!-- Image -->
      <Element :src="$item.image" x="0" y="0" :w="$cardW" h="220" />

      <!-- Title -->
      <Element x="20" y="236">
        <Text size="36" :color="$titleColor" :content="$item.title" />
      </Element>
      <!-- Location -->
      <Element x="20" y="282">
        <Text size="26" :color="$locationColor" :content="$item.location" />
      </Element>
      <!-- Blurb -->
      <Element x="20" y="318" w="480" h="72">
        <Text size="24" :color="$blurbColor" :content="$item.blurb" />
      </Element>

      <!-- CTA -->
      <Element :x="$cardW - 20 - 180" y="318" w="180" h="56" :color="$ctaBg" :effects="[$shader('radius',{radius: 12})]" @loaded="$noop">
        <Text x="16" y="12" size="28" :color="$ctaText" :content="$item.cta || 'Explore'" />
      </Element>
    </Element>
  `,
  state() {
    return {
      cardW: 520,
      cardH: 400,
      bgColor: Theme.colors.surface,
      titleColor: Theme.colors.text,
      locationColor: Theme.colors.primary,
      blurbColor: '#4B5563',
      ctaBg: Theme.colors.primary,
      ctaText: '#ffffff',
      alpha: 0.98,
      scale: 1,
      x: 0,
      y: 0,
    }
  },
  input: {
    focus() {
      this.scale = 1.03
      this.alpha = 1
    },
    blur() {
      this.scale = 1
      this.alpha = 0.98
    },
    enter() {
      if (typeof this.onSelect === 'function') {
        this.onSelect(this.item)
      }
    },
  },
  methods: {
    // PUBLIC_INTERFACE
    setPosition(x, y) {
      /** Set card absolute position (used by list/grid) */
      this.x = x
      this.y = y
    },
    // PUBLIC_INTERFACE
    $noop() {},
  },
})
