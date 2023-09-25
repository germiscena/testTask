import "./App.scss";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { graph, trades, pie, circle1, circle2 } from "./graphs";
import axios from "axios";
function App() {
  const [data, setData] = React.useState();
  const apiKey = "AIzaSyD3hL5zoq5A_WeWU5LRl6cC7WDH9IX4Aho";
  const spreadsheetId = "14SKgK07JReMNxSqhEf8rWOdaPTS0onvN6DrB4n0cHOk";
  const range = "Dashboard!B2:D30";
  const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        setData(response.data.values);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  let optionsGraph;
  let optionsTotalTrades;
  let optionsPie;
  let optionsCircle1;
  let optionsCircle2;
  let totalFundsAlocated = 0;
  let totalProfit = 0;
  if (data) {
    totalFundsAlocated = parseInt(data[7][1]);
    totalProfit = parseInt(data[8][1]);
    optionsGraph = graph(data);
    optionsTotalTrades = trades(data);
    optionsPie = pie(data);
    optionsCircle1 = circle1(data);
    optionsCircle2 = circle2(data);
  }
  console.log(data);
  return (
    <div className='App'>
      {data && (
        <>
          <div className='App_blackShade' />
          <div className='App_whiteShade' />
          <div className='App_mainBlock'>
            <h1 className='App_mainBlock_title'>Financial dashboard</h1>
            <div className='App_mainBlock_monthlyGraph'>
              <HighchartsReact highcharts={Highcharts} options={optionsGraph} />
              <div className='App_mainBlock_monthlyGraph_graphsNames'>
                <p className='App_mainBlock_monthlyGraph_graphsNames_name'>{data[7][0]}</p>
                <p className='App_mainBlock_monthlyGraph_graphsNames_name'>{data[8][0]}</p>
              </div>
            </div>
            <div className='App_mainBlock_totalTrades'>
              <HighchartsReact highcharts={Highcharts} options={optionsTotalTrades} />
              <p className='App_mainBlock_totalTrades_centerWords'>{data[12][0]}</p>
            </div>
            <div className='App_mainBlock_pie'>
              <HighchartsReact highcharts={Highcharts} options={optionsPie} />
            </div>
            <div className='App_mainBlock_circles'>
              <div className='App_mainBlock_circles_upper'>
                <HighchartsReact highcharts={Highcharts} options={optionsCircle1} />
              </div>
              <p className='App_mainBlock_circles_middle'>{data[28][1]}</p>
              <div className='App_mainBlock_circles_down'>
                <HighchartsReact highcharts={Highcharts} options={optionsCircle2} />
              </div>
            </div>
            <div className='App_mainBlock_squares'>
              <div className='App_mainBlock_squares_single'>
                <p
                  style={{ paddingBottom: "23px" }}
                  className='App_mainBlock_squares_single_topWords'>
                  {data[22][0]}
                </p>
                <p className='App_mainBlock_squares_single_bottomPercents'>{data[22][1]}</p>
              </div>
              <div className='App_mainBlock_squares_single'>
                <p
                  style={{ paddingBottom: "23px" }}
                  className='App_mainBlock_squares_single_topWords'>
                  {data[23][0]}
                </p>
                <p className='App_mainBlock_squares_single_bottomPercents'>{data[23][1]}</p>
              </div>
              <div className='App_mainBlock_squares_single'>
                <p className='App_mainBlock_squares_single_topWords'>{data[20][0]}</p>
                <p className='App_mainBlock_squares_single_bottomPercents'>{data[20][1]}</p>
              </div>
              <div className='App_mainBlock_squares_single'>
                <p className='App_mainBlock_squares_single_topWords'>{data[21][0]}</p>
                <p className='App_mainBlock_squares_single_bottomPercents'>{data[21][1]}</p>
              </div>
            </div>
            <div className='App_mainBlock_days'>
              <div className='App_mainBlock_days_upperDays'>
                <p className='App_mainBlock_days_upperDays_title'>Calendar days in the market</p>
                <p className='App_mainBlock_days_upperDays_numberDays'>{data[6][1]}</p>
              </div>
              <div className='App_mainBlock_days_bottomDate'>
                <p className='App_mainBlock_days_bottomDate_title'>Start date</p>
                <p className='App_mainBlock_days_bottomDate_date'>{data[5][1]}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
