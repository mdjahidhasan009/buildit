import Link from "next/link";
import {FaTrash} from "react-icons/fa";
import useApi from "@/utils/useApi";
import toast from "react-hot-toast";

const Item = ({ design, type, setDesigns }) => {
    const { fetchData } = useApi(`api/v1/design/delete-user-image/${design?.id}`, 'DELETE');
    const deleteDesign = async (id) => {
        try {
            await fetchData();
            // setDesigns(designs.filter(design => design._id !== id));////TODO: will fix this later
            toast.success('Design deleted successfully');
            // getUserDesigns();
        } catch (e) {
            console.error(e);
            toast.error('Something went wrong');
        }
    }


  return (
      <div className={`relative group w-full ${type ? ' h-[100px] ' : ' h[170px] px-2 '}`}>
        <Link
          // href={`/design/${design?._id}`}
          href={`/design/${design?.id}`}
          className={`w-full h-full block bg-[#ffffff12] rounded-md ${type ? '' : ' p-4 '}`}>
            <img className='w-full h-full rounded-md overflow-hidden' src={design?.imageUrl} alt="" />
        </Link>
        <div
          // onClick={() => deleteDesign(design?._id)}
          onClick={() => deleteDesign(design?.id)}
          className='absolute hidden cursor-pointer top-1 right-2 text-red-500 p-2 transition-all duration-500 group-hover:block'
        >
          <FaTrash/>
        </div>
      </div>
  )
}

export default Item;