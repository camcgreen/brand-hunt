'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Header from '@/app/components/common/Header'
import { numberOfPieces } from '@/app/utils/content'

export default function FoundPiece() {
  const router = useRouter()
  const { slug } = useParams()
  const [showPopup, setShowPopup] = useState(false)

  const piecesFoundInMemory = JSON.parse(localStorage.getItem('piecesFound'))
  if (!piecesFoundInMemory) {
    localStorage.setItem('piecesFound', JSON.stringify([slug]))
  } else {
    if (slug > 0 && slug <= numberOfPieces) {
      if (!piecesFoundInMemory.includes(slug)) {
        piecesFoundInMemory.push(slug)
        localStorage.setItem('piecesFound', JSON.stringify(piecesFoundInMemory))
      }

      if (piecesFoundInMemory.length >= numberOfPieces) {
        setTimeout(() => {
          setShowPopup(true)
        }, 0)
      }
    }
  }

  return (
    <>
      <Header />
      <main className='relative h-screen-sm pt-12 flex flex-col'>
        <section className='py-28 flex justify-center items-center'>
          <img
            src={`/images/${slug}.jpg`}
            alt={`Puzzle piece ${slug}`}
            className='w-40 aspect-square bg-gray-400'
          />
        </section>
        <section className='relative pt-16 px-12 flex-1 overflow-hidden'>
          <div className='absolute right-1/2 top-0 translate-x-1/2 w-[900px] h-[900px] bg-gray-300 rounded-full' />
          <div className='relative'>
            <h2 className='text-2xl font-medium pb-4 text-center'>
              You found a puzzle piece!
            </h2>
            {piecesFoundInMemory ? (
              !showPopup && (
                <p className='text-center'>{`Only ${
                  numberOfPieces - piecesFoundInMemory.length
                } more to go.`}</p>
              )
            ) : (
              <p className='text-center'>{`Only ${
                numberOfPieces - 1
              } more to go.`}</p>
            )}
          </div>
        </section>
        <div
          className='fixed left-0 top-0 w-screen h-screen-sm flex flex-col transition-opacity duration-300'
          style={{ opacity: showPopup ? 1 : 0 }}
        >
          <div className='absolute left-0 top-0 w-full h-full bg-gray-500 opacity-90' />
          <div className='relative w-full h-full flex flex-col justify-center items-center '>
            <h2 className='mb-4 px-12 text-center text-white'>
              You found all the puzzle pieces!
            </h2>
            <button
              className='text-center font-medium border border-white p-2 rounded-lg text-white'
              onClick={() => router.push('/puzzle')}
            >
              GO TO PUZZLE.
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
