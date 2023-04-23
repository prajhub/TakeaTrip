import React from 'react'
import {AiFillStar} from 'react-icons/ai'
import { Rate } from 'antd';
import UserReviewCard from './UserReviewCard';


const ReviewSection = () => {
  return (
    <>
    
    <section className='max-w-[1400px] mx-auto'>

        <div>
            <h1 className='text-2xl flex flex-row items-center font-semibold'><AiFillStar className='mr-2'/> 5.0 . 6 reviews</h1>
        </div>

        <div class="grid grid-cols-2 gap-6">
  <div class="  overflow-hidden ">
    
    <div class="">
      <dl>
        <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Cleanliness
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <Rate className='mr-2'/> 5.0
          </dd>
          <dt class="text-sm font-medium text-gray-500">
            Accuracy
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <Rate className='mr-2'/> 5.0
          </dd>
          <dt class="text-sm font-medium text-gray-500">
            Communication
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <Rate className='mr-2'/>  5.0
          </dd>
        </div>
      </dl>
    </div>
  </div>

  <div class="bg-white  overflow-hidden ">
    
    <div class="">
      <dl>
        <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Location
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <Rate className='mr-2'/>  5.0
          </dd>
          <dt class="text-sm font-medium text-gray-500">
            Check-in
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <Rate className='mr-2'/> 5.0
          </dd>
          <dt class="text-sm font-medium text-gray-500">
            Value
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <Rate className='mr-2'/> 5.0
          </dd>
        </div>
      </dl>
    </div>
  </div>
</div>

<UserReviewCard/>


        </section>

    
    </>
  )
}

export default ReviewSection