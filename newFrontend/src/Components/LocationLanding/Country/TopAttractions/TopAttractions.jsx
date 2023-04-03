import React, { useState } from 'react'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopRestCard from './TopRestCard';
import TopAttractionCard from './TopAttractionCard';
import TopEntertainmentCard from './TopEntertainmentCard';


const attractions = [
    {
      name: "National Museum of Natural History",
      description: "The National Museum of Natural History is a natural history museum administered by the Smithsonian Institution, located on the National Mall in Washington, D.C."
    }, {
        name: "Metropolitan Museum of Art",
        description:
          "The Metropolitan Museum of Art of New York City, colloquially 'the Met', is the largest art museum in the United States.",
      },
      {
        name: "National Palace Museum",
        description:
          "The National Palace Museum is an antique museum in Shilin, Taipei, Taiwan. It is one of the largest museums in Asia and is also the largest museum in the world.",
      },
      {
        name: "National Palace Museum",
        description:
          "The National Palace Museum is an antique museum in Shilin, Taipei, Taiwan. It is one of the largest museums in Asia and is also the largest museum in the world.",
      },
      {
        name: "National Palace Museum",
        description:
          "The National Palace Museum is an antique museum in Shilin, Taipei, Taiwan. It is one of the largest museums in Asia and is also the largest museum in the world.",
      },
      {
        name: "National Palace Museum",
        description:
          "The National Palace Museum is an antique museum in Shilin, Taipei, Taiwan. It is one of the largest museums in Asia and is also the largest museum in the world.",
      },
      
      
  ];

  const entertainment  = [
    {
      name: 'Borrusia Dortmund',
      description: ' Dortmunds famous and massively popular and succesful Bundesliga soccer team plays its home games at the legendary Westfalenstadion, now branded as Signal…'
    },
    {
      name: 'Borrusia Dortmund',
      description: ' Dortmunds famous and massively popular and succesful Bundesliga soccer team plays its home games at the legendary Westfalenstadion, now branded as Signal…'
    },{
      name: 'Borrusia Dortmund',
      description: ' Dortmunds famous and massively popular and succesful Bundesliga soccer team plays its home games at the legendary Westfalenstadion, now branded as Signal…'
    }
    ,{
      name: 'Borrusia Dortmund',
      description: ' Dortmunds famous and massively popular and succesful Bundesliga soccer team plays its home games at the legendary Westfalenstadion, now branded as Signal…'
    }
  ]
  

  const restaurants = [
    {
      name: 'Law Cafe'
    },
    {
      name: 'Hotel Del Luna'
    },
    {
      name: 'Shangrila'
    },
    {
      name: 'Shangrila'
    },
    {
      name: 'Shangrila'
    },
    {
      name: 'Shangrila'
    },

  ]

const TopAttractions = () => {

    const [toggle, setToggle] = useState({
        toAtt: true, // Place to Go state, active by defaul
        toEat: false, //Things to Do state
        toDo: false //Places to staty
    })



  return (
    <>
        
            {/* Trending in Travel Section */}
            <div className="container mx-auto px-8 py-10">
                <h2 className="font-bold text-xl md:text-5xl my-5">
                    Top attractions
                </h2>
                <p>These are our favorite local haunts, touristy spots, and hidden gems throughout Germany.</p>
                <div>
                    {/* Trending in Travel Toggles */}
                    <div className="flex text-sm md:text-base mt-7 space-x-4 md:space-x-8 whitespace-nowrap overflow-x-auto ">
                        {/* Places to go toggle */}
                        <h3 className={`${toggle.toAtt ? 'border-black' : 'border-transparent'} font-medium text-md mb-3 border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
                            // onClick toggle, all items in the 'toggle' state object is set to false while 'toAtt' is true
                            onClick={() => setToggle({toAtt: true, toEat: false, toDo: false})}
                        >
                            Attractions
                        </h3>
                        {/* --- */}

                        {/* Things to Do toggle */}
                        <h3 className={`${toggle.toEat ? 'border-black' : 'border-transparent'} font-medium text-md mb-3 border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
                            // onClick toggle, all items in the 'toggle' state object is set to false while 'toEat' is true
                            onClick={() => setToggle({toAtt: false, toEat: true, toDo: false})}
                        >
                            Restaurants
                        </h3>
                        {/* --- */}

                        {/* Places to Stay toggle */}
                        <h3 className={`${toggle.toDo ? 'border-black' : 'border-transparent'} font-medium mb-3 text-md border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
                            // onClick toggle, all items in the 'toggle' state object is set to false while 'toDo' is true
                            onClick={() => setToggle({toAtt: false, toEat: false, toDo: true})}
                        >
                            Entertainment
                        </h3>
                        {/* --- */}
                    </div>
                    {/* --- */}
                    <div className=' flex max-w-screen'>
                        {/* List of Places to Go - Display only if 'toAtt'is true */}
                        {toggle.toAtt && (
                           
                            <div className='flex gap-5 flex-row flex-wrap '>
                                {/* Mapping throughlist of items to render */}
                               
                            
                               {attractions
                                    .map((attraction, id) => (
                                            
                                         
                                      <TopAttractionCard key={id} attractions={attraction}/>
                                        
                                         
                                         
                                    
                                      ))
                                }
                              
                             
                            
                                {/* --- */}
                            </div>
                            
                        )}
                        {/* --- */}

                        {/* List of Things to Do - Displays only if 'toEat' is true */}
                        {toggle.toEat && (
                            <div className="flex flex-row flex-wrap gap-5">
                                {
                                 restaurants.map((name, i) => (
                                        
                                          <TopRestCard key={i} place={name} />
                                        
                                    ))
                                }
                                {/* --- */}
                            </div>
                        )}
                        {/* --- */}

                        {/* List of Places to Stay - Displays only if 'toDo' is true */}
                        {toggle.toDo && (
                            <div className='flex gap-5 flex-row flex-wrap'>
                                
                                {
                                    entertainment.map((item, i) => (
                                        <TopEntertainmentCard key={i} entertainments={item}/>
                                    ))
                                }
                                {/* --- */}
                            </div>
                        )}
                        {/* --- */}
                    </div>
                </div>
            </div>

    
    </>
  )
}

export default TopAttractions