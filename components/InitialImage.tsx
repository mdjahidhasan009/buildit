import {FC, useEffect, useState} from "react";
import ImagesElement from './ImagesElement';
import useApi from "../utils/useApi";

interface InitialImageProps {
  addImage: (image: string) => void;
}

const InitialImage: FC<InitialImageProps> = ({ addImage }) => {
  const [images, setImages] = useState([]);
  const { data } = useApi('api/v1/designs/design-item/design-images', 'GET');

  useEffect(() => {
    if(data) {
      setImages(data?.data?.images);
    }
  }, [data]);

  return (
    <div>
      <ImagesElement images={images} setImage={addImage} />
    </div>
  );
}

export default InitialImage;