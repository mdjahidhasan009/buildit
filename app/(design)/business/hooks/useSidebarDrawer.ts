import createComponentFactory from "@/utils/createComponentFactory";
import { addComponent, setCurrentComponent, updateComponent } from "@/lib/features/components/componentsSlice";
import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";

const componentFactory = createComponentFactory();

const useSidebarDrawer = () => {
    const dispatch = useDispatch();
    const components = useSelector((state: RootState) => state.components.components);

    const createShape = (name: string, type: string) => {
        const newComponent = componentFactory({
            name,
            type,
            additionalProps: {
                width: 200,
                height: 150,
            }
        });
        dispatch(addComponent(newComponent));
    };

    const addImage = (image: string) => {
        const newComponent = componentFactory(
            {
                name: 'image',
                type: 'image',
                additionalProps: {
                    width: 200,
                    height: 150,
                    radius: 0,
                    image
                }
            }
        );
        dispatch(addComponent(newComponent));
        dispatch(setCurrentComponent(newComponent));
    };

    const addBackgroundImage = (image: string) => {
        const main_frame = components.find(comp => comp.name === 'main_frame');
        if(!main_frame) return;
        dispatch(updateComponent({ id: main_frame.id, changes: { image } }));
    }

    const addText = (name: string, type: string) => {
        const newComponent = componentFactory(
            {
                name,
                type,
                additionalProps: {
                    width: 200,
                    height: 150,
                    text: 'Add text',
                    fontSize: 22,
                    padding: 6,
                    fontWeight: 400,
                }
            }
        );
        dispatch(setCurrentComponent(newComponent));
        dispatch(addComponent(newComponent));
    };

    return {
        createShape,
        addImage,
        addBackgroundImage,
        addText,
    }
}

export default useSidebarDrawer;