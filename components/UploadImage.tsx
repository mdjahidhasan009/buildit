"use client";

import toast from "react-hot-toast";
import useApi from "@/utils/useApi";
import {useEffect} from "react";
import {readFileAsDataURL} from "@/lib/readFileAsDataUrl";

const UploadImage = ({ images, setImages }) => {

  const { fetchData, data, error, loading } = useApi('api/v1/design/user/images', 'POST');

  useEffect(() => {
    if(data) {
      toast.success('Image uploaded successfully');
      setImages([...images, data?.data?.image?.imageUrl]);
    }
  }, [data]);

  const imageUpload = async (e) => {
    debugger
    e.preventDefault();
    if(e.target.files.length < 0) return toast.error('Please select an image');

    // setLoading(true)
    const formData = new FormData();
    const base64String = await readFileAsDataURL(e.target.files[0]);
    formData.append('image', base64String);
    debugger

    try {
      await fetchData(formData);
      console.log(data);
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  }

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