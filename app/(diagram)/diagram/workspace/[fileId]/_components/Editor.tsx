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
import {useDispatch, useSelector} from "react-redux";
import { setEditorData } from '@/lib/features/diagram/diagramSlice';
import {RootState} from "@/lib/reduxStore";

function Editor() {
  const editorData = useSelector((state: RootState) => state?.diagram?.editorData);
  const editorRef = useRef<EditorJS>();

  const dispatch = useDispatch();

  useEffect(()=> {
    if(!editorRef.current) {
      initEditor();
    }
  },[])

  const initEditor= ()=> {
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

      holder: 'editorjs',
      data: editorData
    });

    editorRef.current = editor;
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