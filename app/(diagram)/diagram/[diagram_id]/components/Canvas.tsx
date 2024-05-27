import React, { useCallback, useRef, useState } from 'react'
import { Excalidraw, MainMenu, WelcomeScreen, getSceneVersion } from "@excalidraw/excalidraw";
import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import { setDiagramData } from "@/lib/features/diagram/diagramSlice";
import { debounce } from "@/lib/debounce";

function Canvas() {
  const [whiteBoardData,setWhiteBoardData] = useState<any>();
  const elements = useSelector((state: RootState) => state?.diagram?.diagramData?.elements) || [];

  const dispatch = useDispatch();
  const sceneVersionRef = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(debounce((excalidrawElements: any, appState: any) => {
    // Your logic for handling changes to the elements, for example:
      const clonedElements = JSON.parse(JSON.stringify(excalidrawElements));
      // const clonedAppState = JSON.parse(JSON.stringify(appState));

      dispatch(setDiagramData({ data: { elements:  clonedElements } }));
      // setWhiteBoardData({ data: clonedElements });
  }, 500), [dispatch]);



    return (
    <div style={{ height: "calc(100vh - 65px)" }}>
      {/*{fileData */}
      {/*  && */}
          <Excalidraw
            // ref={excalidrawRef}
            //   onMount={(instance) => { excalidrawRef.current = instance; }}
            theme='dark'
            initialData={{
              // elements:fileData?.whiteboard&&JSON.parse(fileData?.whiteboard
                //@ts-ignore
               elements
            }}
            onChange={(elements, appState, files) => {
              //On mouse event(also at hover) this onChange get called that's why comparing the sceneVersion before updating
              //https://github.com/excalidraw/excalidraw/issues/7684, https://github.com/excalidraw/excalidraw/issues/3152
                const currentSceneVersion = getSceneVersion(elements);
                if(sceneVersionRef.current !== currentSceneVersion) {
                    debouncedOnChange(elements, appState);
                }
                sceneVersionRef.current = currentSceneVersion;
            }}

            UIOptions={{
              canvasActions:{
                saveToActiveFile:false,
                loadScene:false,
                export:false,
                toggleTheme:true
              }
          }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas/>
          <MainMenu.DefaultItems.SaveAsImage/>
          <MainMenu.DefaultItems.ChangeCanvasBackground/>
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint/>
          <WelcomeScreen.Hints.MenuHint/>
          <WelcomeScreen.Hints.ToolbarHint/>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.MenuItemHelp/>
          </WelcomeScreen.Center>
        </WelcomeScreen>
      </Excalidraw>
    {/*}*/}
    </div>
  )
}

export default Canvas