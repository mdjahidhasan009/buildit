"use client";

import React, {useEffect, useState} from 'react'
import 'react-multi-carousel/lib/styles.css';
import useApi from "@/utils/useApi";
import CardSlider from "@/components/Carousel/CardSlider";
import DesignCard from "@/components/shared/DesignCard";
import {IDesign} from "@/app/(design)/constants/Design";

const Page = () => {
  const [designs, setDesigns] = useState<IDesign[]>([]);

  const { data, loading } = useApi('api/v1/designs/user/designs', 'GET');

  useEffect(() => {
    if(data?.data?.designs) {
      let firstThreeDesigns = data.data.designs.slice(0, 3);
      setDesigns(firstThreeDesigns);
    }
  }, [data]);

  return (
    <div className='w-full'>
      <div
        className='w-full flex justify-center items-center h-[150px] bg-gradient-to-r from-[#4c76cf] to-[#552ab8] relative rounded-md overflow-hidden'>
        <div>
          <h2 className='text-3xl pb-10 pt-6 font-semibold text-white'>What will you design today?</h2>
        </div>
      </div>
      <div>
        <h2 className='text-xl py-6 font-semibold text-white'>Your recent designs</h2>
        <div className="h-[40vh] ">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CardSlider>
                {designs.map((design, index) => (
                  <DesignCard design={design} key={design?.id} />
                ))}
            </CardSlider>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page