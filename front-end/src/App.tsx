import Header from "./components/Header";
import Banner from "./components/Banner";
import Card from "./components/Card";
import RightPanel from "./components/RightPanel";

function App() {

  return (
    <>
      <Header isLoggedIn={true} />
      <Banner />
      <div className="flex flex-row">
        <div className="w-1/2">
          <Card title="System Engineer" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus." />
          <Card title="IT Supervisor" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus." />
        </div>
        <div className="w-1/2">
          <RightPanel
            adInfo={{
              title: "Ad title",
              description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus."
            }}
          />
        </div>
      </div>
    </>
  )
}

export default App
