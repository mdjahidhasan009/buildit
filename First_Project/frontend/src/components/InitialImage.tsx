import {useEffect, useState} from "react";
import Image from './Image';
import api from "../utils/api.ts";

const InitialImage = ({ addImage }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data } = await api.get('/design/design-images');
        setImages(data?.data?.images);
      } catch (e) {
        console.error(e);
      }
    }

    getImages();
  }, []);

  return (
    <div>
      <Image images={images} addImage={addImage} alt='image' />
    </div>
  );
}

export default InitialImage;