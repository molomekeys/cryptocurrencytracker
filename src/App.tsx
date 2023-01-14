import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-screen h-screen bg-blue-800 text-white text-center ">
      <h2 className='text-2xl pt-10'>Hello world</h2>
    </div>
  )
}

export default App
