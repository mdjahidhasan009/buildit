import { BsArrowsMove } from "react-icons/bs";
import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import { updateComponentRotation } from "@/lib/features/components/componentsSlice";
import { isMobileDevice } from "@/lib/utils";
import useRotate from "@/app/(design)/business/hooks/useRotate";
import { useEffect, useRef, RefObject, FC } from "react";
import useResize from "@/app/(design)/business/hooks/useResize";
import {IDesignComponent} from "@/app/(design)/constants/Design";

interface ElementProps {
  elementWrapperDivRef: RefObject<HTMLElement>;
  component: IDesignComponent;
  extraElementRef?: RefObject<HTMLElement>;
}

const Element: FC<ElementProps> = ({ elementWrapperDivRef, component, extraElementRef = null }) => {
  const dispatch  = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.components.currentComponent);
  const rotateIconRef = useRef(null);
  const resizeIconBottomRightRef = useRef(null);
  const resizeIconBottomLeftRef = useRef(null);
  const resizeIconTopRightRef = useRef(null);

  const { rotation } = useRotate(elementWrapperDivRef, rotateIconRef, component);
  const activeRef: RefObject<HTMLElement> = (extraElementRef && extraElementRef.current) ? extraElementRef : elementWrapperDivRef;
  useResize(activeRef, resizeIconBottomRightRef, component);
  useResize(activeRef, resizeIconBottomLeftRef, component);
  useResize(activeRef, resizeIconTopRightRef, component);

  useResize(activeRef, resizeIconBottomRightRef, component);
  useResize(activeRef, resizeIconBottomLeftRef, component);
  useResize(activeRef, resizeIconTopRightRef, component);

  useEffect(() => {
    dispatch(updateComponentRotation({ id: component.id, rotate: rotation }));
  }, [component.id, dispatch, rotation]);

  const willShow = () => {
    const isMobile = isMobileDevice();

    if(isMobile) {
      if(currentComponent?.id == component?.id) {
        return " block "
      }
    }

    return " hidden group-hover:block "
  }

  return (
    <>
      {
        extraElementRef?.current
          ? <>
            <div
              ref={resizeIconBottomRightRef}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -right-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
            >
            </div>
            <div
              ref={resizeIconTopRightRef}
              className={`no-drag ${willShow()} absolute -top-[3px] -right-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
            >
            </div>
            <div
              ref={resizeIconBottomLeftRef}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -left-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
            >
            </div>
          </>
          : <>
            <div
              ref={resizeIconBottomRightRef}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -right-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
              ></div>
            <div
              ref={resizeIconTopRightRef}
              className={`no-drag ${willShow()} absolute -top-[3px] -right-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
            ></div>
            <div
              ref={resizeIconBottomLeftRef}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -left-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}></div>
          </>
      }

      <div className={`absolute -top-[3px] -left-[3px] no-drag ${willShow()} z-[9999]`}>
        <div
          ref={rotateIconRef}
          className="w-[15px] h-[15px] bg-green-500 z-[9999] flex justify-center items-center">
          <BsArrowsMove className="text-white"/> {/* Rotate icon */}
        </div>
      </div>
    </>
  )
}

export default Element;