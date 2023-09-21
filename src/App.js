import "./App.scss";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

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
  console.log(data);
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
    optionsGraph = {
      chart: {
        type: "column",
        backgroundColor: "rgba(255, 255, 255, 0)",
        width: 358,
        height: 290,
      },
      title: {
        text: "September",
        align: "center",
        style: {
          color: "#FFF",
          fontFamily: "Inter,sans-serif",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "100%",
          letterSpacing: "-0.8px",
        },
      },
      subtitle: {
        text: "monthly graph",
        align: "center",
        style: {
          color: "#FFF",
          fontFamily: "Inter,sans-serif",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "100%",
          letterSpacing: "-0.48px",
        },
      },

      yAxis: {
        tickPositions: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000],
        title: false,
        labels: {
          formatter: function () {
            if (this.value === 0) {
              return "0,000";
            } else {
              return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          },
          color: "#FFFFFF",
          style: {
            fontWeight: "500",
            lineHeight: "100%",
            letterSpacing: "-0.64px",
            fontStyle: "normal",
            fontSize: "12px",
            fontFamily: "PlayFair Display",
            color: "#FFFFFF",
          },
        },
      },
      plotOptions: {
        series: {
          cursor: "pointer",
          pointWidth: 122,
          groupPadding: 0.05,
          borderWidth: 0,
          borderRadius: 6,
          dataLabels: {
            enabled: true,
            inside: true,
            align: "left",
            color: "#1E343E",
            borderWidth: 0,
            verticalAlign: "top",
            crop: false,
            overflow: "none",
            style: {
              border: "none",
              outline: "none",
              fontWeight: "700",
              lineHeight: "100%",
              letterSpacing: "-0.64px",
              fontStyle: "normal",
              fontSize: "16px",
              fontFamily: "PlayFair Display",
              textOutline: "none",
            },
            formatter: function () {
              return Highcharts.numberFormat(this.y, 0, ",", ",");
            },
          },
        },
        column: {
          dataLabels: {
            enabled: true,
            inside: true,
            color: "#333",
          },
        },
        marker: {
          enabled: false,
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [
        {
          name: data[7][0],
          data: [parseFloat(data[7][1].replace(",", ""))],
          color: "rgba(255, 255, 255, 0.8)",
        },
        {
          name: data[8][0],
          data: [parseFloat(data[8][1].replace(",", ""))],
          color: "rgba(255, 255, 255, 0.8)",
        },
      ],
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
    };
    optionsTotalTrades = {
      chart: {
        backgroundColor: "rgba(255, 255, 255, 0)",
        width: 359,
        height: 224,
        type: "pie",
        cursor: "pointer",
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      subtitle: {
        useHTML: true,
        text: data[12][1],
        verticalAlign: "middle",
        y: 40,
        style: {
          color: "#FFF",
          fontFamily: "Playfair Display",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
        },
      },

      legend: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          startAngle: 180,
          allowPointSelect: true,
          cutsor: "pointer",
          states: {
            hover: {
              brightness: 11,
            },
          },
        },
        series: {
          cursor: "pointer",
          borderWidth: 0,
          borderColor: "transparent",
          borderRadius: 0,
          colorByPoint: true,
          height: 30,
          type: "pie",
          size: "100%",
          innerSize: "50%",
          dataLabels: {
            cutsor: "pointer",
            enabled: true,
            useHTML: true,
            distance: 10,
            connectorPadding: -74,
            x: 110,
            y: 0,
            crop: false,
            format:
              "{point.y}<br/><div style='color:#FFF;fontFamily:Inter;fontSize:11px;fontStyle:normal;fontWeight:200;lineHeight:normal;textTransform:uppercase'>{point.name}</div>",
            style: {
              fontWeight: 500,
              fontSize: "24px",
              textOutline: "none",
              color: "#FFFFFF",
              fontFamily: "Playfair Display",
              lineHeight: "normal",
              fontStyle: "normal",
            },
            connectorWidth: 0,
          },
        },
      },

      colors: ["#d8e0e4", "#a7b2b8"],
      series: [
        {
          type: "pie",
          data: [
            {
              name: "CLOSED",
              y: Number(data[14][1]),
            },
            { name: "OPEN", y: Number(data[13][1]) },
          ],
        },
      ],
    };
    optionsPie = {
      chart: {
        backgroundColor: "rgba(255, 255, 255, 0)",
        type: "pie",
        ignoreHiddenPoint: true,
        height: 348,
        marginLeft: -100,
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },

      plotOptions: {
        series: {
          ignoreHiddenPoint: true,
        },
        pie: {
          startAngle: -200,
          endAngle: -14,
          ignoreHiddenPoint: true,
          cursor: "pointer",
          dataLabels: {
            ignoreHiddenPoint: true,
            enabled: true,
            crop: false,
            format:
              "<span style='textAlign:center;fontFamily:Playfair Display;fontSize:30px;fontStyle:normal;fontWeight:700;lineHeight:normal'>{point.y}%</span><br/><br/>{point.name}",
            connectorWidth: 0,
            connectorPadding: -154,
            distance: -50,
            y: -40,
            align: "left",
            style: {
              width: 180,
              whiteSpace: "normal",
              color: "#FFF",
              fontFamily: "Inter",
              fontSize: "16px",
              fontWeight: 100,
              height: 32,
              // lineHeight: "100%",
              letterSpacing: "-0.64px",
              textTransform: "uppercase",
              textOutline: "none",
              textAlign: "center",
            },
            x: 170,
          },
        },
      },
      colors: ["#d8e0e4", "#a7b2b8"],
      series: [
        {
          name: "Brands",
          colorByPoint: true,
          data: [
            {
              name: "return on capital closed trades",
              y: Number(data[10][1].slice(0, -1)),
              sliced: true,
            },
            {
              name: "estimated return in capital in one year",
              y: Number(data[11][1].slice(0, -1)),
              sliced: true,
            },
            { name: "Скрытый сектор", y: 0, visible: false },
          ],
        },
      ],
    };
    optionsCircle1 = {
      chart: {
        backgroundColor: "rgba(255, 255, 255, 0)",
        width: 244,
        height: 244,
        type: "pie",
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      subtitle: {
        enabled: false,
      },

      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          startAngle: 180,
          states: {
            hover: {
              enabled: false,
              brightness: 0,
            },
          },
        },
        series: {
          cursor: "pointer",
          borderWidth: 0,
          borderColor: "transparent",
          type: "pie",
          innerSize: "50%",
          dataLabels: {
            enabled: true,
            distance: 0,
            connectorWidth: 0,
            connectorPadding: -48,
            y: 100,
            format:
              "{point.name}<br/><br/><br/><p style='color:#fff;fontFamily:Playfair Display;fontSize:24px;fontStyle:normal;fontWeight:700;lineHeight:normal;'>{point.y}%</p>",
            style: {
              weight: 86,
              height: 24,
              textOutline: "none",
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "11px",
              fontStyle: "normal",
              fontWeight: 200,
              lineHeight: "10%",
              letterSpacing: "-0.44px",
              textTransform: "uppercase",
            },
          },
        },
      },

      colors: ["rgba(255,255,255,0.7)"],
      series: [
        {
          type: "pie",
          data: [{ y: Number(data[24][1].slice(0, -1)), name: "tradedesk performance" }],
        },
      ],
    };
    optionsCircle2 = {
      chart: {
        backgroundColor: "rgba(255, 255, 255, 0)",
        width: 244,
        height: 244,
        type: "pie",
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      subtitle: {
        enabled: false,
      },

      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          startAngle: 180,
          states: {
            hover: {
              enabled: false,
              brightness: 0,
            },
          },
        },
        series: {
          cursor: "pointer",
          borderWidth: 0,
          borderColor: "transparent",
          type: "pie",
          innerSize: "50%",
          dataLabels: {
            enabled: true,
            distance: 0,
            connectorWidth: 0,
            connectorPadding: -48,
            y: 100,
            format:
              "{point.name}<br/><br/><br/><p style='color:#fff;fontFamily:Playfair Display;fontSize:24px;fontStyle:normal;fontWeight:700;lineHeight:normal;'>{point.y}%</p>",
            style: {
              weight: 86,
              height: 24,
              textOutline: "none",
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "11px",
              fontStyle: "normal",
              fontWeight: 200,
              lineHeight: "10%",
              letterSpacing: "-0.44px",
              textTransform: "uppercase",
            },
          },
        },
      },

      colors: ["rgba(255,255,255,0.7)"],
      series: [
        {
          type: "pie",
          data: [{ y: Number(data[23][1].slice(0, -1)), name: "S&P performance" }],
        },
      ],
    };
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
