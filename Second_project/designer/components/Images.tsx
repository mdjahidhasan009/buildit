const Images = ({ addImage, images, type, setImage }) => {

  return (
    <div className='grid grid-cols-2 gap-2'>
      {
        images.map((image, index) =>
          <div
            key={index}
            // onClick={() => addImage(image?.imageUrl)}
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