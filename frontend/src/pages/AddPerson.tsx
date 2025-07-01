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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { ReactElement, FormEvent, ChangeEvent } from 'react'
import { createPerson } from '../services/api'

export default function AddPerson(): ReactElement {
  const [personName, setPersonName] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const queryClient = useQueryClient()

  // Mutation for adding a person to canvassing records
  const addPersonMutation = useMutation({
    mutationFn: createPerson,
    onSuccess: () => {
      // Clear form after successful submission
      setPersonName('')
      setNotes('')
      setEmail('')
      setEmailError('')
      // Invalidate people queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ['people'] })
    },
  })

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (!personName.trim()) return

    // Validate email if provided
    if (email.trim() && !isValidEmail(email.trim())) {
      setEmailError('Please enter a valid email address')
      return
    }

    addPersonMutation.mutate({
      person_name: personName.trim(),
      notes: notes.trim() || undefined,
      email: email.trim() || undefined,
    })
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPersonName(e.target.value)
  }

  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNotes(e.target.value)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setEmail(value)
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('')
    }
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
                disabled={addPersonMutation.isPending}
                required
              />
            </Box>

            <Box w="100%">
              <Text mb={2} fontWeight="medium">
                Email
              </Text>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email address (optional)"
                disabled={addPersonMutation.isPending}
              />
              {emailError && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {emailError}
                </Text>
              )}
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
                disabled={addPersonMutation.isPending}
              />
            </Box>

            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
              loading={addPersonMutation.isPending}
              loadingText="Saving..."
              disabled={!personName.trim()}
              w="100%"
            >
              Add Person
            </Button>
          </VStack>
        </Card.Root>

        {/* Success message */}
        {addPersonMutation.isSuccess && (
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
            ✓ Person added successfully! Ready for the next person.
          </Box>
        )}

        {/* Error message */}
        {addPersonMutation.isError && (
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
            ✗ Failed to add person. Please try again.
          </Box>
        )}
      </VStack>
    </Container>
  )
}
