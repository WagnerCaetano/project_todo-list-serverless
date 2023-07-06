"use client";
import NavComponent from "@/components/NavComponent";
import { DayListData } from "../../@types/schema";
import DayList from "../components/DayList";
import { buildEmptyListData } from "@/service/utils";
import { useAppContext } from "@/context/AppContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const { state, dispatch } = useAppContext();

  return (
    <div className="flex flex-col min-h-full">
      <NavComponent />
      <DndProvider backend={HTML5Backend}>
        <DayList data={state} />
      </DndProvider>
    </div>
  );
}
