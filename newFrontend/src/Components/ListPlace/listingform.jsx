import React from 'react'
import Listheading from './listheading'
import ListBody from './listbody'

const listingform = () => {
  return (
   <>
    <section className='h-screen '>
        <div className='max-w-[1400px] mx-auto'>
            <Listheading/>
            <ListBody/>

        </div>
        
        

    </section>
        
   </>
  )
}

export default listingform