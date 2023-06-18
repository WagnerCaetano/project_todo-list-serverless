"use client";
import { FunctionComponent, createContext, useContext, useMemo, useReducer, useEffect } from "react";
import { AppReducer, initialState } from "./AppReducer";

export const LocalStorageAppContext = createContext<any>(null);

export const AppWrapper: FunctionComponent<any> = ({ children }) => {
  const { state, dispatch }: any = useReducer<any>(AppReducer, initialState);

  useEffect(() => {
    const localStorageState = localStorage.getItem("state")!;
    if (!!localStorageState !== undefined && JSON.parse(localStorageState)) {
      dispatch({
        type: "init_stored",
        value: JSON.parse(localStorage.getItem("state")!),
      });
    }
  }, []);
  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem("state", JSON.stringify(state));
    }
  }, [state]);

  const contextValue = useMemo(() => {
    return [state, dispatch];
  }, [state, dispatch]);

  return <LocalStorageAppContext.Provider value={contextValue}>{children}</LocalStorageAppContext.Provider>;
};

export function useAppContext() {
  return useContext(LocalStorageAppContext);
}
