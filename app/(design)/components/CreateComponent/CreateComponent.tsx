"use client";

import ShapeComponent from "@/app/(design)/components/CreateComponent/ShapeComponent";
import TextComponent from "@/app/(design)/components/CreateComponent/TextComponent";
import ImageComponent from "@/app/(design)/components/CreateComponent/ImageComponent";
import MainFrameComponent from "@/app/(design)/components/CreateComponent/MainFrameComponent";
import {IDesignComponent} from "@/app/(design)/constants/Design";

const CreateComponent = ({ component } : { component: IDesignComponent }) => {

  if (component.name === 'shape') {
    return <ShapeComponent component={component} />;
  } else if(component.name === 'text') {
    return <TextComponent component={component} />;
  } else if(component.name === 'image') {
    return <ImageComponent component={component} />;
  } else if(component.name === 'main_frame') {
    return <MainFrameComponent component={component} />;
  }
}

export default CreateComponent;