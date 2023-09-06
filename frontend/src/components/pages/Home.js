import haikei from "../../img/haikei.png"
import panda_amechan from "../../img/panda_amechan.gif"

function Home() {
  return (
    <div className="App">
        <div className="max-h-full max-w-full" style={{backgroundImage:`url(${haikei})`, width: "518px"}}></div>
        <img src={panda_amechan} />
    </div>
  );
}

export default Home;
