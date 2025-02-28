import React from 'react'

import {Pie} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
);

const PieGraph = ({getTopSoldItems}) => {

    let value = getTopSoldItems();
   
    let options = {};

    let pieData = {
        labels: [],
        datasets: [
            {
                label: "Items Sold",
                data: [],
                backgroundColor: [
                ],
                hoverOffset: 4,
                
            },
        ],
    };

    let bgColors = [
        "navy",
        "maroon",
        "lime",
        "coral",
        "purple",
        
    ];

    if(value.items.length === 0){
        pieData.labels.push("No Sales");
        pieData.datasets[0].label = ""
        pieData.datasets[0].data.push(1);
        pieData.datasets[0].backgroundColor.push('gray');
    }
    else{

        value.items.map((x, index) => {
            let nameValue = (x.name.length > 25) ? x.name.substring(0, 25) + '...' : x.name;
            //pieData.labels.push(x.name);
            pieData.labels.push(nameValue);
            pieData.datasets[0].data.push(x.count);
            pieData.datasets[0].backgroundColor.push(bgColors[index]);
        });

        if(value.otherTotal > 0){
            pieData.labels.push("Other");
            pieData.datasets[0].data.push(value.otherTotal);
            pieData.datasets[0].backgroundColor.push('gainsboro');
        }
        
    }

    let salesMessage = null;
    if(value.percentage === -1){
        salesMessage = "";
    }
    else{
        let amountOfTopItems = value.items.length;
        salesMessage = `Top ${amountOfTopItems} Items Account For ${value.percentage}% Of Total Sales`;
    }
  
return(
    <>
        <div className='flex flex-col justify-start w-full h-full'>
            <div className='flex flex-row justify-center items-center w-full h-28 bg-gray-300 border-b border-b-black'>
                <h1 className='text-3xl px-2'>Most Sold Items</h1> 
            </div>
            <div className='flex flex-row justify-start items-center w-full h-100'>
                <div className='flex flex-row justify-center items-center h-9/10 w-2/3'>
                    <Pie options={options} data={pieData}/>
                </div>
                <div className='flex flex-row justify-center items-center h-9/10 w-1/3 px-3'>
                    <h1 className='text-2xl'>{salesMessage}</h1> 
                </div>
            </div>
        </div>
    </>
)

}

export default PieGraph