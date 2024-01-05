import {Link} from "react-router-dom";

const Header = () => {
  const saveImage = () => {

  }

  const downloadImage = () => {

  }

  return (
    <div className="h-[60px] bg-gradient-to-r from-[#212122] via-[#27282b] to-[#2a2b2c] w-full">
      <div className="flex justify-between px-10 items-center text-gray-300 h-full">
        <Link to='/'>
          <img src="https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg" alt="" />
        </Link>
        <span className="text-xl">Buildit</span>
        <div className="flex justify-center items-center gap-2 text-gray-300">
          <button onClick={saveImage} className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm">Save</button>
          <button onClick={downloadImage} className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm">Download</button>
        </div>
      </div>
    </div>
  );
}

export default Header;