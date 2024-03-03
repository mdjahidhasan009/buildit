"use client";

import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import * as htmlToImage from 'html-to-image';

import { cn } from "@/lib/cn";
import Home from "./Home";
import Message from "./Message";
import Social from "./Social";
import Help from "./Help";
import Auth from "./Auth";
import useApi from "@/utils/useApi";
import domtoimage from 'dom-to-image';
import { useRouter } from 'next/navigation';
import {useSelector} from "react-redux";
import {RootState} from "@/lib/reduxStore";

export default function Header() {
  const components = useSelector((state: RootState) => state.components.components);

  const { status: sessionStatus } = useSession();
  const pathname = usePathname();
  let design_id = pathname.split('/design/')[1] || '';
  const router = useRouter();

  const { fetchData, data, loading, error } = useApi(`api/v1/design/user/${design_id}`, 'PUT', "multipart/form-data");

  const saveImage = async () => {
    if(components.length === 0) return toast.error('Please add some components to save the design');
    let htmlElement = document.getElementById('main_design');
    if(!htmlElement) {
      toast.error('Something went wrong');
      return;
    }

    let image;
    try {
      image = await domtoimage.toPng(htmlElement);
      if(!image) return toast.error('Something went wrong');
    } catch (e) {
      console.error('error while creating image')
      console.error(e);
    }

    if(image) {
      const obj = {
        design: components
      }
      const formData = new FormData();
      formData.append('design', JSON.stringify(obj));
      formData.append('image', image);
      try {
        await fetchData(formData);
        toast.success('Design saved successfully');
      } catch (e) {
        console.error(e);
        toast.error('Something went wrong')
      }
    }
  }

  const downloadImage = async () => {
    if(components.length === 0) return toast.error('Please add some components to save the design');

    const getDiv = document.getElementById('main_design');
    if(!getDiv) return toast.error('Something went wrong');

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
    router.push('/design/create?type=create&width=600&height=450');
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
