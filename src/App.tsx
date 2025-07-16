import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import TiptapEditor from "./component/Editor";
import { NewProjectForm } from "./component/NewProjectForm";
import { Sidebar } from "./component/Sidebar";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="flex flex-col min-h-screen bg-white text-zinc-900">
      <h1>Welcome to Kortex!</h1>
      <div className="flex flex-row w-full border-black mx-auto rounded-xl min-h-[80vh] p-4">
      
        <div className="top-0 left-0 z-50 h-full">

        <Sidebar/>
        </div>
        <main className="p-4 bg-white items-start w-full  border-black mx-auto rounded-xl min-h-[400px]">

          <TiptapEditor/>  

        </main>

      </div>
    </main>
  );
}

export default App;
