import {useContext, useEffect} from "react";
import {DesignContext} from "../../context/DesignProvider.tsx";

const ComponentPropertiesPanel = () => {
  const {currentComponent, setCurrentComponent, color, setColor, setZIndex,
    setOpacity, setPadding, setFontSize, setFontWeight, setText, setRadius, left, top, height, width, rotate,
    opacity, zIndex, padding, fontSize, fontWeight, text, radius, opacityHandler,
    image, removeBackground, components, setComponents, setWidth, setHeight, setShow,
    setLeft, setTop, setRotate, setImage} = useContext(DesignContext);

  useEffect(() => {
    updateCurrentComponentProperties();
  }, [color, image, left, top, height, width, rotate, opacity, zIndex, padding, fontSize, fontWeight, text, radius]);

  const updateCurrentComponentProperties = () => {
    if(currentComponent) {
      const index = components.findIndex(component => component.id === currentComponent.id);
      const temp = components.filter(component => component.id !== currentComponent.id);

      if(currentComponent !== 'text') {
        components[index].width = width || currentComponent?.width;
        components[index].height = height || currentComponent?.height;
        components[index].rotate = rotate || currentComponent?.rotate;
      }
      if(currentComponent?.name === 'text') {
        components[index].padding = padding || currentComponent?.padding;
        components[index].fontSize = fontSize || currentComponent?.fontSize;
        components[index].fontWeight = fontWeight || currentComponent?.fontWeight;
        components[index].title = text || currentComponent?.title;
      }
      if(currentComponent?.name === 'image') {
        components[index].radius = radius || currentComponent?.radius;
      }
      if(currentComponent?.name === 'main_frame' && image) {
        components[index].image = image || currentComponent?.image;
      }
      components[index].color = color || currentComponent?.color;
      if(currentComponent?.name !== 'main_frame') {
        components[index].left = left || currentComponent?.left;
        components[index].top = top || currentComponent?.top;
        components[index].opacity = opacity || currentComponent?.opacity;
        components[index].zIndex = zIndex || currentComponent?.zIndex;
      }
      setComponents([...temp, components[index]]);
      setWidth('');
      setHeight('');
      setLeft('');
      setTop('');
      setRotate(0);
      setColor('');
      setOpacity('');
      setZIndex('');
      setPadding('');
      setFontSize('');
      setFontWeight('');
      setText('');
      setRadius(0);
    }
  }

  return (
    <>
      {
        currentComponent && (
          <div className='h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2'>
            <div className='flex gap-6 flex-col items-start h-full px-3 justify-start'>
              <div className='flex gap-4 justify-start items-start mt-4'>
                <span>Color: </span>
                <label
                  className='w-[30px] h-[30px] cursor-pointer rounded-md'
                  style={{background: `${currentComponent.color && currentComponent.color !== '#fff' ? currentComponent.color : 'gray'}`}}
                  htmlFor='color'
                >
                </label>
                <input
                  onChange={(e) => {console.log('init color:', color); setColor(e.target.value); console.log('after color:', color);}}
                  type='color'
                  id='color'
                  className='invisible'
                />
              </div>
              {
                // (currentComponent?.name === 'main_frame' && image) && (
                (currentComponent?.name === 'main_frame' && currentComponent?.image) && (
                  <div>
                    <button className='p-[6px] bg-slate-700 text-white rounded-md'
                            onClick={removeBackground}
                    >
                      Remove Background
                    </button>
                  </div>
                )
              }
              {
                currentComponent?.name !== 'main_frame' &&
                  <div className='flex gap-6 flex-col'>
                    <div className='flex gap-4 justify-start items-start'>
                      <span className='text-md w-[70px]'>Opacity : </span>
                      <input
                          onChange={opacityHandler}
                          className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md'
                          type='number'
                          step={0.1}
                          min={0.1}
                          max={1}
                          value={currentComponent?.opacity}
                      />
                    </div>

                    <div className='flex gap-1 justify-start items-start'>
                      <span className='text-md w-[70px]'>Z-Index : </span>
                      <input
                          onChange={(e) => setZIndex(parseInt(e.target.value))}
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
                              onChange={(e) => setRadius(parseInt(e.target.value))}
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
                            <span className='text-md w-[70px]'>Padding : </span>
                            <input
                                onChange={(e) => setPadding(parseInt(e.target.value))}
                                className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md'
                                type='number'
                                step={1}
                                value={currentComponent?.padding}
                            />
                          </div>
                          <div className='flex gap-1 justify-start items-start'>
                            <span className='text-md w-[72px]'>Font Size : </span>
                            <input
                                onChange={(e) => {
                                  console.log(parseInt(e.target.value));
                                  setFontSize(parseInt(e.target.value))
                                }}
                                className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md'
                                type='number'
                                step={1}
                                value={currentComponent?.fontSize}
                            />
                          </div>

                          <div className='flex gap-1 justify-start items-start'>
                            <span className='text-md w-[72px]'>Font Weight : </span>
                            <input
                                onChange={(e) => setFontWeight(parseInt(e.target.value))}
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
                                onChange={(e) => {
                                  setCurrentComponent({
                                    ...currentComponent,
                                    title: e.target.value
                                  });
                                  // setText(e.target.value); //TODO: will add this
                                }}
                                className='border border-gray-700 bg-transparent outline-none p-2 rounded-md'
                                type='text'
                                value={currentComponent?.title}
                            />
                            <button
                                onClick={() => setText(currentComponent?.title)}
                                className='px-4 py-2 bg-purple-500 text-xs text-white rounded-sm'
                            >
                              Add
                            </button>
                          </div>
                        </>
                    }
                  </div>
              }
            </div>

          </div>
        )
      }
    </>
  )
}

export default ComponentPropertiesPanel;