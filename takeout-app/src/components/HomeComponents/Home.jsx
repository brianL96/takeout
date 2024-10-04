
import { useEffect, useState } from 'react';
import GridHome from './GridHome';


const Home = ({blocksArray, filteredGuide, currentSection}) => {

    let [sendingList, setSendingList] = useState([...blocksArray]);
    
    useEffect(() => {

        let arr = [];
        if(filteredGuide.length === 0){
            setSendingList([...blocksArray]);
        }
        else{
            filteredGuide.map((x) => {
                arr.push(blocksArray[x.businessIndex]);
            });
            setSendingList([...arr]);
        }
        
    }, [blocksArray, filteredGuide]);

    return (
        <div className='mt-10 mb-20'>
            <GridHome blocksArray={sendingList} filteredGuide={filteredGuide} currentSection={currentSection}/>
        </div>
    );
}
 
export default Home;
