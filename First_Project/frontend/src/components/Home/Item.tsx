import {Link} from "react-router-dom";
import {FaTrash} from "react-icons/fa";

const Item = ({ design, type, deleteDesign }) => {
  return (
      <div className={`relative group w-full ${type ? ' h-[100px] ' : ' h[170px] px-2 '}`}>
        <Link
            to={`/design/${design?._id}/edit`}
            className={`w-full h-full block bg-[#ffffff12] rounded-md ${type ? '' : ' p-4 '}`}
        >
              <img className='w-full h-full rounded-md overflow-hidden' src={design?.imageUrl} alt=""
          />
        </Link>
        <div
          onClick={() => deleteDesign(design?._id)}
          className='absolute hidden cursor-pointer top-1 right-2 text-red-500 p-2 transition-all duration-500 group-hover:block'
        >
          <FaTrash/>
        </div>
      </div>
  )
}

export default Item;