"use client";

import {MdKeyboardArrowLeft} from "react-icons/md";
import TemplateDesign from "./TemplateDesign.tsx";
import MyImages from "../MyImages.tsx";
import Projects from "../Projects.tsx";
import InitialImage from "../InitialImage.tsx";
import BackgroundImages from "../BackgroundImages.tsx";
import {useDispatch, useSelector} from "react-redux";
import {addComponent, setCurrentComponent, updateComponent} from "@/lib/features/components/componentsSlice";
import createComponentFactory from "@/utils/createComponentFactory";
import {closeSidebar} from "@/lib/features/ui/uiSlice";
import {AppDispatch} from "@/lib/reduxStore";

const SideBarDrawer = ({ design_id = '' }) => {
  const dispatch: AppDispatch  = useDispatch();
  const components = useSelector((state) => state.components.components);
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);
  const selectedSidebarItemName = useSelector((state) => state.ui.selectedSidebarItemName);

  const handleOnClick = () => {
    dispatch(closeSidebar());
  }

  const componentFactory = createComponentFactory();

  const createShape = (name, type) => {
    const newComponent = componentFactory({
      name,
      type,
      additionalProps: {
        width: 200,
        height: 150,
      }
    });
    dispatch(addComponent(newComponent));
  };

  const addImage = (image) => {
    const newComponent = componentFactory(
      {
        name: 'image',
        type: 'image',
        additionalProps: {
          width: 200,
          height: 150,
          radius: 0,
          image
        }
      }
    );
    dispatch(addComponent(newComponent));
    dispatch(setCurrentComponent(newComponent));
  };

  const addBackgroundImage = (image) => {
    const main_frame = components.find(comp => comp.name === 'main_frame');
    dispatch(updateComponent({ id: main_frame.id, changes: { image } }));
  }

  const addText = (name, type) => {
    const newComponent = componentFactory(
      {
        name,
        type,
        additionalProps: {
          width: 200,
          height: 150,
          text: 'Add text',
          fontSize: 22,
          padding: 6,
          fontWeight: 400,
        }
      }
    );
    dispatch(setCurrentComponent(newComponent));
    dispatch(addComponent(newComponent));
  };

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
            <BackgroundImages type='background' setImage={addBackgroundImage}/>
          </div>
      }
    </div>
  )
}

export default SideBarDrawer;