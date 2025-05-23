
import { useEffect, useState } from 'react';
import GridRow from './GridRow';
import { GridLoader } from 'react-spinners';

const GridHome = ({blocksArray, filteredGuide, currentSection}) => {

    let [gridSetup, setGridSetup] = useState([]);

    useEffect(() => {

        setTimeout(() => {
            setGridSetup(getNumberOfRows());
        }, 650);

        setGridSetup([
            <div key={'Key-GridLoader'} className={`bg-neutral-100 flex flex-row justify-center w-120 screen216:w-210 h-180 mx-auto mb-7 overflow-y-auto overscroll-contain`}>
                <GridLoader
                    className='mt-40'
                    color={'mediumspringgreen'}
                />
            </div>
        ]);

    }, [blocksArray, filteredGuide, currentSection])

    function printANumber(number){
        console.log("I will not print a number:");
        console.log(number);
    }

    function timerDelay(){


    }

    function printArr(){
        console.log(blocksArray);
        console.log("LOOK HERE FOR THE CURRENT GRID SECTION:");
        console.log(currentSection);
    }

    function findStartIndex(){
        // section 0 covers indexes 0, 1, 2, 3, 4, 5 (0 - 5)
        // section 1 covers indexes 6, 7, 8, 9, 10, 11
        // so we do section_num * 6, that's our first number, then we 1 to it 5 times to get the rest of the indexes
        // issue: some previous squares may not be deployed, so we can't use this system.
        // rather, use the section to note how many squares need to be behind this following section
        // just do section_num * 6 to get that number
        let pastSquares = currentSection * 6;
        let startIndex = 0;
        let blockLength = blocksArray.length;
        while(pastSquares > 0 && startIndex < blockLength){
            if(blocksArray[startIndex].deployed){
                pastSquares--;
            }
            startIndex++;
        }
        return startIndex;
    }

    function getNumberOfRows(){
        let displayLimit = 6;
        let startIndex = findStartIndex(); //this is the index that'll go through blockArray
        let gridRowContainer = [];//this is just the array that holds all the rows I'll be displaying
        let blocksLength = blocksArray.length; //just used to make sure startIndex doesn't go past this
        let inRowNum = 0; //how many squares will be in this row.
        let inRowIndexes = [];//this holds all the indexes of blockArray that the row will have to display
        let maxPerRow = 3; //the max amount of squares per row

        

        while(startIndex < blocksLength && displayLimit > 0){
            while(inRowNum < maxPerRow && startIndex < blocksLength){
                if(blocksArray[startIndex].deployed){
                    inRowIndexes.push(startIndex);
                    inRowNum++;
                }
                startIndex++;
            }

            displayLimit = displayLimit - inRowNum;
            
            if(inRowNum > 0){
                let keyIndex = gridRowContainer.length;
                gridRowContainer.push(
                    <GridRow key={`${keyIndex}`} numberOfSquares={inRowNum} blocksArray={blocksArray} indexArray={[...inRowIndexes]} filteredGuide={filteredGuide}/>
                );
            }

            inRowNum = 0;
            inRowIndexes.splice(0, inRowIndexes.length);
        }

      

        return gridRowContainer;
    }


    return (
        <div className={`flex flex-col justify-between bg-neutral-100 w-120 screen216:w-216 screen216:h-184 h-auto mx-auto border-2 border-solid border-neutral-300 mb-7 overflow-y-auto overscroll-contain`}>
            {/*getNumberOfRows()*/}
            {gridSetup}
        </div>
        
    );
}
 
export default GridHome;