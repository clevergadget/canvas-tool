import { VStack, Card, Text, Box, Button, Badge } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { memo } from 'react'
import type { Person } from '@canvas-tool/shared-types'

interface PersonCardProps {
  person: Person
}

export const PersonCard = memo(function PersonCard({ person }: PersonCardProps) {
  const navigate = useNavigate()

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <Card.Root p={6} w="100%">
      <VStack gap={3} align="stretch">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <VStack gap={1} align="start">
            <Text fontSize="lg" fontWeight="bold">
              {person.person_name}
            </Text>
            {person.email && (
              <Text fontSize="sm" color="gray.600">
                {person.email}
              </Text>
            )}
          </VStack>
          <Box display="flex" gap={2} alignItems="center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/edit/${person.id}`)}
            >
              Edit
            </Button>
            <Badge fontSize="xs">
              #{person.id}
            </Badge>
          </Box>
        </Box>
        
        {person.notes && (
          <Box>
            <Text lineHeight="1.6">
              {person.notes}
            </Text>
          </Box>
        )}
        
        <Box borderTop="1px" pt={3}>
          <Text fontSize="sm">
            Added: {formatDate(person.created_at)}
            {person.updated_at !== person.created_at && (
              <> • Updated: {formatDate(person.updated_at)}</>
            )}
          </Text>
        </Box>
      </VStack>
    </Card.Root>
  )
})
