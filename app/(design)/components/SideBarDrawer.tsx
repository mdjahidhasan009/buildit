"use client";

import {MdKeyboardArrowLeft} from "react-icons/md";
import TemplateDesign from "./TemplateDesign";
import MyImages from "../../../components/MyImages";
import Projects from "../../../components/Projects";
import InitialImage from "../../../components/InitialImage";
import BackgroundImages from "./BackgroundImages";
import {useDispatch, useSelector} from "react-redux";
import {closeSidebar} from "@/lib/features/ui/uiSlice";
import {AppDispatch, RootState} from "@/lib/reduxStore";
import useSidebarDrawer from "@/app/(design)/business/useSidebarDrawer";

const SideBarDrawer = ({ design_id = '' }) => {
  const dispatch: AppDispatch  = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const selectedSidebarItemName = useSelector((state: RootState) => state.ui.selectedSidebarItemName);

  const { createShape, addImage, addBackgroundImage, addText } = useSidebarDrawer();

  const handleOnClick = () => {
    dispatch(closeSidebar());
  }

  return (
    <div
      className={`${!isSidebarOpen ? 'p-0 -left-[350px]' : 'px-8 left-[75px] py-5'} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}>
      <div
        onClick={handleOnClick}
        className='flex absolute justify-center items-center bg-[#252527] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full'
      >
        <MdKeyboardArrowLeft/></div>
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
        selectedSidebarItemName === 'project' && <Projects type='main' designId={design_id}/>
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