import { VStack, Card, Text } from '@chakra-ui/react'
import { memo } from 'react'

interface EmptyStateProps {
  debouncedQuery: string
}

export const EmptyState = memo(function EmptyState({ debouncedQuery }: EmptyStateProps) {
  return (
    <Card.Root p={8} w="100%">
      <VStack gap={4}>
        <Text fontSize="lg">
          {debouncedQuery ? 'No matching results found' : 'No people recorded yet'}
        </Text>
        <Text>
          {debouncedQuery 
            ? 'Try adjusting your search terms or clear the search to see all records.'
            : 'Start canvassing and add your first person!'
          }
        </Text>
      </VStack>
    </Card.Root>
  )
})
