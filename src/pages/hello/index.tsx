// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Button, RedButton } from "@/components/Button";
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Checkbox } from "@material-tailwind/react";
// サーバーとのやり取りをするためのライブラリ
import axios from "axios";

// 事前に型を定義しておく
type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

type TodoResponse = {
  ID: number;
  text: string;
};

const Hello = () => {
  // さこが作ったAPI
  const baseURL = "http://localhost:5003";

  // useState(変数的なやつ)
  const [typing, setTyping] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

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
  // データベースに入っている配列をAPIで持ってきて、リストを初期表示させるための処理
  const getTodoList = () => {
    axios.get(baseURL + "/todos").then((response) => {
      const getList: Todo[] = response.data.map((item: TodoResponse) => {
        return {
          id: item.ID,
          text: item.text,
          isChecked: false,
        };
      });

      setTodoList(getList);
    });
  };

  // 特定のidをtodolistから削除する関数
  const postTodoList = (text: string) => {
    axios.post(baseURL + "/todo", { text: text }).then(() => {
      getTodoList();
    });
  };

  // 特定のidをtodolistから削除する関数
  const deleteTodoList = (id: number) => {
    axios.delete(baseURL + "/todo/" + id).then(() => {
      getTodoList();
    });
  };

  // データベースに入っている配列をAPIで持ってきて、リストを初期表示させるための処理
  useEffect(() => {
    getTodoList();
  }, []);

  // コンソールログで配列の中身確認する用
  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return (
    // タイトル表示
    <div className="h-screen bg-blue-50">
      <div className="text-2xl pt-2 mb-2 text-center">Todo List</div>

      {/* 入力フォーム */}
      <div className="flex justify-center">
        <div className="w-96 mr-5 bg-white rounded-md">
          <Input
            color="green"
            label="Add New Task"
            onChange={(
              e //入力した最新の文字列をtypingへ入れる
            ) => setTyping(e.target.value)}
          />
        </div>

        {/* 追加ボタン */}
        <div
          onClick={() => {
            postTodoList(typing);
          }}
        >
          <Button name={"追加"} />
        </div>
      </div>

      {/* //白いエリアを作成して、それを中央寄せしてレイアウトを整える*/}
      <div className="w-1/3 mx-auto mt-8 bg-white rounded-md divide-y divide-gray-400 divide-dashed">
        {/* todoリストの表示 */}
        {todoList.map((value) => {
          return (
            <div key={value.id} className="flex items-center">
              {/* チェックボタン */}
              <div
                onClick={() => {
                  checkTodo(value.id);
                }}
              >
                <Checkbox
                  id={String(value.id)}
                  checked={value.isChecked}
                  color="green"
                  defaultChecked={false}
                  className="text-left"
                />
              </div>

              {/* 表示されるtodoリストのチェック有無による色分け */}
              <div
                className={
                  value.isChecked
                    ? "text-gray-500 line-through"
                    : "text-black-500"
                }
              >
                {value.text}
              </div>

              {/* チェックされているものだけ削除ボタンを表示する */}
              {value.isChecked && (
                <div
                  onClick={() => {
                    deleteTodoList(value.id);
                  }}
                  className="ml-auto mr-3"
                >
                  <RedButton name={"削除"} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hello;
