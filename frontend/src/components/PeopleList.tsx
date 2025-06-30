import { VStack } from '@chakra-ui/react'
import { memo } from 'react'
import { PersonCard } from './PersonCard'

interface CanvassingRecord {
  id: number
  person_name: string
  notes: string
  email?: string
  created_at: string
  updated_at: string
}

interface PeopleListProps {
  people: CanvassingRecord[]
}

export const PeopleList = memo(function PeopleList({ people }: PeopleListProps) {
  return (
    <VStack gap={4} w="100%">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </VStack>
  )
})
