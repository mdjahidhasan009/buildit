"use client";

import {useEffect, useState} from "react";

import Image from './Images';
import api from "../utils/useApi.ts";
import useApi from "../utils/useApi.ts";

const BackgroundImages = ({ setImage, type }) => {
  const [images, setImages] = useState([]);
  const { data, error } = useApi('api/v1/design/design-item/background-images', 'GET');

  useEffect(() => {
    // const getImages = async () => {
    //   try {
    //     const { data } = await api.get('/design/background-images');
    //     setImages(data?.data?.images);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }
    //
    // getImages();
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