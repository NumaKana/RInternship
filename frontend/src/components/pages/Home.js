import "../../App.css";
import { NavBar } from "../organisms/NavBar.js"
import Slider from "react-slick";
import PandaApi from "../../api/PandaApi";

import haikei from "../../img/haikei.png"
import panda_amechan from "../../img/panda_amechan.gif"
import sasa from "../../img/sasa.png"
import sasa_golden from "../../img/sasa_golden.png"
import next_arrow from "../../img/icon/next.png"
import prev_arrow from "../../img/icon/prev.png"



function feed_sasa(){
  console.log("笹をあげました");
  const item = {
    panda_feed: {
      items: {
        normal_food: 1,
        premium_food: 0
      }
    }
  }
  const panda = new PandaApi;
  panda.feed(item);
}

function feed_premiumsasa(){
  console.log("いい笹をあげました");
  const item = {
    panda_feed: {
      items: {
        normal_food: 0,
        premium_food: 1
      }
    }
  }
  const panda = new PandaApi;
  panda.feed(item);
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute slick-slider top-0 right-10 slick-initialized"
      style={{ ...style, display: "block", backgroundImage:`url(${next_arrow})`, width:"48px", height: "48px"}}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute slick-slider left-10 slick-initialized"
      style={{ display: "block", backgroundImage:`url(${prev_arrow})`, width:"48px", height: "48px"}}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrow: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
};

function Home() {
  return (
    <div className="App">
      <div className="h-screen w-screen relative" style={{backgroundImage:`url(${haikei})`, backgroundRepeat: 'no-repeat'}}>
        <img className="absolute z-10 top-1/3 left-auto" src={panda_amechan} alt="panda" />

        <Slider className="top-3/4 left-1/8" {...settings}>
          <div>
            <button className="inset-y-2/3 inset-x-1/4 h-12 w-48 overflow-hidden rounded-2xl bg-base text-lg font-bold text-main"
              onClick={feed_sasa}>
              <div className="flex w-full">
                <img className="w-11" src={sasa_golden} alt="sasa" />
                <p className="relative top-2 w-full">笹をあげる</p>
              </div>
            </button>
          </div>

          <div>
            <button className="inset-y-2/3 inset-x-1/4 h-12 w-48 overflow-hidden rounded-2xl bg-base text-lg font-bold text-main"
              onClick={feed_premiumsasa}>
              <div className="flex w-full">
                <img className="w-11" src={sasa} alt="sasa" />
                <p className="relative top-2 w-full">いい笹をあげる</p>
              </div>
            </button>
          </div>
        </Slider>

        <NavBar />
      </div>
    </div>
  );
}
export default Home