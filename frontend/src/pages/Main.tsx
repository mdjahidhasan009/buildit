import Header from "../components/Header.tsx";
import {BsFillImageFill, BsGrid1X2} from "react-icons/bs";
import {FaFolder, FaShapes} from "react-icons/fa";
import {GoCloud} from "react-icons/go";
import {TfiText} from "react-icons/tfi";
import {RxTransparencyGrid} from "react-icons/rx";
import {useEffect, useState} from "react";
import {MdKeyboardArrowLeft} from "react-icons/md";
import TemplateDesign from "../components/main/TemplateDesign.tsx";
import MyImages from "../components/MyImages.tsx";
import Projects from "../components/Projects.tsx";
import Image from "../components/Image.tsx";
import CreateComponent from "../components/CreateComponent.tsx";

const Main = () => {
  const [state, setState] = useState('');
  const [currentComponent, setCurrentComponent] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');
  const [rotate, setRotate] = useState(0);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [left, setLeft] = useState('');
  const [top, setTop] = useState('');
  const [padding, setPadding] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [fontWeight, setFontWeight] = useState('');
  const [opacity, setOpacity] = useState('');
  const [text, setText] = useState('');
  const [zIndex, setZIndex] = useState('');
  const [radius, setRadius] = useState(0);

  const [components, setComponents] = useState([
    {
      name: 'main_frame',
      type: 'rect',
      id: Math.floor((Math.random() * 100) + 1),
      // height: state.height,
      // width: state.width,
      height: 450,
      width: 650,
      zIndex: 1,
      color: '#fff',
      image: "",
      setCurrentComponent: (a) => setCurrentComponent(a),
    }
  ]) as any[];
  const [show, setShow] = useState({
      status: true,
      name: ''
  });

  const setElements = (type: string, name: string) => {
        setState(type);
        setShow({
            status: false,
            name: name
        });
  }

  const moveElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;
    const currentDiv = document.getElementById(id);

    const moveMouse = (e) => {
      const { movementX, movementY } = e;
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);
      if(isMoving) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    }

    const mouseUp = (e) => {
      isMoving = false;
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseup', mouseUp);
      setLeft(parseInt(currentDiv.style.left));
      setTop(parseInt(currentDiv.style.top));
    }

    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseup', mouseUp);
  }

  const resizeElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;
    const currentDiv = document.getElementById(id);

    const moveMouse = (e) => {
      const { movementX, movementY } = e;
      const getStyle = window.getComputedStyle(currentDiv);
      const width = parseInt(getStyle.width);
      const height = parseInt(getStyle.height);
      if(isMoving) {
        currentDiv.style.width = `${width + movementX}px`;
        currentDiv.style.height = `${height + movementY}px`;
      }
    }

    const mouseUp = (e) => {
      isMoving = false;
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseup', mouseUp);
      setWidth(parseInt(currentDiv.style.width));
      setHeight(parseInt(currentDiv.style.height));
    }

    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseup', mouseUp);
  }

  const rotateElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    const target = document.getElementById(id);
    const mouseMove = (e) => {
      const { movementX, movementY } = e;
      const getStyle = window.getComputedStyle(target);
      const trans = getStyle.transform;
      const values = trans.split('(')[1].split(')')[0].split(',');
      const angle = Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));
      let deg = angle < 0 ? angle + 360 : angle;
      if(movementX) {
        deg = deg + movementX;
      }
      target.style.transform = `rotate(${deg}deg)`;
    }

    const mouseUp = (e) => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);

      const getStyle = window.getComputedStyle(target);
      const trans = getStyle.transform;
      const values = trans.split('(')[1].split(')')[0].split(',');
      const angle = Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));
      let deg = angle < 0 ? angle + 360 : angle;
      setRotate(deg);
    }

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  }

  const createShape = (name: string, type: string) => {
    const style = {
      id: components.length + 1,
      name: name,
      type: type,
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      zIndex: 2,
      color: '#3c3c3d',
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    }
    setComponents([...components, style]);
  }

  const removeComponent = (id: string) => {
    const temp = components.filter(component => component.id !== id);
    setComponents(temp);
    setCurrentComponent('')
  }

  const opacityHandler = (e) => {
    setOpacity(parseFloat(e.target.value));
  }

  const removeBackground = () => {
    const component = components.find(component => component.id === currentComponent.id);
    const temp = components.filter(component => component.id !== currentComponent.id);
    component.image = '';
    setImage('');
    setComponents([...temp, component]);
  }

  const addText = (name, type) => {
    const style = {
      id: components.length + 1,
      name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      rotate,
      zIndex: 10,
      padding: 6,
      fontSize: 22,
      title: 'Add text',
      color: '#3c3c3d',
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    }
    setWidth('');
    setFontSize('');
    setCurrentComponent(style);
    setComponents([...components, style]);
  }

  const addImage = (image) => {
    const style ={
      id: components.length + 1,
      name: 'image',
      type: 'image',
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      zIndex: 2,
      radius: 0,
      image,
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement
    }
    setCurrentComponent(style);
    setComponents([...components, style]);
  }

  useEffect(() => {
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
      setRadius(0)
    }
  }, [color, image, left, top, height, width, rotate, opacity, zIndex, padding, fontSize, fontWeight, text, radius]);

  return (
    <div className="min-w-screen h-screen bg-black">
      <Header />
      <div className='flex h-[calc(100%-60px)] w-screen'>
        <div className={`w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto`}>
          <div
              onClick={() => setElements('design', 'design')}
              className={`${show.name === 'design' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
              <span className='text-2xl'><BsGrid1X2/></span>
              <span className='text-xs'>Design</span>
          </div>

          <div
              onClick={() => setElements('shape', 'shape')}
              className={`${show.name === 'shape' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
              <span className='text-2xl'><FaShapes/></span>
              <span className='text-xs'>Shapes</span>
          </div>

          <div
              onClick={() => setElements('image', 'uploadImage')}
              className={`${show.name === 'uploadImage' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
              <span className='text-2xl'><GoCloud/></span>
              <span className='text-xs'>Upload</span>
          </div>

          <div
              onClick={() => setElements('text', 'text')}
              className={`${show.name === 'text' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
              <span className='text-2xl'><TfiText/></span>
              <span className='text-xs'>Text</span>
          </div>

          <div
              onClick={() => setElements('project', 'projects')}
              className={`${show.name === 'projects' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
              <span className='text-2xl'><FaFolder/></span>
              <span className='text-xs'>Project</span>
          </div>

          <div
              onClick={() => setElements('initImage', 'images')}
              className={`${show.name === 'images' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
              <span className='text-2xl'><BsFillImageFill/></span>
              <span className='text-xs'>Images</span>
          </div>

          <div
              onClick={() => setElements('background', 'background')}
              className={`${show.name === 'background' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
              <span className='text-2xl'><RxTransparencyGrid/></span>
              <span className='text-xs'>Background</span>
          </div>
        </div>
        <div className='h-full w-[calc(100%-75px)]'>
          <div className={`${show.status ? 'p-0 -left-[350px]' : 'px-8 left-[75px] py-5'} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}>
            <div
              onClick={() => setShow({
                status: true,
                name: ''
              })}
              className='flex absolute justify-center items-center bg-[#252527] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full'><MdKeyboardArrowLeft /></div>
              {
                  state === 'design' && <div>
                    <div className='grid grid-cols-2 gap-2'>
                      <TemplateDesign />
                    </div>
                  </div>
              }
              {
                state === 'shape' &&
                <div className='grid grid-cols-3'>
                  <div onClick={() => createShape('shape', 'rect')} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                  <div onClick={() => createShape('shape', 'circle')} className='h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full'></div>
                  <div onClick={() => createShape('shape', 'trangle')} style={{clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'}} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                </div>
              }
              {
                  state === 'image' && <div> <MyImages /></div>
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
                  state === 'project' && <Projects />
              }
              {
                state === 'initImage' &&
                  <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                    <Image addImage={addImage} />
                  </div>
              }
            {
              state === 'background' &&
                <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                  <div className='grid grid-cols-2 gap-2'>
                    {
                      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item, index) =>
                        <div
                          onClick={() => setImage('http://localhost:5173/project.jpg')}
                          key={index}
                          className='w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'
                        >
                          <img
                            className='w-full h-full object-fill'
                            src='http://localhost:5173/project.jpg'
                            alt='image'
                          />
                        </div>
                      )
                    }
                  </div>
                </div>
            }
          </div>

          <div className='w-full flex h-full'>
            <div className={`flex justify-center relative items-center h-full ${!currentComponent? 'w-full' : 'w-[calc(100%-250px)] overflow-hidden'}`}>
              <div className='m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden'>
                <div id='main_design' className='w-auto relative h-auto overflow-hidden'>
                  {
                    components.map((component, index) => (
                      <CreateComponent
                        key={index}
                        info={component}
                        currentComponent={currentComponent}
                        removeComponent={removeComponent}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
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
                        onChange={(e) => setColor(e.target.value)}
                        type='color'
                        id='color'
                        className='invisible'
                      />
                    </div>
                    {
                      (currentComponent?.name === 'main_frame' && image) && (
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
          </div>

        </div>
      </div>
    </div>
  );
}

export default Main;