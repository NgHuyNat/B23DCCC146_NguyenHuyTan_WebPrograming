import React, { useState } from 'react';
import { updateTodo, deleteTodo,updateCheckbox } from '../../config/apiConfig';
import Modal from "../Modal/Modal";
import '../../../src/index.css';

function TodoItem({ todo, getAllTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedDuedate, setEditedDuedate] = useState(todo.due_date);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);

  const handleToggleComplete = async () => {
    try {
      const newCompleted = completed === 1 ? 0 : 1;
      const updatedTodo = {
        ...todo,
        completed: newCompleted
      };
      console.log(updatedTodo);
      await updateCheckbox(updatedTodo);
      setCompleted(newCompleted);
      getAllTodos();
    } catch (error) {
      console.error('Error toggling complete:', error);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todo.id);
      getAllTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleSave = async () => {
    if (!editedTitle.trim()) {
      alert('Title is required.');
      return;
    }
    if (!editedDescription.trim()) {
      alert('Description is required.');
      return;
    }
    if (!editedDuedate) {
      alert('Due date is required.');
      return;
    }
    try {
      await updateTodo({
        ...todo,
        title: editedTitle,
        description: editedDescription,
        due_date: editedDuedate,
        completed
      });
      setIsEditing(false);
      setIsModalOpen(false);
      getAllTodos();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  return (
    <>
      <tr>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>{todo.due_date || "N/A"}</td>
        <td>
          <input
            type="checkbox"
            checked={completed === 1}
            onChange={handleToggleComplete}
          />
        </td>
        <td>
          <button onClick={() => { setIsModalOpen(true); setIsEditing(false); }}>View</button>
        </td>
        <td>
          <button onClick={() => { setIsModalOpen(true); setIsEditing(true); }}>Edit</button>
          <button onClick={handleDeleteTodo}>Delete</button>
        </td>
      </tr>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setIsEditing(false); }}>
        <div className="table-addTodo">
          <h2>{isEditing ? "Edit Todo" : "View Todo"}</h2>
          {isEditing && (
            <>
              <div className="input-text">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Edit title"
                />
              </div>

              <div className="input-text">
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Edit description"
                />
              </div>

              <div className="input-text">
                <input
                  type="date"
                  value={editedDuedate}
                  onChange={(e) => setEditedDuedate(e.target.value)}
                />
              </div>

            </>
          )}
          <div className="modal-buttons">
            <button onClick={handleSave} className="small-button">Save</button>
            <button onClick={() => { setIsModalOpen(false); setIsEditing(false); }} className="small-button">Close</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TodoItem;
