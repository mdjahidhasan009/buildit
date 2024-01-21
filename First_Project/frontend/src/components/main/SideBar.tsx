import {BsFillImageFill, BsGrid1X2} from "react-icons/bs";
import {FaFolder, FaShapes} from "react-icons/fa";
import {GoCloud} from "react-icons/go";
import {TfiText} from "react-icons/tfi";
import {RxTransparencyGrid} from "react-icons/rx";
import {useContext} from "react";
import {DesignContext} from "../../context/DesignProvider.tsx";

const SideBar = () => {
  const {setElements, show } = useContext(DesignContext);

  return (
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
  )
}

export default SideBar;