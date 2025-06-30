// Empower Project inspired color palette
// Based on their CSS variables: --accent-hsl: 187.06, 100%, 50%; --lightAccent-hsl: 253.13, 100%, 60.59%; etc.

export const colors = {
  // Primary brand colors from Empower Project
  primary: {
    50: '#ecfeff',
    100: '#cffafe', 
    500: '#00bfff',  // Main cyan accent
    600: '#0099cc',
    700: '#007399',
    900: '#1a0d56',  // Dark purple for text
  },
  
  // Secondary purple accent
  secondary: {
    50: '#f3f0ff',
    100: '#ede9fe',
    500: '#6600ff',  // Light purple accent
    600: '#5200cc',
    700: '#3d0099',
  },

  // Semantic colors
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    500: '#10b981',
    600: '#059669',
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
  },

  // Neutrals
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Base colors
  white: '#ffffff',
  black: '#000000',
} as const

export type ColorScale = typeof colors
