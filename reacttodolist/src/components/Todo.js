import React, {useState} from 'react';

const Todo = ({ text, todo, todos, setTodos }) => {
    //events
    const deleteHandler = () => {
        setTodos(todos.filter(el => el.id !== todo.id));
    };

    const completeHandler = () => {
        setTodos(todos.map((item) => {
            if(item.id === todo.id){
                return {
                    //keep all the other elements the same and flip the complete attribute
                    ...item, completed: !item.completed
                }
            }
            //in case nothing matched
            return item;
        }));
    };

    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text);

    const editHandler = () => {
        setIsEditing(true);
    };

    const handleTextChange = (event) => {
        setNewText(event.target.value);
    };

    const submitHandler = () => {
        setTodos(todos.map((item) => {
            if(item.id === todo.id){
                return {
                    ...item, text: newText
                }
            }
            return item;
        }));
        setIsEditing(false);
    };
    return(

        <div className="todo">
            {isEditing ?
                <div className="edit-container">
                    <input type="text" value={newText} onChange={handleTextChange} className="edit-input" />
                    <button onClick={submitHandler} className="save-btn"><i className="fas fa-save"></i></button>
                </div>
                :
                <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>{text}</li>}
                {isEditing ?<span></span>
                :
                <span className="todo-buttons">
                    <button onClick={completeHandler} className="complete-btn">
                        <i className="fas fa-check"></i>
                    </button>
                    <button onClick={deleteHandler} className="trash-btn">
                        <i className="fas fa-trash"></i>
                    </button>
                    <button onClick={editHandler} className="edit-btn">
                        <i className="fas fa-edit"></i>
                    </button>
                </span>}
        </div>
    );
}

export default Todo;