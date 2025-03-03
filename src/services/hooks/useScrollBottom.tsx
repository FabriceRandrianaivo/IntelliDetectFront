import { useEffect, useRef } from 'react';

const useScrollToBottom =<T extends HTMLElement>(Data: any[]) => {
    const scrollableDivRef = useRef<T | null>(null);

    const scrollToBottom = () => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop =
                scrollableDivRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        if(Data.length > 0) {
            scrollToBottom();
        }
    }, [Data]);
    return scrollableDivRef;

};

export default useScrollToBottom;