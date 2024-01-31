import Header from '@/app/components/common/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main className='relative h-screen-sm pt-12 flex flex-col'>
        <section className='p-12'>
          <h1 className='text-4xl font-bold'>
            BRAND
            <br />
            HUNT
            <br />
            <span className='font-extralight'>2024</span>
          </h1>
        </section>
        <section className='relative pt-16 px-12 flex-1 overflow-hidden'>
          <div className='absolute right-1/2 top-0 translate-x-1/2 w-[900px] h-[900px] bg-gray-300 rounded-full' />
          <div className='relative'>
            <h2 className='text-2xl font-medium pb-4'>Your goals are:</h2>
            <ol className='list-decimal pl-6 mb-8 font-light'>
              <li>Scan QR codes to gain jigsaw pieces.</li>
              <li>Put them together to solve the final puzzle.</li>
              <li>Share your solution with friends on social media.</li>
            </ol>
            <p className='text-center font-medium border border-black p-2 rounded-lg'>
              GET STARTED.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
