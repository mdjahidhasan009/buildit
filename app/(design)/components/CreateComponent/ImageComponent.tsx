import Element from "@/app/(design)/components/Element";
import Image from "next/image";
import {BsTrash} from "react-icons/bs";
import {IComponent} from "@/lib/features/components/IComponent";
import { RootState} from "@/lib/reduxStore";
import { useSelector} from "react-redux";
import {useRef} from "react";
import useDragger from "@/app/(design)/business/hooks/useDragger";
import useComponentActions from "@/app/(design)/components/CreateComponent/hooks/useComponentActions";

const ImageComponent = ({ component } : { component: IComponent }) => {
  const elementWrapperDivRef = useRef(null);
  const extraElementRef = useRef(null);
  const { handleSetCurrentComponent, handleRemoveComponent } = useComponentActions(component);

  const currentComponent = useSelector((state: RootState) => state.components.currentComponent);

  useDragger(elementWrapperDivRef, component);

  return (
    <div
      ref={elementWrapperDivRef}
      onClick={() => handleSetCurrentComponent()}
      style={{
        left: component.left + 'px',
        top: component.top + 'px',
        zIndex: component.zIndex,
        transform: component.rotate ? `rotate(${component.rotate}deg)` : `rotate(0deg)`,
        opacity: component.opacity,
        cursor: "move"
      }}
      className='absolute group hover:border-[2px] hover:border-indigo-500'
    >
      <Element
        elementWrapperDivRef={elementWrapperDivRef}
        component={component}
        extraElementRef={extraElementRef}
      />
      <div
        ref={extraElementRef}
        className='overflow-hidden'
        style={{
          width: component.width + 'px',
          height: component.height + 'px'
        }}>
        <Image
          fill
          objectFit="fill"
          className='w-full h-full pointer-events-none select-none'
          src={component.image}
          alt="image"
          style={{
            borderRadius: `${component.radius}%`,
          }}
        />
      </div>
      {currentComponent?.id === component.id &&
        <div
          onClick={() => handleRemoveComponent()}
          className='px-3 py-2 bg-white absolute top-10 hidden group-hover:block cursor-pointer rounded-md'>
          <BsTrash/>
        </div>
      }
    </div>
  )
}

export default ImageComponent;