import React, { useState } from 'react';
import { CiSaveDown1 } from 'react-icons/ci';
import MenuSectionContainer from './MenuSectionContainer';

const EditorMenuSection = ({bigClientArray, addNewSection, setCurrentSectionTitle}) => {

    let [sectionName, setSectionName] = useState('');

    let addSection = (e) => {
        e.preventDefault();
        addNewSection(sectionName);
        setSectionName('');
    }

    return (
        <div className='flex flex-row justify-center h-auto w-full mt-10'>
            <div className='flex flex-col justify-start w-100 h-auto'>
                <form onSubmit={addSection} className='flex flex-col justify-start w-100 h-36 bg-indigo-200 border border-black'>
                    <div className='flex flex-row justify-center h-7 w-full bg-indigo-400'>
                        <h1>Add Section</h1>
                    </div>
                    <div className="flex flex-row justify-center items-center h-16 w-full"> 
                        <input type="text" required value={sectionName} onChange={(e) => setSectionName(e.target.value)} id="sectionName" className="w-3/4 h-12 mt-2 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter New Section Name" />
                    </div>
                    <div className='flex flex-row justify-center items-center h-11 w-full'>
                        <button className="flex flex-row justify-center items-center h-8 w-16 text-2xl rounded-md text-white bg-green-700"><CiSaveDown1/></button>
                    </div>
                </form>
                <MenuSectionContainer bigClientArray={bigClientArray} setCurrentSectionTitle={setCurrentSectionTitle}/>
            </div>

        </div>
    )
}

export default EditorMenuSection