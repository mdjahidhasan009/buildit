"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist'
import Paragraph from '@editorjs/paragraph';
import Warning from '@editorjs/warning';
// import { useMutation } from 'convex/react';
// import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';
import {useDispatch} from "react-redux";
import { setEditorData } from '@/lib/features/diagram/diagramSlice';

const rawDocument={
  "time" : 1550476186479,
  "blocks" : [{
    data:{
      text:'Document Name',
      level:2
    },
    id:"123",
    type:'header'
  },
    {
      data:{
        level:4
      },
      id:"1234",
      type:'header'
    }],
  "version" : "2.8.1"
}
function Editor({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) {
  const ref=useRef<EditorJS>();
  // const updateDocument=useMutation(api.files.updateDocument);
  const [document,setDocument]=useState(rawDocument);

  const dispatch = useDispatch();

  useEffect(()=>{
    // fileData&&
    console.log('initializing editor')
    console.log(ref.current)
    if(!ref.current) {
      initEditor();
    }
  },[fileData])

  useEffect(()=>{
    console.log("triiger Value:", onSaveTrigger);
    onSaveTrigger && onSaveDocument();
  },[onSaveTrigger])

  const initEditor=()=>{
    const editor = new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */

      tools:{
        header: {
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
        onSaveDocument();
      },

      holder: 'editorjs',
      // data:fileData?.document?JSON.parse(fileData.document):rawDocument
    });

    ref.current = editor;
  }

  const onSaveDocument=()=>{
    if(ref.current)
    {
      // if (ref.current instanceof EditorJS) {
        console.log('instance of editorjs')
        ref.current.save().then((outputData) => {
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
      <div id='editorjs' className='ml-20'></div>
    </div>
  )
}

export default Editor