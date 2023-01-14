import { useState } from 'react'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
function App() {
  const [count, setCount] = useState(0)
const {data,isLoading}=useQuery({queryKey:['slt'],
  queryFn:async()=> {
    let res = await axios.get('https://api.coinstats.app/public/v1/coins?skip=0&limit=5&currency=EUR')
  return res.data
  
  }
} 

)
if(isLoading){
  return <p>Data is Loading</p>
}
console.log(data)
  return (
    <div className="w-screen h-screen bg-blue-800 text-white text-center ">
      <h2 className='text-2xl pt-10'>Hello world</h2>
    </div>
  )
}

export default App
