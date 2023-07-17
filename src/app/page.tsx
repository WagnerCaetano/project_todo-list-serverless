"use client";
import NavComponent from "@/components/NavComponent";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAppContext } from "@/context/AppContext";
import dynamic from "next/dynamic";

const DayList = dynamic(() => import("../components/DayList"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex flex-1 place-content-center h-screen">
      <LoadingSpinner />
    </div>
  ),
});

export default function Home() {
  const { state, dispatch } = useAppContext();

  return (
    <div className="flex flex-col min-h-full">
      <NavComponent />
      <DayList data={state} />
    </div>
  );
}
