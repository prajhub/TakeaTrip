import React, { useState } from 'react'
import { BiPhoneCall, BiPencil } from 'react-icons/bi'
import {AiOutlineGlobal, AiFillMail, AiFillCloseCircle, AiOutlineWifi} from 'react-icons/ai'
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsFillPencilFill} from 'react-icons/bs'
import { FaUser } from 'react-icons/fa';


const Body = () => {

    const [slideNumber, setSlideNumber] = useState(0)
    const [open, setOpen] = useState(false)

    const handleOpen = (i) => {
        setSlideNumber(i)
        setOpen(!open)
    }


    const handleMove = (direction) => {
        let newSlideNum

        if(direction==="l"){
            newSlideNum = slideNumber === 0 ? 5 : slideNumber - 1
        }else {
            newSlideNum = slideNumber === 5 ? 0 : slideNumber + 1
        }

        setSlideNumber(newSlideNum)
    }

    const photos = [
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
        },
      ];



      const [date, setDate] = useState(new Date())
      const [openDate, setOpenDate] = useState(false)
      const [formattedDate, setFormattedDate] = useState('');
      console.log(formattedDate)

      const handleSelect = (date) => {
        const newDate = new Date(date);
    setDate(newDate);
    setOpenDate(false);
    setFormattedDate(newDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}));
        
      }

      //Date Range
      const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      });


      //Num of Peopl
    const [people, setPeople] = useState('')

    const handleNumPeople = (event) => {
        setPeople(event.target.value)
    }


      //Time
      const [selectedTime, setSelectedTime] = useState('8 AM');

      const times = Array.from(Array(13).keys()).map((i) => i + 6);

      const handleChange = (event) => {
        setSelectedTime(event.target.value);
      };


  return (
   <>
        <section className='max-w-[1400px]  mx-auto mt-4 border-t '>
        <div class="flex justify-between items-center py-2">
        <div class="flex-1">
    <h1 class="text-3xl font-bold">asdasd</h1>
   
    <div className='flex flex-row items-center'>
    <div class="flex items-center mt-2 mb-3">
      
      <span class=" text-gray-500 underline text-md font-semibold">By him</span>
    </div>
    
    </div>
    <p class="text-gray-700 text-sm mt-2 cursor-pointer   flex flex-row items-center gap-1 ">
      <div className='flex flex-row items-center hover:underline gap-1'><span class="font-bold"><BiPhoneCall size={20}/></span> +65 6688 8868</div>
      <div className='flex flex-row items-center hover:underline gap-1'><span class="font-bold md:ml-20 "><AiOutlineGlobal size={20}/></span> Visit Website</div>
     
      <div className='flex flex-row items-center hover:underline gap-1'><span class="font-bold md:ml-20 "><BiPencil size={20}/></span> Write a review</div>
    </p>
  </div>



  <div class="ml-4 flex flex-row hover:underline items-center  flex-shrink-0">
      <BsFillPencilFill/>
    <button class=" text-black  font-medium text-md py-2 px-2 ">
      Review
    </button>
  </div>

        </div>
        {open && <div className=' sticky top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-50 flex items-center'>
    <AiFillCloseCircle size={30} onClick={()=> setOpen(false)} className='absolute top-10 right-40  text-gray-400 cursor-pointer'/>
    <BsFillArrowLeftCircleFill onClick={()=> handleMove("l")} className='m-20 text-5xl  cursor-pointer'/>
    <div className="w-full h-full flex justify-center items-center" >
        <img src={photos[slideNumber].src} alt="" className="w-4/5 h-80vh" />
    </div>
    <BsFillArrowRightCircleFill onClick={()=> handleMove("r")} className='m-20 text-5xl  cursor-pointer'/>
</div>

}
<div className='flex flex-wrap wrap justify-between mt-7'>
    {photos.map((photo, i)=> (
        <div className=' w-1/3'>
            <img onClick={()=>handleOpen(i)} src={photo.src} alt='' className='w-full object-cover cursor-pointer'/>
        </div>
    ))}
</div>

{/* Description Section */}

<div class="flex flex-wrap py-6 md:mt-6">
    <div class="w-full md:w-2/3 md:pr-10">
      <h2 class="text-xl font-semibold mb-4">Description</h2>
      <p class="text-gray-700 leading-relaxed mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eu augue volutpat porta. Phasellus fermentum massa eu velit feugiat interdum. Vestibulum scelerisque risus vel augue ullamcorper, vel eleifend est eleifend. Vestibulum a ex lectus. Suspendisse tincidunt consequat sapien, eu efficitur quam posuere quis. Vestibulum auctor neque ut velit tincidunt, nec ultrices ante bibendum.</p>

      
    </div>
    <div class="w-full md:w-1/3 border border-gray-300 p-4 rounded-md">
      <h2 class="text-black text-3xl font-medium mb-2">Reserve</h2>
      
      <div className='flex flex-row  mt-4 items-center gap-10 '>
        <div className='border border-gray-400 rounded-lg p-2 w-[200px] cursor-pointer'>
        <span onClick={() => setOpenDate(!openDate)}>{formattedDate || date.toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'})}</span>
        
      </div>
        {openDate && (
  <div className='calendar'>
    <Calendar
      date={date}
      onChange={handleSelect}
      color='#009688'
      minDate={new Date()}
      maxDate={new Date(2024, 12, 31)}
      dateDisplayFormat="MMM d, yyyy"
    />
  </div>
)}
 <div className=' rounded-md flex flex-row items-center gap-2'>
 <FaUser className="ml-2"  size={20}/>
    <input onChange={handleNumPeople} type='number' className=' outline-none rounded-md w-[80px] '/>
 </div>
      </div>
     
      <div className='border mt-4 border-gray-800 p-3'>
        <div className='flex flex-col '>
            <h2 className='text-lg font-semibold mb-3'>Pompeii, Amalfi and Positano</h2>
            <p className='text-xs mb-1 text-gray-500 font-semibold'>
            1 Adult x $178.08
            </p>
            <p className='text-sm text-gray-800 font-semibold'>
            Total  $178.08
            </p>
        </div>
        <select
        id="time-select"
        name="time-select"
        className="mt-6 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        value={selectedTime}
        onChange={handleChange}
      >
        {times.map((time) => (
          <option key={time} value={`${time} AM`}>
            {`${time} AM`}
          </option>
        ))}
        {times.map((time) => (
          <option key={time} value={`${time} PM`}>
            {`${time} PM`}
          </option>
        ))}
      </select>
      </div>
      <button type="button" class="py-2.5 px-5 mr-2 mb-2 mt-4 text-sm font-medium text-white focus:outline-none bg-primary-700 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Reserve</button>
    </div>
    
  </div>


{/* Description Section */}
        </section>
   </>
  )
}

export default Body