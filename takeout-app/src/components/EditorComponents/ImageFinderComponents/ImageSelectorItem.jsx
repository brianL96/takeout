import React, { useEffect, useState } from 'react'

const ImageSelectorItem = ({squareImage, squareTitle, squareBorder, squareIndex, changeSelectedIndex}) => {

    let [currentImage, setCurrentImage] = useState('');
    let [currentTitle, setCurrentTitle] = useState('');
    let [currentBorder, setCurrentBorder] = useState('');
    let [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {

        setCurrentImage(squareImage);
        setCurrentTitle(squareTitle);
        setCurrentBorder(squareBorder);
        setCurrentIndex(squareIndex);

    }, [squareImage, squareTitle, squareBorder, squareIndex]);

  return (
    <div onClick={(e) => {changeSelectedIndex(e)}} value={currentIndex} className={`flex flex-col justify-start ml-4 min-h-40 h-auto w-32 `}>
        <div className='w-full h-28 cursor-pointer'>
          <img className={`h-full w-full object-contain ${currentBorder}`} src={currentImage} alt="Selected Image"></img>
        </div>
        <div className='w-full flex flex-row justify-center flex-wrap min-h-10 h-auto mt-1 text-sm'>
          <div className='h-auto min-h-10 w-auto max-w-28 break-words text-wrap overflow-visible pt-3 pb-3'>
            {currentTitle}
          </div>
        </div>
    </div>
  )
}

export default ImageSelectorItem