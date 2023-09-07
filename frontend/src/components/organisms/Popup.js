import { useState } from "react";
import * as React from 'react';
import batsu from './../../img/icon/batsu.png';

function Popup(props) {
  const [open, setOpen] = useState(props.notOpen);

  const ms1 = props.message1;
  const ms2 = props.message2;

  return (
    <div>
      <button onClick={() => { setOpen(false) }}>TEST</button>
      <div align="center" id="staticModal" tabIndex="-1" hidden={open} className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-2xl shadow bg-white-100 border-amber-900 border-8">
            <div className="flex items-start justify-between p-4 rounded-t">
              <button type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="staticModal"
                onClick={() => { setOpen(true) }}
              >
                <img src={batsu}></img>
              </button>
            </div>
            <div className="pr-6 pl-6 pb-6 space-y-6">
              <p className="text-3xl leading-relaxed text-amber-900 font-semibold">
                {ms1}
              </p>
              <div>
                <center>
                  <img src={props.img} align="center"></img>
                </center>
              </div>
              <p className="leading-relaxed text-amber-900 text-xl">
                {ms2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
