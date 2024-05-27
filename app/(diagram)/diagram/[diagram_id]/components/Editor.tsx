"use client"
import React, { useEffect, useRef } from 'react'

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import Checklist from '@editorjs/checklist'
//@ts-ignore
import Paragraph from '@editorjs/paragraph';
//@ts-ignore
import Warning from '@editorjs/warning';

import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import { setEditorData } from '@/lib/features/diagram/diagramSlice';

const Editor = ()  => {
  const editorData = useSelector((state: RootState) => state?.diagram?.editorData);
  const editorRef = useRef<EditorJS>();

  const dispatch = useDispatch();

  useEffect(()=> {
    if(!editorRef.current) {
      initEditor();
    }
  },[])

  const initEditor = ()=> {
    try {
      const editor = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */

        tools:{
          header: {
            //@ts-ignore
            class: Header,
            shortcut: 'CMD+SHIFT+H',
            config:{
              placeholder:'Enter a Header'
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          paragraph: Paragraph,
          warning: Warning,
        },
        onChange: (api, event) => {
          handleOnChangeDocument();
        },
        autofocus: true,
        onReady: () => {
          // console.log("Editor.js is ready to work!");
          // console.log(editor);
        },

        holder: 'editorjs',
        //@ts-ignore
        data: editorData
      });

      editorRef.current = editor;
    } catch(e) {
      console.error("EditorJS error");
      console.error(e);
    }
  }

  const handleOnChangeDocument = ()=>{
    if(editorRef.current)
    {
      editorRef.current?.save().then((outputData) => {
          dispatch(setEditorData({ data: outputData }))
        }).catch((error) => {
          console.error('Saving failed: ', error)
        });
    }
  }


  return (
    <div>
      <div id='editorjs' className='ml-5'></div>
    </div>
  )
}

export default Editor