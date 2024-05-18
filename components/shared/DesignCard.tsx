import Link from "next/link";
import {FaTrash} from "react-icons/fa";
import useApi from "@/utils/useApi";
import toast from "react-hot-toast";
import Image from 'next/image';

import {IComponent} from "@/lib/features/components/IComponent";
import React from "react";

interface Design {
  id: string;
  userId: string;
  components: IComponent[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const DesignCard = ({ design }: { design: Design }) => {
  const { fetchData } = useApi(`api/v1/designs/user`, 'DELETE');

  const deleteDesign = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      await fetchData({}, `/${design?.id}`);
      toast.success('Design deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className={`h-[200px] w-full relative group`}>
      <Link
        href={`/design/${design?.id}`}
        className={`w-full h-full block bg-gray-700 rounded-md`}
      >
        {/*<div className="relative w-full h-full aspect-w-1 aspect-h-1">*/}
        <div className="relative w-full h-full">
          <Image
            src={design?.imageUrl}
            alt="Design image"
            fill
            objectFit="scale-down"
            className="rounded-md"
          />
        </div>
      </Link>
      <button
        onClick={deleteDesign}
        className="absolute hidden cursor-pointer top-1 right-2 text-red-500 p-2 transition-all duration-500 group-hover:block z-50"
        style={{ outline: 'none' }}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default DesignCard;