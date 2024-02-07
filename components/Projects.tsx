"use client";

import {useEffect, useState} from "react";
import api from "../utils/useApi.ts";
import DesignCard from "./shared/DesignCard.tsx";
import toast from "react-hot-toast";
import useApi from "../utils/useApi.ts";

const Projects = ({ type, designId }) => {
  const [designs, setDesigns] = useState([]);
  const { data } = useApi('api/v1/design/user-designs', 'GET');

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
                <DesignCard key={index} design={design} type={type} setDesigns={setDesigns} />
          )
        }
      </div>
    </div>
  )
}

export default Projects;