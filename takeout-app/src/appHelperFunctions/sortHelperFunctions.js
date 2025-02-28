export function removePunctuationCheck(filterWord, word){

    let size = word.length;

    if(size > 1){
      if(filterWord === word.slice(0, size - 1)){
        return true;
      }
    }

    if(size > 2){
      if('(' === word.charAt(0) && ')' === word.charAt(size - 1) && filterWord === word.slice(1, size - 1)){
        return true;
      }
    }
    return false;

}

export function checkFilterMatch(filterItem, itemName, itemDescription){

    let filterSentence = filterItem.toLowerCase().split(" ");
    let nameSentence = itemName.toLowerCase().split(" ");
    
    let nameLength = nameSentence.length;
    let nameIndex = 0;

    if(nameLength > 0 && nameSentence[0] !== ""){

      while(nameIndex < nameLength){

        if(nameSentence[nameIndex] === filterSentence[0] || removePunctuationCheck(filterSentence[0], nameSentence[nameIndex])){

          let filterLength = filterSentence.length;
          let filterIndex = 1;
          let copyNameIndex = nameIndex + 1;
          let nameMatch = true;
          while((filterIndex < filterLength) && (copyNameIndex < nameLength)){
            if(nameSentence[copyNameIndex] !== filterSentence[filterIndex]){
              if(removePunctuationCheck(filterSentence[filterIndex], nameSentence[copyNameIndex]) === false){
                nameMatch = false;
                break;
              }
            }
            filterIndex++;
            copyNameIndex++;
          }

          if(nameMatch){
            return true;
          }

        }
        nameIndex++;
     }

    }

    let descriptionSentence = itemDescription.toLowerCase().split(" ");
    let descriptionLength = descriptionSentence.length;
    let descriptionIndex = 0;

    if(descriptionLength > 0 && descriptionSentence[0] !== ""){

      while(descriptionIndex < descriptionLength){

        if(descriptionSentence[descriptionIndex] === filterSentence[0] || removePunctuationCheck(filterSentence[0], descriptionSentence[descriptionIndex])){

          let filterLength = filterSentence.length;
          let filterIndex = 1;
          let copyDescriptionIndex = descriptionIndex + 1;
          let descriptionMatch = true;
          while((filterIndex < filterLength) && (copyDescriptionIndex < descriptionLength)){
            if(descriptionSentence[copyDescriptionIndex] !== filterSentence[filterIndex]){
              if(removePunctuationCheck(filterSentence[filterIndex], descriptionSentence[copyDescriptionIndex]) === false){
                descriptionMatch = false;
                break;
              }
            }
            filterIndex++;
            copyDescriptionIndex++;
          }

          if(descriptionMatch){
            return true;
          }

        }
        descriptionIndex++;
     }
     
    }
    
}

export function insertIntoFilteredArray(array, item){

    let newList = null;
    let resultArray = [...array];
    let resultIndex = 0;
    let size = resultArray.length;
    let foundIndex = -1;

    while(resultIndex < size){
      if(item.filterMatches > resultArray[resultIndex].filterMatches){
        foundIndex = resultIndex;
        break;
      }
      if(item.filterMatches === resultArray[resultIndex].filterMatches && item.totalMatches > resultArray[resultIndex].totalMatches){
        foundIndex = resultIndex;
        break;
      }
      resultIndex++;
    }

    if(foundIndex === -1){
     
      newList = [...array, item];
    }
    else if(foundIndex === 0){
      newList = [item, ...array];
    }
    else{
      newList = [...array.slice(0, foundIndex), item, ...array.slice(foundIndex)];
    }

    return newList;

}