import Navbar from "../../components/navBar";
interface headerType {
  theme: boolean;
  // setTheme: (theme: boolean) => void;
}
const Home = (props: headerType) => {
  return (
    <div className="app-home">
    <Navbar/>
      <div className="content">
        <div className="hero">
          <h1>Protect Your App Against Non-Humans</h1>
          <p>Enter the future of bot-free mobile apps. Simplify bot detection, enhance user experiences, and fortify your app's ecosystem.</p>
          <div className="buttons">
            <button>Verify you're human</button>
            <button className="demo">Try Demo</button>
          </div>
          <p className="beta">Beta release date June 30th, 2023</p>
        </div>
        <div className="logos">
          <p>Guarding The Industry's Top Apps And Games. From Innovative Startups To Renowned Enterprises.</p>
          <div className="logo-images">
            <img src="/unity-logo.png" alt="Unity Logo" />
            <img src="/unreal-engine-logo.png" alt="Unreal Engine Logo" />
            <img src="/apple-logo.png" alt="Apple Logo" />
            <img src="/meta-logo.png" alt="Meta Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
