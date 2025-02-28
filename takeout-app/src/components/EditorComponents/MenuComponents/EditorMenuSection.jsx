import React, { useState } from 'react';
import { CiSaveDown1 } from 'react-icons/ci';
import MenuSectionContainer from './MenuSectionContainer';

const EditorMenuSection = ({bigClientArray, addNewSection, currentSectionTitle, setCurrentSectionTitle, deleteSection}) => {

    let [sectionName, setSectionName] = useState('');
    let [sectionNameError, setSectionNameError] = useState('');
    let [sectionNameBorder, setSectionNameBorder] = useState('border-gray-500');
    let [errorContainerSize, setErrorContainerSize] = useState('');

    function removeSectionNameError(){
        if(sectionNameError.length > 0){
          setSectionNameError('');
          setSectionNameBorder('border-gray-500');
          setErrorContainerSize('');
        }
      }
    
    function addSectionNameError(error){
        setSectionNameError(error);
        setSectionNameBorder('border-red-500');
        setErrorContainerSize('min-h-7');
    }

    let addSection = (e) => {
        e.preventDefault();

        if(sectionName.length === 0){
            addSectionNameError('Required');
            return;
        }
        else{
            removeSectionNameError();
        }

        let value = addNewSection(sectionName);
        if(value){
            setSectionName('');
            removeSectionNameError();
        }
        else{
            addSectionNameError('Section names must be unique');
        }
    }

    return (
        <div className='flex flex-row justify-center screen216:justify-start min-h-60 h-auto w-full mt-2'>
            <div className='flex flex-col justify-start w-100 min-h-60 h-auto'>

                <form onSubmit={addSection} className='flex flex-col justify-start w-100 min-h-24 h-auto bg-indigo-200 border border-black'>
                    <div className='flex flex-row justify-center h-7 w-full bg-indigo-400'>
                        <h1>Add Section</h1>
                    </div>

                    <div className='flex flex-row justify-start min-h-16 h-auto w-full'>
                        <div className="flex flex-row items-center h-full w-80"> 
                            <input type="text" value={sectionName} onChange={(e) => setSectionName(e.target.value)} id="sectionName" className={`ml-2 border ${sectionNameBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-72 p-2.5`} placeholder="Enter New Section Name" />
                        </div>
                        <div className='flex flex-row justify-start items-center h-full w-20'>
                            <button className="flex flex-row justify-center items-center h-9 w-14 text-2xl rounded-md text-white bg-green-700"><CiSaveDown1/></button>
                        </div>
                    </div>

                    <div className={`flex flex-row justify-start w-80 h-auto ${errorContainerSize}`}>
                        <h3 className='pl-4 text-red-600'>{sectionNameError}</h3>
                    </div>

                </form>
                <MenuSectionContainer bigClientArray={bigClientArray} currentSectionTitle={currentSectionTitle} setCurrentSectionTitle={setCurrentSectionTitle} deleteSection={deleteSection}/>

            </div>

        </div>
    )
}

export default EditorMenuSection