import React from 'react'

import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const LineGraph = ({getWeekRevenue}) => {

    let options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Number of Orders Placed"
                },
                ticks: {
                    precision: 0,
                
                },
                
            },
            x: {
                title: {
                    display: true,
                    text: "Days of the Week"
                }
            }
        }
    };

    let weekdaysRevenue = getWeekRevenue();

    let lineData = {
        labels: [
            "12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM",
        ],
        datasets: [],
    };

    let colors = ["blueviolet", "cadetblue", "coral", "crimson", "darkcyan", "chocolate", "cornflowerblue"];

    weekdaysRevenue.weekdays.reverse().map((x, index) => {

        let datasetsItem = {
            label: x.name,
            data: [],
            borderColor: colors[index]
        }

        x.hourlyOrders.map((x2) => {
            datasetsItem.data.push(x2);
        });

       lineData.datasets.push(datasetsItem);
        
    });

    return(
        <>
            <div className='flex flex-col justify-start w-full h-full'>
                <div className='flex flex-row justify-center items-center w-full h-28 bg-gray-300 border-b border-b-black'>
                    <h1 className='text-3xl px-2'>Orders By Hour Over Last 7 Days</h1> 
                </div>
                <div className='flex flex-row justify-center items-center w-full h-100 px-2'>
                    <Line options={options} data={lineData}/>
                </div>
            </div>
        </>    
    )
    
}

export default LineGraph