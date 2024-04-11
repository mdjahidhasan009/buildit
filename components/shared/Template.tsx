"use client";

import toast from "react-hot-toast";
import useApi from "@/utils/useApi";
import {redirect, useRouter} from 'next/navigation'
import {FC, useEffect} from "react";
import {IComponent} from "@/lib/features/components/IComponent";

interface TemplateData {
  id: string;
  components: IComponent[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface TemplateProps {
  index: number;
  template: TemplateData;
  type: "main" | "";
}

const Template: FC<TemplateProps> = ({ index, template, type }) => {
  const router = useRouter();

  const {fetchData, data } = useApi(`api/v1/designs/user/create/${template?.id}`, 'POST');


  useEffect(() => {
    if(data) {
      toast.success('Template added successfully');

      router.push( `/design/${data?.data?.design?.id}`,
        // query: {type: 'create', width: 600, height: 450},
      );
    }
  }, [data]);

  const createUserDesignFromTemplate = async () => {
    try {
        // const { data } = await api.post(`/designs/add-user-template/${id}`);
        // toast.success('Template added successfully');
        await fetchData({});
        // debugger
        // navigate(`/designs/${data?.data?.designs?._id}/edit`);
        // await router.push({
        //   pathname: `/designs/${data?.data?.designs?._id}/edit`,
        //   // query: {type: 'create', width: 600, height: 450},
        // });
        redirect(`/design/${data?.data?.design?._id}`);

        // router.push(`/designs/${data?.data?.designs?._id}/edit`);
    } catch (e) {
        console.error(e);
        toast.error('Something went wrong');
    }
  }

  return (
    <div
      key={index}
      onClick={createUserDesignFromTemplate}
      className={`relative cursor-pointer group w-full ${type ? ' h-[100px] ' : ' h[170px] px-2 '}`}>
      <div
        className={`w-full h-full block bg-[#ffffff12] rounded-md ${type ? '' : ' p-4 '}`}
      >
        <img className='w-full h-full rounded-md overflow-hidden' src={template?.imageUrl}
             alt=""
        />
      </div>
    </div>
  )
}

export default Template;