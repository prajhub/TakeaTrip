import React from 'react'
import './yexplore.css'
import {motion} from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import images from './examples/images'


const Yexplore = () => {

    const [width, setWidth] = useState(0);
    const carousel = useRef();


    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [])
  return (
    <div>
        <div className='flex mt-20 flex-col items-center mx-auto'>
            <h1 className='text-[40px] font-bold pb-2'>Explore Top Destination</h1>
            <p>Great opportunities To travel | Take a Holiday | Enjoy yourself | Take a Trip!</p>
        </div>
        <motion.div ref={carousel} className='carousel max-w-[1240px] mx-auto mt-3' whileTap={{cursor: "grabbing"}}>
            <motion.div drag="x" dragConstraints={{ right: 0, left: -width}} className='inner-carousel'>
                {images.map(image => {
                    return(
                        <motion.div className='item' key={image}>
                            <img src={image.image} alt='/'/>
                            <h2 className='font-bold text-2xl pl-7 pt-1'>{image.name}</h2>
                            <p className='text-sm pl-2'>{image.location}</p>
                        </motion.div>
                    )
                })}
            </motion.div>
        </motion.div>
    </div>
  )
}

export default Yexplore