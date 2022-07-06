export function getMergeSortAnimations(array) {
    const animations = [];
    if(array.length <=1)return array;
    const auxilaryArray = array.slice();
    mergeSortHelper(array, 0 ,array.length - 1, auxilaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startInd,
    endInd,
    auxilaryArray,
    animations,
) {
  if(startInd === endInd)return;
  const middleInd = Math.floor((startInd + endInd)/2);
  mergeSortHelper(auxilaryArray, startInd, middleInd, mainArray, animations);
  mergeSortHelper(auxilaryArray, middleInd+1, endInd, mainArray, animations);
  doMerge(mainArray, startInd, middleInd, endInd, auxilaryArray, animations);
}

function doMerge(
    mainArray,
    startInd,
    middleInd,
    endInd,
    auxilaryArray,
    animations,
) {
    let k = startInd;
    let i = startInd;
    let j = middleInd+1;
    while(i<=middleInd && j<=endInd){
        // These are the values that we are compairing; we push them once 
        // to change their color
        animations.push([i, j]);
        // These are the valuse that we are compairing; we push them a second
        // time to revert their color 
        animations.push([i, j]);
        // We overwrite the values at index k in the original array with the 
        // value at index i in the auxilary array.
        if(auxilaryArray[i] <= auxilaryArray[j]){
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxilary array.
            animations.push([k, auxilaryArray[i]]);
            mainArray[k++] = auxilaryArray[i++];
        } else {

            // We overwrite the value at index k in the original array with the
            // value at index j in the auxilary array.
            animations.push([k, auxilaryArray[j]]);
            mainArray[k++] = auxilaryArray[j++];
        }
    }
    while(i <= middleInd) {
        // These are the values that we are compairing; we push thenm once 
        // to change their color.
        animations.push([i, i]);
        // These are the values that we are compairing; we push thenm second time
        // to change their color.
        animations.push([i, i]);
        // we overwrite the value at index k in original array with the 
        //value at index i in the auxilary array.
        animations.push([k, auxilaryArray[i]]);
        mainArray[k++] = auxilaryArray[i++];
    }
    while(j <= endInd){
        // These are the values that we are compairing; we push thenm once 
        // to change their color.
        animations.push([j, j]);
        // These are the values that we are compairing; we push thenm second time
        // to change their color.
        animations.push([j, j]);
        // we overwrite the value at index k in original array with the 
        //value at index j in the auxilary array.
        animations.push([k, auxilaryArray[j]]);
        mainArray[k++] = auxilaryArray[j++];
    }
}