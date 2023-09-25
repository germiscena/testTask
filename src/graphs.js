import Highcharts from "highcharts";
export const graph = (data) => {
  let optionsGraph = {
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
  return optionsGraph;
};

export const trades = (data) => {
  let tradesGraph = {
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
  return tradesGraph;
};
export const pie = (data) => {
  let pieGraph = {
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
            name: "estimated return in capital in one year",
            y: Number(data[11][1].slice(0, -1)),
            sliced: true,
          },
          {
            name: "return on capital closed trades",
            y: Number(data[10][1].slice(0, -1)),
            sliced: true,
          },
          { name: "Скрытый сектор", y: 0, visible: false },
        ],
      },
    ],
  };
  return pieGraph;
};

export const circle1 = (data) => {
  let circleGraph1 = {
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
        data: [{ y: Number(data[27][1].slice(0, -1)), name: "tradedesk performance" }],
      },
    ],
  };
  return circleGraph1;
};
export const circle2 = (data) => {
  let circleGraph2 = {
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
        data: [{ y: Number(data[26][1].slice(0, -1)), name: "S&P performance" }],
      },
    ],
  };
  return circleGraph2;
};
