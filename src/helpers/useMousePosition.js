import { useEffect, useState } from "react";
import { throttle } from 'lodash';

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", throttle(setFromEvent, 100));

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};