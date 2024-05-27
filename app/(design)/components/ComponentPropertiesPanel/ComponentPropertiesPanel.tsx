"use client";

import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import { updateComponent } from "@/lib/features/components/componentsSlice";
import { DesignProperty, IComponent } from "@/lib/features/components/IComponent";
import { cn } from "@/lib/cn";
import React from "react";

const ComponentPropertiesPanel: React.FC = () => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.components.currentComponent);

  const removeBackground = () => {
    if(!currentComponent || !currentComponent?.id) return;

    dispatch(updateComponent({
      id: currentComponent?.id,
      changes: { image: '' }
    }));
  };

  const updateCurrComponentProperties = (propertyName: DesignProperty, value: any) => {
    if (!currentComponent) return;

    let updates: Partial<IComponent> = {};
    const generalUpdates = ['width', 'height', 'rotate', 'color', 'left', 'top', 'opacity', 'zIndex'];
    const textUpdates = ['padding', 'fontSize', 'fontWeight', 'title'];
    const imageUpdates = ['radius'];


    if (generalUpdates.includes(propertyName)) {
      updates[propertyName as keyof IComponent] = value;
    } else if (currentComponent.name === 'text' && textUpdates.includes(propertyName)) {
      updates[propertyName as keyof IComponent] = value;
    } else if (currentComponent.name === 'image' && imageUpdates.includes(propertyName)) {
      updates[propertyName as keyof IComponent] = value;
    } else if (currentComponent.name === 'main_frame' && propertyName === 'image') {
      updates['image'] = value;
    }

    const componentId: number = currentComponent?.id || 0;
    dispatch(updateComponent({ id: componentId, changes: updates }));
  }

  return (
    <>
      {
        currentComponent && (
          <div className='w-full lg:w-[250px] text-gray-300 bg-[#252627] py-5 mb-5 lg:px-3 lg:py-2 lg:mb-0'>
            <div className={
              cn(
                "flex gap-6 flex-col-row flex-wrap lg:flex-col items-start justify-start",
                "h-full px-3"
              )
            }>

              {/* Color */}
              <div className='flex gap-4 justify-center items-center'>
                <span>Color: </span>
                <label
                  className='w-[30px] h-[30px] cursor-pointer rounded-md'
                  style={{background: `${currentComponent.color && currentComponent.color !== '#fff' ? currentComponent.color : 'gray'}`}}
                  htmlFor='color'
                >
                </label>
                <input
                  onChange={(e) => updateCurrComponentProperties('color', e.target.value)}
                  type='color'
                  id='color'
                  className='invisible'
                />
              </div>


              {
                (currentComponent?.name === 'main_frame' && currentComponent?.image) && (
                  <div>
                    <button
                      className='p-[6px] bg-slate-700 text-white rounded-md'
                      onClick={removeBackground}
                    >
                      Remove Background
                    </button>
                  </div>
                )
              }


              {
                currentComponent?.name !== 'main_frame' &&
                  <>
                    {/*Opacity*/}
                    <div className='flex gap-4 justify-start items-start'>
                      <span className='text-md'>Opacity : </span>
                      <input
                          onChange={(e) => updateCurrComponentProperties('opacity', parseFloat(e.target.value))}
                          className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md'
                          type='number'
                          step={0.1}
                          min={0.1}
                          max={1}
                          value={currentComponent?.opacity}
                      />
                    </div>

                    <div className='flex gap-1 justify-start items-start'>
                      {/*Z-index*/}
                      <span className='text-md w-[70px]'>Z-Index : </span>
                      <input
                          onChange={(e) => updateCurrComponentProperties('zIndex', parseInt(e.target.value))}
                          className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md'
                          type='number'
                          step={1}
                          value={currentComponent?.zIndex}
                      />
                    </div>
                    {
                      currentComponent?.name === 'image' &&
                        <div className='flex gap-1 justify-start items-start'>
                          <span className='text-md w-[70px]'>Radius : </span>
                          <input
                              onChange={(e) => updateCurrComponentProperties('radius', parseInt(e.target.value))}
                              className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md'
                              type='number'
                              step={1}
                              value={currentComponent?.radius}
                          />
                        </div>
                    }
                    {
                      currentComponent?.name === 'text' &&
                        <>
                          <div className='flex gap-1 justify-start items-start'>
                            <span className='text-md'>Padding : </span>
                            <input
                                onChange={(e) => updateCurrComponentProperties('padding' , parseInt(e.target.value))}
                                className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md'
                                type='number'
                                step={1}
                                value={currentComponent?.padding}
                            />
                          </div>
                          <div className='flex gap-1 justify-start items-start'>
                            <span className='text-md'>Font Size : </span>
                            <input
                                onChange={(e) => updateCurrComponentProperties('fontSize', parseInt(e.target.value))}
                                className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md'
                                type='number'
                                step={1}
                                value={currentComponent?.fontSize}
                            />
                          </div>

                          <div className='flex gap-1 justify-start items-start'>
                            <span className='text-md'>Font Weight : </span>
                            <input
                                onChange={(e) => updateCurrComponentProperties('fontWeight', parseInt(e.target.value))}
                                className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md'
                                type='number'
                                step={100}
                                min={100}
                                max={900}
                                value={currentComponent?.fontWeight}
                            />
                          </div>

                          <div className='flex gap-2 flex-col justify-start items-start'>
                            <input
                                onChange={(e) => updateCurrComponentProperties('title', e.target.value)}
                                className='border border-gray-700 bg-transparent outline-none p-2 rounded-md'
                                type='text'
                                value={currentComponent?.title}
                            />
                          </div>
                        </>
                    }
                  </>
              }
            </div>
          </div>
        )
      }
    </>
  )
}

export default ComponentPropertiesPanel;