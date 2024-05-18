"use client";

import {useEffect, useState} from "react";

import useApi from "@/utils/useApi";
import DesignCard from "@/components/shared/DesignCard";
import {IComponent} from "@/lib/features/components/IComponent";
import {IDesign} from "@/lib/types";

const Projects = () => {
  const [designs, setDesigns] = useState<IDesign[]>([]);
  const { data: fetchedProjects } = useApi('api/v1/designs/user/designs');

  useEffect(() => {
    if(fetchedProjects?.data?.designs) {
      setDesigns(fetchedProjects?.data?.designs);
    }
  }, [fetchedProjects]);

  return (
    <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full '>
      <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 m-4 w-full`}>
        {
          designs.map((design, index) =>
            <div className="m-2" key={index}>
              <DesignCard key={design.id || index} design={design} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Projects;