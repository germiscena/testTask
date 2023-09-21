import "./App.scss";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { graph, trades, pie, circle1, circle2 } from "./graphs";

function App() {
  const [data, setData] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://sheet.best/api/sheets/571d4483-fb62-40d4-9d4e-6857be5ae419",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const text = await response.text();
        const l = JSON.parse(text);
        const filteredDataArray = l.map((obj) => {
          return Object.keys(obj).reduce((acc, key) => {
            if (obj[key] !== null && obj[key] != "") {
              acc[key] = obj[key];
            }
            return acc;
          }, {});
        });
        const lastFilter = filteredDataArray
          .map((obj) => {
            return Object.keys(obj).reduce((acc, key) => {
              if (obj[key] !== null && obj[key] !== "") {
                acc[key] = obj[key];
              }
              return acc;
            }, {});
          })
          .filter((obj) => Object.keys(obj).length > 0);
        setData(lastFilter.map((obj) => Object.values(obj)));
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
                <p className='App_mainBlock_monthlyGraph_graphsNames_name'>TOTAL FUNDS ALLOCATED</p>
                <p className='App_mainBlock_monthlyGraph_graphsNames_name'>
                  TOTAL PROFIT FROM CLOSED TRADES
                </p>
              </div>
            </div>
            <div className='App_mainBlock_totalTrades'>
              <HighchartsReact highcharts={Highcharts} options={optionsTotalTrades} />
              <p className='App_mainBlock_totalTrades_centerWords'>TOTAL TRADES</p>
            </div>
            <div className='App_mainBlock_pie'>
              <HighchartsReact highcharts={Highcharts} options={optionsPie} />
            </div>
            <div className='App_mainBlock_circles'>
              <div className='App_mainBlock_circles_upper'>
                <HighchartsReact highcharts={Highcharts} options={optionsCircle1} />
              </div>
              <p className='App_mainBlock_circles_middle'>{data[25][1]}</p>
              <div className='App_mainBlock_circles_down'>
                <HighchartsReact highcharts={Highcharts} options={optionsCircle2} />
              </div>
            </div>
            <div className='App_mainBlock_squares'>
              <div className='App_mainBlock_squares_single'>
                <p
                  style={{ paddingBottom: "23px" }}
                  className='App_mainBlock_squares_single_topWords'>
                  {data[21][0]}
                </p>
                <p className='App_mainBlock_squares_single_bottomPercents'>{data[21][1]}</p>
              </div>
              <div className='App_mainBlock_squares_single'>
                <p
                  style={{ paddingBottom: "23px" }}
                  className='App_mainBlock_squares_single_topWords'>
                  {data[22][0]}
                </p>
                <p className='App_mainBlock_squares_single_bottomPercents'>{data[22][1]}</p>
              </div>
              <div className='App_mainBlock_squares_single'>
                <p className='App_mainBlock_squares_single_topWords'>{data[19][0]}</p>
                <p className='App_mainBlock_squares_single_bottomPercents'>{data[19][1]}</p>
              </div>
              <div className='App_mainBlock_squares_single'>
                <p className='App_mainBlock_squares_single_topWords'>{data[20][0]}</p>
                <p className='App_mainBlock_squares_single_bottomPercents'>{data[20][1]}</p>
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
