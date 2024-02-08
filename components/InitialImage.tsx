import {useEffect, useState} from "react";
import Image from './Images';
import api from "../utils/useApi.ts";
import useApi from "../utils/useApi.ts";

const InitialImage = ({ addImage }) => {
  const [images, setImages] = useState([]);
  const { data } = useApi('api/v1/design/design-item/design-images', 'GET');

  useEffect(() => {
    // const getImages = async () => {
    //   try {
        // const { data } = await api.get('/design/design-images');
    if(data) {
      console.log(data)
      setImages(data?.data?.images);
      // } catch (e) {
      //   console.error(e);
      // }
    }

    // getImages();
  }, [data]);

  return (
    <div>
      <Image images={images} addImage={addImage} alt='image' />
    </div>
  );
}

export default InitialImage;