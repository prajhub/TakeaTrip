import React, { useState } from 'react'
import { useLocation } from 'react-router'
import {format} from 'date-fns'
import { DateRange } from 'react-date-range';

import { useGetAccommodationsByCityQuery } from '../../Features/api/apiSlice';

import SearchItem from './SearchItem';

const SearchedBody = () => {

    const location = useLocation()

    
    const [destination, setDestination] = useState(location.state.destination)
    const [date, setDate] = useState(location.state.date)
    const [openDate, setOpenDate] = useState(false)
    const [options, setOptions] = useState(location.state.options)

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(999)

    


    const { data, isLoading, isError, refetch} = useGetAccommodationsByCityQuery(destination)

    console.log(data)


    const handleClick = () => {
        const url = `http://localhost:5000/accommodation?location=${destination}&min=${min || 0 }&max=${max || 999}`
        refetch({endpoint: url})
    }

  return (
    <>
    

        <section className=''>
           
            <div className='flex justify-center mt-5'>
                <div className=' w-full max-w-5xl flex gap-5'>
                    <div className=' flex-1 bg-[#febb02] p-3 rounded-md sticky top-3'>
                        <h1 className=' text-xl text-[#555] mb-3'>Search</h1>
                        <div className='flex flex-col gap-2 mb-3'>
                            <label className='text-xs font-semibold'>Destination</label>
                            <input className=' h-8 border-none p-1' placeholder={destination} type='text'/>
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <label className='text-xs font-semibold'>Check-in Date</label>

                            <span onClick={()=> setOpenDate(!openDate)} className='h-8 border-none p-1 bg-white flex items-center cursor-pointer'>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && <DateRange  onChange={item => setDate([item.selection])}  ranges={date}/>}
                        </div>
                        <div className='flex flex-col gap-2 mt-3'>
                            <label>Options</label>
                            <div className=' '>
                            <div className='flex justify-between mb-4 items-center text-xs'>
                                <span className='lsOpnText h-'>Min Price <small>per night</small></span>
                                <input  type='number' onChange={e =>setMin(e.target.value)} className='w-40 h-11'/>
                            </div>
                            <div className='flex justify-between items-center mb-4 text-xs'>
                                <span className='lsOpnText'>Max Price <small>per night</small></span>
                                <input  type='number' onChange={e =>setMax(e.target.value)} className='w-40 h-11'/>
                            </div>
                            <div className='flex justify-between mb-4 text-xs'>
                                <span className='lsOpnText'>Adult</span>
                                <input  type='nubmer' min={1} className='w-50 ' placeholder={options.adult}/>
                            </div>
                            <div className='flex justify-between mb-4 text-xs'>
                                <span className='lsOpnText'>Children</span>
                                <input  type='nubmer' min={0} className='w-50' placeholder={options.children}/>
                            </div>
                            <div className='flex justify-between mb-4 text-xs'>
                                <span className='lsOpnText'>Rooms</span>
                                <input  type='nubmer' min={1} className='w-50' placeholder={options.room}/>
                            </div>
                        </div>
                        </div>
                        <button onClick={handleClick} className=' p-2 bg-primary-600 text-white border-none w-full font-medium cursor-pointer'>Search</button>
                        
                    </div>
                    <div className='flex-[3_1_0%]'>
                        {isLoading ? "Loading..." :
                        <>
                            {data.map(item=> (
                                <SearchItem  item={item} key={item._id}/>
                            ))}
                        </>}
                        
                        
                    </div>
                
                </div>
            </div>
            
        </section>
    
    </>
  )
}

export default SearchedBody