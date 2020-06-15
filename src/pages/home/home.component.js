import React from "react"
import { Result } from "antd"

import "./home.style.css"

function HomePage() {
  return (
    <Result
      icon={<div className="badger" />}
      title="Hi, I'm Batcher. I'll run bulk actions for you!"
    />
  )
}

export default HomePage
