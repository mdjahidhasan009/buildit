"use client"


import Header from "../../../components/shared/Header";
import toast from "react-hot-toast";
import * as htmlToImage from "html-to-image";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/reduxStore";
import useApi from "@/utils/useApi";
import {usePathname, useRouter} from "next/navigation";
import React from "react";

export default function HeaderWrapper() {
    const pathname = usePathname();
    const router = useRouter();
    let design_id = pathname.split('/design/')[1] || '';

    const components = useSelector((state: RootState) => state.components.components);
    const { fetchData, data, loading, error } = useApi(`api/v1/designs/user/${design_id}`, 'PUT', "multipart/form-data");

    const saveImage = async () => {
        if(components.length === 0) return toast.error('Please add some components to save the designs');
        let htmlElement = document.getElementById('main_design');
        if(!htmlElement) {
            toast.error('Something went wrong');
            return;
        }

        let image;
        try {
            image = await htmlToImage.toPng(htmlElement, {
                style: {
                    transform: 'scale(1)'
                }
            });
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
        if(components.length === 0) return toast.error('Please add some components to save the designs');

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
      <Header>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <div>
              {pathname.includes('dashboard') && (
                <button
                  onClick={createDesign}
                  className='py-2 px-6 overflow-hidden text-center bg-[#8b3dff] text-white rounded-[3px] font-medium hover:bg-[#9553f8]'
                >
                    Create a Design
                </button>
              )}
              {pathname.includes('design') && (
                <div className="flex justify-center items-center gap-2 text-gray-300">
                    <button
                      disabled={loading}
                      onClick={saveImage}
                      className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm">{loading ? 'Saving...' : 'Save'}</button>
                    <button
                      onClick={downloadImage}
                      className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm">Download
                    </button>
                </div>
              )}
          </div>
      </Header>
    );
}