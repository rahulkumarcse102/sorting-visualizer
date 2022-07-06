import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// change the value for speed of animations.
const ANIMATION_SPEED_MS = 3;

// change the value for number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromInterval(5,730));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for(let i=0;i<animations.length;i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i%3 !== 2;
            if(isColorChange) {
                const [barOneIdx,barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;      
        }, i * ANIMATION_SPEED_MS);
    } else {
        setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
        }, i + ANIMATION_SPEED_MS);
    }
    }
}

    quickSort() {

    }

    heapSort() {

    }

    bubbleSort() {

    }

    testSortingAlgorithms() {
        for(let i=0;i<100;i++){
            const array = [];
            const length = randomIntFromInterval(1,1000);
            for(let i =0;i<length;i++){
                array.push(randomIntFromInterval(-1000,1000));
            }
            const javaScriptSortedArray = this.state.array.slice().sort((a,b) => a - b);
            const mergesortedArray = getMergeSortAnimations(this.state.array);
            console.log(arraysAreEqual(javaScriptSortedArray,mergesortedArray)); 
        }
    }

    render() {
        const {array} = this.state;

        return (
            <>
                <div className="array-container">
                    {array.map((value, idx) =>(
                        <div 
                            className="array-bar"
                            key={idx}
                            style={{height: `${value}px`}}></div>
                    ))}
                    <button style = {{backgroundColor:'green'}} onClick={() => this.resetArray()}>Generate New Array</button>&nbsp;&nbsp;&nbsp;
                    <button style = {{backgroundColor:'blue'}} onClick={() => this.mergeSort()}>Merge Sort</button>&nbsp;&nbsp;&nbsp;
                    <button style = {{backgroundColor:'green'}} onClick={() => this.quickSort()}>Quick Sort</button>&nbsp;&nbsp;&nbsp;
                    <button style = {{backgroundColor:'blue'}} onClick={() => this.heapSort()}>Heap Sort</button>&nbsp;&nbsp;&nbsp;
                    <button style = {{backgroundColor:'green'}} onClick={() => this.bubbleSort()}>Bubble Sort</button>&nbsp;&nbsp;&nbsp;
                    <button style = {{backgroundColor:'red'}} onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
                </div>
            </>
        );
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne,arrayTwo){
    if(arrayOne.length!==arrayTwo.length)return false;
    for(let i=0;i<arrayOne.length;i++){
        if(arrayOne[i]!==arrayTwo[i])
        return false;
    }
    return true;
}