import React from "react";

const ImageCollage = () => {
  return (
   <>
    <div className="relative">
    <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
  <div class="-m-1 flex flex-wrap md:-m-2">
    <div class="flex w-1/2 flex-wrap">
      <div class=" relative w-1/2 p-1 md:p-2 transform transition duration-500 hover:scale-110 ">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
          <div class="absolute top-6 left-6 right-0 bottom-0 flex items-start ">
                <h1 class="text-white text-lg font-bold">Location 1</h1>
              </div>
      </div>
      <div class=" relative w-1/2 p-1 md:p-2 ">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp" />

          <div class="absolute top-6 left-6 right-0 bottom-0 flex items-start ">
                <h1 class="text-white text-lg font-bold">Location 1</h1>
              </div>
      </div>
      <div class=" relative w-full p-1 md:p-2">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />

            <div class="absolute top-6 left-6 right-0 bottom-0 flex items-start ">
                <h1 class="text-white text-lg font-bold">Location 1</h1>
              </div>
      </div>
    </div>
    <div class=" relative flex w-1/2 flex-wrap">
      <div class="w-full p-1 md:p-2">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp" />

            <div class="absolute top-6 left-6 right-0 bottom-0 flex items-start ">
                <h1 class="text-white text-lg font-bold">Location 1</h1>
              </div>
      </div>
      <div class=" relative w-1/2 p-1 md:p-2">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp" />

            <div class="absolute top-6 left-6 right-0 bottom-0 flex items-start ">
                <h1 class="text-white text-lg font-bold">Location 1</h1>
              </div>
      </div>
      <div class=" relative w-1/2 p-1 md:p-2">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp" />

            <div class="absolute top-6 left-6 right-0 bottom-0 flex items-start ">
                <h1 class="text-white text-lg font-bold">Location 1</h1>
              </div>
      </div>
    </div>
  </div>
</div>
   
</div>
   </>
  );
};

export default ImageCollage;
