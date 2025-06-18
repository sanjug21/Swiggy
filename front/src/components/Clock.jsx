import React, { use, useEffect,useState } from 'react'

function Clock() {

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const timer = setInterval(() => {
            
            setTime(new Date().toLocaleTimeString());
            
        }, 1000);

        return () => clearInterval(timer);
    }, []);
  return (
    <div>Clock {time}</div>
  )
}

export default Clock