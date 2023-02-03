import { Button } from '@/components/Button'
import { useState } from 'react'
import { Textarea } from "@material-tailwind/react";

const Home = () => {
  const [message, setMessage] = useState("")
  const [click, setClick] = useState(false)
  return (
    <div className="h-screen text-center bg-gray-300">
      <div className="text-3xl font-bold text-blue-500 pt-10">Hello!!!!!</div>
      <div className="w-96 mx-auto">
        <Textarea label="Message" onChange={(e) =>
          setMessage(e.target.value)} />
      </div>
      <div onClick={() => setClick(!click)}>
        <Button name={"ボタン"} />
      </div>
      {click === true && <div>{message}</div>}
    </div>
  )
}

export default Home