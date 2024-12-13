import React, { useEffect, useState } from "react";
import { getTodos, addTodo } from '../../config/apiConfig';
import TodoItem from "../TodoItem/TodoItem";
import Modal from "../Modal/Modal";
import '../../../src/index.css';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        title: "",
        description: "",
        due_date: "",
        completed: 0
    });
    const [newOwner, setNewOwner] = useState({
        name: "",
        email:"",
        mobile: "",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAllTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        getAllTodos();
    }, []);

    const handleAddTodo = async () => {
        if (!newTodo.title.trim()) {
            alert("Title is required.");
            return;
        }
        if (!newTodo.description.trim()) {
            alert("Description is required.");
            return;
        }
        if (!newTodo.due_date) {
            alert("Due date is required.");
            return;
        }
        try {
            const todo = {
                title: newTodo.title,
                description: newTodo.description,
                due_date: newTodo.due_date,
                completed: newTodo.completed
            };
            const data = await addTodo(todo);
            setTodos([...todos, data]);
            setNewTodo({ title: "", description: "", due_date: "", completed: 0 });
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
        getAllTodos();
    };

    return (
        <div className="app-todo">
            <h1>Todo List</h1>

            <div className="floating-container">
                <table className="table-todos" border='0' cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Completed</th>
                            <th>Owner</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos
                            .filter((todo) => todo.title && todo.description && todo.due_date)
                            .map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    setTodos={setTodos}
                                    todos={todos}
                                    getAllTodos={getAllTodos}
                                />
                            ))}
                    </tbody>
                </table>
                <div className="button-container">
                    <button className="add-button" onClick={() => setIsModalOpen(true)}>Add Todo</button>
                    <button className="add-button" onClick={() => setIsModalOpen(true)}>Add Owner</button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="table-addTodo">
                    <h2 className="header-addnew">Add New Todo</h2>
                    <div className="input-text">
                        <input
                            type="text"
                            value={newTodo.title}
                            placeholder="New Title"
                            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                        />
                    </div>
                    <div className="input-text">
                        <input
                            type="text"
                            value={newTodo.description}
                            placeholder="New Description"
                            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                        />
                    </div>
                    <div className="input-text">
                        <input
                            type="date"
                            value={newTodo.due_date}
                            onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
                        />
                    </div>

                    <div className="modal-buttons">
                        <button onClick={handleAddTodo} className="small-button">Save</button>
                        <button onClick={() => setIsModalOpen(false)} className="small-button">Close</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="table-addTodo">
                    <h2 className="header-addnew">Add New Owner</h2>
                    <div className="input-text">
                        <input
                            type="text"
                            value={newTodo.title}
                            placeholder="New Title"
                            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                        />
                    </div>
                    <div className="input-text">
                        <input
                            type="text"
                            value={newTodo.description}
                            placeholder="New Description"
                            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                        />
                    </div>
                    <div className="input-text">
                        <input
                            type="date"
                            value={newTodo.due_date}
                            onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
                        />
                    </div>

                    <div className="modal-buttons">
                        <button onClick={handleAddTodo} className="small-button">Save</button>
                        <button onClick={() => setIsModalOpen(false)} className="small-button">Close</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TodoList;
