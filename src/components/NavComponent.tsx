"use client";
import { FunctionComponent } from "react";

const NavComponent: FunctionComponent = () => {
  return (
    <>
      <div className="max-w-full text-center bg-yellow-600">
        <p>This website uses local storage data!</p>
      </div>
      <div className="p-8 flex flex-row justify-between">
        <div className="text-4xl">
          <h1 className="text-indigo-600 font-extrabold">Todo List </h1>
          <h1 className="px-8 -mt-3 font-regular">serverless.</h1>
        </div>
        <div className="flex flex-row gap-8">
          <button onClick={() => console.log("load data")}>Export Data</button>
          <button onClick={() => console.log("load data")}>Load Data</button>
          <button onClick={() => console.log("reset data")}>Reset Data</button>
        </div>
      </div>
    </>
  );
};

export default NavComponent;
