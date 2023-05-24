import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
      <div className="flex items-center text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} alt="" className="w-20 max-xs:hidden" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2 items-start">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Feels like:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
