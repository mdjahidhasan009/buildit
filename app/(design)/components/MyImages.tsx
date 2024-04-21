"use client";

import ImagesElement from './ImagesElement';
import {FC, useEffect, useState} from "react";
import {BarLoader} from "react-spinners";
import useApi from "../../../utils/useApi";
import UploadImage from "@/app/(design)/components/UploadImage";

interface CustomImageData {
  id: string;
  userId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface MyImagesProps {
  addImage: (image: string) => void;
}

interface ImageData {
  id: string;
  userId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
const MyImages: FC<MyImagesProps> = ({ addImage }) => {
  const [images, setImages] = useState<CustomImageData[]>([]);

  const { data, error, loading } = useApi('api/v1/designs/user/images', 'GET');

  // useEffect(() => {
  //   if(data) {
  //     setImages(data?.data?.images);
  //   }
  // }, [data]);

  useEffect(() => {
    if (data && data.data && Array.isArray(data.data.images)) {
      setImages(data.data.images);
    }
  }, [data]);

  return (
    <div>
      <UploadImage setImages={setImages} />
      {
        loading && <div className='flex justify-center items-center mb-2'>
          <BarLoader color='#fff'/>
        </div>
      }
      <div className='h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
        <ImagesElement setImage={addImage} images={images} />
      </div>
    </div>
  )
}

export default MyImages;