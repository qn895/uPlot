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
    cursor: {
      focus: {
        alpha: 0.3,
        prox: 30,
      }
    },

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
          // width: 10,
          // dash: [10, 5],
},
        {
          label: "scatter data",
          scale: 'mb',
          color: "red",
          width: 5,
          type: 'scatter',
          dash: [2, 2]
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
    // this.updateOpt(this.props.opts);

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

export const IntervalExample = () => {
	const [seconds, setSeconds] = useState(1);
	useEffect(() => {
		const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
		}, 2000);
		return () => clearInterval(interval);
  }, []);
  const autoData = generateData(seconds);
  const opts = generateOpts(seconds);

	return (
		<Plot id={"my-uuid"} opts={opts} data ={autoData}>
		</Plot>
	);
};
