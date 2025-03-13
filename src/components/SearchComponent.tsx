"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Search } from "lucide-react"

export default function SearchComponent({
  onSearchChange,
}: {
  onSearchChange: (searchTerm: string) => Promise<void>
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("")
  const [isDebouncing, setIsDebouncing] = useState(false)

  // Handle debouncing
  useEffect(() => {
    setIsDebouncing(true)
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(searchTerm)
      setIsDebouncing(false)
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchTerm])

  // Call onSearchChange only when debounced term changes
  useEffect(() => {
    const triggerSearch = async () => {
      await onSearchChange(debouncedTerm)
    }

    triggerSearch()
    // We're intentionally only including debouncedTerm in the dependency array
    // because onSearchChange is expected to be stable (wrapped in useCallback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
  }

  const clearSearch = useCallback(() => {
    setSearchTerm("")
    // We immediately set the debounced term to empty to avoid the delay when clearing
    setDebouncedTerm("")
  }, [])

  return (
    <div className="max-w-xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-amber-600" />
        </div>
        <input
          type="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Busca libros por autor, libro o género..."
          className="w-full py-3 pl-12 pr-4 text-amber-900 bg-white border border-amber-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-amber-400 font-medium"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="text-amber-500 hover:text-amber-700"
              type="button"
              aria-label="Limpiar búsqueda"
            >
              <span className="sr-only">Limpiar búsqueda</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="mt-2 text-xs text-amber-700 font-medium pl-1">
        {searchTerm && (isDebouncing ? "Buscando mientras escribes..." : debouncedTerm ? "Mostrando resultados" : "")}
      </div>
    </div>
  )
}