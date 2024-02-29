interface CommonImageProps {
  images: { imageUrl: string }[];
  type?: string; // You might want to redefine this to be more specific, like type?: 'background' | 'other';
  alt?: string;
}

interface BackgroundImageProps extends CommonImageProps {
  type: 'background';
  setImage: (image: string) => void;
}

interface OtherImageProps extends CommonImageProps {
  addImage: (image: string) => void;
}

type ImageProps = BackgroundImageProps | OtherImageProps;

const Images: React.FC<ImageProps> = ({ addImage, images, type, setImage }) => {

  return (
    <div className='grid grid-cols-2 gap-2'>
      {
        images.map((image, index) =>
          <div
            key={index}
            onClick={() => type === 'background' ? setImage(image?.imageUrl) : addImage(image?.imageUrl)}
            className='w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'
          >
            <img
              className='w-full h-full object-fill'
              src={image?.imageUrl}
              alt='image'
            />
          </div>
        )
      }
    </div>
  );
}

export default Images;