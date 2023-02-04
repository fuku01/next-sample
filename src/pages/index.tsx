import { Button } from '@/components/Button'
import { useEffect, useState } from 'react'
import { Textarea } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";

const Home = () => {
  const [click, setClick] = useState(false)

  const [message, setMessage] = useState("")
  const [displayMessage, setDisplayMessage] = useState("")

  const [username, setUsername] = useState("")
  const [displayUsername, setDisplayUsername] = useState("")

  useEffect(() => {
    if (click === true) {
      setDisplayUsername(username)
      setDisplayMessage(message)
    }
    else {
      setDisplayUsername("")
      setDisplayMessage("")
    }
  }, [click])

  return (
    <div className="h-screen text-center bg-gray-300">
      <div className="text-3xl font-bold text-blue-500 pt-10">Hello!!!!!</div>
      <div className="w-96 mx-auto mb-8">
        <Input label="Username" onChange={(c) =>
          setUsername(c.target.value)} />
      </div>
      <div className="w-96 mx-auto">
        <Textarea label="Message" onChange={(e) =>
          setMessage(e.target.value)} />
      </div>
      <div onClick={() => setClick(!click)}>
        <Button name={"ボタン"} />
      </div>
      {click === true && <div>{displayUsername}</div>}
      {click === true && <div>{displayMessage}</div>}
    </div>
  )
}

export default Home