import { useEffect, useRef } from "react";
import {update} from "@/lib/features/snippet/snippetSlice";
import {debounce} from "@/lib/debounce";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "@/lib/types";
import useApi from "@/utils/useApi";
import isEqual from 'lodash.isequal';
import {RootState} from "@/lib/reduxStore";

export default function ChangeListener() {
  const dispatch = useDispatch();
  const prevState = useRef<AppState | null>(null);
  const pendingSave = useRef<boolean>(false);
  const state = useSelector((state: RootState) => state.snippet);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  const { fetchData: updateSnippet, data: updatedSnippet, error: updateError } = useApi("/api/v1/snippets", "PATCH");

  // Debounce handleStateChange function
  const debouncedHandleStateChange = useRef(
    debounce((state: AppState) => {
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
      // clearTimeout(debouncedHandleStateChange as NodeJS.Timeout);
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = null; // Reset the ref after clearing the timeout
      }
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

