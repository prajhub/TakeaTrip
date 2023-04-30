import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
import axios from 'axios'

const UpdateService = ({details}) => {

    const form = useForm()
    const { register, control, setValue, handleSubmit, watch, formState, getValues } = form
    const {errors} = formState

   



    //For Images
    const [uploadedImages, setUploadedImages] = useState(details.photos || []);
const [imagePreviews, setImagePreviews] = useState(
  (details.photos || []).map((photo) => ({ url: photo, id: Math.random() }))
);
    

useEffect(() => {
    setValue("photos", uploadedImages);
  }, [uploadedImages, setValue]);


  const handleImage = async (e) => {
    const files = e.target.files;
    let uploadedImagesArray = [];
  
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "gqtcjdks");
  
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dhngfjx6o/image/upload",
          formData
        );
        uploadedImagesArray.push(res.data.secure_url);
      } catch (err) {
        console.log(err);
      }
    }
  
    // combine the existing images with the newly uploaded images
    const updatedImages = uploadedImagesArray.concat(uploadedImages);
    setUploadedImages(updatedImages);
    setImagePreviews(
      updatedImages.map((image) => ({ url: image, id: Math.random() }))
    );
    setValue("photos", updatedImages);
  };
    
    const handleDelete = (id) => {
    const deletedImage = imagePreviews.find((prev) => prev.id === id);

  // remove the image from the imagePreviews state
  setImagePreviews((prevState) => prevState.filter((image) => image.id !== id));

  // remove the image from the uploadedImages state
  const newUploadedImages = uploadedImages.filter((image) => image !== deletedImage.url);
  setUploadedImages(newUploadedImages);

  // update the form value of "photos"
  setValue("photos", newUploadedImages);
    };



  return (
    <>
    
        <section>
            <form>
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                        <input type="text"  name='name'   id="name"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " />
                       
                    </div>
            <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                        <input type="number"  name='number'   id="number"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " />
                       
                    </div>
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                        <input type="text" name='address'  id="address"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                       
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Website</label>
                        <div className="mt-2 flex rounded-md  shadow-sm">
                          <div>
                        <span className="inline-flex py-2 items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                          http://
                        </span>
                        </div>
                        <div className='flex flex-col'>
                        <input
                          type="text"
                          name='website'
                          
                          id="website"
                          className="block w-full flex-1 px-10 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          placeholder="www.example.com"
                        />
                        
                         </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                        <input name='description'  id="description" rows="5" type='text'  className="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500  " placeholder="Write a description..."/>                 
                        
                    </div>

                    {/* Images upload */}

                    <div className="col-span-full">
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                        <input type='file' name='file-upload' className='mb-5' multiple onChange={handleImage} />
                        <div className='flex flex-row gap-4 flex-wrap'>
                        {imagePreviews.map((image) => (
        <div key={image.id} className='flex flex-col mb-5 w-80 border border-gray-200 rounded-md overflow-hidden shadow-md'>
          <img src={image.url} alt="" className="w-full h-48 object-cover"/>
          <button onClick={() => handleDelete(image.id)}>Delete</button>
        </div>
      ))}
      </div>
      
                        <input hidden {...register("photos")}  />
                  </div>
                  </div>
                    

                    
                    {/* Images upload */}
                    
                  </div>
                    

            </div>
            </form>
            <DevTool control={control}/>
        </section>
    
    </>
  )
}

export default UpdateService