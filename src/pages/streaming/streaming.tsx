import VideoStream from '../../components/streaming/stream';

interface headerType {
  theme: boolean;
  // setTheme: (theme: boolean) => void;
}
const Streaming = (props: headerType) => {
  return (
    <div className="app-home">
      <div className="content">
        <VideoStream/>
      </div>
    </div>
  );
};

export default Streaming;
