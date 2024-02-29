"use client";

import {useEffect, useState} from "react";

import Image from './Images';
import useApi from "../utils/useApi";

interface BackgroundImagesProps {
  setImage: (image: string) => void;
  type: string;
}

const BackgroundImages: React.FC<BackgroundImagesProps>  = ({ setImage, type }) => {
  const [images, setImages] = useState<string[]>([]);
  const { data, error } = useApi('api/v1/design/design-item/background-images', 'GET');

  useEffect(() => {
    if(data) {
      setImages(data?.data?.images);
    }

  }, [data]);

  return (
      <div>
        <Image images={images} type={type} setImage={setImage} alt='image' />
      </div>
  );
}

export default BackgroundImages;