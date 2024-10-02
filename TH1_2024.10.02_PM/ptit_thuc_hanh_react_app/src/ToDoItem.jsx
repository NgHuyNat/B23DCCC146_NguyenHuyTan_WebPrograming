import './style.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ToDoItem = (props) => {
  const handleEdit = () => {
    props.onEdit(props.id);
  };

  const handleDelete = () => {
    props.onDelete(props.id);
  };

  return (
    <div className="ToDoItem">
      <input type="checkbox" />
      <div className='ItemContent'>
        <p className='Title'>{props.title}</p>
        <p className='DueDate'>{props.dueDate}</p>
      </div>
      <div className='Action1'>
        <EditOutlined onClick={handleEdit} style={{ cursor: 'pointer' }} />
      </div>
      <div className='Action2'>
        <DeleteOutlined onClick={handleDelete} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
}

export default ToDoItem;
