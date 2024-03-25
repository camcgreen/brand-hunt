'use client'

import { useState, useEffect } from 'react'
import Header from '@/app/components/common/Header'

export default function Complete() {
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    setShareUrl(document.location.href)
  }, [])

  return (
    <>
      <Header />
      <main className='relative h-screen-sm pt-12 flex flex-col'>
        <section className='relative px-12 py-24 '>
          <p className='absolute bottom-28 right-12 text-8xl'>🎈</p>
          <h1 className='relative text-4xl font-bold'>
            PUZZLE
            <br />
            COMPLETED
          </h1>
        </section>
        <section className='relative pt-16 px-12 flex-1 overflow-hidden'>
          <div className='absolute right-1/2 top-0 translate-x-1/2 w-[900px] h-[900px] bg-gray-300 rounded-full' />
          <div className='relative flex flex-col items-center'>
            <h2 className='text-2xl font-medium pb-4 text-center'>
              #YourHashtag
            </h2>
            <p className='text-center mb-12 font-light'>
              Download your completed image here to share on social media.
            </p>
            <a
              className='bg-black rounded-full p-4'
              href='/images/complete.jpg'
              download
            >
              <img
                src='/images/download.png'
                alt='Download image'
                className='w-4'
              />
            </a>
            {/* <div className='h-8 flex justify-around'>
              <img src='/images/fb.svg' alt='Share on Facebook' />
              <img src='/images/ig.svg' alt='Share on Instagram' />
              <img src='/images/x.svg' alt='Share on X' />
            </div> */}
          </div>
        </section>
      </main>
    </>
  )
}
