import Blits from '@lightningjs/blits'
import { Theme } from '../theme.js'

export default Blits.Component('NavBar', {
  template: `
    <Element w="1920" h="96" :color="$barColor" :effects="[$shader('radius', {radius: 12})]">
      <!-- Left: App Title -->
      <Element x="48" y="28">
        <Text size="48" :content="$title" :color="$titleColor" />
      </Element>

      <!-- Accent underline -->
      <Element x="48" y="84" w="280" h="4" :color="$accentColor" :alpha.transition="$underlineAlpha" />

      <!-- Right: Menu placeholder -->
      <Element w="220" h="56" :x="$rightX" y="20" :color="$chipColor" :alpha.transition="$chipAlpha" :effects="[$shader('radius',{radius: 12})]">
        <Text x="16" y="10" size="32" color="#111827" content="Menu" />
      </Element>

      <!-- Loading hint area (non-blocking) -->
      <Element :x="$rightX - 260" y="32" w="240" h="32">
        <Text size="22" color="#6B7280" :content="$loadingText" />
      </Element>
    </Element>
  `,
  state() {
    return {
      title: 'Travel Explorer',
      barColor: Theme.colors.surface,
      titleColor: Theme.colors.text,
      accentColor: Theme.colors.secondary,
      chipColor: '#E5F0FF',
      underlineAlpha: 1,
      chipAlpha: 0.9,
      rightX: 1920 - 220 - 48,
      loadingText: '',
    }
  },
  methods: {
    // PUBLIC_INTERFACE
    setLoadingText(txt) {
      /** Set subtle loading text shown on the right side of NavBar */
      this.loadingText = txt || ''
    },
  },
  input: {
    focus() {
      // animate underline
      this.underlineAlpha = 1
      this.chipAlpha = 1
    },
    right() {
      this.rightX = Math.min(1920 - 220 - 24, this.rightX + 8)
    },
    left() {
      this.rightX = Math.max(1920 - 220 - 96, this.rightX - 8)
    },
  },
})
