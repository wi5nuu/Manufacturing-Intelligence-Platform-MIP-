import { useEffect, useState } from 'react';

export const useRealtimeMetrics = (topics: string[]) => {
  const [data, setData] = useState<any>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/ws');

    ws.onopen = () => {
      console.log('Connected to MIP WebSocket');
      setConnected(true);
      ws.send(JSON.stringify({ type: 'subscribe', topics }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setData(message);
      } catch (e) {
        console.error('Failed to parse WS message', e);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from MIP WebSocket');
      setConnected(false);
    };

    return () => ws.close();
  }, [JSON.stringify(topics)]);

  return { data, connected };
};
