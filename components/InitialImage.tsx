import {useEffect, useState} from "react";
import Image from './Images';
import useApi from "../utils/useApi.ts";

const InitialImage = ({ addImage }) => {
  const [images, setImages] = useState([]);
  const { data } = useApi('api/v1/design/design-item/design-images', 'GET');

  useEffect(() => {
    if(data) {
      setImages(data?.data?.images);
    }
  }, [data]);

  return (
    <div>
      <Image images={images} addImage={addImage} alt='image' />
    </div>
  );
}

export default InitialImage;