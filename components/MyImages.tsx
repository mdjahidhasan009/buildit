"use client";

import Image from './Images';
import {useEffect, useState} from "react";
import {BarLoader} from "react-spinners";
import useApi from "../utils/useApi.ts";
import UploadImage from "@/components/UploadImage";

const MyImages = ({ addImage }) => {
  const [images, setImages] = useState([]);

  const { data, error, loading } = useApi('api/v1/design/user/images', 'GET');

  useEffect(() => {
    if(data) {
      setImages(data?.data?.images);
    }
  }, [data]);

  return (
    <div>
      <UploadImage images={images} setImages={setImages} />
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