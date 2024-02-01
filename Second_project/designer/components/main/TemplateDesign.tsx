"use client";

import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/navigation'

import api from "@/utils/useApi.ts";
import toast from "react-hot-toast";
import useApi from "@/utils/useApi.ts";

const TemplateDesign = ({ type }) => {
    const [templates, setTemplates] = useState([]);
    // const navigate = useNavigate();
    const router = useRouter()

    useEffect(() => {
        const getTemplates = async () => {
            try {
                const { data } =  useApi('/design/templates');
                setTemplates(data?.data?.templates);
            } catch (e) {
                console.error(e);
            }
        };

        getTemplates();
    }, []);

    const addTemplate = async (id) => {
        // try {
        //     const { data } = await api.post(`/design/add-user-template/${id}`);
        //     toast.success('Template added successfully');
        //     // navigate(`/design/${data?.data?.design?._id}/edit`);
        //     router.push(`/design/${data?.data?.design?._id}/edit`);
        // } catch (e) {
        //     console.error(e);
        //     toast.error('Something went wrong');
        // }
    }

    return (
        <>
            <div className={`grid gap-2 ${type ? ' grid-cols-2 ' : ' grid-cols-4 mt-5'}`}>
                {
                    templates.map((template: any, index: number) =>
                        (
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
                    )
                }
            </div>
        </>
    )
}

export default TemplateDesign;