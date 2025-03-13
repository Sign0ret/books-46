"use client"

import { useEffect, useRef } from "react"
import type { Book } from "@/interfaces/Book"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GridComponent({
  books,
  onPageChange,
  currentPage,
  totalPages,
}: {
  books: Book[]
  onPageChange: (pageNumber: number) => void
  currentPage: number
  totalPages: number
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const prevPageRef = useRef(currentPage)

  // Track page changes to prevent double triggers
  useEffect(() => {
    prevPageRef.current = currentPage
  }, [currentPage])

  const getVisiblePages = () => {
    if (totalPages <= 5) return pages
    if (currentPage <= 3) return [...pages.slice(0, 5), null, totalPages]
    if (currentPage >= totalPages - 2) return [1, null, ...pages.slice(totalPages - 5)]
    return [1, null, currentPage - 1, currentPage, currentPage + 1, null, totalPages]
  }

  const visiblePages = getVisiblePages()

  const handlePageClick = (page: number) => {
    // Only trigger page change if it's different from current and previous page
    if (page !== currentPage && page !== prevPageRef.current) {
      onPageChange(page)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-amber-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-amber-100">
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-3 border-b border-amber-200 pb-2">
                {book.title}
              </h3>
              <div className="space-y-2 text-amber-800">
                <p className="flex items-center">
                  <span className="font-medium text-amber-950 mr-2 w-24">Autor:</span>
                  <span className="font-serif">{book.author}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium text-amber-950 mr-2 w-24">Publicado:</span>
                  <span>{book.publicationYear}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium text-amber-950 mr-2 w-24">Género:</span>
                  <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                    {book.genre}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-8">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-amber-300 bg-white text-sm font-medium ${
              currentPage === 1 ? "text-amber-300 cursor-not-allowed" : "text-amber-700"
            }`}
            type="button"
          >
            <span className="sr-only">Anterior</span>
            <ChevronLeft className="h-5 w-5" />
          </button>

          {visiblePages.map((page, index) =>
            page === null ? (
              <span
                key={`ellipsis-${index}`}
                className="relative inline-flex items-center px-4 py-2 border border-amber-300 bg-white text-sm font-medium text-amber-700"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageClick(page as number)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === currentPage
                    ? "z-10 bg-amber-700 border-amber-700 text-white"
                    : "bg-white border-amber-300 text-amber-700 hover:bg-amber-50"
                }`}
                type="button"
              >
                {page}
              </button>
            ),
          )}

          <button
            onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-amber-300 bg-white text-sm font-medium ${
              currentPage === totalPages ? "text-amber-300 cursor-not-allowed" : "text-amber-700"
            }`}
            type="button"
          >
            <span className="sr-only">Siguiente</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  )
}