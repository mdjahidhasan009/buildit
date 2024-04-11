"use client"
import React, { useEffect, useRef, useState } from 'react'

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


// const EditorJS = dynamic(() => import("@editorjs/editorjs"), { ssr: false });
// const Header = dynamic(() => import('@editorjs/header'), { ssr: false });
// const List = dynamic(() => import("@editorjs/list"), { ssr: false });
// const Checklist = dynamic(() => import('@editorjs/checklist'), { ssr: false });
// const Paragraph = dynamic(() => import('@editorjs/paragraph'), { ssr: false });
// const Warning = dynamic(() => import('@editorjs/warning'), { ssr: false });

// Dynamically import EditorJS and its tools with SSR set to false
// const EditorJS = dynamic(() => import('@editorjs/editorjs'), { ssr: false });
// const Header = dynamic(() => import('@editorjs/header'), { ssr: false });
// const List = dynamic(() => import("@editorjs/list"), { ssr: false });
// const Checklist = dynamic(() => import('@editorjs/checklist'), { ssr: false });
// const Paragraph = dynamic(() => import('@editorjs/paragraph'), { ssr: false });
// const Warning = dynamic(() => import('@editorjs/warning'), { ssr: false });

// // Dynamically import EditorJS and its tools with SSR set to false
// const EditorJS = dynamic(() => import('@editorjs/editorjs').then((mod) => mod.default), { ssr: false });
// const Header = dynamic(() => import('@editorjs/header').then((mod) => mod.default), { ssr: false });
// const List = dynamic(() => import("@editorjs/list").then((mod) => mod.default), { ssr: false });
// const Checklist = dynamic(() => import('@editorjs/checklist').then((mod) => mod.default), { ssr: false });
// const Paragraph = dynamic(() => import('@editorjs/paragraph').then((mod) => mod.default), { ssr: false });
// const Warning = dynamic(() => import('@editorjs/warning').then((mod) => mod.default), { ssr: false });

import {useDispatch, useSelector} from "react-redux";
import { setEditorData } from '@/lib/features/diagram/diagramSlice';
import {RootState} from "@/lib/reduxStore";
import dynamic from "next/dynamic";

const Editor = ()  => {
  const editorData = useSelector((state: RootState) => state?.diagram?.editorData);
  const editorRef = useRef<EditorJS>();

  const dispatch = useDispatch();
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ")

  useEffect(()=> {

    console.log(editorRef)
    console.log(document.getElementById('editorjs'))
    if(!editorRef.current) {
      initEditor();
    }

    // Cleanup editor on component unmount
    return () => {
      console.log('------------------------------------------------')
      console.log(editorRef.current)
      if (editorRef.current &&  editorRef.current?.destroy) {
        // editorRef.current.destroy();
        console.log('destoryed-----------------------------------------------------------------------------------')
        // editorRef.current = undefined;
      }
      // editorRef.current = undefined;
    };
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
          console.log("Editor.js is ready to work!");
          console.log(editor);
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
          console.log('Article data: ', outputData);
          dispatch(setEditorData({ data: outputData }))
          // updateDocument({
          //   _id:fileId,
          //   document:JSON.stringify(outputData)
          // }).then(resp=>{
          //
          //   toast('Document Updated!')
          //
          // },(e)=>{
          //   toast("Server Error!")
          // })
        }).catch((error) => {
          console.log('Saving failed: ', error)
        });
      // }
    }
  }


  return (
    <div>
      <div id='editorjs' className='ml-10'></div>
    </div>
  )
}

export default Editor