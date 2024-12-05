import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdRemoveCircleOutline } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import './TodoListItem.scss';
import cn from 'classnames';
import React from 'react';

const TodoListItem = ({todo, onRemove, onToggle}) => {
    const {id, text, checked} = todo;

    return(
        <div className='TodoListItem'>
            <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
                {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
                <div className="text">{text}</div>
            </div>
            <div className="remove" onClick={() => onRemove(id)}>
                <MdRemoveCircleOutline/>
            </div>
        </div>
    );
};

export default React.memo(TodoListItem);
//여기서 이벤트가 호출되기 위해서는 todolist를 거쳐야 한다