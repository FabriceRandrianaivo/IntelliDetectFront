interface headerType {
  theme: boolean;
  // setTheme: (theme: boolean) => void;
}
const Home = (_props: headerType) => {
  return (
    <div className="app-home">
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
