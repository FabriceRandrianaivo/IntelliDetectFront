import { useState } from "react";

const VideoStream = () => {
    const [isPlayStream, setIsPlayStream] = useState<boolean>(false);
    return (
        <>
            <div>
                <h2>Live Stream</h2>
                <img src="http://localhost:8000/stream/video_feed" alt="Video Stream" width="640" />
            </div>
        </>
    );
};

export default VideoStream;