'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">
        {query ? `Results for "${query}"` : 'Search vehicles'}
      </h1>

      <div className="mt-4">
        {!query && <p>Start searching for vehicles 🚗</p>}

        {query && (
          <p>Showing results for "{query}"...</p>
        )}
      </div>
    </div>
  )
}