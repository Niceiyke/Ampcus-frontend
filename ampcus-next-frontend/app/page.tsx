import Link from "next/link"


function Home() {
  return (
    <main className="flex flex-col h-screen p-2 items-center justify-center bg-slate-950 text-gray-100 ">

      <h1 className="text-orange-500 text-center mb-4"> Welcome to Ama cooperative society</h1>
      <h2 className="mb-4 text-center">Empoering you for greatness</h2>
      <Link href='/register'><button className='rounded-lg  border-orange-500 border-2 w-32 p-4 text-lg font-bold'>Join us</button></Link>
      <p className='mt-4'> Already a member? <Link href='/login' className='pl-2'>Login</Link></p>

    </main>
  )
}

export default Home