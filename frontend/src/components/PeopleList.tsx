import { VStack } from '@chakra-ui/react'
import { memo } from 'react'
import { PersonCard } from './PersonCard'
import type { Person } from '@voter-canvassing-tool/shared-types'

interface PeopleListProps {
  people: Person[]
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
