import { 
  Box, 
  Heading, 
  Button, 
  HStack, 
  Container 
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'

export default function Navigation(): ReactElement {
  const location = useLocation()

  return (
    <Box bg="primary.900" color="white" py={4} mb={8}>
      <Container maxW="4xl">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="lg" color="white">
            Canvassing Tracker
          </Heading>
          
          <HStack gap={4}>
            <Link to="/add">
              <Button
                variant={location.pathname === '/add' ? 'solid' : 'outline'}
                bg={location.pathname === '/add' ? 'primary.500' : 'transparent'}
                color={location.pathname === '/add' ? 'white' : 'primary.500'}
                borderColor="primary.500"
                _hover={{
                  bg: location.pathname === '/add' ? 'primary.600' : 'primary.500',
                  color: 'white'
                }}
                size="sm"
              >
                Add Person
              </Button>
            </Link>
            
            <Link to="/view">
              <Button
                variant={location.pathname === '/view' ? 'solid' : 'outline'}
                bg={location.pathname === '/view' ? 'primary.500' : 'transparent'}
                color={location.pathname === '/view' ? 'white' : 'primary.500'}
                borderColor="primary.500"
                _hover={{
                  bg: location.pathname === '/view' ? 'primary.600' : 'primary.500',
                  color: 'white'
                }}
                size="sm"
              >
                View People
              </Button>
            </Link>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}
