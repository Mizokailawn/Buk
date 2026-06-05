'use client'

import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '../ui/input'

const SearchBox = () => {
  const router = useRouter()
  const searchparams = useSearchParams()

  const [query, setQuery] = useState('')

  // Keep input synced with URL (important)
  useEffect(() => {
    const q = searchparams.get('q') || ''
    setQuery(q)
  }, [searchparams])

  const onSearch = () => {
    if (!query.trim()) return

    const params = new URLSearchParams(searchparams)
    params.delete("search")
    params.set("q", query)
    
    router.replace(`/listings?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="relative w-full max-w-50">
      <Search 
        sixe={10}       
        onClick={onSearch}
        className="absolute left-3 top-1/2  -translate-y-1/2 cursor-pointer text-muted-foreground"
      />
      <Input
        type="search"
        placeholder=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        className="pl-10 pr-3 w-full rounded-full bg-card/60 text-sm"
      />
    </div>
  )
}

export default SearchBox