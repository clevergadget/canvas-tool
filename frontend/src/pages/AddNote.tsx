import { 
  Box, 
  Input, 
  Textarea, 
  Button, 
  VStack, 
  Container,
  Text,
  Card
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import type { ReactElement, FormEvent, ChangeEvent } from 'react'

interface NoteData {
  person_name: string
  notes?: string
}

export default function AddNote(): ReactElement {
  const [personName, setPersonName] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

  // Mutation for creating a new canvassing note
  const createNoteMutation = useMutation({
    mutationFn: async (noteData: NoteData) => {
      const res = await fetch('http://localhost:3001/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      })
      if (!res.ok) throw new Error('Failed to create note')
      return res.json()
    },
    onSuccess: () => {
      // Clear form after successful submission
      setPersonName('')
      setNotes('')
    },
  })

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (!personName.trim()) return

    createNoteMutation.mutate({
      person_name: personName.trim(),
      notes: notes.trim() || undefined,
    })
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPersonName(e.target.value)
  }

  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNotes(e.target.value)
  }

  return (
    <Container maxW="md" py={8}>
      <VStack gap={6}>
        <Card.Root 
          as="form" 
          onSubmit={handleSubmit}
          p={6} 
          w="100%"
        >
          <VStack gap={4}>
            <Box w="100%">
              <Text mb={2} fontWeight="medium">
                Person's Name *
              </Text>
              <Input
                type="text"
                value={personName}
                onChange={handleNameChange}
                placeholder="Enter the person's full name"
                disabled={createNoteMutation.isPending}
                required
              />
            </Box>

            <Box w="100%">
              <Text mb={2} fontWeight="medium">
                Notes
              </Text>
              <Textarea
                value={notes}
                onChange={handleNotesChange}
                placeholder="Any notes about the conversation..."
                rows={4}
                disabled={createNoteMutation.isPending}
              />
            </Box>

            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
              loading={createNoteMutation.isPending}
              loadingText="Saving..."
              disabled={!personName.trim()}
              w="100%"
            >
              Save Note
            </Button>
          </VStack>
        </Card.Root>

        {/* Success message */}
        {createNoteMutation.isSuccess && (
          <Box 
            bg="green.50" 
            color="green.700" 
            border="1px"
            borderColor="green.200"
            p={4} 
            borderRadius="md"
            w="100%"
            textAlign="center"
          >
            ✓ Note saved successfully! Ready for the next person.
          </Box>
        )}

        {/* Error message */}
        {createNoteMutation.isError && (
          <Box 
            bg="red.50" 
            color="red.700" 
            border="1px"
            borderColor="red.200"
            p={4} 
            borderRadius="md"
            w="100%"
            textAlign="center"
          >
            ✗ Failed to save note. Please try again.
          </Box>
        )}
      </VStack>
    </Container>
  )
}
