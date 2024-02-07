"use client";

import {useEffect, useState} from "react";

import useApi from "@/utils/useApi";
import DesignCard from "@/components/shared/DesignCard";

const Projects = ({ type, designId }) => {
  const [designs, setDesigns] = useState([]);

  const { data: fetchedPropjects } = useApi('api/v1/design/user-designs');

  useEffect(() => {
    if(fetchedPropjects) {
      setDesigns(fetchedPropjects?.data?.designs);
    }
  }, [fetchedPropjects]);

  return (
    <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full '>
      <div className={`grid  ${type ? ' grid-cols-2 ' : ' grid-cols-4 ' } gap-2 mt-5 w-full`}>
        {
          designs.map((design, index) =>
            <DesignCard key={index} design={design} type={type} />
          )
        }
      </div>
    </div>
  )
}

export default Projects;