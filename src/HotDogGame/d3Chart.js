import React, { Component } from 'react';
import { VictoryBar } from 'victory';
import { VictoryPie } from 'victory';
import { VictoryLabel } from 'victory';
import { VictoryChart } from 'victory';
import { VictoryAxis } from 'victory';
import { VictoryTheme } from 'victory';

class Chart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-sm-12 col-md-8 col-lg-6" style={{"maxWidth": "600px"}}>

                <VictoryChart
                    domainPadding={{x: 10}}
                >

                    <VictoryBar
                        data={this.props.data}
                        x="name"
                        y={(datum) => datum.value}
                        sortKey={["profit", "loss"]}
                        style={{
                            data: {fill: (d) => d.y > 0 ? "grey" : "lightgrey"},
                            labels: {fontSize: 10},
                            parent: {border: "1px solid #ccc"}
                        }}
                        labels={(datum) => datum.y}
                        labelComponent={<VictoryLabel angle={-90} verticalAnchor="middle" textAnchor="end"/>}
                    />

                    <VictoryAxis
                        style={{
                            axisLabel: { padding: 30 }
                        }}
                        tickLabelComponent={<VictoryLabel angle={-90} verticalAnchor="middle" textAnchor="end"/>}
                    />
                    <VictoryAxis dependentAxis
                                 label="probablity"
                                 style={{
                                     axisLabel: { padding: 40 }

                                 }}
                    />

                </VictoryChart>

            </div>
        );
    }
}

export default Chart;