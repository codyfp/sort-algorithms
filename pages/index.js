import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'

const array = [7, 12, 32, 2, 4, 6, 7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const randomArray = [...array].sort(() => Math.random() - 0.5)

// Selection Sort on an array
const selectionSort = (array) => {
	let minIndex
	let temp
	for (let i = 0; i < array.length; i++) {
		minIndex = i
		for (let j = i + 1; j < array.length; j++) {
			if (array[j] < array[minIndex]) {
				minIndex = j
			}
		}
		temp = array[i]
		array[i] = array[minIndex]
		array[minIndex] = temp
	}
	return array
}

// Bubble Sort on an array
const bubbleSort = (array) => {
	let temp
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - i - 1; j++) {
			if (array[j] > array[j + 1]) {
				temp = array[j]
				array[j] = array[j + 1]
				array[j + 1] = temp
			}
		}
	}
	return array
}

// Insertion Sort on an array
const insertionSort = (array) => {
	let temp
	for (let i = 1; i < array.length; i++) {
		for (let j = i; j > 0; j--) {
			if (array[j] < array[j - 1]) {
				temp = array[j]
				array[j] = array[j - 1]
				array[j - 1] = temp
			}
		}
	}
	return array
}

// Merge Sort on an array
const mergeSort = (array) => {
	if (array.length < 2) {
		return array
	}
	const middle = Math.floor(array.length / 2)
	const left = array.slice(0, middle)
	const right = array.slice(middle)
	return merge(mergeSort(left), mergeSort(right))
}
// merge two sorted arrays
const merge = (left, right) => {
	const array = []
	while (left.length && right.length) {
		if (left[0] < right[0]) {
			array.push(left.shift())
		} else {
			array.push(right.shift())
		}
	}
	return [...array, ...left, ...right]
}

// Quick Sort on an array
const quickSort = (array) => {
	if (array.length < 2) {
		return array
	}
	const pivot = array[0]
	const left = array.slice(1).filter((element) => element <= pivot)
	const right = array.slice(1).filter((element) => element > pivot)
	return [...quickSort(left), pivot, ...quickSort(right)]
}

// Heap Sort on an array
const heapSort = (array) => {
	let temp
	for (let i = Math.floor(array.length / 2); i >= 0; i--) {
		heapify(array, array.length, i)
	}
	for (let i = array.length - 1; i > 0; i--) {
		temp = array[i]
		array[i] = array[0]
		array[0] = temp
		heapify(array, i, 0)
	}
	return array
}
// Heapify on an array
const heapify = (array, size, i) => {
	let left = 2 * i + 1
	let right = 2 * i + 2
	let largest = i
	if (left < size && array[left] > array[largest]) {
		largest = left
	}
	if (right < size && array[right] > array[largest]) {
		largest = right
	}
	if (largest !== i) {
		let temp = array[i]
		array[i] = array[largest]
		array[largest] = temp
		heapify(array, size, largest)
	}
}


// Counting Sort on an array
const countingSort = (array) => {
	let max = Math.max(...array)
	let min = Math.min(...array)
	let count = []
	for (let i = min; i <= max; i++) {
		count[i] = 0
	}
	for (let i = 0; i < array.length; i++) {
		count[array[i]]++
	}
	let index = 0
	for (let i = min; i <= max; i++) {
		while (count[i] > 0) {
			array[index] = i
			index++
			count[i]--
		}
	}
	return array
}

// Bucket Sort on an array
const bucketSort = (array) => {
	let max = Math.max(...array)
	let min = Math.min(...array)
	let bucketSize = Math.floor((max - min) / array.length)
	let bucket = []
	for (let i = 0; i < array.length; i++) {
		bucket[i] = []
	}
	for (let i = 0; i < array.length; i++) {
		bucket[Math.floor((array[i] - min) / bucketSize)].push(array[i])
	}
	let index = 0
	for (let i = 0; i < bucket.length; i++) {
		bucket[i] = insertionSort(bucket[i])
		for (let j = 0; j < bucket[i].length; j++) {
			array[index] = bucket[i][j]
			index++
		}
	}
	return array
}


// Tim Sort on an array
const timSort = (array) => {
	let minRun = 32
	let size = array.length
	let temp
	while (size >= minRun) {
		let run = 0
		let temp
		while (run < size) {
			let start = run
			let end = Math.min(run + minRun, size)
			let runLength = end - start
			let left = start
			let right = end
			while (left < right) {
				if (array[left] > array[right]) {
					temp = array[left]
					array[left] = array[right]
					array[right] = temp
				}
				left++
				right--
			}
			run++
		}
		size = Math.max(minRun, size / 2)
	}
	return array
}

