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

      <!-- When empty, render one static debug card to validate pipeline -->
      <Element :alpha="$items && $items.length ? 0 : 1" y="96">
        <DestinationCard
          :item="{
            id: 'debug',
            title: 'Sample Place',
            location: 'Somewhere',
            blurb: 'Debug card renders while data loads.',
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&h=600&fit=crop&auto=format',
            cta: 'Explore'
          }"
        />
      </Element>

      <!-- Scroll container -->
      <Element ref="scroll" :y.transition="$offsetY" :alpha="$items && $items.length ? 1 : 0" w="1750" h="680">
        <Element
          :for="(item, index) in $items"
          :is="DestinationCard"
          :item="$item"
          :onSelect="$onSelect"
          :x="$calcX($index)"
          :y="$calcY($index)"
        />
      </Element>

      <!-- Minimal static trio to validate rendering even if loops are unsupported in runtime -->
      <Element :alpha="$items && $items.length ? 0 : 1">
        <DestinationCard :item="{ id:'st1', title:'Welcome Coast', location:'Demo', blurb:'Starter card 1', image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&h=600&fit=crop&auto=format', cta:'Explore' }" :x="0" :y="0" />
        <DestinationCard :item="{ id:'st2', title:'Aurora Ridge', location:'Demo', blurb:'Starter card 2', image:'https://images.unsplash.com/photo-1545569341-9eb8b30979d0?q=80&w=800&h=600&fit=crop&auto=format', cta:'Explore' }" :x="560" :y="0" />
        <DestinationCard :item="{ id:'st3', title:'Citrus Valley', location:'Demo', blurb:'Starter card 3', image:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&h=600&fit=crop&auto=format', cta:'Explore' }" :x="1120" :y="0" />
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
      this.recomputeScroll()
    },
    updated(prev) {
      if (prev.items !== this.items) {
        this.recomputeScroll()
      }
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
    recomputeScroll() {
      /** Recompute scroll constraints after items change or layout adjustments */
      const rows = Math.ceil((this.items || []).length / this.cols)
      const visibleRows = Math.floor(680 / this.rowH)
      const extra = Math.max(0, rows - visibleRows)
      this.maxOffset = -extra * this.rowH
      // Clamp offset within range
      if (this.offsetY < this.maxOffset) this.offsetY = this.maxOffset
      if (this.offsetY > 0) this.offsetY = 0
      this.updateThumb()
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
