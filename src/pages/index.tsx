import { Button } from '@/components/Button'
import { useState } from 'react'

const Home = () => {
  const [first, setFirst] = useState(false)
  return (
    <div className="h-screen text-center bg-gray-300">
      <div className="text-3xl font-bold text-blue-500 pt-10">Hello!!!!!</div>
      <div onClick={() => setFirst(!first)}>
        <Button name={"ボタン"} color={"red"} />
      </div>
      {first === true && <div>クリックされました</div>}
    </div>
  )
}

export default Home