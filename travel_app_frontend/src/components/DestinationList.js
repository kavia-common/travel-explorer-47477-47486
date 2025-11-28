import Blits from '@lightningjs/blits'
import DestinationCard from './DestinationCard.js'
import { Theme } from '../theme.js'

export default Blits.Component('DestinationList', {
  components: { DestinationCard },
  /**
   * Props:
   * - items: array of destination objects
   */
  props: ['items'],
  template: `
    <Element x="48" y="0" w="1824" h="680">
      <!-- Empty state placeholder -->
      <Element :alpha="$items && $items.length ? 0 : 1">
        <Text x="0" y="8" size="28" color="#6B7280" content="No destinations available yet." />
        <Text x="0" y="48" size="24" color="#9CA3AF" content="Please check your connection or try again." />
      </Element>

      <!-- Scroll container -->
      <Element ref="scroll" :y.transition="$offsetY" :alpha="$items && $items.length ? 1 : 0">
        <Element
          :for="(item, index) in $items"
          :key="$item.id"
          :is="DestinationCard"
          :item="$item"
          :onSelect="$onSelect"
          :x="$calcX($index)"
          :y="$calcY($index)"
        />
      </Element>
      <!-- Scrollbar rail -->
      <Element x="1800" y="0" w="8" h="680" color="#E5E7EB" :alpha="$showScrollbar && $items && $items.length ? 0.6 : 0"/>
      <!-- Scrollbar thumb -->
      <Element :y.transition="$thumbY" x="1800" w="8" :h="$thumbH" :color="$accentColor" :alpha="$showScrollbar && $items && $items.length ? 0.9 : 0"/>
    </Element>
  `,
  state() {
    return {
      colW: 560, // cardW + gutter
      rowH: 420, // cardH + gutter
      cols: 3,
      offsetY: 0,
      maxOffset: 0,
      showScrollbar: true,
      thumbY: 0,
      thumbH: 120,
      accentColor: Theme.colors.secondary,
    }
  },
  hooks: {
    ready() {
      // compute max scroll based on items
      const rows = Math.ceil((this.items || []).length / this.cols)
      const visibleRows = Math.floor(680 / this.rowH)
      const extra = Math.max(0, rows - visibleRows)
      this.maxOffset = -extra * this.rowH
      this.updateThumb()
    },
  },
  methods: {
    calcX(i) {
      const col = i % this.cols
      return col * this.colW
    },
    calcY(i) {
      const row = Math.floor(i / this.cols)
      return row * this.rowH
    },
    updateThumb() {
      const totalHeight = Math.max(680, 680 + Math.abs(this.maxOffset))
      const ratio = 680 / totalHeight
      this.thumbH = Math.max(60, 680 * ratio)
      const progress = Math.abs(this.offsetY) / Math.max(1, Math.abs(this.maxOffset))
      this.thumbY = (680 - this.thumbH) * progress
    },
    // PUBLIC_INTERFACE
    $onSelect(item) {
      this.$log.info('Selected destination', item?.title)
    },
  },
  input: {
    down() {
      if (this.offsetY > this.maxOffset) {
        this.offsetY -= this.rowH
        if (this.offsetY < this.maxOffset) this.offsetY = this.maxOffset
        this.updateThumb()
      }
    },
    up() {
      if (this.offsetY < 0) {
        this.offsetY += this.rowH
        if (this.offsetY > 0) this.offsetY = 0
        this.updateThumb()
      }
    },
  },
})
