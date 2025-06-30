import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navigation from './components/Navigation'
import AddPerson from './pages/AddPerson'
import ViewPeople from './pages/ViewPeople'
import { system } from './theme'
import type { ReactElement } from 'react'

const queryClient = new QueryClient()

function App(): ReactElement {
  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate to="/add" replace />} />
            <Route path="/add" element={<AddPerson />} />
            <Route path="/view" element={<ViewPeople />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
