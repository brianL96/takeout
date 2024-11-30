import React, { useState } from 'react';
import { CiSaveDown1 } from 'react-icons/ci';
import MenuSectionContainer from './MenuSectionContainer';

const EditorMenuSection = ({bigClientArray, addNewSection, setCurrentSectionTitle, deleteSection}) => {

    let [sectionName, setSectionName] = useState('');

    let addSection = (e) => {
        e.preventDefault();
        let value = addNewSection(sectionName);
        if(value){
            setSectionName('');
        }
    }

    return (
        <div className='flex flex-row justify-center screen216:justify-start h-60 w-full mt-2'>
            <div className='flex flex-col justify-start w-100 h-60'>
                <form onSubmit={addSection} className='flex flex-col justify-start w-100 h-24 bg-indigo-200 border border-black'>
                    <div className='flex flex-row justify-center h-7 w-full bg-indigo-400'>
                        <h1>Add Section</h1>
                    </div>
                    <div className='flex flex-row justify-start h-16 w-full'>
                        <div className="flex flex-row items-center h-full w-80"> 
                            <input type="text" required value={sectionName} onChange={(e) => setSectionName(e.target.value)} id="sectionName" className=" ml-2 w-72 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter New Section Name" />
                        </div>
                        <div className='flex flex-row justify-start items-center h-full w-20'>
                            <button className="flex flex-row justify-center items-center h-9 w-14 text-2xl rounded-md text-white bg-green-700"><CiSaveDown1/></button>
                        </div>
                    </div>
                </form>
                <MenuSectionContainer bigClientArray={bigClientArray} setCurrentSectionTitle={setCurrentSectionTitle} deleteSection={deleteSection}/>
            </div>

        </div>
    )
}

export default EditorMenuSection