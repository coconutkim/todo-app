import './TodoList.scss';
import TodoListItem from './TodoListItem';
import React from 'react';

const TodoList = ({todos, onRemove, onToggle}) => {
    return(
        <div className='TodoList'>
            {todos.map(todo => (
                <TodoListItem 
                todo={todo} 
                key={todo.id} 
                onRemove={onRemove}
                onToggle={onToggle}/>
            ))}
        </div>
    );
};

export default React.memo(TodoList);
//리스트로 사용되는 컴포넌트 자체를 최적화한다