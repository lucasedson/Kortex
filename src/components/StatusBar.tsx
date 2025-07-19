import { useState, useEffect } from 'react';
import { core } from '@tauri-apps/api';
interface StatusBarProps {
  projectName: string;
  statusMessage?: string; // New prop for custom messages
}

export const StatusBar = ({ projectName, statusMessage }: StatusBarProps) => {

  const hello: any = async() => {
    return await core.invoke('hello');
  }
  const [helloMessage, setHelloMessage] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    hello().then((message: string) => {
      setHelloMessage(message);
    })
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 py-1 bg-gray-200 dark:bg-gray-800 text-sm">
      <div>
        <span>Projeto: {projectName}</span>
        {statusMessage && <span className="ml-4 text-gray-600 dark:text-gray-400">{statusMessage}</span>}
      </div>
      <div>
        <span>{helloMessage}</span>
      </div>
      <div>
        <span>{time.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};