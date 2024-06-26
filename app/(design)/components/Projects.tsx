"use client";

import {FC, useEffect, useState} from "react";
import DesignCard from "../../../components/shared/DesignCard";
import useApi from "../../../utils/useApi";
import {IDesign} from "@/app/(design)/constants/Design";

interface ProjectsProps {
  designId: string;
}

const Projects: FC<ProjectsProps> = ({ designId }) => {
  const [designs, setDesigns] = useState<IDesign[]>([]);
  const { data } = useApi('api/v1/designs/user/designs', 'GET');

  useEffect(() => {
    if(data) {
      setDesigns(data?.data?.designs);
    }
  }, [data]);


  return (
    <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full '>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-1 mt-5 w-full min-h-[200px]`}>
        {
          designs.map((design, index) =>
              design.id.toString() !== designId &&
                <DesignCard key={index} design={design} />
          )
        }
      </div>
    </div>
  )
}

export default Projects;