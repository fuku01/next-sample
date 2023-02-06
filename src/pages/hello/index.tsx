// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Button } from "@/components/Button"
import { Input } from "@material-tailwind/react"
import { useEffect, useState } from "react";
import { Checkbox } from "@material-tailwind/react";

type Todo = {
  id: number
  text: string
  isChecked: boolean
}

const Hello = () => {

  const [typing, setTyping] = useState<string>("")
  const [todoList, setTodoList] = useState<Todo[]>([])

  // id を指定するとCheckされる関数
  const checkTodo = (id: number) => {
    // todoListをループさせて、新しい配列newTodosを作成する
    const newTodos = todoList.map((todo) => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked;
      }
      return todo;
    });
    // newTodosをstateに入れる
    setTodoList(newTodos);
  };

  useEffect(() => {
    console.log(todoList);
  }, [todoList])

  return (
    <div className="h-screen bg-blue-50">
      <div className="text-2xl mb-2 text-center">Todo List</div>
      <div className="flex justify-center">
        <div className="w-96 mr-5 bg-white">
          <Input label="Add New Task" onChange={(e) =>     //入力した最新の文字列をtypingへ入れる
            setTyping(e.target.value)} />
        </div>

        <div onClick={() => {
          const newTodoList = Object.assign([], todoList) //stateの配列データ(todoList)を、純粋な配列データ(newTodoList)にする
          newTodoList.push({                     //pushで、newTodoListの配列データに各オブジェクトを追加する（オブジェクトの型はTodoで指定）
            id: newTodoList.length,
            text: typing,
            isChecked: false
          })
          setTodoList(newTodoList)
        }} >
          <Button name={"追加"} />
        </div>
      </div>

      {
        todoList.map((value) => {
          return (
            <div key={value.id}
              onClick={() => {
                console.log(value.id);
                checkTodo(value.id)
              }}
              className={value.isChecked ? "text-blue-500" : "text-red-500"}
            >{value.text}</div>
          )
        })
      }

    </div>
  )

}

export default Hello