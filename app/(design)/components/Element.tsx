import { BsArrowsMove } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateComponentRotation } from "@/lib/features/components/componentsSlice";
import { AppDispatch, RootState } from "@/lib/reduxStore";
import { IComponent } from "@/lib/features/components/IComponent";
import { isMobileDevice } from "@/lib/utils";
import useRotate from "@/app/(design)/business/hooks/useRotate";
import { useEffect, useRef } from "react";
import useResize from "@/app/(design)/business/hooks/useResize";

interface ElementProps {
  elementWrapperDivRef: React.RefObject<HTMLElement>;
  component: IComponent;
  extraElementRef?: React.RefObject<HTMLElement>;
}

const Element: React.FC<ElementProps> = ({ elementWrapperDivRef, component, extraElementRef = null }) => {
  const dispatch  = useDispatch<AppDispatch>();
  const currentComponent = useSelector((state: RootState) => state.components.currentComponent);
  const rotateIconRef = useRef(null);
  const resizeIconExtraElementBottomRightRef = useRef(null);
  const resizeIconExtraElementBottomLeftRef = useRef(null);
  const resizeIconExtraElementTopRightRef = useRef(null);

  const resizeIconElementWrapperDivRefBottomLeftRef = useRef(null);
  const resizeIconElementWrapperDivRefBottomRightRef = useRef(null);
  const resizeIconElementWrapperDivRefTopRightRef = useRef(null);

  const { rotation } = useRotate(elementWrapperDivRef, rotateIconRef, component);
  const activeRef: React.RefObject<HTMLElement> = elementWrapperDivRef;
  useResize(activeRef, resizeIconExtraElementBottomRightRef, component);
  useResize(activeRef, resizeIconExtraElementTopRightRef, component);
  useResize(activeRef, resizeIconExtraElementBottomLeftRef, component);

  useResize(activeRef, resizeIconElementWrapperDivRefBottomLeftRef, component);
  useResize(activeRef, resizeIconElementWrapperDivRefBottomRightRef, component);
  useResize(activeRef, resizeIconElementWrapperDivRefTopRightRef, component);

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
              ref={resizeIconExtraElementBottomRightRef}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -right-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
            >
            </div>
            <div
              ref={resizeIconExtraElementTopRightRef}
              className={`no-drag ${willShow()} absolute -top-[3px] -right-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
            >
            </div>
            <div
              ref={resizeIconExtraElementBottomLeftRef}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -left-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
            >
            </div>
          </>
          : <>
            <div
              ref={resizeIconElementWrapperDivRefBottomRightRef}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -right-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
              ></div>
            <div
              ref={resizeIconElementWrapperDivRefTopRightRef}
              className={`no-drag ${willShow()} absolute -top-[3px] -right-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
            ></div>
            <div
              ref={resizeIconElementWrapperDivRefBottomLeftRef}
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