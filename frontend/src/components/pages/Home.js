import haikei from "../../img/haikei.png"
import panda_amechan from "../../img/panda_amechan.gif"

function Home() {
  return (
    <div className="App">
        <img className="absolute z-10 top-1/4 left-auto" src={panda_amechan} alt="panda" />
        <div className="h-screen w-screen relative" style={{backgroundImage:`url(${haikei})`, backgroundRepeat: 'no-repeat'}}></div>
    </div>
  );
}

export default Home;
