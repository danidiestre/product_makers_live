'use client'

import { FC, useState } from 'react'
import { MakerCard } from './MakerCard'
import { getAllMakers, getMakersByCategory } from '@/lib/data'
import { Maker } from '@/lib/types'
import clsx from 'clsx'

type MakerCategory = 'Designer' | 'Developer' | 'Marketing' | 'Other' | 'All'

interface MakersListProps {
  initialMakers?: Maker[]
}

export const MakersList: FC<MakersListProps> = ({ initialMakers = getAllMakers() }) => {
  const [selectedCategory, setSelectedCategory] = useState<MakerCategory>('All')
  
  // Filter makers based on category
  const filteredMakers = selectedCategory === 'All' 
    ? initialMakers 
    : initialMakers.filter(maker => maker.makerCategory === selectedCategory)
  
  // Count makers by category
  const designerCount = initialMakers.filter(maker => maker.makerCategory === 'Designer').length
  const developerCount = initialMakers.filter(maker => maker.makerCategory === 'Developer').length
  const marketingCount = initialMakers.filter(maker => maker.makerCategory === 'Marketing').length
  const otherCount = initialMakers.filter(maker => maker.makerCategory === 'Other' || !maker.makerCategory).length
  
  const categories: Array<{ id: MakerCategory, label: string, count: number }> = [
    { id: 'All', label: 'All Makers', count: initialMakers.length },
    { id: 'Designer', label: 'Designers', count: designerCount },
    { id: 'Developer', label: 'Developers', count: developerCount },
    { id: 'Marketing', label: 'Marketing', count: marketingCount },
    { id: 'Other', label: 'Other', count: otherCount },
  ]
  
  return (
    <div>
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedCategory === category.id
                  ? 'bg-brand-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>
      
      {/* Makers Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Showing {filteredMakers.length} {filteredMakers.length === 1 ? 'maker' : 'makers'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>
      
      {/* Makers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMakers.map((maker, index) => (
          <MakerCard key={`${maker.name}-${index}`} maker={maker} />
        ))}
      </div>
      
      {/* Empty State */}
      {filteredMakers.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">No makers found</h3>
          <p className="mt-2 text-sm text-gray-500">
            No makers found in the {selectedCategory} category.
          </p>
        </div>
      )}
    </div>
  )
} 