import Blits from '@lightningjs/blits'

/**
 * Ocean Professional theme tokens.
 * Use these tokens across components for consistency.
 */
export const Theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    shadow: 'rgba(0,0,0,0.15)',
    subtle: '#E5E7EB',
  },
  // Common radii in Lightning must be applied using radius shader
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  elevations: {
    card: { blur: 12, color: 'rgba(0,0,0,0.22)' },
  },
}

// PUBLIC_INTERFACE
export default Blits.Component('ThemeProvider', {
  /**
   * This component does not render visuals; it simply provides theme data.
   * Children components can import Theme directly from theme.js.
   */
  template: `<Element />`,
})
