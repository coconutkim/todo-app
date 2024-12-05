import { FaPlus } from "react-icons/fa";
//https://react-icons.github.io/react-icons/에서 필요한 아이콘을 찾아 import
import './TodoInsert.scss';
import { useCallback, useState } from "react";

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        e => {
            onInsert(value); 
            //현재 value 값을 파라미터로 넣어서 호출한다
            setValue('');
            //현재 value 값을 초기화
            //onSubmit 이벤트는 브라우저를 새로고침하는 성질을 지닌다
            //아래의 함수로 새로고침을 방지한다
            e.preventDefault();
        }, 
        [onInsert, value],
    );

    return(
        <form className='TodoInsert' onSubmit={onSubmit}>
            <input 
            placeholder='enter what you need to do'
            value={value}
            onChange={onChange}
            />
            <button type="submit">
                <FaPlus/>
            </button>
        </form>
    );
};

export default TodoInsert;