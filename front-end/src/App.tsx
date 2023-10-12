import Header from "./components/Header";
import Banner from "./components/Banner";
import MainContent from "./components/MainContent";

function App() {

  return (
    <>
      <Header isLoggedIn={false} />
      <Banner />
      <MainContent />
    </>
  )
}

export default App
