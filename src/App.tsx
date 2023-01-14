import { useState } from 'react'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS,
  CategoryScale,LinearScale,PointElement,LineElement
} from 'chart.js'
import moment from 'moment'

ChartJS.register(
    LineElement,CategoryScale,LinearScale,PointElement
)
function App() {
  const [dataForChart, setDataForChart] = useState([])
const {data,isLoading}=useQuery({queryKey:['slt'],
  queryFn:async()=> {
    let res = await axios.get('https://api.coinstats.app/public/v1/charts?period=1m&coinId=ethereum    ')
    setDataForChart(res.data.chart)
    return res.data
  
  }
} 

)
if(isLoading){
  return <p>Data is Loading</p>
}
console.log(dataForChart)
  return (
    <div className='flex flex-col'>
    <div className="w-screen h-screen bg-blue-800 text-white text-center flex flex-col w-screen items-center">
      <h2 className='text-2xl pt-10'>Hello world</h2>
        <div className='h-full w-full md:w-96 lg:w-4/5 xl: w-3/5 flex items-center justify-center bg-white '>
          <Line options={{responsive:true}} data={{labels:dataForChart?.map((e)=>moment.unix(e[0]).format('MM-DD')),datasets:[{
            data: dataForChart?.map((e)=> e[1])
          }]}}/>
        </div>
    </div>
    </div>
  )
}

export default App
