import { useState ,useMemo} from 'react'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import {Line} from 'react-chartjs-2';
import {useTable,useSortBy,useGlobalFilter,useFilters} from 'react-table'
import { Chart as ChartJS,
  CategoryScale,LinearScale,PointElement,LineElement
} from 'chart.js'







import moment from 'moment'

ChartJS.register(
    LineElement,CategoryScale,LinearScale,PointElement
)
function App() {
  const [dataForChart, setDataForChart] = useState([])
  

  const columns=[
   
    
    { 
    accessor:'id',
    Cell:()=>{
      return 
    }
  },
      {
      Header:'Name',
      accessor:'icon',
      Cell:({value})=>{
        return (<div className='w-full self-center justify-center flex'><img src={value} width='40px'/></div>)
      }
    },
    {
      Header:'Price',
      accessor:'price',
      Cell:({value})=>{
        return (<p>{`${ value>1? value?.toFixed(4) : value?.toFixed(4)}`} $</p>)
      }
    }, ,{
      Header:'H',
      accessor:'priceChange1h',
      Cell:({value})=>{
        return (<p className={`${value>0? 'text-emerald-400' : 'text-red-400'}`}>{value}%</p>)
      }
    },{
      Header:'D',
      accessor:'priceChange1d',
      Cell:({value})=>{
        return (<p className={`${value>0? 'text-emerald-400' : 'text-red-400'} `}>{value}%</p>)
      }
    },{
      Header:'W',
      accessor:'priceChange1w',
      Cell:({value})=>{
        return (<p className={`${value>0? 'text-emerald-400' : 'text-red-400'} `}>{value}%</p>)
      }
    }
    
  
  ]

const {data,isLoading}=useQuery({queryKey:['slt'],
  queryFn:async()=> {
    let res = await axios.get('https://api.coinstats.app/public/v1/charts?period=1m&coinId=ethereum    ')
    setDataForChart(res.data.chart)
    return res.data.chart
  
  }
} 


)
const {data :tableData}=useQuery({queryKey:['tableCoins'],
  queryFn:async()=> {
    let res = await axios.get('https://api.coinstats.app/public/v1/coins?skip=0&limit=200&currency=EUR    ')
    return res.data.coins
  
  }
} 

)
console.log(tableData)
const columnData=useMemo(()=> columns ,[]);
const rowData=useMemo(()=> tableData? tableData : ['id:1'],[tableData]);
const tableInstance=useTable({columns:columnData,data:rowData},useFilters,useGlobalFilter,useSortBy);
const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow,state,setGlobalFilter}
=tableInstance
const ValueOfFilter=state?.globalFilter;
console.log(tableInstance)
if(isLoading){
  return <p>Data is Loading</p>
}
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
    <div className='w-screen h-full '>
    <div className='w-screen items-center flex-col flex justify-center px-20   '>
     <div className='w-full flex items-center px-20 py-4'>
      <input placeholder='Search for a coin' value={ValueOfFilter? ValueOfFilter : ''} onChange={(e)=>setGlobalFilter(e.target.value.toLowerCase())} className="border-2 rounded-lg w-full self-center p-2"/>
     </div>
     
      <table {...getTableProps()} className=" h-full bg-slate-900 text-center w-full">
        <thead className=' border-b-2 border-gray-400 text-slate-200  bg-slate-800  ' >
          {
            headerGroups.map((headerGroup)=>(
              <tr {...headerGroup.getHeaderGroupProps()}>
                
              {
                headerGroup.headers.map((column:any)=>(
                  <th  className='p-2 py-4  italic ' {...column.getHeaderProps(column?.getSortByToggleProps())}>{column.render('Header')}</th>

                ))
              }
              </tr>
            ))  }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map(row=>{
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className="">
                    {
                      row.cells.map((cell)=>{
                        return <td {...cell.getCellProps()} className="text-slate-100 font-semibold self-center justify-self-center p-6"> {cell.render('Cell')}</td>
                      })
                    }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      </div>
    </div>
    </div>
  )
}

export default App
