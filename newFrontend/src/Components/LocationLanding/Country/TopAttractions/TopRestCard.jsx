import React from 'react'
import ReactStarsRating from 'react-awesome-stars-rating'
import { Link } from 'react-router-dom'

const TopRestCard = ({place}) => {
  return (
    <>
        
        <div className='group cursor-pointer'>
           

            <Link className=''>


                <img src='https://media-cdn.tripadvisor.com/media/photo-s/22/d9/7b/42/this-image-has-been-removed.jpg' 
                        alt='default'
                        className="w-full h-[250px] object-cover group-hover:brightness-125"
                    />

                <h2 className="font-semibold text-lg group-hover:underline">
                        {place.name}
                    </h2> 


                     <span className="flex items-center mb-2">
                        <ReactStarsRating 
                            
                            className="flex mr-2"
                            size={20}
                            isEdit={false}
                            primaryColor="#00afef" 
                            secondaryColor="#e5e7eb" 
                        />
                        ~ 50 Reviews
                    </span>                 


            </Link>
           

        </div>
    
    
    
    </>
  )
}

export default TopRestCard