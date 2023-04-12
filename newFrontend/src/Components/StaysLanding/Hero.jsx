import React, { useState } from 'react'

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

import { DateRange } from 'react-date-range';
import {format} from 'date-fns'

import StaysImg from '../../assets/staysimg.jpg'

import { FaBed } from 'react-icons/fa'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { useNavigate } from 'react-router';



const Hero = () => {



    const [openDate, setOpenDate] = useState(false)
    const [destination, setDestination] = useState('')



    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);


      const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev, [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
            }
        })
      }

      const navigate = useNavigate()


      const handleSearch = async () => {

      

        navigate('/hotels', {state: { destination, date, options }})

      }

  return (
    <>


    
    
        <section  className="bg-cover bg-center bg-gray-800 py-32"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1680567718250-e71cf9bbff15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')` }}>
            
            <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-4xl font-bold mb-2 text-white">
          Find your next stay
        </h2>
        <h3 className="text-2xl mb-8 text-gray-200">
          Search deals on hotels, homes, and much more...
        </h3>
      </div>

      <div className=' h-[30px] bg-white border-2 border-solid border-yellow-400 flex items-center justify-around py-7 px-0 rounded-md w-full max-w-[1400px] mx-auto'>
        <div className='flex items-center gap-3'>
            <FaBed/>
            <input type='text' placeholder='Where are you going?' className=' border-none outline-none' onChange={e => setDestination(e.target.value)}/>
        </div>
        <div className='flex items-center gap-3'>
            <AiOutlineCalendar/>
            <span onClick={() => setOpenDate(!openDate)} className='text-gray-400 cursor-pointer'>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
            {openDate && <DateRange
            onChange={item => setDate([item.selection])}
            
                moveRangeOnFirstSelection={false}
            editableDateInputs={true}
            minDate={new Date()}
            ranges={date}
            className='absolute top-96 z-20'
            
            />}
        </div>
        <div className='flex items-center gap-3'>
            <BsFillPersonFill/>
            <span  onClick={() => setOpenOptions(!openOptions)} className='text-gray-400 cursor-pointer'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
            {openOptions && <div className='absolute top-96 bg-white text-gray-400 rounded-5 shadow-md'>
                <div className=' w-[200px] flex justify-between  m-3'>
                    <span className='optionText'>Adult</span>
                    <div className='flex items-center gap-3 text-xs'>
                    <button className=' w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white' onClick={() => handleOption("adult", "d")} disabled={options.adult <= 1}>-</button>
                    <span className='optionCounterNumber'>{options.adult}</span>
                    <button className=' w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white' onClick={() => handleOption("adult", "i")}>+</button>
                    </div>
                </div>
                <div className='w-[200px] flex justify-between  m-3'>
                    <span className='optionText'>Children</span>
                    <div className='flex items-center gap-3 text-xs'>
                    <button className=' w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white' onClick={() => handleOption("children", "d")} disabled={options.children <= 0}>-</button>
                    <span className='optionCounterNumber'>{options.children}</span>
                    <button className=' w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white' onClick={() => handleOption("children", "i")}>+</button>
                    </div>
                </div>
                <div className='w-[200px] flex justify-between  m-3'>
                    <span className='optionText'>Room</span>
                    <div className='flex items-center gap-3 text-xs'>
                    <button className=' w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white' onClick={() => handleOption("room", "d")} disabled={options.room <= 1}>-</button>
                    <span className='optionCounterNumber'>{options.room}</span>
                    <button className=' w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white'onClick={() => handleOption("room", "i")}>+</button>
                    </div>
                </div>
            </div>}
        </div>
        <div className='headerSearchItem'>
        <button type="button" class="px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 " onClick={handleSearch}>Search</button>
        </div>
      </div>
        </section>
    </>
  )
}

export default Hero