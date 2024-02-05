'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { pieces, initialBoardPieces } from '@/app/utils/content'
import { arraysAreEqual } from '@/app/utils/helpers'

export default function Jigsaw() {
  const router = useRouter()
  const [boardPieces, setBoardPieces] = useState([...initialBoardPieces])
  const [selectedPieceId, setSelectedPieceId] = useState(null)
  const [oldSelectedPieceIndex, setOldSelectedPieceIndex] = useState(null)
  const [puzzleComplete, setPuzzleComplete] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const orderedPieces = [...pieces].sort(
      (a, b) => a.solutionIndex - b.solutionIndex
    )
    let solutionPieces = []
    orderedPieces.forEach((piece) => solutionPieces.push(piece.id))

    if (arraysAreEqual(solutionPieces, boardPieces)) {
      setPuzzleComplete(true)
    }
  }, [boardPieces])

  useEffect(() => {
    console.log(selectedPieceId)
  }, [selectedPieceId])

  useEffect(() => {
    if (puzzleComplete) {
      setShowPopup(true)
      console.log('puzzle complete! you are a egnius')
    }
  }, [puzzleComplete])

  const reorderPieces = (i) => {
    if (!puzzleComplete) {
      if (selectedPieceId !== null) {
        let newBoardPieces = [...boardPieces]
        newBoardPieces[i] = selectedPieceId
        if (oldSelectedPieceIndex != null) {
          newBoardPieces[oldSelectedPieceIndex] = null
        }
        setBoardPieces([...newBoardPieces])
        setSelectedPieceId(null)
        setOldSelectedPieceIndex(null)
      } else {
        setSelectedPieceId(boardPieces[i])
        setOldSelectedPieceIndex(i)
      }
    }
  }

  return (
    <main className='flex flex-col'>
      <section className='flex-1 px-20 pb-6'>
        <ul className='grid grid-cols-2 gap-[1px] w-full border border-white'>
          {boardPieces.map((boardPiece, i) => (
            <li
              className='w-full h-full border border-black border-dashed aspect-square'
              style={{
                borderColor: selectedPieceId ? 'orange' : 'black',
                borderStyle: boardPiece !== null ? 'solid' : 'dashed',
              }}
              onClick={() => reorderPieces(i)}
              key={i}
            >
              {boardPiece !== null && (
                <img
                  src={pieces[boardPiece].content}
                  alt={`Board piece ${i + 1}`}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className='relative pt-16 pb-16 px-12 flex-1 overflow-hidden'>
        <div className='absolute right-1/2 top-0 translate-x-1/2 w-[900px] h-[900px] bg-gray-300 rounded-full' />
        <div className='relative'>
          <h2 className='text-2xl font-medium pb-4 text-center'>Your pieces</h2>
          <ul className='grid grid-cols-3 gap-1 w-full min-h-20'>
            {pieces
              .filter((piece) => !boardPieces.includes(piece.id))
              .map((piece, i) => (
                <li
                  className='w-full border border-black bg-gray-400 flex justify-center items-center text-center aspect-square'
                  onClick={() => {
                    console.log('hey')
                    setSelectedPieceId(piece.id)
                  }}
                  key={piece.id}
                >
                  <img src={piece.content} alt={`Puzzle piece ${i + 1}`} />
                </li>
              ))}
          </ul>
        </div>
      </section>
      <div
        className='fixed left-0 top-0 w-screen h-screen-sm flex flex-col transition-opacity duration-300'
        style={{
          opacity: showPopup ? 1 : 0,
          pointerEvents: showPopup ? 'all' : 'none',
        }}
      >
        <div className='absolute left-0 top-0 w-full h-full bg-gray-500 opacity-90' />
        <div className='relative w-full h-full flex flex-col justify-center items-center '>
          <h2 className='mb-4 px-12 text-center text-white'>
            Congratulations, you solved the puzzle!
          </h2>
          <button
            className='text-center font-medium border border-white p-2 rounded-lg text-white'
            onClick={() => router.push('/complete')}
          >
            CONTINUE.
          </button>
        </div>
      </div>
    </main>
  )
}
