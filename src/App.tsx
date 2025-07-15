import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import TiptapEditor from "./component/Editor";

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
        <aside className="bg-gray-50 min-w-[300px] border-black mx-auto rounded-xl min-h-[400px]">
          
        </aside>
        <main className="p-4 bg-white items-start w-full  border-black mx-auto rounded-xl min-h-[400px]">

          <TiptapEditor/>  

        </main>

      </div>
    </main>
  );
}

export default App;
