import Element from "@/app/(design)/components/Element";
import {BsTrash} from "react-icons/bs";
import {useRef} from "react";
import {RootState, useSelector} from "@/lib/reduxStore";
import useDragger from "@/app/(design)/business/hooks/useDragger";
import useComponentActions from "@/app/(design)/components/CreateComponent/hooks/useComponentActions";
import {IDesignComponent} from "@/app/(design)/constants/Design";

const TextComponent = ({ component } : { component: IDesignComponent }) => {
  const elementWrapperDivRef = useRef(null);
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
        padding: component.padding + 'px',
        color: component.color,
        opacity: component.opacity,
        cursor: "move"
      }}
      className='absolute group hover:border-[2px] hover:border-indigo-500'
    >
      <Element elementWrapperDivRef={elementWrapperDivRef} component={component}/>
      <h2 style={{fontSize: component.fontSize + 'px', fontWeight: component.fontWeight}}
          className='w-full h-full'>{component?.title}</h2>
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

export default TextComponent;