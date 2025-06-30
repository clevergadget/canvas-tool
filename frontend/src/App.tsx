import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navigation from './components/Navigation'
import AddNote from './pages/AddNote'
import ViewNotes from './pages/ViewNotes'
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
            <Route path="/add" element={<AddNote />} />
            <Route path="/view" element={<ViewNotes />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
