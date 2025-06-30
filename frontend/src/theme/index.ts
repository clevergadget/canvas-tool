import { createSystem, defaultConfig } from '@chakra-ui/react'
import { colors } from './colors'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        // Map our color palette to Chakra's color system
        brand: {
          50: { value: colors.primary[50] },
          100: { value: colors.primary[100] },
          500: { value: colors.primary[500] },
          600: { value: colors.primary[600] },
          700: { value: colors.primary[700] },
          900: { value: colors.primary[900] },
        },
        primary: {
          50: { value: colors.primary[50] },
          100: { value: colors.primary[100] },
          500: { value: colors.primary[500] },
          600: { value: colors.primary[600] },
          700: { value: colors.primary[700] },
          900: { value: colors.primary[900] },
        },
        secondary: {
          50: { value: colors.secondary[50] },
          100: { value: colors.secondary[100] },
          500: { value: colors.secondary[500] },
          600: { value: colors.secondary[600] },
          700: { value: colors.secondary[700] },
        },
      },
    },
  },
})
