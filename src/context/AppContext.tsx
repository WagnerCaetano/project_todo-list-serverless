"use client";
import { createContext, useReducer, useEffect, useMemo, useContext, Dispatch } from "react";
import { Action, AppReducer, DayListDataState, initialState } from "./appReducer";
import { buildEmptyListData } from "@/service/utils";

export const LocalStorageAppContext = createContext<{ state: DayListDataState; dispatch: Dispatch<Action> }>(null);

export const AppWrapper: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    let localState = null;
    if (typeof window !== "undefined") {
      localState = localStorage.getItem("state");
    }
    const parsedState: DayListDataState =
      localState && localState !== "undefined" ? JSON.parse(localState) : initialState;
    const modifiedState = handleLateDays(parsedState);
    return modifiedState;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("state", JSON.stringify(state));
    }
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

const handleLateDays = (parsedState: DayListDataState): DayListDataState => {
  let qtdLate = 0;
  const oldLength = parsedState.days.length;
  parsedState.days = parsedState.days.map((day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayDate = new Date(day.date);
    if (dayDate < today) {
      qtdLate++;
      day.late = true;
      return day;
    }
    if (dayDate >= today) {
      day.late = false;
      return day;
    }
  });
  parsedState.days = parsedState.days.filter((day) => !day.late || (day.late && day.dayTodoList.length > 0));
  const nextDays = buildEmptyListData(qtdLate, oldLength);
  parsedState.days = [...parsedState.days, ...nextDays.days];
  return parsedState;
};
