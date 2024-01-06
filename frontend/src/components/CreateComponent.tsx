import {BsTrash} from "react-icons/bs";

const CreateComponent = ({ info, currentComponent, removeComponent }) => {
  const randValue = Math.floor(Math.random() * 100);
  let html: React.JSX.Element = '';

  if(info.name === 'main_frame') {
    html =
      <div
        onClick={() => info.setCurrentComponent(info)}
        className="hover:border-[2px] hover:border-indigo-500 shadow-md"
        style={{
          width: info.width + 'px',
          height: info.height + 'px',
          background: info.color,
          zIndex: info.z_index,
        }}
      >
        {
          info.image && <img className="w-full h-full" src={info.image} alt="img" />
        }
    </div>
  }

  if(info.name === 'shape' && info.type === 'rect') {
    html =
      <div
        id={randValue.toString()}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          width: info.width + 'px',
          height: info.height + 'px',
          background: info.color,
          opacity: info.opacity,
          left: info.left + 'px',
          top: info.top + 'px',
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className='absolute group hover:border-[2px] hover:border-indigo-500'
      >
        {currentComponent.id === info.id &&
            <div
                onClick={() => removeComponent(info.id)}
                className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
                  <BsTrash />
            </div>
        }
      </div>
  }

  return html;
}

export default CreateComponent;