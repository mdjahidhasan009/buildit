import {useEffect, useRef, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import * as htmlToImage from 'html-to-image';
import RotateLoader from "react-spinners/RotateLoader";

import api from "../utils/api";
import CreateComponent from "./CreateComponent.tsx";

const CreateDesign = () => {
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const { state } = useLocation();
  const navigate = useNavigate();

  const obj = {
    name: "main_frame",
    type: "rect",
    id: Math.floor(Math.random() * 100 + 1),
    height: state.height,
    width: state.width,
    zIndex: 1,
    color: 'green',
    img: ""
  }

  useEffect(() => {
    if(state && ref.current) {
      createDesign();
    } else {
      navigate('/');
    }
  }, [state, ref]);

  const createDesign = async () => {
    const image = await htmlToImage.toBlob(ref.current);
    const design = JSON.stringify(obj);

    if(image) {
      const formData = new FormData();
      formData.append('design', design);
      formData.append('image', image);
      try {
        setLoading(true);
        const { data } = await api.post('/design/create', formData);
        navigate(`/design/${data?.data?.design?._id}/edit`);
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