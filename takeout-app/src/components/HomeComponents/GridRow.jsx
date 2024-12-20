import { useEffect, useState } from 'react';
import GridSquare from './GridSquare';

const GridRow = ({numberOfSquares, blocksArray, indexArray, filteredGuide}) => {

    let [tallerRow, setTallerRow] = useState('min-h-74');

    useEffect(() => {

        let size = filteredGuide.length;
        let length = indexArray.length;
        let i = 0;
        let makeTaller = false;
        if(size > 0){
            while(i < length){
                if(filteredGuide[indexArray[i]].filterMatches > 0){
                    setTallerRow('min-h-86');
                    makeTaller = true;
                    break;
                }
                i++;
            }
        }
        if(makeTaller === false){
            setTallerRow('min-h-74');
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
        <div className={`flex screen216:flex-row flex-col justify-start items-center w-full h-auto ${tallerRow} screen216:mt-3 screen216:mb-3`}>
            {populateRow()}
        </div>
    );
}
 
export default GridRow;