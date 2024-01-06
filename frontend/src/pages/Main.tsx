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
  const [left, setLeft] = useState('');
  const [top, setTop] = useState('');

  const [components, setComponents] = useState([
    {
      name: 'main_frame',
      type: 'rect',
      id: Math.floor((Math.random() * 100) + 1),
      // height: state.height,
      // width: state.width,
      height: 450,
      width: 650,
      z_index: 1,
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

  const resizeElement = () => {

  }

  const rotateElement = () => {

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
      z_index: 2,
      color: '#3c3c3d',
      setCurrentComponent: (a) => setCurrentComponent(a),
      removeBackground: () => setImage(''),
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

  const removeBackground = () => {
    const component = components.find(component => component.id === currentComponent.id);
    const temp = components.filter(component => component.id !== currentComponent.id);
    component.image = '';
    setImage('');
    setComponents([...temp, component]);
  }

  useEffect(() => {
    if(currentComponent) {
      const index = components.findIndex(component => component.id === currentComponent.id);
      const temp = components.filter(component => component.id !== currentComponent.id);

      if(currentComponent?.name === 'main_frame' && image) {
        components[index].image = image || currentComponent?.image;
      }
      components[index].color = color || currentComponent?.color;
      if(currentComponent?.name !== 'main_frame') {
        components[index].left = left || currentComponent?.left;
        components[index].top = top || currentComponent?.top;
      }

      setComponents([...temp, components[index]]);
    }
    console.log(image)
  }, [color, image, left, top]);

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
                      <div className='bg-[#3c3c3d] h-[90px] cursor-pointer font-bold p-3 text-white text-xl rounded-sm'>
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
                    <Image/>
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
                  <div className='flex gap-3 flex-col items-start h-full px-3 justify-start'>
                    <div className='flex gap-4 justify-start items-start'>
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