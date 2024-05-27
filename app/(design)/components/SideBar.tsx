"use client";

import {BsFillImageFill, BsGrid1X2} from "react-icons/bs";
import {FaFolder, FaShapes} from "react-icons/fa";
import {GoCloud} from "react-icons/go";
import {TfiText} from "react-icons/tfi";
import {RxTransparencyGrid} from "react-icons/rx";
import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import {setSidebarItemAndItemNameOfSelectedSidebarAndIsSidebarOpen} from "@/lib/features/ui/uiSlice";

const SideBar = () => {
  const dispatch= useDispatch();
  const selectedSidebarItemName = useSelector((state: RootState) => state.ui.selectedSidebarItemName);

  const handleOnClick = (type: string, name: string) => {
    dispatch(setSidebarItemAndItemNameOfSelectedSidebarAndIsSidebarOpen({ selectedSidebarItemName: type, selectedItemNameOfSidebar: name }));
  }


  return (
    <div className={`w-[80px] bg-[#18191B] z-50 text-gray-400 overflow-y-auto flex flex-col items-center justify-center`}>
      <div
        onClick={() => handleOnClick('design', 'design')}
        className={`${selectedSidebarItemName === 'design' ? 'bg-[#252627]' : ''} w-full h-[75px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
        <span className='text-2xl'><BsGrid1X2/></span>
        <span className='text-xs'>Design</span>
      </div>

      <div
        onClick={() => handleOnClick('shape', 'shape')}
        className={`${selectedSidebarItemName === 'shape' ? 'bg-[#252627]' : ''} w-full h-[75px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
        <span className='text-2xl'><FaShapes/></span>
        <span className='text-xs'>Shapes</span>
      </div>

      <div
        onClick={() => handleOnClick('image', 'uploadImage')}
        className={`${selectedSidebarItemName === 'image' ? 'bg-[#252627]' : ''} w-full h-[75px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
        <span className='text-2xl'><GoCloud/></span>
        <span className='text-xs'>Upload</span>
      </div>

      <div
        onClick={() => handleOnClick('text', 'text')}
        className={`${selectedSidebarItemName === 'text' ? 'bg-[#252627]' : ''} w-full h-[75px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
        <span className='text-2xl'><TfiText/></span>
        <span className='text-xs'>Text</span>
      </div>

      <div
        onClick={() => handleOnClick('project', 'projects')}
        className={`${selectedSidebarItemName === 'project' ? 'bg-[#252627]' : ''} w-full h-[75px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
        <span className='text-2xl'><FaFolder/></span>
        <span className='text-xs'>Project</span>
      </div>

      <div
        onClick={() => handleOnClick('initImage', 'images')}
        className={`${selectedSidebarItemName === 'initImage' ? 'bg-[#252627]' : ''} w-full h-[75px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
        <span className='text-2xl'><BsFillImageFill/></span>
        <span className='text-xs'>Images</span>
      </div>

      <div
        onClick={() => handleOnClick('background', 'background')}
        className={`${selectedSidebarItemName === 'background' ? 'bg-[#252627]' : ''} w-full h-[75px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
        <span className='text-2xl'><RxTransparencyGrid/></span>
        <span className='text-xs'>Background</span>
      </div>
    </div>
  )
}

export default SideBar;