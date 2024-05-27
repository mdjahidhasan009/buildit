"use client";

import {MdKeyboardArrowLeft} from "react-icons/md";
import TemplateDesign from "./TemplateDesign";
import MyImages from "./MyImages";
import Projects from "./Projects";
import InitialImage from "./InitialImage";
import BackgroundImages from "./BackgroundImages";
import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import {closeSidebar} from "@/lib/features/ui/uiSlice";
import useSidebarDrawer from "@/app/(design)/business/hooks/useSidebarDrawer";
import {cn} from "@/lib/cn";

const SideBarDrawer = ({ design_id = '' }) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const selectedSidebarItemName = useSelector((state: RootState) => state.ui.selectedSidebarItemName);

  const { createShape, addImage, addBackgroundImage, addText } = useSidebarDrawer();

  const handleOnClick = () => {
    dispatch(closeSidebar());
  }

  const sidebarClasses = cn(
    'bg-[#252627]',
    'h-full',
    'fixed',
    'transition-all duration-700',
    'w-[50vw] md:w-[350px]',
    'z-30',
    !isSidebarOpen ? {
      'p-0 left-[-50vw] md:left-[-350px]': true
    } : {
      'px-3 left-[75px] py-3': true
    }
  );

  return (
    <div
      // className={`${!isSidebarOpen ? 'p-0 left-[-50vw] md:-left-[350px]' : 'px-3 left-[75px] py-3'} bg-[#252627] h-full fixed transition-all duration-700 w-[50vw] md:w-[350px] z-30 `}>
      className={sidebarClasses}>
      <div
        onClick={handleOnClick}
        className='flex absolute justify-center items-center bg-[#252527] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full'
      >
        <MdKeyboardArrowLeft/>
      </div>
      {
        selectedSidebarItemName === 'design' && <div>
            <TemplateDesign type='main'/>
          </div>
      }
      {
        selectedSidebarItemName === 'shape' &&
          <div className='grid grid-cols-3'>
            <div onClick={() => createShape('shape', 'rect')}
                 className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
            <div onClick={() => createShape('shape', 'circle')}
                 className='h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full'></div>
            <div onClick={() => createShape('shape', 'trangle')}
                 style={{clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'}}
                 className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
          </div>
      }
      {
        selectedSidebarItemName === 'image' && <div><MyImages addImage={addImage}/></div>
      }
      {
        selectedSidebarItemName === 'text' && <div>
            <div className='grid grid-cols-1 gap-2'>
              <div
                  onClick={() => addText('text', 'title')}
                  className='bg-[#3c3c3d] h-[90px] cursor-pointer font-bold p-3 text-white text-xl rounded-sm'
              >
                <h2>Add a Text</h2>
              </div>
            </div>
          </div>
      }
      {
        selectedSidebarItemName === 'project' && <Projects designId={design_id}/>
      }
      {
        selectedSidebarItemName === 'initImage' &&
          <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
            <InitialImage addImage={addImage}/>
          </div>
      }
      {
        selectedSidebarItemName === 'background' &&
          <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
            <BackgroundImages setImage={addBackgroundImage}/>
          </div>
      }
    </div>
  )
}

export default SideBarDrawer;