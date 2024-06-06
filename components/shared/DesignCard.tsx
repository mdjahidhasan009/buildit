import Link from "next/link";
import {FaTrash} from "react-icons/fa";
import useApi from "@/utils/useApi";
import toast from "react-hot-toast";
import Image from 'next/image';
import React, {FC} from "react";

import {IDesign} from "@/app/(design)/constants/Design";
import BaseCard from "@/components/ui/BaseCard";

interface DesignCardProps {
  design: IDesign;
}

const DesignCard: FC<DesignCardProps> = ({ design }) => {
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
    <BaseCard imageUrl={design?.imageUrl || ""} link={`/design/${design?.id}`}>
      <button
        onClick={deleteDesign}
        className="absolute hidden cursor-pointer top-[-5px] right-[-4px] text-red-500 p-2 transition-all duration-500 group-hover:block z-50"
        style={{ outline: 'none' }}
      >
        <FaTrash />
      </button>
    </BaseCard>
  );
};

export default DesignCard;