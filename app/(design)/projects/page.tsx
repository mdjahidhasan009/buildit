"use client";

import {useEffect, useState} from "react";

import useApi from "@/utils/useApi";
import DesignCard from "@/components/shared/DesignCard";
import {IComponent} from "@/lib/features/components/IComponent";
import {IDesign} from "@/lib/types";

const Projects = () => {
  const [designs, setDesigns] = useState<IDesign[]>([]);
  const { data: fetchedPropjects } = useApi('api/v1/designs/user/designs');
  let type = '';

  useEffect(() => {
    if(fetchedPropjects?.data?.designs) {
      setDesigns(fetchedPropjects?.data?.designs);
    }
  }, [fetchedPropjects]);

  return (
    <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full '>
      <div className={`grid  ${type ? ' grid-cols-2 ' : ' grid-cols-4 ' } gap-2 mt-5 w-full`}>
        {
          designs.map((design, index) =>
            <DesignCard key={design.id || index} design={design} type={type} />
          )
        }
      </div>
    </div>
  )
}

export default Projects;