import { 
  Box, 
  Text, 
  VStack, 
  Container,
  Card,
  Spinner,
  Alert,
  Badge
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'

interface CanvassingNote {
  id: number
  person_name: string
  notes: string
  created_at: string
  updated_at: string
}

interface NotesResponse {
  success: boolean
  data: CanvassingNote[]
  count: number
}

export default function ViewNotes(): ReactElement {
  // Query for fetching all notes
  const { data, isLoading, isError, error } = useQuery<NotesResponse>({
    queryKey: ['notes'],
    queryFn: async (): Promise<NotesResponse> => {
      const res = await fetch('http://localhost:3001/api/notes')
      if (!res.ok) throw new Error('Failed to fetch notes')
      return res.json()
    },
    refetchInterval: 30000, // Refetch every 30 seconds to stay updated
  })

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString()
  }

  if (isLoading) {
    return (
      <Container maxW="4xl" py={8}>
        <VStack gap={6}>
          <Spinner size="xl" />
          <Text>Loading notes...</Text>
        </VStack>
      </Container>
    )
  }

  if (isError) {
    return (
      <Container maxW="4xl" py={8}>
        <Alert.Root status="error">
          <Alert.Title>Error loading notes</Alert.Title>
          <Alert.Description>
            {error instanceof Error ? error.message : 'An unknown error occurred'}
          </Alert.Description>
        </Alert.Root>
      </Container>
    )
  }

  const notes = data?.data || []

  return (
    <Container maxW="4xl" py={8}>
      <VStack gap={6}>
        <Box textAlign="center">
          <Text fontSize="sm">
            Total Notes: {data?.count || 0}
          </Text>
        </Box>

        {notes.length === 0 ? (
          <Card.Root p={8} w="100%">
            <VStack gap={4}>
              <Text fontSize="lg">
                No notes yet
              </Text>
              <Text>
                Start canvassing and add your first note!
              </Text>
            </VStack>
          </Card.Root>
        ) : (
          <VStack gap={4} w="100%">
            {notes.map((note: CanvassingNote) => (
              <Card.Root key={note.id} p={6} w="100%">
                <VStack gap={3} align="stretch">
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Text fontSize="lg" fontWeight="bold">
                      {note.person_name}
                    </Text>
                    <Badge fontSize="xs">
                      #{note.id}
                    </Badge>
                  </Box>
                  
                  {note.notes && (
                    <Box>
                      <Text lineHeight="1.6">
                        {note.notes}
                      </Text>
                    </Box>
                  )}
                  
                  <Box borderTop="1px" pt={3}>
                    <Text fontSize="sm">
                      Added: {formatDate(note.created_at)}
                      {note.updated_at !== note.created_at && (
                        <> • Updated: {formatDate(note.updated_at)}</>
                      )}
                    </Text>
                  </Box>
                </VStack>
              </Card.Root>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  )
}
