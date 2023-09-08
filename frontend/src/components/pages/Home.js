import "../../App.css";
import { NavBar } from "../organisms/NavBar.js"
import { HomeHeader } from "../organisms/HomeHeader.js";
import Slider from "react-slick";
import PandaApi from "../../api/PandaApi";
import { useEffect, useState } from "react";

import haikei from "../../img/haikei.png"
import panda_amechan from "../../img/panda_amechan.gif"
import sasa from "../../img/sasa.png"
import sasa_golden from "../../img/sasa_golden.png"
import next_arrow from "../../img/icon/next.png"
import prev_arrow from "../../img/icon/prev.png"

function NextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="absolute slick-slider top-0 right-10 slick-initialized"
      style={{ ...style, zIndex:10, display: "block", backgroundImage:`url(${next_arrow})`, width:"48px", height: "48px"}}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="absolute slick-slider left-10 slick-initialized"
      style={{ ...style, zIndex: 10,  display: "block", backgroundImage:`url(${prev_arrow})`, width:"48px", height: "48px"}}
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
  const [level, setLevel] = useState(1)
  const [given_food, setGivenfood] = useState(0)
  const [exp, setExp] = useState(0)
  const [sasa_count, setSasa] = useState(0)
  const [premium_count, setPremium] = useState(0)

  function feed_sasa(){
    const item = {
      panda_feed: {
        items: {
          normal_food: 1,
          premium_food: 0
        }
      }
    }
    const panda = new PandaApi;
    panda.feed(item)
      .catch((err) =>{
        alert(err)
      })
    
    panda.getPanda()
      .then((res) => {
        setLevel(res.panda_status.level);
        setGivenfood(res.panda_status.given_food);
        setSasa(res.panda_status.items.normal_food);
        setPremium(res.panda_status.items.premium_food);
        setExp(res.panda_status.exp);
      }).catch((err) => {
        console.log(err)
      })
      console.log("笹をあげました");
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
    panda.feed(item)
      .catch((err) =>{
        console.log(err)
      })

    panda.getPanda()
      .then((res) => {
        setLevel(res.panda_status.level);
        setGivenfood(res.panda_status.given_food);
        setSasa(res.panda_status.items.normal_food);
        setPremium(res.panda_status.items.premium_food);
        setExp(res.panda_status.exp);
      })
  }
  

  useEffect(() => {
    const panda = new PandaApi;
    panda.getPanda()
      .then((res) => {
        setLevel(res.panda_status.level);
        setGivenfood(res.panda_status.given_food);
        setSasa(res.panda_status.items.normal_food);
        setPremium(res.panda_status.items.premium_food);
        setExp(res.panda_status.exp)
      })
  }, []);

  return (
    <div className="home">
      <div className="h-screen w-screen relative" style={{backgroundImage:`url(${haikei})`, backgroundRepeat: 'no-repeat'}}>
        <HomeHeader level={level} given_food={given_food} exp={exp}/>
        <img className="fixed z-10" style={{width:200+level*20, height:200+level*20, transform: "tranlate(-50%, -50%)"}} src={panda_amechan} alt="panda" />

        <Slider className="relative top-2/3 left-1/8" {...settings}>
          <div>
            <button className="inset-y-2/3 inset-x-1/4 h-12 w-48 overflow-hidden rounded-2xl bg-base text-lg font-bold text-main"
              onClick={feed_sasa}>
              <div className="flex w-full">
                <img className="w-11" src={sasa} alt="sasa" />
                <p className="text-xs">{sasa_count}</p>
                <p className="relative top-2 w-full">笹をあげる</p>
              </div>
            </button>
          </div>

          <div>
            <button className="inset-y-2/3 inset-x-1/4 h-12 w-48 overflow-hidden rounded-2xl bg-base text-lg font-bold text-main"
              onClick={feed_premiumsasa}>
              <div className="flex w-full">
                <img className="w-11" src={sasa_golden} alt="sasa" />
                <p className="text_xs">{premium_count}</p>
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