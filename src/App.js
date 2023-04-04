import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import React, { useEffect, useState } from 'react'
import Input from './Input'
import { Spinner } from 'react-bootstrap'

const App = () => {
  const time = localStorage.getItem('time')

  const [state, setState] = useState([])

  const [solved, setSolved] = useState({ one: false })
  const [done, setDone] = useState('')

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const isDone = Object.keys(solved).every((key) => {
      return solved[key]
    })
    if (isDone) {
      const dTime = new Date().toTimeString().split(' ')[0]
      // localStorage.setItem("time", dTime)
      setDone(dTime)
    }
  }, [solved])

  const getData = async () => {
    const API = `https://docs.google.com/spreadsheets/d/1GMvxqyKr2TkH47NGM2CumQd2SQZVbwDzr6EypYCWnqs/export?format=csv`
    const response = await fetch(API)
    const rawCsv = await response.text()
    const questions = []
    const qs = rawCsv.split('\n')
    qs.shift()
    qs.forEach((row) => {
      const [questionRaw, answer] = row.split(',')
      const question = questionRaw.trim()
      questions.push({
        question: question,
        answer: answer.trim().toLocaleLowerCase(),
      })
    })
    setState(questions)
    setSolved(
      questions.reduce((acc, cur) => {
        acc[cur.question] = false
        return acc
      }, {})
    )
  }

  function q(partName) {
    const part = state[partName]
    return (
      <div key={partName}>
        <div className='sec'>
          <p>{part.question}</p>
          <Input
            question={part.question}
            answer={part.answer}
            setSolved={(q) =>
              setSolved({
                ...solved,
                [q]: true,
              })
            }
          />
        </div>
        <hr />
      </div>
    )
  }

  function questionSection() {
    if (time || done) {
      return (
        <>
          <h1>COMPLETED!</h1>
          <br />
          <h2>Finished at {time || done}</h2>
        </>
      )
    }
    if (!state.length) {
      return (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )
    }
    return Object.keys(state).map((partName) => {
      return q(partName)
    })
  }

  return (
    <div className='App'>
      <Container>
        <div className='top sec'>
          <h1>ANUSHA & NIRBHAY</h1>
          <p>quiz</p>
        </div>
        <hr />

        {questionSection()}
      </Container>
    </div>
  )
}

export default App
