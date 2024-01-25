"use client";

import {MdKeyboardArrowLeft} from "react-icons/md";
import TemplateDesign from "./TemplateDesign.tsx";
import MyImages from "../MyImages.tsx";
import Projects from "../Projects.tsx";
import InitialImage from "../InitialImage.tsx";
import BackgroundImages from "../BackgroundImages.tsx";
import {useContext} from "react";
import {DesignContext} from "../../contexts/DesignProvider.tsx";

const SideBarDrawer = () => {
  const { show, setShow, state, createShape, design_id, addImage, addText, setImage } = useContext(DesignContext);

  return (
    <div
      className={`${show.status ? 'p-0 -left-[350px]' : 'px-8 left-[75px] py-5'} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}>
      <div
        onClick={() =>
          setShow({
              status: true,
              name: ''
            }
          )
        }
        className='flex absolute justify-center items-center bg-[#252527] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full'>
        <MdKeyboardArrowLeft/></div>
      {
        state === 'design' && <div>
          {/*<div className='grid grid-cols-2 gap-2'>*/}
            <TemplateDesign type='main'/>
          {/*</div>*/}
          </div>
      }
      {
        state === 'shape' &&
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
        state === 'image' && <div><MyImages addImage={addImage}/></div>
      }
      {
        state === 'text' && <div>
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
        state === 'project' && <Projects type='main' designId={design_id}/>
      }
      {
        state === 'initImage' &&
          <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
            <InitialImage addImage={addImage}/>
          </div>
      }
      {
        state === 'background' &&
          <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
            <BackgroundImages type='background' setImage={setImage}/>
          </div>
      }
    </div>
  )
}

export default SideBarDrawer;