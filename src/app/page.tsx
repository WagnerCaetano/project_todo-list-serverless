"use client";
import NavComponent from "@/components/NavComponent";
import DayList from "../components/DayList";
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
