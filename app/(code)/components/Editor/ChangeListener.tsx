import { useEffect, useRef } from "react";
import {update} from "@/lib/features/snippet/snippetSlice";
import {debounce} from "@/lib/debounce";
import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import {AppState} from "@/lib/types";
import useApi from "@/utils/useApi";
import isEqual from 'lodash.isequal';

export default function ChangeListener() {
  const dispatch = useDispatch();
  const prevState = useRef<AppState | null>(null);
  const pendingSave = useRef<boolean>(false);
  const state = useSelector((state: RootState) => state.snippet);

  const { fetchData: updateSnippet, data: updatedSnippet, error: updateError } = useApi("/api/v1/snippets", "PATCH");

  // Debounce handleStateChange function
  const debouncedHandleStateChange = useRef(
    debounce((state: AppState) => {
      if (!isEqual(prevState.current, state)) {

        if (!pendingSave.current) {
          dispatch(update({ type: "message", value: "PENDING" }));
          pendingSave.current = true;
        }

          if (!isEqual(prevState.current, state)) {
            prevState.current = state;
            updateSnippet(state)
              .then(() => {})
              .finally(() => {
                pendingSave.current = false;
              })
              .catch(() => {})
          }
      } else if (pendingSave.current) {
        dispatch(update({ type: "message", value: "IDLE" }));
        pendingSave.current = false;
      }
    }, 2500)
  ).current;



  useEffect(() => {
    // Initialize prevState on the first render
    if (prevState.current === null) {
      prevState.current = state;
    } else {
      debouncedHandleStateChange(state);
    }
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

