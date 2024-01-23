// import Header from "../components/Header.tsx";
import {useContext, useEffect} from "react";
// import {useParams} from "react-router-dom";
import api from "../utils/api.ts";
import SideBar from "../components/main/SideBar.tsx";
import {DesignContext} from "../context/DesignProvider.tsx";
import SideBarDrawer from "../components/main/SideBarDrawer.tsx";
import DesignPlayground from "../components/main/DesignPlayground.tsx";
import ComponentPropertiesPanel from "../components/main/ComponentPropertiesPanel.tsx";

const Main = () => {

  const { design_id } = useParams<{ design_id: string }>();

  const { setCurrentComponent, components, setComponents, moveElement, resizeElement, rotateElement, removeBackground }
    = useContext(DesignContext);

  useEffect(() => {
    const getDesign = async () => {
      try {
        const { data } = await api.get(`/design/user-design/${design_id}`);
        const { design } = data?.data;

        for(let i = 0; i < design.length; i++) {
          design[i].setCurrentComponent = (a) => setCurrentComponent(a);
          design[i].moveElement = moveElement;
          design[i].resizeElement = resizeElement;
          design[i].rotateElement = rotateElement;
          design[i].removeBackground = removeBackground;
        }
        setComponents(design);
      } catch (e) {
        console.log(e);
      }
    }

    getDesign();
  }, [design_id]);

  return (
    <div className="min-w-screen h-screen bg-black">
      {/*<Header components={components} design_id={design_id} />*/}
      <div className='flex h-[calc(100%-60px)] w-screen'>
        <SideBar/>
        <div className='h-full w-[calc(100%-75px)]'>
          <SideBarDrawer />
          <div className='w-full flex h-full'>
            <DesignPlayground />
            <ComponentPropertiesPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;