"use client";

import {useEffect, useState} from "react";

import useApi from "@/utils/useApi";
import ProjectItem from "@/components/projects/ProjectItem";

const Projects = ({ type, designId }) => {
  const [designs, setDesigns] = useState([]);
  const { data } = useApi('api/v1/design/user-designs');

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
            <ProjectItem design={design} type={type} key={index} designId={designId} />
          )
        }
      </div>
    </div>
  )
}

export default Projects;