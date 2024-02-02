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

    const ref = useRef();
    // const { state } = useLocation();
    // const navigate = useNavigate();
    const router = useRouter();
    const type = searchParams.get('type');
    const width = searchParams.get('width');
    const height = searchParams.get('height');

    const { fetchData, data, error } = useApi('api/v1/design/create', 'POST');

    const obj = {
        name: "main_frame",
        type: "rect",
        id: Date.now(),
        height: height,
        width: width,
        zIndex: 1,
        color: '#fff',
        img: ""
    }

    useEffect(() => {
        if(type && ref.current) {
            createDesign();
        } else {
            // navigate('/');
            router.push('/');
        }
    }, [type, ref]);

    const createDesign = async () => {
        // const image = await htmlToImage.toBlob(ref.current);
        const image = await domtoimage.toPng(ref.current);
        const design = JSON.stringify(obj);

        if(image) {
            const formData = new FormData();
            formData.append('design',  design);
            formData.append('image', image);
            try {
                setLoading(true);
                await fetchData(formData);
                // router.push(`/design/${data?.data?.design?._id}/edit`);
                // navigate(`/design/${data?.data?.design?._id}/edit`);
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        }

    }

    return (
        <div className="w-screen h-screen flex justify-center items-center relative">
            <div ref={ref} className="relative w-auto h-auto overflow-auto">
                <CreateComponent info={obj} current_component={{}}/>
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