'use client'

import { useParams } from 'next/navigation'
import Header from '@/app/components/common/Header'
import { numberOfPieces } from '@/app/utils/content'

export default function FoundPiece() {
  const { slug } = useParams()

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
        console.log('all pieces found')
      }
    }
  }

  return (
    <>
      <Header />
      <main className=''>
        <h1>{`hey you found piece: ${slug}`}</h1>
      </main>
    </>
  )
}

const piecesFound = [1, 2, 3, 4, 5, 6]
