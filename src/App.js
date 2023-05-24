import "./App.css";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "Toronto" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try{
        await getFormattedWeatherData({ ...query, units }).then((data) => {
          toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}.`
          );
          console.log(data)
          setWeather(data);
        });
      }
      catch(err){
        toast.error("Please enter a valid city")
      }
      
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div
      className={`mx-auto rounded-[32px] max-w-screen-md py-[20px] px-[40px] bg-gradient-to-br  h-fit shadow-xl black-400  bg-black/20 backdrop-blur-[32px] max-xs:rounded-none `}
    >
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
