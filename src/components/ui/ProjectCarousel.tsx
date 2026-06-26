'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

interface ProjectCarouselProps {
  images: string[]
  title: string
}

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function ProjectCarousel({ images, title }: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(
    () => setCurrent(c => (c - 1 + images.length) % images.length),
    [images.length]
  )
  const next = useCallback(
    () => setCurrent(c => (c + 1) % images.length),
    [images.length]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  if (!images.length) return null

  if (images.length === 1) {
    return (
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <Image
          src={images[0]}
          alt={`${title} screenshot`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    )
  }

  return (
    <div className="relative group">
      {/* Slides */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-400 ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={src}
              alt={`${title} screenshot ${idx + 1}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Gradient overlay for readability of controls */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent z-20 pointer-events-none" />

        {/* Counter badge */}
        <div className="absolute top-2 right-2 z-30 text-xs text-white bg-black/50 px-2.5 py-1 rounded-full font-medium tracking-wide">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Prev button */}
      <button
        onClick={prev}
        aria-label="Previous screenshot"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/20"
      >
        <ChevronLeft />
      </button>

      {/* Next button */}
      <button
        onClick={next}
        aria-label="Next screenshot"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/20"
      >
        <ChevronRight />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to screenshot ${idx + 1}`}
            className={`rounded-full transition-all duration-200 ${
              idx === current
                ? 'w-4 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
