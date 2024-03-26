"use client";

import {useEffect, useRef, useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as htmlToImage from 'html-to-image';
import RotateLoader from "react-spinners/RotateLoader";

import CreateComponent from "@/components/CreateComponent";
import useApi from "@/utils/useApi";
import domtoimage from "dom-to-image";

const CreateDesign = () => {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams()

    const divRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const type = searchParams.get('type');
    const width = parseInt((searchParams.get('width') || '0'));
    const height = parseInt((searchParams.get('height') || '0'));

    const { fetchData, data, error } = useApi('api/v1/design/user/create', 'POST');

    const obj = {
        name: "main_frame",
        type: "rect",
        id: Date.now(),
        height: height,
        width: width,
        zIndex: 1,
        color: '#fff',
        image: ""
    }

    useEffect(() => {
        if(type && divRef.current) {
            createDesign();
        } else {
            // navigate('/');
            router.push('/');
        }
    }, [type, divRef]);

    useEffect(() => {
        if(data?.data?.design?.id) {
            router.push(`/design/${data?.data?.design?.id}`);
        }
    }, [data]);

    const createDesign = async () => {
        if(!divRef.current) return;

        const image = await domtoimage.toPng(divRef.current as HTMLElement);
        const design = JSON.stringify(obj);

        if(image) {
            const formData = new FormData();
            formData.append('design',  design);
            formData.append('image', image);
            try {
                setLoading(true);
                await fetchData(formData);
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        }

    }

    return (
        <div className="w-screen h-screen flex justify-center items-center relative">
            <div ref={divRef} className="relative w-auto h-auto overflow-auto">
                <CreateComponent component={obj} />
            </div>
            {
                loading &&
                <div
                    className='left-0 top-0 w-full h-full flex justify-center items-center bg-black absolute'
                >
                    <RotateLoader color='white' />
                </div>
            }
        </div>
    )
};

export default CreateDesign;