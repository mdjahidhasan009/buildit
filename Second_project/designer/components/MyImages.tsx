"use client";

import Image from './Images';
import api from "../utils/useApi.ts";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import {BarLoader} from "react-spinners";
import useApi from "../utils/useApi.ts";
import UploadImage from "@/components/UploadImage";

const MyImages = ({ addImage }) => {
  const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(false);

  const { data, error, loading } = useApi('api/v1/design/user-images', 'GET');

  useEffect(() => {
    // const getImages = async () => {
    //   try {
    //     const { data } = await api.get('/design/user-images');
    if(data) {
      console.log(data)
      setImages(data?.data?.images);
    }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }
    //
    // getImages();
  }, [data]);

  const imageUpload = async (e) => {
    e.preventDefault();
    // if(e.target.files.length < 0) return toast.error('Please select an image');
    //
    // setLoading(true)
    // const formData = new FormData();
    //   formData.append('image', e.target.files[0]);
    //
    //   try {
    //     const { data } = await api.post('/design/upload-user-image', formData);
    //     toast.success('Image uploaded successfully');
    //     console.log(data);
    //     setImages([...images, data?.data?.image?.imageUrl]);
    //   } catch (e) {
    //     console.error(e);
    //     toast.error('Something went wrong')
    //   }
    //   setLoading(false);
  }

  return (
    <div>
      <UploadImage images={images} setImages={setImages} />
      {/*<div className='w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3'>*/}
      {/*  <label className='text-center cursor-pointer' htmlFor='image'>Upload Image</label>*/}
      {/*  <input*/}
      {/*    readOnly={loading}*/}
      {/*    type='file'*/}
      {/*    id='image'*/}
      {/*    className='hidden'*/}
      {/*    onChange={imageUpload}*/}
      {/*  />*/}
      {/*</div>*/}
      {
        loading && <div className='flex justify-center items-center mb-2'>
          <BarLoader color='#fff'/>
        </div>
      }
      <div className='h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
      <Image addImage={addImage} images={images}/>
        </div>
    </div>
  )
}

export default MyImages;