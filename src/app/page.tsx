"use client";
import NavComponent from "@/components/NavComponent";
import { DayListData } from "../../@types/schema";
import DayList from "../components/DayList";
import { buildEmptyListData } from "@/service/utils";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const { state, dispatch } = useAppContext();

  return (
    <div className="flex flex-col min-h-full">
      <NavComponent />
      <DayList data={state} />
    </div>
  );
}
