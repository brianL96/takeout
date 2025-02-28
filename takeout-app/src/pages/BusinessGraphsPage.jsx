import React from 'react'

import LineGraph from '../components/GraphComponents/LineGraph';
import BarGraph from '../components/GraphComponents/BarGraph';
import PieGraph from '../components/GraphComponents/PieGraph';

const BusinessGraphsPage = ({getTopSoldItems, getWeekRevenue}) => {

  return (
    <div className='flex flex-col justify-start items-center screen180:mt-20 mt-36 mb-40 w-full min-w-120 h-auto'>
      <div className='flex flex-row justify-center my-1 screen216:w-190 screen216:min-w-190 w-108 min-w-108 h-128 border border-black'>
        <PieGraph getTopSoldItems={getTopSoldItems}/>
      </div>
      <div className='flex flex-row justify-center my-1 screen216:w-190 screen216:min-w-190 w-108 min-w-108 h-128 border border-black'>
        <BarGraph getWeekRevenue={getWeekRevenue}/>
      </div>
      <div className='flex flex-row justify-center my-1 screen216:w-190 screen216:min-w-190 w-108 min-w-108 h-128 border border-black'>
        <LineGraph getWeekRevenue={getWeekRevenue}/>
      </div>
    </div>
  )
}

export default BusinessGraphsPage