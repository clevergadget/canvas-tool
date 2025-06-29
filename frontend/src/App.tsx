import { Box, Heading, Text } from '@chakra-ui/react'

function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bg="gray.50">
      <Heading as="h1" size="2xl" mb={4} color="teal.600">
        Canvas Tool
      </Heading>
      <Text fontSize="xl" color="gray.700">
        Welcome! This project uses Vite, React, Chakra UI, and TanStack Query.
      </Text>
    </Box>
  )
}

export default App
