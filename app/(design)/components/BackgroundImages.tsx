"use client";

import { useEffect, useState, FC } from "react";

import ImagesElement from '../../../components/ImagesElement';
import useApi from "../../../utils/useApi";

interface BackgroundImagesProps {
  setImage: (image: string) => void;
}

const BackgroundImages: FC<BackgroundImagesProps>  = ({ setImage }) => {
  const [images, setImages] = useState<{ imageUrl: string }[]>([]);
  const { data, error } = useApi('api/v1/designs/design-item/background-images', 'GET');

  useEffect(() => {
    if(data) {
      setImages(data?.data?.images);
    }

  }, [data]);

  return (
      <div>
        <ImagesElement images={images} setImage={setImage} alt='image' />
      </div>
  );
}

export default BackgroundImages;