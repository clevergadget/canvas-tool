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
      {isError && (
        <Box mt={4} maxW="sm" bg="red.100" color="red.800" p={4} borderRadius="md">
          Could not reach backend health check.
        </Box>
      )}
      {data && (
        <Box mt={4} maxW="sm" bg="green.100" color="green.800" p={4} borderRadius="md">
          Backend health: <b>{data.status}</b>
        </Box>
      )}
    </Box>
  )
}

export default App
