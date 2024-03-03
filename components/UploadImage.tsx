"use client";

import toast from "react-hot-toast";
import useApi from "@/utils/useApi";
import {FC, useEffect} from "react";
import {readFileAsDataURL} from "@/lib/readFileAsDataUrl";

// interface UploadImageProps {
//   setImages: (updateFunction: (prevImages: ImageData[]) => ImageData[]) => void;
// }

interface CustomImageData {
  id: string;
  userId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface UploadImageProps {
  setImages: (updateFunction: (prevImages: CustomImageData[]) => CustomImageData[]) => void;
}


const UploadImage: FC<UploadImageProps> = ({ setImages }) => {

  const { fetchData, data, error, loading } = useApi('api/v1/design/user/images', 'POST');

  useEffect(() => {
    if(data) {
      toast.success('Image uploaded successfully');
      // setImages([...images, data?.data?.image?.imageUrl]);
      setImages((prev) => [...prev, data?.data?.image]);
    }
  }, [data]);

  // const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   if(!e.target.files || e.target.files.length < 0) return toast.error('Please select an image');
  //
  //   // setLoading(true)
  //   const formData = new FormData();
  //   const base64String = await readFileAsDataURL(e.target.files[0]);
  //   formData.append('image', base64String);
  //
  //   try {
  //     await fetchData(formData);
  //   } catch (e) {
  //     console.error(e);
  //     toast.error('Something went wrong');
  //   }
  // }

  const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) return toast.error('Please select an image');

    const file = e.target.files[0];
    try {
      const base64String = await readFileAsDataURL(file);
      // Assert that base64String is a string
      const formData = new FormData();
      formData.append('image', base64String as string);

      await fetchData(formData);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3'>
      <label className='text-center cursor-pointer' htmlFor='image'>Upload Image</label>
      <input
        readOnly={loading}
        type='file'
        id='image'
        className='hidden'
        onChange={imageUpload}
      />
    </div>
  )
}

export default UploadImage;