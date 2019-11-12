import React, { useEffect, useState } from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";
import uPlot from "../src/uPlot";
import "../src/uPlot.css";
export default {
	title: "LineChart"
};
import { createSelector } from "reselect";

const generateData = multiplier => {
  var loop = 1000 
	let data = [Array(loop), Array(loop), Array(loop)];

	for (var i = 0; i < loop; i++) {
		let x = i;
		let y = i*multiplier;

		data[0][i] = x;
    data[1][i] = y;
    data[2][i] = y**2;
  }
  return data;
};

const generateOpts = (multiplier) => {
  const opts = {
    width: 800,
    height: 400,
    scales: {
      x: {
        time: false,
        auto: true,
        //	range: [0, 6],
      },
      y: {
        auto: true,
        // range: [-1.5, 1.5]
      }
    },
    series: {
      x: {
        label: "x"
      },
      y: [
        {
          label: "line data",
          color: "green",
          width: multiplier,
          type: 'line',
          dash: [5, 15]
        },
        {
          label: "scatter data",
          scale: 'mb',
          color: "red",
          width: 1,
          type: 'scatter'
          // dash: [2*multiplier, 3]
        }

      ]
    },
    axes: {
      x: {
        label: "X Axis"
      },
      y: [
        {
          space: 50,
          label: "Y Axis",
          color: "red",
          class: "foo",
          values: (vals, space) => vals.map(v => +v.toFixed(2) + "scfd"),
        },
        {
          side: 3,
          scale: 'mb',
          values: (vals, space) => vals.map(v => +v.toFixed(2) + "bbld"),
          grid: null,
      }
      ]
    }
  };
  return opts;
  
}

class Plot extends React.Component {
	constructor(props) {
		super(props);
		// this.echartsLib = props.echarts; // the echarts object.
    this.omnivizInstance = null; // echarts div element
    this.uPlot = null;
	}

	updateData = createSelector(
		[data => data],
		(data) => {
			// console.log("opts, data", opts, data);
			// let u = new uPlot(opts, data);
			if (this.omnivizInstance !== null && this.uPlot !== null) {
				this.uPlot.setData(data);
			}
		}
  );
  
  updateOpt = createSelector(
		[opts => opts],
		(opts) => {
      if (this.omnivizInstance !== null && this.uPlot !== null) {
				this.uPlot.setOptions(opts);
			}

		}
	);

	componentDidMount() {
		const { opts, data } = this.props;
    let u = new uPlot(opts, data);
    this.uPlot = u;
		this.omnivizInstance.appendChild(u.root);
	}

	render() {
		const { id } = this.props;
    this.updateData(this.props.data);
    this.updateOpt(this.props.opts);

		return (
			<div
				id={id}
				ref={e => {
					this.omnivizInstance = e;
				}}
			>
				id
			</div>
		);
	}
}
const autoData = generateData(3);
const opts = generateOpts(4);

export const IntervalExample = () => {
	const [seconds, setSeconds] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
		}, 2000);
		return () => clearInterval(interval);
  }, []);
  // console.log("seconds", seconds, "opts", opts)
	return (
		<Plot id={"my-uuid"} opts={opts} data ={autoData}>
		</Plot>
	);
};
