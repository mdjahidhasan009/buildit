import Image from "next/image";
import useComponentActions from "@/app/(design)/components/CreateComponent/hooks/useComponentActions";
import {IDesignComponent} from "@/app/(design)/constants/Design";

const MainFrameComponent = ({ component } : { component: IDesignComponent }) => {
  const { handleSetCurrentComponent } = useComponentActions(component);

  return (
    <div
      onClick={() => handleSetCurrentComponent()}
      className="hover:border-[2px] hover:border-indigo-500 shadow-md"
      style={{
        width: component.width + 'px',
        height: component.height + 'px',
        background: component.color,
        zIndex: component.zIndex,
      }}
    >
      {
        component.image &&
        <Image
          fill
          objectFit="fill"
          className="w-full h-full pointer-events-none select-none"
          src={component.image}
          alt="img"
        />
      }
    </div>
  )
}

export default MainFrameComponent;