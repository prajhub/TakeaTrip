import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPhotos } from '../../../../Features/serviceListing/onboarding/photosSlice'

const Photo = () => {

    const [image, setImage] = useState('')



    const handleImage = (e) => {

        const file = e.target.files[0]
        setFileToBase(file)
        
  
      }
  
      const setFileToBase = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setImage(reader.result)
          // console.log(reader.result)
        }
      }


      const dispatch = useDispatch()

      const handlePhoto = () =>{
        dispatch(setPhotos(image))
      }
      

  return (
    <>
    
    <div className="mt-10  sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-xl font-semibold leading-6 mb-4 text-gray-900">Add photos that capture what you offer</h3>
              <p className="mt-1 text-sm text-gray-600">The first photo will be your cover photo, which is one of the first things travelers will see on your  listing.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className=" px-4 py-5 sm:p-6">
                  <div className="col-span-full">
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                        <input type='file' name='file-upload' multiple onChange={handleImage} />
                  </div>
                  </div>
                    

                    
                    
                  </div>
                </div>
                <button onClick={handlePhoto}  type="button" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-12 py-2.5 ml-4 mb-6 ">Set</button>
              </div>
            
          </div>
        </div>
      </div>

      <div className="hidden sm:block " aria-hidden="true">
        <div className="py-5 ">
          <div className="border-t border-gray-200 " />
        </div>
      </div>
    
    </>
  )
}

export default Photo