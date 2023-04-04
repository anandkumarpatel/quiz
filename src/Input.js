import React, { useState } from "react"
import { InputGroup, FormControl } from "react-bootstrap"


function isValid(cur, answer) {
  return cur.toLowerCase() === answer.toLowerCase()
}


const Input = (props) => {
  const [msg, setMsg] = useState("")
  const { question, answer, setSolved } = props

  if (isValid(msg, answer)) {
    return (
      <div className="answer">
        {answer}
      </div >
    )
  }

    return (
      <InputGroup>
        <FormControl
          onChange={(e) => {
            setMsg(e.target.value)
            if (isValid(e.target.value, answer)) {
              setSolved(question)
            }
          }}
          value={msg}
          minLength={answer.length}
          maxLength={answer.length}
        />
      </InputGroup >
    )
}

export default Input
