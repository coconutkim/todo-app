import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import { useCallback, useReducer, useRef, useState } from "react";

function createBulkTodos() {
  //데이터 2500개를 자동으로 생성한다
  const array = [];
  for (let i = 1; i <= 2500; i++){
    array.push({
      id: i,
      text: `to do ${i}`,
      //템플릿 리터럴은 작은따옴표가 아닌 백틱으로 감싸야 한다
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch(action.type){
    case 'INSERT':
      //{type: 'INSERT', todo: {id: 1, text: 'todo', checked: false} }
      return todos.concat(action.todo);
    case 'REMOVE': 
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.id ? {...todo, checked: !todo.checked} : todo,
      );
      default:
        return todos;
  }
}

const App = () => {
  //const [todos, setTodos] = useState(createBulkTodos);
  //컴포넌트가 처음 렌더링될 대만 bulktodos 함수가 실행된다
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  //   {
  //     id: 1, //새로운 항목을 만들 때 참조되는 값
  //     //화면에 보일 필요가 없어 렌더링하지 않는다
  //     text: 'study basic of react',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: 'style the components',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: 'create managing schedule app',
  //     checked: false,
  //   },
  // ]);

  const nextId = useRef(2501);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({type: 'INSERT', todo});
      //어떻게 업데이트할지 정의해주는 업데이트 함수를 넣어준다
      //setTodos(todos => todos.concat(todo));
      nextId.current += 1;
    }, []);

  //아이디를 파라미터로 받아와서 같은 아이디를 가진 항목을 삭제
  const onRemove = useCallback(
    id => {
      //setTodos(todos => todos.filter(todo => todo.id !== id));
      dispatch({type: 'REMOVE', id});
    }, []);

  const onToggle = useCallback(
    id => {
      // setTodos(todos =>
      //   todos.map(todo => //맵을 이용해 각 항목을 순회한다
      //     todo.id === id ? {...todo, checked: !todo.checked} : todo,
      //     //todo.id === id 현재 파라미터로 사용된 아이디 값이 같을 때
      //     //checked 값을 반전시킨다
      //     //아니면 받아왔던 상태 그대로 반환한다
      //   ),
      // );
      dispatch({type: 'TOGGLE', id});
    }, []);

  return(
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;