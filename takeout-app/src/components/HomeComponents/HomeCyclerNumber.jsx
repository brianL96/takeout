import React, { useEffect, useState } from 'react'

const HomeCyclerNumber = ({number, selected, index, changeSelectedIndex}) => {

    let [currentNumber, setCurrentNumber] = useState(-1);
    let [currentlySelected, setCurrentlySelected] = useState(false);
    let [currentIndex, setCurrentIndex] = useState(-1);


    useEffect(() => {
        setCurrentNumber(number);
        setCurrentlySelected(selected);
        setCurrentIndex(index);
    }, [number, selected, index]);

    function getSize(){
        if(currentlySelected){
            return 'text-3xl text-red-500'
        }
        return 'text-xl text-black';
    }

    let numberClick = (e) => {
        e.preventDefault();
        changeSelectedIndex(e);
    }

  return (
    <div value={`${currentIndex}`} onClick={(e) => {numberClick(e)}} className={`${getSize()} ml-5 cursor-pointer`}>{`${currentNumber}`}</div>
  )
}

export default HomeCyclerNumber