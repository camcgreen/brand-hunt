export const pieces = [
  {
    id: 0,
    // content: 'D',
    content: '/images/4.jpg',
    solutionIndex: 3,
  },
  {
    id: 1,
    // content: 'B',
    content: '/images/2.jpg',
    solutionIndex: 1,
  },
  {
    id: 2,
    // content: 'F',
    content: '/images/6.jpg',
    solutionIndex: 5,
  },
  {
    id: 3,
    // content: 'C',
    content: '/images/3.jpg',
    solutionIndex: 2,
  },
  {
    id: 4,
    // content: 'A',
    content: '/images/1.jpg',
    solutionIndex: 0,
  },
  {
    id: 5,
    // content: 'E',
    content: '/images/5.jpg',
    solutionIndex: 4,
  },
]

export const initialBoardPieces = new Array(pieces.length).fill(null)

export const numberOfPieces = pieces.length
