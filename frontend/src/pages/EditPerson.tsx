import { 
  Box, 
  Button, 
  Card, 
  Container, 
  Input, 
  Text, 
  Textarea, 
  VStack,
  Spinner,
  Alert
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import type { Person, PeopleResponse, UpdatePersonNotesRequest } from '@canvas-tool/shared-types'

export default function EditPerson(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const [personName, setPersonName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')

  // Fetch all notes to find the one we're editing
  const { data, isLoading } = useQuery<PeopleResponse>({
    queryKey: ['notes'],
    queryFn: async (): Promise<PeopleResponse> => {
      const res = await fetch('http://localhost:3001/api/notes')
      if (!res.ok) throw new Error('Failed to fetch notes')
      return res.json()
    }
  })

  // Find the note we're editing
  const noteToEdit = data?.data?.find((note: Person) => note.id === parseInt(id || ''))

  // Update form fields when data loads
  useEffect(() => {
    if (noteToEdit) {
      setPersonName(noteToEdit.person_name)
      setEmail(noteToEdit.email || '')
      setNotes(noteToEdit.notes)
    }
  }, [noteToEdit])

  // Mutation for updating the note
  const updateMutation = useMutation({
    mutationFn: async (data: UpdatePersonNotesRequest) => {
      const res = await fetch(`http://localhost:3001/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update note')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] })
      navigate('/view')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate({
      notes,
    })
  }

  if (isLoading) {
    return (
      <Container maxW="md" py={8}>
        <VStack gap={6}>
          <Spinner size="xl" />
          <Text>Loading person data...</Text>
        </VStack>
      </Container>
    )
  }

  if (!noteToEdit) {
    return (
      <Container maxW="md" py={8}>
        <Alert.Root status="error">
          <Alert.Title>Person not found</Alert.Title>
          <Alert.Description>
            The person you're trying to edit doesn't exist.
          </Alert.Description>
        </Alert.Root>
      </Container>
    )
  }

  return (
    <Container maxW="md" py={8}>
      <Card.Root p={8}>
        <VStack gap={6}>
          <Text fontSize="2xl" fontWeight="bold">
            Edit Notes for {personName}
          </Text>
          
          <Box as="form" onSubmit={handleSubmit} w="100%">
            <VStack gap={4}>
              <Box w="100%">
                <Text fontSize="sm" fontWeight="medium" mb={2}>Name</Text>
                <Input
                  value={personName}
                  readOnly
                  bg="gray.50"
                  cursor="not-allowed"
                />
              </Box>

              <Box w="100%">
                <Text fontSize="sm" fontWeight="medium" mb={2}>Email</Text>
                <Input
                  type="email"
                  value={email}
                  readOnly
                  bg="gray.50"
                  cursor="not-allowed"
                  placeholder={email ? undefined : "No email provided"}
                />
              </Box>

              <Box w="100%">
                <Text fontSize="sm" fontWeight="medium" mb={2}>Notes (Editable)</Text>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about your conversation..."
                  rows={4}
                  borderColor="blue.300"
                  _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)" }}
                />
              </Box>

              <VStack gap={3} w="100%">
                <Button
                  type="submit"
                  width="100%"
                  loading={updateMutation.isPending}
                >
                  Update Notes
                </Button>
                
                <Button
                  variant="outline"
                  width="100%"
                  onClick={() => navigate('/view')}
                >
                  Cancel
                </Button>
              </VStack>
            </VStack>
          </Box>

          {updateMutation.isError && (
            <Alert.Root status="error" w="100%">
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>
                {updateMutation.error instanceof Error 
                  ? updateMutation.error.message 
                  : 'Failed to update person'
                }
              </Alert.Description>
            </Alert.Root>
          )}
        </VStack>
      </Card.Root>
    </Container>
  )
}
