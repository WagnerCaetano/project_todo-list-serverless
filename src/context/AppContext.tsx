"use client";
import { createContext, useReducer, useEffect, useMemo, useContext, Dispatch } from "react";
import { Action, AppReducer, DayListDataState, initialState } from "./appReducer";

export const LocalStorageAppContext = createContext<{ state: DayListDataState; dispatch: Dispatch<Action> }>(null);

export const AppWrapper: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const localState = localStorage.getItem("state");
    return localState && localState !== "undefined" ? JSON.parse(localState) : initialState;
  });

  useEffect(() => {
    console.log(state);
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const contextValue = useMemo<{ state: DayListDataState; dispatch: Dispatch<Action> }>(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return <LocalStorageAppContext.Provider value={contextValue}>{children}</LocalStorageAppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(LocalStorageAppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
};
