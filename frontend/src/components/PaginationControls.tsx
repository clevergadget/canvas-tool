import { HStack, Text, Button } from '@chakra-ui/react'
import { memo } from 'react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPreviousPage: () => void
  onNextPage: () => void
}

export const PaginationControls = memo(function PaginationControls({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage
}: PaginationControlsProps) {
  if (totalPages <= 1) return null

  return (
    <HStack gap={4}>
      <Button
        size="sm"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        variant="outline"
      >
        Previous
      </Button>
      
      <Text fontSize="sm" minW="120px" textAlign="center">
        Page {currentPage} of {totalPages}
      </Text>
      
      <Button
        size="sm"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        variant="outline"
      >
        Next
      </Button>
    </HStack>
  )
})
