import { useEffect, useState } from 'react';
import GridSquare from './GridSquare';

const GridRow = ({numberOfSquares, blocksArray, indexArray, filteredGuide}) => {

    let [tallerRow, setTallerRow] = useState('h-74');

    useEffect(() => {

        let size = filteredGuide.length;
        let length = indexArray.length;
        let i = 0;
        let makeTaller = false;
        if(size > 0){
            while(i < length){
                if(filteredGuide[indexArray[i]].filterMatches > 0){
                    setTallerRow('h-86');
                    makeTaller = true;
                    break;
                }
                i++;
            }
        }
        if(makeTaller === false){
            setTallerRow('h-74');
        }
        
    }, [filteredGuide]);

    

    function populateRow(){

        let filteredObject = null;
        let useFilteredObject = false;
        if(filteredGuide.length > 0){
            useFilteredObject = true;
        }
        let arr = [];
        let i = 0;
        while(i < numberOfSquares){
            if(useFilteredObject){
                filteredObject = filteredGuide[indexArray[i]];
            }
            arr.push(
                <GridSquare businessObject={blocksArray[indexArray[i]]} filteredObject={filteredObject}/>
            );
            i++;
        }
        return arr;
    }

    return (
        <div className={`flex flex-row justify-start items-center w-full ${tallerRow} mt-3 mb-3`}>
            {populateRow()}
        </div>
    );
}
 
export default GridRow;