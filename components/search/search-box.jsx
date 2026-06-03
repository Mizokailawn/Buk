'use client'

import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '../ui/input'

const SearchBox = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState('')

  // Keep input synced with URL (important)
  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
  }, [searchParams])

  const handleSearch = () => {
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="relative w-full max-w-30">
      <Input
        type="search"
        placeholder=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="pl-3 pr-10 w-full rounded-full background-transparent"
      />

      <Search
        onClick={handleSearch}
        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-muted-foreground"
      />
    </div>
  )
}

export default SearchBox