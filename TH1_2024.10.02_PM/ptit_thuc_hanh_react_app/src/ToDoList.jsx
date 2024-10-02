import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import { PlusCircleOutlined } from '@ant-design/icons';

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Gửi email nộp bài tập về nhà", dueDate: "Hôm nay" },
    { id: 2, title: "Học từ vựng tiếng anh mỗi ngày", dueDate: "Ngày mai" },
    { id: 3, title: "Viết tiểu luận môn Triết học", dueDate: "Tuần tới" }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

  const addTask = () => {
    if (newTitle && newDueDate) {
      if (editTaskId) {
        setTasks(tasks.map(task =>
          task.id === editTaskId
            ? { ...task, title: newTitle, dueDate: newDueDate }
            : task
        ));
        setEditTaskId(null); 
      } else {
        const newTask = {
          id: tasks.length + 1,
          title: newTitle,
          dueDate: newDueDate
        };
        setTasks([...tasks, newTask]);
      }
      setNewTitle('');
      setNewDueDate('');
    }
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setNewTitle(taskToEdit.title);
      setNewDueDate(taskToEdit.dueDate);
      setEditTaskId(id); 
    }
  };

  return (
    <div className="ToDoList" style={{ marginLeft: '10px' }}>
      <h1>My work 🎯</h1>
      <div>
        {tasks.map(task => (
          <ToDoItem
            key={task.id}
            id={task.id}
            title={task.title}
            dueDate={task.dueDate}
            onEdit={editTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
      <div style={{ marginTop: '5px' }}>
        <input
          type="text"
          placeholder="Task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Due date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <PlusCircleOutlined
          onClick={addTask}
          style={{ fontSize: '20px', color: '#d1453b', cursor: 'pointer' }}
        /> {editTaskId ? 'Save Task' : 'Add Task'}
      </div>
    </div>
  );
};

export default ToDoList;
