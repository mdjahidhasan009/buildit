// import { AppState } from "@/lib/types";
// import { useEffect, useRef } from "react";
// import isEqual from "lodash.isequal";
// import useApi from "@/utils/useApi";
// import {useDispatch, useSelector} from "react-redux";
// import {update} from "@/lib/features/snippet/snippetSlice";
//
// export default function ChangeListener() {
//   const dispatch = useDispatch();
//   const prevState = useRef<AppState | null>(null);
//   const pendingSave = useRef<boolean>(false);
//
//   // const state = useStore((state) => state.getAppState());
//   const state = useSelector((state) => state.snippet);
//   // const update = useStore((state) => state.update);
//
//   const { fetchData: updateSnippet, data: updatedSnippet, error: updateError } = useApi("/api/v1/snippets", "PATCH");
//
//   const handleStateChange = () => {
//     if (!isEqual(prevState.current, state)) {
//       if (!pendingSave.current) {
//         // update("message", "PENDING");
//         dispatch(update({ type: "message", value: "PENDING" }));
//         pendingSave.current = true;
//       }
//
//       const timeout = setTimeout(() => {
//         if (!isEqual(prevState.current, state)) {
//           prevState.current = state;
//
//           updateSnippet(state);
//         }
//
//         pendingSave.current = false;
//       }, 3000);
//
//       return () => {
//         clearTimeout(timeout);
//       };
//     } else if (pendingSave.current) {
//       // update("message", "IDLE");
//       dispatch(update({ type: "message", value: "IDLE" }));
//
//       pendingSave.current = false;
//     }
//   };
//
//   useEffect(() => {
//     if (prevState.current === null) {
//       prevState.current = state;
//     } else {
//       const cleanup = handleStateChange();
//
//       if (cleanup) {
//         return cleanup;
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [state, updatedSnippet]);
//
//   useEffect(() => {
//     if (updateError) {
//       // update("message", "ERROR");
//       dispatch(update({ type: "message", value: "ERROR" }));
//
//       pendingSave.current = false;
//     }
//   }, [updateError]);
//
//   useEffect(() => {
//     if (updatedSnippet) {
//       // update("message", "SUCCESS");
//       dispatch(update({ type: "message", value: "SUCCESS" }));
//       pendingSave.current = false;
//     }
//   }, [updatedSnippet]);
//
//   return null;
// }

import { useEffect, useRef } from "react";
import {update} from "@/lib/features/snippet/snippetSlice";
import {debounce} from "@/lib/debounce";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "@/lib/types";
import useApi from "@/utils/useApi";
import isEqual from 'lodash.isequal';
// import debounce from wherever you have it defined if not defined in this file

export default function ChangeListener() {
  const dispatch = useDispatch();
  const prevState = useRef<AppState | null>(null);
  const pendingSave = useRef<boolean>(false);
  const state = useSelector((state) => state.snippet);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  const { fetchData: updateSnippet, data: updatedSnippet, error: updateError } = useApi("/api/v1/snippets", "PATCH");

  // Debounce handleStateChange function
  const debouncedHandleStateChange = useRef(
    debounce((state) => {
      if (!isEqual(prevState.current, state)) {

        if (!pendingSave.current) {
          dispatch(update({ type: "message", value: "PENDING" }));
          pendingSave.current = true;
        }

        timeOutRef.current = setTimeout(() => {
          if (!isEqual(prevState.current, state)) {
            prevState.current = state;
            updateSnippet(state);
          }

          pendingSave.current = false;
        }, 3000);

        return () => {
          clearTimeout(timeOutRef.current as NodeJS.Timeout);
        };
      } else if (pendingSave.current) {
        dispatch(update({ type: "message", value: "IDLE" }));
        pendingSave.current = false;
      }
    }, 2500) // Adjust debounce delay as needed
  ).current;

  useEffect(() => {
    // Initialize prevState on the first render
    if (prevState.current === null) {
      prevState.current = state;
    } else {
      debouncedHandleStateChange(state);
    }

    return (() => {
      clearTimeout(debouncedHandleStateChange as NodeJS.Timeout);
    })
  }, [state]);

  useEffect(() => {
    if (updateError) {
      dispatch(update({ type: "message", value: "ERROR" }));
      pendingSave.current = false;
    }
  }, [updateError]);

  useEffect(() => {
    if (updatedSnippet) {
      dispatch(update({ type: "message", value: "SUCCESS" }));
      pendingSave.current = false;
    }
  }, [updatedSnippet]);

  return null;
}

