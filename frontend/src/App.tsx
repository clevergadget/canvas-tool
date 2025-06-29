import { Box, Heading, Text, Spinner } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

function App() {
  // Fetch health check from backend
  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/health')
      if (!res.ok) throw new Error('Network response was not ok')
      return res.json()
    },
  })

  return (
    <Box minH="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bg="gray.50">
      <Heading as="h1" size="2xl" mb={4} color="teal.600">
        Canvas Tool
      </Heading>
      <Text fontSize="xl" color="gray.700" mb={6}>
        Welcome! This project uses Vite, React, Chakra UI, and TanStack Query.
      </Text>
      {isLoading && <Spinner size="lg" color="teal.500" />}
      {!isLoading && isError && (
        <Box mt={4} maxW="sm" bg="red.100" color="red.800" p={4} borderRadius="md">
          Could not reach backend or database.
        </Box>
      )}
      {!isLoading && !isError && data && (
        <Box
          mt={4}
          maxW="sm"
          bg={data.db === 'ok' ? 'green.100' : 'yellow.100'}
          color={data.db === 'ok' ? 'green.800' : 'yellow.800'}
          p={4}
          borderRadius="md"
        >
          Backend health: <b>{data.status}</b>
          <br />
          Database: <b>{data.db}</b>
        </Box>
      )}
    </Box>
  )
}

export default App
