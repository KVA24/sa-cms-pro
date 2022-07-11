import React, {Component} from 'react';
import {observer} from "mobx-react";
import NoContent from "./NoContent";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

@observer
class ChartStatistics extends Component<{type?: string, dataStatistic: any}, any> {
    render() {


        let statisticDate: any = [];
        let dataUser: any = [];
        let dataEvent: any = [];
        let dataCompletedTask: any = [];
        let dataCompletedCampaign: any = [];

        statisticDate = statisticDate.concat([{
                name: 'User',
                data: dataUser
            },
            {
                name: 'Event',
                data: dataEvent
            },
            {
                name: 'Completed Task',
                data: dataCompletedTask
            },
            {
                name: `Completed Campaign`,
                data: dataCompletedCampaign
            }
        ])

        if(this.props.type === "task"){
            statisticDate.pop()
        }



        if(this.props.dataStatistic) {
            this.props.dataStatistic.map((item: any) => {
                dataUser.push([Date.parse(item.date), parseInt(item.totalUser)])
                dataEvent.push([Date.parse(item.date), parseInt(item.totalEvent)])
                dataCompletedTask.push([Date.parse(item.date), parseInt(item.totalTasksCompeted)])
                dataCompletedCampaign.push([Date.parse(item.date), parseInt(item.totalCampaignsCompeted)])
            })
        }


        const chartOptions = {
            title: {
                text: ''
            },
            xAxis: {
                gridLineWidth: 1,
                type: 'datetime',
                labels: {
                    format: "{value:%Y-%m-%d}",
                    rotation: -50,
                    align: 'right'
                }
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                borderWidth: 0
            },
            tooltip: {
                shared: true,
                crosshairs: true
            },
            series: statisticDate
        }

        return (
            <div className="">
                <div className="d-flex title_top justify-content-between mt-2 align-items-center mb-3">
                    <span style={{width: `100%`}}/>
                </div>
                {this.props.dataStatistic && this.props.dataStatistic.length > 0 ?
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                    /> :
                <div className="border p-5">
                    <NoContent message={'No data to display'}/>
                </div>}
            </div>
        )

    }
}

export default ChartStatistics;