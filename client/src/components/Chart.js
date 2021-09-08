import "components/Chart.scss";
import { ResponsiveLine } from "@nivo/line";
import propTypes from "prop-types";

const Chart = ({ data }) => {
  return (
    <div className="ChartContainer">
      <ResponsiveLine
        data={data}
        height={600}
        width={1400}
        colors={(d) => d.color}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
        xScale={{ format: "%Y-%m-%d", type: "time" }}
        xFormat="time:%Y-%m-%d"
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
          tickValues: 15,
          legend: "Dates",
          legendOffset: 36,
          legendPosition: "middle",
          format: "%m/%d/%y",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Covid-19 Cases",
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
            translateX: 165,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 150,
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

Chart.propTypes = {
  data: propTypes.object,
};

Chart.defaultProps = {
  data: [],
};

export default Chart;