// Cocktail Sort on an array
const cocktailSort = (array) => {
	let swapped = true
	let start = 0
	let end = array.length - 1
	while (swapped) {
		swapped = false
		for (let i = start; i < end; i++) {
			if (array[i] > array[i + 1]) {
				temp = array[i]
				array[i] = array[i + 1]
				array[i + 1] = temp
				swapped = true
			}
		}
		if (!swapped) {
			break
		}
		swapped = false
		end--
		for (let i = end; i > start; i--) {
			if (array[i] < array[i - 1]) {
				temp = array[i]
				array[i] = array[i - 1]
				array[i - 1] = temp
				swapped = true
			}
		}
		start++
	}
	return array
}

// Comb Sort on an array
const combSort = (array) => {
	let gap = array.length
	let swapped = true
	while (gap > 1 || swapped) {
		gap = Math.floor(gap / 1.3)
		if (gap < 1) {
			gap = 1
		}
		swapped = false
		for (let i = 0; i + gap < array.length; i++) {
			if (array[i] > array[i + gap]) {
				let temp = array[i]
				array[i] = array[i + gap]
				array[i + gap] = temp
				swapped = true
			}
		}
	}
	return array
}

// Shell Sort on an array
const shellSort = (array) => {
	let gap = Math.floor(array.length / 2)
	while (gap > 0) {
		for (let i = 0; i + gap < array.length; i++) {
			if (array[i] > array[i + gap]) {
				let temp = array[i]
				array[i] = array[i + gap]
				array[i + gap] = temp
			}
		}
		gap = Math.floor(gap / 2)
	}
	return array
}

const gnomeSort = (array) => {
	let i = 0
	while (i < array.length) {
		if (i === 0 || array[i - 1] <= array[i]) {
			i++
		} else {
			let temp = array[i]
			array[i] = array[i - 1]
			array[i - 1] = temp
			i--
		}
	}
	return array
}

// Bogo Sort on an array
const bogoSort = (array) => {
	let sorted = false
	while (!sorted) {
		sorted = true
		for (let i = 0; i < array.length - 1; i++) {
			if (array[i] > array[i + 1]) {
				let temp = array[i]
				array[i] = array[i + 1]
				array[i + 1] = temp
				sorted = false
			}
		}
	}
	return array
}

// a custom class that prints an array in a nice format
class ArrayPrinter {
	constructor(array) {
		this.array = array
	}
	print() {
		let string = ''
		for (let i = 0; i < this.array.length; i++) {
			string += this.array[i] + ' '
		}
		return string
	}
}


export default function Home() {

	return (
		<div className={styles.container}>
			<h1> Testing copilot</h1>
			<div id="graph"
				stlye={{ width: "auto", height: "auto" }}>
				The Random Array is: {new ArrayPrinter(randomArray).print()}
				<br />
				Using selection Sort: {new ArrayPrinter(selectionSort(randomArray)).print()}
				<br />
				Using Bubble Sort: {new ArrayPrinter(bubbleSort(randomArray)).print()}
				<br />
				Using Insertion Sort: {new ArrayPrinter(insertionSort(randomArray)).print()}
				<br />
				Using Merge Sort: {new ArrayPrinter(mergeSort(randomArray)).print()}
				<br />
				Using Quick Sort: {new ArrayPrinter(quickSort(randomArray)).print()}
				<br />
				Using Heap Sort: {new ArrayPrinter(heapSort(randomArray)).print()}
				<br />
				Using Counting Sort: {new ArrayPrinter(countingSort(randomArray)).print()}
				<br />
				{/* Using Bucket Sort: {new ArrayPrinter(bucketSort(randomArray)).print()} */}
				<br />
				Using Tim Sort: {new ArrayPrinter(timSort(randomArray)).print()}
				<br />
				Using Cocktail Sort: {new ArrayPrinter(cocktailSort(randomArray)).print()}
				<br />
				Using Comb Sort: {new ArrayPrinter(combSort(randomArray)).print()}
				<br />
				Using Shell Sort: {new ArrayPrinter(shellSort(randomArray)).print()}
				<br />
				Using Gnome Sort: {new ArrayPrinter(gnomeSort(randomArray)).print()}
				<br />
				Using Bogo Sort: {new ArrayPrinter(bogoSort(randomArray)).print()}
			</div>
		</div>
	)
}
