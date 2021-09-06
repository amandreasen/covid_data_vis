import "components/Chart.scss";
import { ResponsiveLine } from "@nivo/line";

const Chart = () => {
  const data = [
    {
      id: "japan",
      color: "hsl(157, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 175,
        },
        {
          x: "helicopter",
          y: 192,
        },
        {
          x: "boat",
          y: 199,
        },
        {
          x: "train",
          y: 285,
        },
        {
          x: "subway",
          y: 254,
        },
        {
          x: "bus",
          y: 134,
        },
        {
          x: "car",
          y: 251,
        },
        {
          x: "moto",
          y: 238,
        },
        {
          x: "bicycle",
          y: 152,
        },
        {
          x: "horse",
          y: 209,
        },
        {
          x: "skateboard",
          y: 123,
        },
        {
          x: "others",
          y: 168,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(37, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 206,
        },
        {
          x: "helicopter",
          y: 205,
        },
        {
          x: "boat",
          y: 206,
        },
        {
          x: "train",
          y: 193,
        },
        {
          x: "subway",
          y: 168,
        },
        {
          x: "bus",
          y: 169,
        },
        {
          x: "car",
          y: 24,
        },
        {
          x: "moto",
          y: 197,
        },
        {
          x: "bicycle",
          y: 102,
        },
        {
          x: "horse",
          y: 141,
        },
        {
          x: "skateboard",
          y: 164,
        },
        {
          x: "others",
          y: 182,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(63, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 216,
        },
        {
          x: "helicopter",
          y: 266,
        },
        {
          x: "boat",
          y: 39,
        },
        {
          x: "train",
          y: 92,
        },
        {
          x: "subway",
          y: 279,
        },
        {
          x: "bus",
          y: 45,
        },
        {
          x: "car",
          y: 44,
        },
        {
          x: "moto",
          y: 6,
        },
        {
          x: "bicycle",
          y: 152,
        },
        {
          x: "horse",
          y: 254,
        },
        {
          x: "skateboard",
          y: 234,
        },
        {
          x: "others",
          y: 288,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(114, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 212,
        },
        {
          x: "helicopter",
          y: 236,
        },
        {
          x: "boat",
          y: 21,
        },
        {
          x: "train",
          y: 280,
        },
        {
          x: "subway",
          y: 36,
        },
        {
          x: "bus",
          y: 282,
        },
        {
          x: "car",
          y: 42,
        },
        {
          x: "moto",
          y: 12,
        },
        {
          x: "bicycle",
          y: 92,
        },
        {
          x: "horse",
          y: 88,
        },
        {
          x: "skateboard",
          y: 27,
        },
        {
          x: "others",
          y: 251,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(298, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 145,
        },
        {
          x: "helicopter",
          y: 179,
        },
        {
          x: "boat",
          y: 141,
        },
        {
          x: "train",
          y: 16,
        },
        {
          x: "subway",
          y: 248,
        },
        {
          x: "bus",
          y: 244,
        },
        {
          x: "car",
          y: 152,
        },
        {
          x: "moto",
          y: 151,
        },
        {
          x: "bicycle",
          y: 175,
        },
        {
          x: "horse",
          y: 77,
        },
        {
          x: "skateboard",
          y: 188,
        },
        {
          x: "others",
          y: 53,
        },
      ],
    },
  ];

  return (
    <div className="ChartContainer">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Chart;
