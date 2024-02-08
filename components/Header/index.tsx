"use client";

import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";
import {useContext, useState} from "react";
import toast from "react-hot-toast";
import * as htmlToImage from 'html-to-image';

import { cn } from "@/lib/cn";
import Home from "./Home";
import Message from "./Message";
import Social from "./Social";
import Help from "./Help";
import Auth from "./Auth";
import {DesignContext} from "@/contexts/DesignProvider";
import useApi from "@/utils/useApi";
import domtoimage from 'dom-to-image';
import { useRouter } from 'next/navigation';

export default function Header({ params }) {
  const { components } = useContext(DesignContext);
  // const [loading, setLoading] = useState(false);
  const { status: sessionStatus } = useSession();
  const pathname = usePathname();
  let design_id = pathname.split('/design/')[1] || '';
  const router = useRouter();

  // const { mutate, data, error } = useApi(`/design/update-design/${design_id}`, 'PUT');
  const { fetchData, data, loading, error } = useApi(`api/v1/design/user/${design_id}`, 'PUT', "multipart/form-data");
  // const { mutate, data, error } = returned;

  const saveImage = async () => {

    const getDiv = document.getElementById('main_design');
    // console.log('getDiv', getDiv);
    let image;
    try {
      // image = await htmlToImage.toPng(getDiv);
      image = await domtoimage.toPng(document.getElementById('main_design'));
    } catch (e) {
      console.log('error while creating image')
      console.log(e);
    }
    // const image = await htmlToImage.toBlob(getDiv);
    // console.log('image', image);

    if(image) {
      const obj = {
        design: components
      }
      const formData = new FormData();
      formData.append('design', JSON.stringify(obj));
      formData.append('image', image);
      try {
        // setLoading(true);
        // const { data } = await useApi(`/design/update-design/${design_id}`, 'PUT', formData);
        // console.log('formData', formData)
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }
        await fetchData(formData);
        // console.log('data', apiData);
        // console.log('error', error);
        toast.success('Design saved successfully');
      } catch (e) {
        console.error(e);
        toast.error('Something went wrong')
      }
      // setLoading(false);
    }
  }

  const downloadImage = async () => {
    const getDiv = document.getElementById('main_design');
    const dataUrl = await htmlToImage.toPng(getDiv, {
      style: {
        transform: 'scale(1)'
      }
    });

    let link = document.createElement('a');
    link.download = 'image';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const createDesign = async () => {

    // await router.push({
    //   pathname: '/design/create',
    //   query: {type: 'create', width: 600, height: 450},
    // });
    router.push('/design/create?type=create&width=600&height=450')

    // navigate('/design/create', {
    //   state: {
    //     type: 'create',
    //     width: 600,
    //     height: 450,
    //   }
    // })
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 items-center justify-between px-[18px] font-medium",
        "border-b border-white/20 bg-black shadow-xl shadow-black/40"
      )}
    >
      <Home />
      <Message />

      {sessionStatus !== "loading" && (
        <div className={cn("flex items-center justify-center")}>
          {pathname.includes('dashboard') && (
            <button
              onClick={createDesign}
              className='py-2 px-6 overflow-hidden text-center bg-[#8b3dff] text-white rounded-[3px] font-medium hover:bg-[#9553f8]'>
                Create a Design
            </button>
          )}

          {pathname.includes('design') && (
            <div className="flex justify-center items-center gap-2 text-gray-300">
              <button disabled={loading} onClick={saveImage}
                      className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm">{loading ? 'Saving...' : 'Save'}</button>
              <button onClick={downloadImage}
                      className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm">Download
              </button>
            </div>
          )}
          <Social/>
          <Help/>
          <Auth/>
        </div>
      )}
    </header>
  );
}
