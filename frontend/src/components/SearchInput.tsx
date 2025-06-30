import { Input, Box, Spinner } from '@chakra-ui/react'
import { useRef, useEffect, memo } from 'react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onFocus: () => void
  onBlur: () => void
  shouldFocus: boolean
  isLoading?: boolean
}

export const SearchInput = memo(function SearchInput({ 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  shouldFocus,
  isLoading = false
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Only restore focus if it should be focused and data updates occur
  useEffect(() => {
    if (shouldFocus && inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus()
    }
  }, [shouldFocus])

  return (
    <Box w="100%" position="relative">
      <Input
        placeholder="Search people by name, email, or notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="lg"
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        pr={isLoading ? "12" : undefined}
      />
      {isLoading && (
        <Spinner 
          size="sm" 
          position="absolute" 
          right="3" 
          top="50%" 
          transform="translateY(-50%)"
          color="gray.400"
        />
      )}
    </Box>
  )
})
