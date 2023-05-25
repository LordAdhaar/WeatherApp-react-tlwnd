import React from "react";
import { iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items }) {
  console.log(items);
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white max-xs:flex-col">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center max-xs:flex-row max-xs:gap-24"
          >
            <p className="font-light text-sm">{item.title}</p>
            <div className="flex flex-col items-center content-center max-xs:flex-row">
              <img
                src={iconUrlFromCode(item.icon)}
                className="w-12 my-1"
                alt=""
              />
              <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
