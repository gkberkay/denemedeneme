import {useCallback, useState} from 'react';
import INITIAL_USE_API_STATE from './useApiState';
function useApi(initialState = INITIAL_USE_API_STATE) {
  const [apiState, setApiState] = useState(initialState);
  const makeRequest = useCallback(
    (promise, shouldResetPreviousState = true) => {
      if (shouldResetPreviousState) {
        setApiState({...INITIAL_USE_API_STATE, isRequestPending: true});
      } else {
        setApiState({...apiState, isRequestPending: true});
      }
      promise
        .then(response => {
          setApiState({
            isRequestPending: false,
            isRequestFetched: true,
            data: response.data,
            error: null,
          });
        })
        .catch(error => {
          setApiState({isRequestPending: false, isRequestFetched: true, data: null, error});
        });
      return promise;
    },
    [setApiState]
  );
  return {apiState, setApiState, makeRequest};
}
export {useApi};