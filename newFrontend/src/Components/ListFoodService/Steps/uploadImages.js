export async function uploadImage(image) {
    try {
      const imageData = new FormData();
      imageData.append('file', image);
      imageData.append('cloud_name', 'dhngfjx6o');
      imageData.append('upload_preset', 'foodservicephotos');
  
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dhngfjx6o/image/upload',
        {
          method: 'POST',
          body: imageData,
        }
      );
  
      const response = await res.json();
  
      return {
        imgId: response.public_id,
        imgUrl: response.url,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  
