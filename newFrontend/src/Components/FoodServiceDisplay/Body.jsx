import React, { useState } from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import { MdFamilyRestroom, MdOutlineFreeBreakfast } from 'react-icons/md'
import { TbSmokingNo } from 'react-icons/tb'
import { BiPhoneCall, BiPencil } from 'react-icons/bi'
import {AiOutlineGlobal, AiFillMail, AiFillCloseCircle, AiOutlineWifi} from 'react-icons/ai'
import { CiParking1  } from 'react-icons/ci'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsFillPencilFill} from 'react-icons/bs'
import { GiBroom } from 'react-icons/gi'
import { RiMapPin2Line } from 'react-icons/ri'
import { useParams } from 'react-router'
import ReviewSection from './ReviewSection'

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


  return (
    <>
    
    <section className='max-w-[1400px]  mx-auto mt-4 border-t '>

    <div class="flex justify-between items-center py-2">
  
  <div class="flex-1">
    <h1 class="text-3xl font-bold">asdasd</h1>
    <p class="text-gray-700 text-sm mt-4 flex flex-row items-center gap-1"> <HiLocationMarker/> asd1st street</p>
    <div className='flex flex-row items-center'>
    <div class="flex items-center mt-2 mb-3">
      <div class="bg-yellow-400 rounded-full h-6 w-6 flex items-center justify-center text-white font-bold  text-xs">
        8.9
      </div>
      <span class="ml-2 text-gray-700 font-medium text-xs">(12,345 reviews)</span>
    </div>
    <div className=' ml-2 border-l'>
      <p className='text-xs ml-2  text-gray-400'>Diner</p>
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
    <div class="w-full md:w-1/3 bg-primary-500 p-4 rounded-md">
      <h2 class="text-black text-lg font-medium mb-2">Details</h2>
      
      <p class="text-black mb-2 text-md font-semibold">Price Range</p>
      <p class="text-black mb-3 text-sm">NPR 3,941 - NPR 8,539</p>
      <p class="text-black mb-1 text-md font-semibold">Cuisines</p>
      <p class="text-black mb-3 flex flex-row items-center gap-1">American, Continental, Chinese</p>
      <p class="text-black mb-1 text-md font-semibold">Food</p>
      <p class="text-black mb-3 flex flex-row items-center gap-1">Lunch, Dinner, Late Night, Drinks</p>
      <p class="text-black mb-1 text-md font-semibold">Features</p>
      <p class="text-black mb-2 flex flex-row items-center gap-1">Reservations, Outdoor Seating, Seating, Serves Alcohol, Full Bar, Free Wifi, Accepts Credit Cards, Table Service</p>
    </div>
  </div>


{/* Description Section */}

<ReviewSection/>

    </section>

    
    </>
  )
}

export default Body