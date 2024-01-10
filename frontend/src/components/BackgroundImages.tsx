import {useEffect, useState} from "react";

import Image from './Image';
import api from "../utils/api.ts";

const BackgroundImages = ({ setImage, type }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data } = await api.get('/design/background-images');
        setImages(data?.data?.images);
      } catch (e) {
        console.error(e);
      }
    }

    getImages();
  }, []);

  return (
      <div>
        <Image images={images} type={type} setImage={setImage} alt='image' />
      </div>
  );
}

export default BackgroundImages;