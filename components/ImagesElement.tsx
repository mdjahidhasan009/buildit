interface CommonImageProps {
  images: { imageUrl: string }[];
  setImage: (image: string) => void;
  alt?: string;
}

interface BackgroundImageProps extends CommonImageProps {
  setImage: (image: string) => void;
}

interface OtherImageProps extends CommonImageProps {
  addImage: (image: string) => void;
}

type ImageProps = BackgroundImageProps | OtherImageProps;

const ImagesElement: React.FC<CommonImageProps> = ({ images, setImage, alt }) => {
  return (
    <div className='grid grid-cols-2 gap-2'>
      {
        images.map((image, index) =>
          <div
            key={index}
            // onClick={() => type === 'background' ? setImage(image?.imageUrl) : addImage(image?.imageUrl)}
            onClick={() => setImage(image?.imageUrl)}
            className='w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'
          >
            <img
              className='w-full h-full object-fill'
              src={image?.imageUrl}
              alt={alt}
            />
          </div>
        )
      }
    </div>
  );
}

export default ImagesElement;