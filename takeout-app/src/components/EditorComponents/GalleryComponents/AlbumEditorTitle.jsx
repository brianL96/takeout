import React, { useEffect, useState } from 'react'
import EditorAlbum from './EditorAlbum';

const AlbumEditorTitle = ({getAlbumItems, editAlbum, turnOffAlbumDeployment}) => {

    let [cardDepolyed, setCardDeployed] = useState('');
    let [editedWarning, setEditedWarning] = useState('hidden');

    function setEditedWarningMessage(value){
        setEditedWarning(value);
    }

    function setDeployedStatusMessage(value){
        setCardDeployed(value);
    }

    function getDeployedStatusMessage(){
        if(cardDepolyed === 'null'){
            return [<h1 key={'key-AlbumDeployedMessage'} className='ml-2'>You are not logged in.</h1>]; 
        }
        else if(cardDepolyed === 'true'){
            return [<h1 key={'key-AlbumDeployedMessage'} className='ml-2 text-green-700'>Your photo gallery is deployed and visible to other users.</h1>];
        }
        else if(cardDepolyed === 'false'){
            return [<h1 key={'key-AlbumDeployedMessage'} className='ml-2 text-red-700'>Your photo gallery is not deployed. Your business is not displaying any images.</h1>];
        }
        else{
            return [];
        }
    }

  return (
    <>
        <div className='flex flex-row justify-center w-full min-w-108 h-36 mt-10 ml-2 screen180:ml-0'>
            <div className='flex flex-col justify-start h-full screen216:w-216 screen216:min-w-216 w-108 min-w-108'>
                <div className='flex flex-row justify-start items-center h-12 w-full bg-white border-b border-gray-700'>
                    <h1 className='text-gray-500 pl-2 text-2xl'>Manage Your Photo Gallery:</h1>
                </div>
                <div className='flex flex-col justify-start h-24 w-full border-x border-black'>
                    <div className='w-9/10 h-1/2 pt-3'>
                        {getDeployedStatusMessage()}
                    </div>
                    <div className='w-9/10 h-1/2 pl-2'>
                        <h1 className={`text-base text-red-500 mt-9 screen216:mt-4 ${editedWarning}`}>Edited: Click 'Deploy' Or 'Update' To Save Changes.</h1>
                    </div>
                </div>
            </div>
        </div>
        <EditorAlbum getAlbumItems={getAlbumItems} editAlbum={editAlbum} turnOffAlbumDeployment={turnOffAlbumDeployment} setDeployedStatusMessage={setDeployedStatusMessage} editedWarning={editedWarning} setEditedWarningMessage={setEditedWarningMessage}/>
    </>
  )
}

export default AlbumEditorTitle