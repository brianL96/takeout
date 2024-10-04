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
    <div onClick={(e) => {changeSelectedIndex(e)}} value={currentIndex} className={`flex flex-col justify-start ml-4 h-full w-32 `}>
        <div className='w-full h-28 cursor-pointer'>
            <img className={`h-full w-full object-contain ${currentBorder}`} src={currentImage} alt="Selected Image"></img>
        </div>
        <div className='w-full flex flex-row justify-center flex-wrap h-10 mt-1 text-sm'>{currentTitle}</div>
    </div>
  )
}

export default ImageSelectorItem