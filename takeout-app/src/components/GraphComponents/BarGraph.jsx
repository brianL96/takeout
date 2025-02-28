import React from 'react'

import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const BarGraph = ({getWeekRevenue}) => {

    let options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Revenue (in Dollars)"
                }
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

    let barData = {
        labels: [],
        datasets: [
            {
                label: "Revenue",
                data: [],
                backgroundColor: ["forestgreen"],
                borderWidth: 1,
            },
        ],
    };

    weekdaysRevenue.weekdays.reverse().map((x) => {
        barData.labels.push(x.name);
        barData.datasets[0].data.push(x.income);
    });


return(
    <>
        <div className='flex flex-col justify-start w-full h-full'>
            <div className='flex flex-row justify-center items-center w-full h-28 bg-gray-300 border-b border-b-black'>
                <h1 className='text-3xl px-2'>Revenue Over Last 7 Days</h1> 
            </div>
            <div className='flex flex-row justify-center items-center w-full h-100 pr-2'>
                <Bar options={options} data={barData}/>
            </div>
        </div>
    </>    
)
}

export default BarGraph