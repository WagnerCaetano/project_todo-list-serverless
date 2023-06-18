"use client";
import NavComponent from "@/components/NavComponent";
import { DayListData } from "../../@types/schema";
import DayList from "../components/DayList";
import { buildEmptyListData } from "@/service/utils";

export const LocalStorageKey = "todo-list";

export default function Home() {
  const dayListData: DayListData = buildEmptyListData();

  return (
    <div className="flex flex-col min-h-full">
      <NavComponent />
      <DayList data={dayListData} />
    </div>
  );
}
