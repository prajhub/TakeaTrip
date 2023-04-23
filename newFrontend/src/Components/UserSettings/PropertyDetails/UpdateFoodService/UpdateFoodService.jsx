import React, { useState } from 'react'
import axios from 'axios'


import { useDispatch, useSelector } from 'react-redux'
import { useUpdateFoodServiceMutation } from '../../../../Features/api/apiSlice'


const UpdateFoodService = ({ details }) => {

    const [selectedCuisine, setSelectedCuisine] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('')
    const [number ,setNumber] = useState('')
    const [website, setWebsite] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')


  console.log(selectedCuisine)
const id = details._id


  const [updateFoodService, {isLoading, isSuccess}] = useUpdateFoodServiceMutation()


    const handleAddress = (event) => {
      setAddress(event.target.value)

    }
    const handleDesc = (event) => {
      setDescription(event.target.value)

    }
    const handleNumber = (event) => {
      setNumber(event.target.value)

    }
    const handleWebsite = (event) => {
      setWebsite(event.target.value)

    }

    const handleMaxPrice = (event) =>{
      setMaxPrice(event.target.value)
    }

    const handleMinPrice = (event) =>{
      setMinPrice(event.target.value)
    }

    

    const cuisines = [
        "Italian",
        "Latin",
        "Asian",
        "Mexican",
        "American",
        "French",
        "Mediterranean"
       
      ];

      const foods = [
        "Brunch",
        "Breakfast",
        "Dinner",
        "Lunch",
        
      ]

      const foodFeatures = [
        "Delivery",
        "Takeout",
        "Reservations",
        "Outdoor Seating",
        "Seating",
        "Street Parking",
        "Free off-street parking",
        "Highchairs Available",
        "Wheelchair Accessible",
        "Serves Alcohol",
        "Wine and Beer",
        "Digital Payments",
        "Accepts Credit Cards",
        "Family style",
        "Non-smoking restaurants",
        "Gift Cards Available"
      ];


      const handleCuisineSelect = (cuisine) => {
        if (selectedCuisine.includes(cuisine)) {
            setSelectedCuisine(selectedCuisine.filter((a) => a !== cuisine));
        } else {
            setSelectedCuisine([...selectedCuisine, cuisine]);
        }
      };

      const handleFoodsSelect = (food) => {
        if (selectedFoods.includes(food)) {
            setSelectedFoods(selectedFoods.filter((a) => a !== food));
        } else {
            setSelectedFoods([...selectedFoods, food]);
        }
      };

      const handleFeaturesSelect = (feature) => {
        if (selectedFeatures.includes(feature)) {
            setSelectedFeatures(selectedFeatures.filter((a) => a !== feature));
        } else {
            setSelectedFeatures([...selectedFeatures, feature]);
        }
      };


      const [images, setImages] = useState([])
    
  
      let uploadedImages = []
  
    
      
     
  
      const handleImage = async (e) => {
        const files = e.target.files;
        
      
        for (let i = 0; i < files.length; i++) {
          const formData = new FormData();
          formData.append('file', files[i]);
          formData.append('upload_preset', 'gqtcjdks');
      
          try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/dhngfjx6o/image/upload', formData);
            uploadedImages.push(res.data.secure_url);
          } catch (err) {
            console.log(err);
          }
        }
      
        setImages(uploadedImages);
  
      }

      const dispatch = useDispatch()

     
    
const handleSubmit = async(e) => {
  e.preventDefault();

  console.log(id)
      try {

        const { data } = await updateFoodService(id, {
          address, description, number, website, minPrice, maxPrice, cuisines: selectedCuisine, foods: selectedFoods, features: selectedFeatures
        })
       
        if(!data){
          console.log('error ayo')
        }
        console.log(data)
      } catch (error) {
        console.error(error);
      }
}
      


  return (
    <>
    
        <section>
        <form  >
                  <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                        <input type="number" onChange={handleNumber}  id="number"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " />
                       
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
                          onChange={handleWebsite}
                          id="website"
                          className="block w-full flex-1 px-10 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          placeholder="www.example.com"
                        />
                        
                         </div>
                      </div>
                    </div>
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                        <input type="text" onChange={handleAddress} id="address"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                       
                    </div>
                    
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Price Range</label>
                        <div className='flex flex-row items-center gap-4'>
                          <div className='flex flex-col'>
                        <input
                            type="number"
                            id='minPrice'
                            onChange={handleMinPrice}
                            className="mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 py-2 px-4  "
                            />
                           
                            </div>
                            <div className='flex flex-col '>
                            <input
                            type="number"
                            onChange={handleMaxPrice}
                            id='maxPrice'
                            
                            className=" mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 py-2 px-4 "
                            />
                             
                            </div>
                            </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                        <input onChange={handleDesc} id="description" rows="5" type='text'  className="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500  " placeholder="Write a description..."/>                 
                        
                    </div>


                    <section>
                    <h2 className='py-2 mb-2 text-sm font-medium text-gray-900'>Select cuisines.</h2>
                    <div className="grid grid-cols-3 gap-4">
      {cuisines.map((cuisine) => (
        <div key={cuisine}>
          <label className="inline-flex items-center">
            <input
            onChange={()=> handleCuisineSelect(cuisine)}
            checked={selectedCuisine.includes(cuisine)}
              type="checkbox"
              id='cuisine'
      
            
              className="form-checkbox h-5 w-5 text-primary-600"
              
            />

            <span className="ml-2 text-gray-700">{cuisine}</span>
            
          </label>
        </div>
      ))}
    </div>
                  </section>

                  <section>
                    <h2 className='py-2 mb-2 text-sm font-medium text-gray-900'>Select served meals.</h2>
                    <div className="grid grid-cols-3 gap-4">
      {foods.map((food) => (
        <div key={food}>
          <label className="inline-flex items-center">
            <input
             onChange={()=> handleFoodsSelect(food)}
             checked={selectedFoods.includes(food)}
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary-600"
              id={`foods-${food}`}
              value={food}
              
            />
            <span className="ml-2 text-gray-700">{food}</span>
          </label>
        </div>
      ))}
    </div>
                  </section>


                  <section>
                    <h2 className='py-2 mb-2 text-sm font-medium text-gray-900'>Select Features.</h2>
                    <div className="grid grid-cols-3 gap-4">
      {foodFeatures.map((feature) => (
        <div key={feature}>
          <label className="inline-flex items-center">
            <input
            
              type="checkbox"
              id='feature'
              onChange={()=> handleFeaturesSelect(feature)}
             checked={selectedFeatures.includes(feature)}
              
              className="form-checkbox h-5 w-5 text-primary-600"
             
            />
            <span className="ml-2 text-gray-700">{feature}</span>
          </label>
        </div>
      ))}
    </div>
   

                  </section>
                  <div className="mt-3 flex justify-center rounded-lg border border-dashed border-gray-900/25 p-32">
                <div className="text-center itm">
                        <input type='file' name='file-upload' multiple onChange={handleImage} />
                        
                  </div>
                  </div>
                </div>
                <button onClick={handleSubmit}  className="text-white  bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 mr-2 mb-2">Edit Service</button>
                </form>
               
        </section>
    
    </>
  )
}

export default UpdateFoodService