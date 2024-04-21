"use client";

import {FC, useEffect, useState} from "react";
import DesignCard from "../../../components/shared/DesignCard";
import useApi from "../../../utils/useApi";
import {IComponent} from "@/lib/features/components/IComponent";


interface Design {
  id: string;
  userId: string;
  components: IComponent[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsProps {
  type: string;
  designId: string;
}

interface ProjectsProps {
  type: string;
  designId: string;
}

const Projects: FC<ProjectsProps> = ({ type, designId }) => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const { data } = useApi('api/v1/designs/user/designs', 'GET');

  useEffect(() => {
    if(data) {
      setDesigns(data?.data?.designs);
    }
  }, [data]);


  return (
    <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full '>
      <div className={`grid  ${type ? ' grid-cols-2 ' : ' grid-cols-4 ' } gap-2 mt-5 w-full`}>
        {
          designs.map((design, index) =>
              design.id !== designId &&
                <DesignCard key={index} design={design} type={type} />
          )
        }
      </div>
    </div>
  )
}

export default Projects;