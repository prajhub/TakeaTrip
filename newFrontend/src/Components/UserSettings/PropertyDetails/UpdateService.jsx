import React, {useState, useEffect} from 'react'
import {useForm, useFieldArray} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {updateService} from '../../../Features/services/updateServiceAction'
import { handleSuccess } from '../../../Components/Reusables/SuccessMessage'
import { setClearSuccess } from '../../../Features/serviceListing/onboarding/publicInfoSlice'

const UpdateService = ({details, onClose}) => {

  
    const { register, control, setValue, handleSubmit, watch, formState, getValues } = useForm()
    const {errors} = formState

   
  // Access the "packages" field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "packages",
  });


    //For Images
    const [uploadedImages, setUploadedImages] = useState(details.photos || []);
const [imagePreviews, setImagePreviews] = useState(
  (details.photos || []).map((photo) => ({ url: photo, id: Math.random() }))
);
    

useEffect(() => {
    setValue("photos", uploadedImages);
    setValue("id", details._id)
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


    const dispatch = useDispatch()


    const { successMessage } = useSelector((state)=> state.serviceInfo)
    const { success } = useSelector((state)=> state.serviceInfo)


    useEffect(() => {
      if (success) {

        // Display the alert
        // alert(successMessage);
  
        handleSuccess(success, successMessage)
        onClose()
        // Clear the success state
        dispatch(setClearSuccess());
      }
    }, [success, dispatch,onClose, successMessage]);


    const onSubmit = (formData) =>{
      dispatch(updateService(formData))
    }


  return (
    <>
    
        <section>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                        <input type="text"  {...register("name", {
                          required: 'This field is required'
                        })}   id="name"  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " />
                       {errors.name && <span className='text-[red] text-sm '>{errors.name.message}</span>}
                    </div>
            <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                        <input type="number"  {...register("phoneNum", {
                          required: "This field is required"
                        })}  id="number"  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " />
                         {errors.phoneNum && <span className='text-[red] text-sm '>{errors.phoneNum.message}</span>}
                    </div>
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                        <input type="text" {...register("address", {
                          required: "This field is required"
                        })}  id="address"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                       {errors.address && <span className='text-[red] text-sm '>{errors.address.message}</span>}
                       <input hidden {...register("id")} />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Website</label>
                        <div className="mt-2 flex rounded-md  shadow-sm">
                          
                        <div className='flex flex-col'>
                        <input
                          type="text"
                          {...register("website", {
                            required: "This field is required"
                          })}
                          
                          id="website"
                          className="block w-full flex-1 px-10 mb-2 rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          placeholder="www.example.com"
                        />
                          {errors.website && <span className='text-[red] text-sm '>{errors.website.message}</span>}
                         </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                        <input {...register("description", {
                          required: "This field is required "
                        })}  id="description" rows="5" type='text'  className="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500  " placeholder="Write a description..."/>                 
                        {errors.description && <span className='text-[red] text-sm '>{errors.description.message}</span>}
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

                  <div className="col-span-full">
                  <div class="grid gap-4 mb-4 sm:grid-cols-2"> 
                  {fields.map((field, index) => (
        <div key={field.id} className='border rounded-md p-4'>
          <label>Package Name</label>
          <div className='mb-4 sm:col-span-2' >
          <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
            type="text"
            {...register(`packages.${index}.packageName`)}
          />
          </div>
          <label>Start Time</label>
          <div className='mb-4'>
          <input

          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
            type="text"
            {...register(`packages.${index}.startTime.${0}`)}
          />
          </div>

          <label>Price</label>
          <div className='mb-4'>
          <input type="number" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ' {...register(`packages.${index}.price`)} />
          </div>
          <label>Number of People Included</label>
          <div className='mb-4'>
          <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
            type="number"
            {...register(`packages.${index}.numPeopleIncluded`)}
          />
          </div>
          <button type="button" onClick={() => remove(index)} className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200'>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({})} className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200'>
        Add Package
      </button>
      <button type="submit">Submit</button>
                  </div>
                    

            </div>
            </div>
            </form>
            <DevTool control={control}/>
        </section>
    
    </>
  )
}

export default UpdateService