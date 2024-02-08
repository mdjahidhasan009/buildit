"use client";

import toast from "react-hot-toast";
import useApi from "@/utils/useApi";
import { useRouter } from 'next/navigation'
import {useEffect} from "react";

const Template = ({ index, template, type }) => {
  const router = useRouter()

  const {fetchData, data } = useApi(`api/v1/design/user/create/${template?.id}`, 'POST');


  useEffect(() => {
    if(data) {
      toast.success('Template added successfully');

      router.push( `/design/${data?.data?.design?.id}`,
        // query: {type: 'create', width: 600, height: 450},
      );
    }
  }, [data]);

  const addTemplate = async (id) => {
    try {
        // const { data } = await api.post(`/design/add-user-template/${id}`);
        // toast.success('Template added successfully');
        await fetchData({});
        // debugger
        // navigate(`/design/${data?.data?.design?._id}/edit`);
        await router.push({
          pathname: `/design/${data?.data?.design?._id}/edit`,
          // query: {type: 'create', width: 600, height: 450},
        });
        // router.push(`/design/${data?.data?.design?._id}/edit`);
    } catch (e) {
        console.error(e);
        toast.error('Something went wrong');
    }
  }

  return (
    <div
      key={index}
      onClick={() => addTemplate(template._id)}
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