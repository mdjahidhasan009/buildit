"use client";

import {useEffect, useState} from "react";
import api from "../utils/useApi.ts";
import Item from "./Home/Item.tsx";
import toast from "react-hot-toast";

const Projects = ({ type, designId }) => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    getUserDesigns();
  }, []);

  const getUserDesigns = async () => {
    try {
      const { data } = await api.get('/design/user-designs');
      setDesigns(data?.data?.designs);
    } catch (e) {
      console.error(e);
    }
  }

  const deleteDesign = async (id) => {
    try {
      await api.delete(`/design/delete-user-image/${id}`);
      setDesigns(designs.filter(design => design._id !== id));
      toast.success('Design deleted successfully');
      // getUserDesigns();
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  }

  return (
    <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full '>
      <div className={`grid  ${type ? ' grid-cols-2 ' : ' grid-cols-4 ' } gap-2 mt-5 w-full`}>
        {
          designs.map((design, index) =>
              design._id !== designId &&
                <Item key={index} design={design} type={type} deleteDesign={deleteDesign} />
          )
        }
      </div>
    </div>
  )
}

export default Projects;