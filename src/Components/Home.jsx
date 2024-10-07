import React, { useEffect, useState } from 'react'
import Task from './Task';

const Home = () => {

    const initialArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []; // getItem() method takes a key as an argument and returns the associated value

    const [tasks, setTasks] = useState(initialArray);  // This is used to access the value 
    const [title, setTitle] = useState("")  // This is used to access the value
    const [description, setDescription] = useState("")   // This is used to access the value

    const submithandler = (e) => {
        e.preventDefault();  // This stops the default function of sumbit function, that is, it stops relaoding the page
        setTasks([...tasks,  // In React JS, setTasks() updates the state of tasks data by passing an array into it. This array is created by copying the existing array and adding a new object at the end.
        { title, description }]);
        setTitle("");
        setDescription("");
    // e.target.value = It represents the DOM element upon which the event occurred. For instance, in an event listener for a button click, if the user clicks the button, `e. target` would point to that specific button element.
};

    const deleteTask = (index) => {  // The filter() method creates a new array filled with elements that pass a test provided by a function
        const filteredArr = tasks.filter((val,i) => {  // the filter() method is used to filter an array of objects and create a new array with elements that pass a test
            return i !== index;
        });

        setTasks(filteredArr);
    }   

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
    <div className='container'>
    <h1>
        DAILY GOALS
    </h1>
    <form onSubmit={submithandler}>
        <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value )}/>
        <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value )} ></textarea>
        <button type="submit">ADD</button>  {/* The moment we will click on this ADD button the page will reload because we have given it the type submit and after clicking on ADD it submits and hence reloads the page */}
    </form>

    {tasks.map((item, index) => (  // map() is a method of the Array object. It creates a new array by calling a function on every element of the original array and storing the results in a new array.
        <Task  key={index} title={item.title} description={item.description} deleteTask={deleteTask} index = {index} />
    ))}
    </div>
    );
};

export default Home