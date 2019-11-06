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
  var loop = 10 
	let data = [Array(loop), Array(loop)];

	for (var i = 0; i < loop; i++) {
		let x = i;
		let y = i*multiplier;

		data[0][i] = x;
		data[1][i] = y;
  }
  return data;
};

const generateOpts = (multiplier) => {
  console.log(1*multiplier)
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
          label: "sin(x)",
          color: "red",
          width: 1*multiplier,
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
          class: "foo"
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

	updatePlot = createSelector(
		[props => props.opts, props => props.data],
		(opts, data) => {
			// console.log("opts, data", opts, data);
			// let u = new uPlot(opts, data);
			if (this.omnivizInstance !== null && this.uPlot !== null) {
				this.uPlot.setData(data);
				// return u;
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
		this.updatePlot(this.props);
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
	const [seconds, setSeconds] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
		}, 10000);
		return () => clearInterval(interval);
  }, []);
  const autoData = generateData(seconds);
  const opts = generateOpts(seconds)
	return (
		<Plot id={"my-uuid"} opts={opts} data ={autoData}>
		</Plot>
	);
};
