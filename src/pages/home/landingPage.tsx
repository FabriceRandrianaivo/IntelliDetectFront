import Navbar from "../../components/navBar";


const LandingPage: React.FC = () => {
    return (
      <div className="landing-container">
        <Navbar />
        <header className="hero-section">
          <h1>AI-Powered Object Detection</h1>
          <p>Experience next-generation AI for real-time object detection and classification.</p>
          <button className="cta-button">Get Started</button>
        </header>
        <section className="features-section">
          <div className="feature">
            <h3>Real-Time Detection</h3>
            <p>Our AI detects objects instantly with high accuracy.</p>
          </div>
          <div className="feature">
            <h3>Customizable Models</h3>
            <p>Train and fine-tune models to suit your specific needs.</p>
          </div>
          <div className="feature">
            <h3>Seamless Integration</h3>
            <p>Easy API integration for developers and businesses.</p>
          </div>
        </section>
      </div>
    );
  };
  
  export default LandingPage;