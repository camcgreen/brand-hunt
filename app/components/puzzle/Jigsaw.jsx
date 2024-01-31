import { useState, useEffect } from 'react'
import { arraysAreEqual } from '@/app/utils/helpers'

export default function Jigsaw() {
  const pieces = [
    {
      id: 0,
      content: 'D',
      solutionIndex: 3,
    },
    {
      id: 1,
      content: 'B',
      solutionIndex: 1,
    },
    {
      id: 2,
      content: 'F',
      solutionIndex: 5,
    },
    {
      id: 3,
      content: 'C',
      solutionIndex: 2,
    },
    {
      id: 4,
      content: 'A',
      solutionIndex: 0,
    },
    {
      id: 5,
      content: 'E',
      solutionIndex: 4,
    },
  ]

  const [boardPieces, setBoardPieces] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ])
  const [selectedPieceId, setSelectedPieceId] = useState(null)

  useEffect(() => {
    const orderedPieces = [...pieces].sort(
      (a, b) => a.solutionIndex - b.solutionIndex
    )
    let solutionPieces = []
    orderedPieces.forEach((piece) => solutionPieces.push(piece.id))

    if (arraysAreEqual(solutionPieces, boardPieces)) {
      console.log('puzzle complete!')
    }
  }, [boardPieces])

  useEffect(
    () => console.log(`selectedPieceId: ${selectedPieceId}`),
    [selectedPieceId]
  )

  const reorderPieces = (i) => {
    if (selectedPieceId !== null) {
      let newBoardPieces = [...boardPieces]
      newBoardPieces[i] = selectedPieceId
      setBoardPieces([...newBoardPieces])
      setSelectedPieceId(null)
    } else {
      console.log('piece already selected')
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 px-12'>
        <ul className='grid grid-cols-2 gap-1 w-full h-full'>
          {boardPieces.map((boardPiece, i) =>
            boardPiece !== null ? (
              <li
                className='w-full h-full border border-black border-dashed'
                style={{
                  borderColor: selectedPieceId ? 'orange' : 'black',
                }}
                onClick={() => reorderPieces(i)}
                key={i}
              >
                {pieces[boardPiece].content}
              </li>
            ) : (
              <li
                className='w-full h-full border border-black border-dashed'
                style={{
                  borderColor: selectedPieceId ? 'orange' : 'black',
                }}
                onClick={() => reorderPieces(i)}
                key={i}
              ></li>
            )
          )}
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
