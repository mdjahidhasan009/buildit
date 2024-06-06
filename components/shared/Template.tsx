"use client";

import toast from "react-hot-toast";
import useApi from "@/utils/useApi";
import {redirect, useRouter} from 'next/navigation'
import {FC, useEffect} from "react";
import {IDesignComponent} from "@/app/(design)/constants/Design";
import BaseCard from "@/components/ui/BaseCard";

interface TemplateData {
  id: string;
  components: IDesignComponent[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface TemplateProps {
  index: number;
  template: TemplateData;
  // type: "main" | "";
}

const Template: FC<TemplateProps> = ({ index, template}) => {
  const router = useRouter();

  const {fetchData, data } = useApi(`api/v1/designs/user/create/${template?.id}`, 'POST');


  useEffect(() => {
    if(data) {
      toast.success('Template added successfully');
      router.push( `/design/${data?.data?.design?.id}`);
    }
  }, [data]);

  const createUserDesignFromTemplate = async () => {
    try {
        await fetchData({});
        redirect(`/design/${data?.data?.design?._id}`);
    } catch (e) {
        console.error(e);
        toast.error('Something went wrong');
    }
  }

  return (
    // <div
    //   key={index}
    //   onClick={createUserDesignFromTemplate}
    //   // className={`relative cursor-pointer group w-full ${type ? ' h-[100px] ' : ' h[170px] px-2 '}`}>
    //   className={`relative cursor-pointer group w-full h-[170px]`}>
    //   <div
    //     // className={`w-full h-full block bg-[#ffffff12] rounded-md ${type ? '' : ' p-4 '}`}
    //     className={`w-full h-full block bg-[#ffffff12] rounded-md p-4`}
    //   >
    //     <Image
    //       className='w-full h-full rounded-md overflow-hidden'
    //       src={template?.imageUrl}
    //       alt=""
    //       fill
    //       objectFit="cover"
    //     />
    //   </div>
    // </div>
    <BaseCard imageUrl={template?.imageUrl || ""} onClick={createUserDesignFromTemplate} />
  )
}

export default Template;