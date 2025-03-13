"use client"
import { useState, useEffect, useCallback } from "react"
import SearchComponent from "@/components/SearchComponent"
import GridComponent from "@/components/GridComponent"
import type { Book } from "@/interfaces/Book"
import { BookOpen } from "lucide-react"

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [, setSearchTerm] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fetchTrigger, setFetchTrigger] = useState<{ page: number; search: string }>({
    page: 1,
    search: "",
  })

  const fetchBooks = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/books?page=${fetchTrigger.page}&search=${fetchTrigger.search}`)
      const data = await response.json()
      setBooks(data.books)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error fetching the books json:", error)
    } finally {
      setIsLoading(false)
    }
  }, [fetchTrigger])

  useEffect(() => {
    fetchBooks()
  }, [fetchTrigger, fetchBooks])

  const handleSearch = useCallback(async (term: string) => {
    setSearchTerm(term)
    setFetchTrigger({ page: 1, search: term })
  }, [])

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber)
      setFetchTrigger((prev) => ({ ...prev, page: pageNumber }))
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 bg-[url('/subtle-paper-texture.png')] bg-repeat">
      <header className="bg-amber-900 text-amber-50 py-8 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <BookOpen className="h-10 w-10" />
            <div className="ml-3">
              <h1 className="text-2xl font-serif font-bold">Books 46</h1>
              <p className="text-amber-200 text-sm">Colección de libros digitales</p>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-serif font-bold text-amber-900 mb-4">Buscar la colección</h2>
          <p className="text-amber-800 mb-6">Descubre libros de nuestra selección</p>

          <SearchComponent onSearchChange={handleSearch} />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-amber-300 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-amber-200 rounded mb-2"></div>
              <div className="h-3 w-24 bg-amber-100 rounded"></div>
            </div>
          </div>
        ) : books.length > 0 ? (
          <GridComponent
            books={books}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Sin libros encontrados</h3>
            <p className="text-amber-700">
              No pudimos encontrar libros según tu búsqueda, intenta ajustar el término para encontrar resultados.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}