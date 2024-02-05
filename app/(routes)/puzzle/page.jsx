'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/common/Header'
import Jigsaw from '@/app/components/puzzle/Jigsaw'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const piecesFoundInMemory = JSON.parse(localStorage.getItem('piecesFound'))
    if (piecesFoundInMemory) {
      if (piecesFoundInMemory.length < numberOfPieces) {
        // router.push('/')
        console.log('not enough pieces found')
      }
    } else {
      // router.push('/')
      console.log('no pieces found')
    }
  }, [])
  return (
    <>
      <Header />
      <main className='relative h-screen-sm pt-16'>
        <Jigsaw />
      </main>
    </>
  )
}
