import React from 'react'
import { Rate, Avatar } from 'antd';

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'

const UserReviewCard = () => {
  return (
    <>
    
    <section className='max-w-[1400px] mx-auto '>
        <div className='flex flex-col w-[600px] gap-3'>
            <div className='flex gap-3'>
                <Avatar size={40} src={<img src={url} alt="avatar" />} />
                <div className='flex flex-col '>
                    <h2 className='font-semibold'>Patrick</h2>
                    <p className='text-xs text-gray-500'>January 2021</p>

                </div>
            </div>
            <p>Beautiful place to stay - excellent views of the ocean, great place to hang out, friendly and excellent staff, comfortable. Had 5 staff actively helping with everything and serving</p>
        </div>
    </section>

    </>
  )
}

export default UserReviewCard