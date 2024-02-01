'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { pieces, initialBoardPieces, numberOfPieces } from '@/app/utils/content'
import { arraysAreEqual } from '@/app/utils/helpers'

export default function Jigsaw() {
  const router = useRouter()
  const [boardPieces, setBoardPieces] = useState([...initialBoardPieces])
  const [selectedPieceId, setSelectedPieceId] = useState(null)
  const [oldSelectedPieceIndex, setOldSelectedPieceIndex] = useState(null)
  const [puzzleComplete, setPuzzleComplete] = useState(false)

  useEffect(() => {
    const piecesFoundInMemory = JSON.parse(localStorage.getItem('piecesFound'))
    if (piecesFoundInMemory) {
      if (piecesFoundInMemory.length < numberOfPieces) {
        router.push('/')
        console.log('not enough pieces found')
      }
    } else {
      router.push('/')
      console.log('no pieces found')
    }
  }, [])

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
    <div className='flex flex-col h-full'>
      <div className='flex-1 px-12'>
        <ul
          className='grid grid-cols-2 gap-1 w-full h-full border border-white'
          style={{ borderColor: puzzleComplete ? 'green' : 'white' }}
        >
          {boardPieces.map((boardPiece, i) => (
            <li
              className='w-full h-full border border-black border-dashed'
              style={{
                borderColor: selectedPieceId ? 'orange' : 'black',
              }}
              onClick={() => reorderPieces(i)}
              key={i}
            >
              {boardPiece !== null && pieces[boardPiece].content}
            </li>
          ))}
        </ul>
      </div>
      <div className='h-60 px-12'>
        <ul className='grid grid-cols-3 gap-1 w-full h-full'>
          {pieces
            .filter((piece) => !boardPieces.includes(piece.id))
            .map((piece, i) => (
              <li
                className='w-full h-full border border-black bg-gray-400 flex justify-center items-center text-center'
                onClick={() => {
                  console.log('hey')
                  setSelectedPieceId(piece.id)
                }}
                key={piece.id}
              >
                {piece.content}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
