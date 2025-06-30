import { 
  VStack, 
  Container,
  Spinner,
  Alert,
  Text
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useCallback } from 'react'
import type { ReactElement } from 'react'
import { SearchInput } from '../components/SearchInput'
import { ResultsSummary } from '../components/ResultsSummary'
import { PaginationControls } from '../components/PaginationControls'
import { PeopleList } from '../components/PeopleList'
import { EmptyState } from '../components/EmptyState'

interface CanvassingRecord {
  id: number
  person_name: string
  notes: string
  email?: string
  created_at: string
  updated_at: string
}

interface PeopleResponse {
  success: boolean
  data: CanvassingRecord[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export default function ViewPeople(): ReactElement {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const pageSize = 10

  // Debounce search query to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setCurrentPage(1) // Reset to first page when search changes
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])
  
  // Query for fetching canvassing records with search and pagination
  const { data, isLoading, isError, error, isFetching } = useQuery<PeopleResponse>({
    queryKey: ['people', debouncedQuery, currentPage],
    queryFn: async (): Promise<PeopleResponse> => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: pageSize.toString()
      })
      
      if (debouncedQuery.trim()) {
        params.append('query', debouncedQuery.trim())
      }

      const res = await fetch(`http://localhost:3001/api/notes/search?${params}`)
      if (!res.ok) throw new Error('Failed to fetch canvassing records')
      return res.json()
    },
    refetchInterval: 30000, // Refetch every 30 seconds to stay updated
  })

  // Track initial load completion
  useEffect(() => {
    if (data && isInitialLoad) {
      setIsInitialLoad(false)
    }
  }, [data, isInitialLoad])

  const handleExportCsv = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3001/api/notes/export/csv')
      if (!response.ok) throw new Error('Failed to export CSV')
      
      const csvContent = await response.text()
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      
      // Create download link
      const link = document.createElement('a')
      link.href = url
      link.download = `canvassing-data-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting CSV:', error)
      // Could add toast notification here
    }
  }, [])

  const handlePreviousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }, [])

  const handleNextPage = useCallback(() => {
    if (!data) return
    const totalPages = data.totalPages || Math.ceil(data.total / pageSize)
    setCurrentPage(prev => Math.min(totalPages, prev + 1))
  }, [data, pageSize])

  const handleInputFocus = useCallback(() => {
    setInputFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setInputFocused(false)
  }, [])

  // Only show full loading screen on initial load, not for subsequent searches
  if (isLoading && isInitialLoad) {
    return (
      <Container maxW="4xl" py={8}>
        <VStack gap={6}>
          <Spinner size="xl" />
          <Text>Loading canvassing records...</Text>
        </VStack>
      </Container>
    )
  }

  if (isError) {
    return (
      <Container maxW="4xl" py={8}>
        <Alert.Root status="error">
          <Alert.Title>Error loading canvassing records</Alert.Title>
          <Alert.Description>
            {error instanceof Error ? error.message : 'An unknown error occurred'}
          </Alert.Description>
        </Alert.Root>
      </Container>
    )
  }

  const people = data?.data || []
  const totalCount = data?.total || 0
  const totalPages = data?.totalPages || Math.ceil(totalCount / pageSize)
  const showingStart = (currentPage - 1) * pageSize + 1
  const showingEnd = Math.min(currentPage * pageSize, totalCount)

  return (
    <Container maxW="4xl" py={8}>
      <VStack gap={6}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          shouldFocus={inputFocused}
          isLoading={isFetching && !isInitialLoad}
        />

        <ResultsSummary
          totalCount={totalCount}
          showingStart={showingStart}
          showingEnd={showingEnd}
          currentPage={currentPage}
          totalPages={totalPages}
          debouncedQuery={debouncedQuery}
          onExportCsv={handleExportCsv}
          hasResults={people.length > 0}
          isLoading={isLoading || isFetching}
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />

        {/* Only show EmptyState when we have definitive results and no loading */}
        {people.length === 0 && !isLoading && !isFetching && !isInitialLoad ? (
          <EmptyState debouncedQuery={debouncedQuery} />
        ) : people.length > 0 ? (
          <PeopleList people={people} />
        ) : null}

        {/* Bottom Pagination Controls (for long lists) */}
        {totalPages > 1 && people.length > 5 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        )}
      </VStack>
    </Container>
  )
}
