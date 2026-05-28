'use client'

import SearchContent from '@/components/search/search-content'
import { Suspense } from 'react'

export default function SearchPage() {
  
  return (
    <div>
      <Suspense>
        <SearchContent />
      </Suspense>
    </div>
  )
}