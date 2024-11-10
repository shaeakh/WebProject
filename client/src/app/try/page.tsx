"use client";
import React from 'react';
import { Button } from '@/components/ui/SCbutton';

function Page() {
    const [time, setTime] = React.useState(10);
    const [pause, setPause] = React.useState(false);

    React.useEffect(() => {
        if (pause || time === 0){
            setTime(10);return;
        }

        const timer = setTimeout(() => {
            setTime((prevTime) => prevTime > 0 ? prevTime - 1 : 10);
        }, 1000);

        return () => clearTimeout(timer);
    }, [time, pause]);

    return (
        <div className='h-screen w-screen flex flex-col space-y-2 items-center justify-center'>
            <div className='border-2 border-black rounded-lg px-5 py-2'>{time} s</div>
            <Button onClick={() => setPause(!pause)}>
                {pause ? "Resume" : "Pause"}
            </Button>
        </div>
    );
}

export default Page;
