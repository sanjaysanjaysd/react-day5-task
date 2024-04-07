import React, { useState, useEffect } from 'react';

function TodoApp() {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [editIndex, setEditIndex] = useState(null);
    const [editTaskName, setEditTaskName] = useState('');
    const [editTaskDescription, setEditTaskDescription] = useState('');
    const [editTaskStatus, setEditTaskStatus] = useState('');

    // Load todos from local storage on component mount
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    // Save todos to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTask = () => {
        if (taskName.trim() !== '' && taskDescription.trim() !== '') {
            const newTodo = {
                taskName: taskName.trim(),
                taskDescription: taskDescription.trim(),
                status: 'pending'
            };
            setTodos([...todos, newTodo]);
            setTaskName('');
            setTaskDescription('');
        } else {
            alert('Please enter task name and description.');
        }
    }

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditTaskName(todos[index].taskName);
        setEditTaskDescription(todos[index].taskDescription);
        setEditTaskStatus(todos[index].status);
    }

    const handleSave = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].taskName = editTaskName;
        updatedTodos[index].taskDescription = editTaskDescription;
        updatedTodos[index].status = editTaskStatus;
        setTodos(updatedTodos);
        setEditIndex(null);
        setEditTaskName('');
        setEditTaskDescription('');
        setEditTaskStatus('');
    }

    const handleDelete = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    }

    const filteredTodos = filter === 'all' ? todos :
        filter === 'completed' ? todos.filter(todo => todo.status === 'completed') :
            todos.filter(todo => todo.status === 'pending');

    return (
        <>
            <div className="container-fluid text-center">
                <h1>ToDo</h1>
            </div>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="input-section">
                        <input className="col-sm-12 col-md-4 col-lg-4 col-xl-4 d-inline-block p-1 m-0"
                            type="text"
                            placeholder="Enter task name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <input className="col-sm-12 col-md-6 col-lg-6 col-xl-6 d-inline-block p-1 mt-2"
                            type="text"
                            placeholder="Enter task description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                        <button className='d-none d-md-inline-block d-lg-inline-block d-xl-inline-block btn1 col-sm-4 col-md-2 col-lg-2 bg-success border rounded-2 fw-bolder text-white m-0 p-1' onClick={handleAddTask}>Add Task</button>

                        <div className="col-sm-12 d-sm-inlne-block d-md-none d-lg-none d-flex justify-content-center">

                            <button className='d-inline-block  d-lg-none  btn1 col-sm-4 col-md-2 col-lg-2 bg-success border rounded-2 fw-bolder text-white p-2' onClick={handleAddTask}>Add Task</button>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 d-flex justify-content-between mt-5">
                        <div className="col-sm-6">
                            <h5>My ToDos</h5>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end">
                            <h5>Status Filter :</h5>
                            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="all">All</option>
                                <option className='Completed' value="completed">Completed</option>
                                <option className='Pending' value="pending">Pending</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div id="todo-list">
                    <div className='row'>
                        {filteredTodos.map((todo, index) => (
                            <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3" key={index}>
                                {editIndex === index ? (
                                    <div>
                                        <div className="card h-100">
                                        <input className='p-1'
                                            type="text"
                                            value={editTaskName}
                                            onChange={(e) => setEditTaskName(e.target.value)}
                                        />
                                        <input className='mt-3 p-1'
                                            type="text"
                                            value={editTaskDescription}
                                            onChange={(e) => setEditTaskDescription(e.target.value)}
                                        />
                                        <div className="d-flex justify-content-center ">

                                        <select className='mt-4'
                                            value={editTaskStatus}
                                            onChange={(e) => setEditTaskStatus(e.target.value)}
                                            >
                                            <option className='Completed' value="completed">Completed</option>
                                            <option className='Pending' value="pending">Pending</option>
                                        </select>
                                        <button className='save mt-4' onClick={() => handleSave(index)}>Save</button>
                                            </div>
                                    </div>
                                    </div>
                                ) : (

                                    <div>
                                        <div className="card h-100">
                                            <div className="fw-bolder p-2">Name : {todo.taskName}</div>
                                            <div className="fw-bolder p-2">Description : {todo.taskDescription}</div>
                                            <div className="fw-bolder p-2">Status :
                                                <select
                                                    value={todo.status}
                                                    onChange={(e) => {
                                                        const updatedTodos = [...todos];
                                                        updatedTodos[index].status = e.target.value;
                                                        setTodos(updatedTodos);
                                                    }}
                                                >
                                                    <option value="completed">Completed</option>
                                                    <option value="pending">Pending</option>
                                                </select>
                                            </div>

                                        <div className="col-12 d-flex">
                                            <div className='col-6'><button onClick={() => handleEdit(index)} className='Edit fw-bolder text-white'>Edit</button></div><div className='col-6'><button className='Delete fw-bolder text-white' onClick={() => handleDelete(index)}>Delete</button></div>
                                        </div>
                                    </div>
                                        </div>

                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodoApp;