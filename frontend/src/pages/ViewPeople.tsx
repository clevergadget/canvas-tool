import { 
  Box, 
  Text, 
  VStack, 
  Container,
  Card,
  Spinner,
  Alert,
  Badge,
  Button
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import type { ReactElement } from 'react'

interface CanvassingRecord {
  id: number
  person_name: string
  notes: string
  email?: string
  created_at: string
  updated_at: string
}

interface PeopleResponse {
  success: boolean
  data: CanvassingRecord[]
  count: number
}

export default function ViewPeople(): ReactElement {
  const navigate = useNavigate()
  
  // Query for fetching all canvassing records
  const { data, isLoading, isError, error } = useQuery<PeopleResponse>({
    queryKey: ['people'],
    queryFn: async (): Promise<PeopleResponse> => {
      const res = await fetch('http://localhost:3001/api/notes')
      if (!res.ok) throw new Error('Failed to fetch canvassing records')
      return res.json()
    },
    refetchInterval: 30000, // Refetch every 30 seconds to stay updated
  })

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString()
  }

  const handleExportCsv = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3001/api/notes/export/csv')
      if (!response.ok) throw new Error('Failed to export CSV')
      
      const csvContent = await response.text()
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      
      // Create download link
      const link = document.createElement('a')
      link.href = url
      link.download = `canvassing-data-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting CSV:', error)
      // Could add toast notification here
    }
  }

  if (isLoading) {
    return (
      <Container maxW="4xl" py={8}>
        <VStack gap={6}>
          <Spinner size="xl" />
          <Text>Loading canvassing records...</Text>
        </VStack>
      </Container>
    )
  }

  if (isError) {
    return (
      <Container maxW="4xl" py={8}>
        <Alert.Root status="error">
          <Alert.Title>Error loading canvassing records</Alert.Title>
          <Alert.Description>
            {error instanceof Error ? error.message : 'An unknown error occurred'}
          </Alert.Description>
        </Alert.Root>
      </Container>
    )
  }

  const people = data?.data || []

  return (
    <Container maxW="4xl" py={8}>
      <VStack gap={6}>
        <Box display="flex" justifyContent="space-between" alignItems="center" w="100%">
          <Text fontSize="sm">
            Total People: {data?.count || 0}
          </Text>
          {people.length > 0 && (
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleExportCsv}
            >
              Export CSV
            </Button>
          )}
        </Box>

        {people.length === 0 ? (
          <Card.Root p={8} w="100%">
            <VStack gap={4}>
              <Text fontSize="lg">
                No people recorded yet
              </Text>
              <Text>
                Start canvassing and add your first person!
              </Text>
            </VStack>
          </Card.Root>
        ) : (
          <VStack gap={4} w="100%">
            {people.map((person: CanvassingRecord) => (
              <Card.Root key={person.id} p={6} w="100%">
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
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  )
}
