import { HStack, VStack, Text, Button } from '@chakra-ui/react'
import { memo } from 'react'

interface ResultsSummaryProps {
  totalCount: number
  showingStart: number
  showingEnd: number
  currentPage: number
  totalPages: number
  debouncedQuery: string
  onExportCsv: () => void
  hasResults: boolean
  isLoading?: boolean
}

export const ResultsSummary = memo(function ResultsSummary({
  totalCount,
  showingStart,
  showingEnd,
  currentPage,
  totalPages,
  debouncedQuery,
  onExportCsv,
  hasResults,
  isLoading
}: ResultsSummaryProps) {
  return (
    <HStack justify="space-between" w="100%">
      <VStack align="start" gap={1}>
        <Text fontSize="sm" color="gray.600">
          {isLoading ? (
            'Loading...'
          ) : totalCount > 0 ? (
            <>
              Showing {showingStart}-{showingEnd} of {totalCount} people
              {debouncedQuery && ` for "${debouncedQuery}"`}
            </>
          ) : debouncedQuery ? (
            `No results found for "${debouncedQuery}"`
          ) : (
            'No people recorded yet'
          )}
        </Text>
        {totalPages > 1 && (
          <Text fontSize="xs" color="gray.500">
            Page {currentPage} of {totalPages}
          </Text>
        )}
      </VStack>
      
      {hasResults && (
        <Button
          size="sm"
          colorScheme="blue"
          onClick={onExportCsv}
        >
          Export CSV
        </Button>
      )}
    </HStack>
  )
})
