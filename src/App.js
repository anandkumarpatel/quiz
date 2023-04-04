import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import React, { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export const App = () => {
  const [expects] = useState(JSON.parse(atob("eyJmaXJzdCI6eyJkb25lIjpmYWxzZX0sInNlY29uZCI6eyJleHBlY3QiOiJ0b2dldGhlciIsImxlbiI6OH0sImYzIjp7ImV4cGVjdCI6IlluSnZkR2hsY25NPSIsImxlbiI6MTJ9LCJmNCI6eyJleHBlY3QiOiJicm90aGVycyIsImxlbiI6OH0sImY1Ijp7ImV4cGVjdCI6InJlZCIsImxlbiI6M30sImY2Ijp7ImV4cGVjdCI6InNvcnQiLCJsZW4iOjR9LCJib3R0b20iOnsicGVlcHMiOnsicDEiOnsibmFtZSI6InRvbnkiLCJudW1iZXIiOiI0MTUyMjUyNTI1IiwicG9zIjo3fSwicDIiOnsibmFtZSI6InN1bmRpcCIsIm51bWJlciI6IjUwMjQyNDI5NTQiLCJwb3MiOjZ9LCJwMyI6eyJuYW1lIjoibmlyYmhheSIsIm51bWJlciI6IjMwOTYzNTg4NTYiLCJwb3MiOjN9LCJwNCI6eyJuYW1lIjoiYmhhcmF0IiwibnVtYmVyIjoiNjMwODgwNzI5MyIsInBvcyI6MX0sInA1Ijp7Im5hbWUiOiJzb2hhaWwiLCJudW1iZXIiOiIyMDMzMDA2MDY2IiwicG9zIjo1fSwicDYiOnsibmFtZSI6Im5laWwiLCJudW1iZXIiOiI2MDk5NDcxNTE3IiwicG9zIjoyfSwicDciOnsibmFtZSI6InNpZCIsIm51bWJlciI6IjcwODUyODYzOTQiLCJwb3MiOjR9LCJwOCI6eyJuYW1lIjoiYW1hciIsIm51bWJlciI6IjkxNjYwMDg5MjkiLCJwb3MiOjB9fX19")))
  const [state, setState] = useState({
    b: {
      cur: "",
      question: "what's my favorite indian restaurant in san francisco?",
      expects: "Mela"
    },
    k: {
      cur: "",
      question: "in the video on my youtube channel, event-driven architecture can promote rapid what?",
      expects: "prototYping"
    },
    q: {
      cur: "",
      question: "find alejandro. ask him what country he is from.",
      expects: "argentina"
    },
    d: {
      cur: "",
      question: "my second instagram post contains glasses made by what company?",
      expects: "snaPchat"
    },
    i: {
      cur: "",
      question: "find jorge and adk him what he is known for.",
      expects: "laugH"
    },
    c: {
      cur: "",
      question: "the two precious stones on the sides of nancy's wedding ring refer to houses in school?",
      expects: "hOgwarts"
    },
    m: {
      cur: "",
      question: "find my elementary school friend and get his last name.",
      expects: "kesayaN"
    },
    p: {
      cur: "",
      question: "find anton. ask him what country he is from.",
      expects: "ukrainE"
    },
    r: {
      cur: "",
      question: "find suhag and purvi and ask them what town they are from.",
      expects: "mcrae"
    },
    h: {
      cur: "",
      question: "what is my dj name?",
      expects: "fAze"
    },
    e: {
      cur: "",
      question: "what is the name of my family's pet bird?",
      expects: "Ramu"
    },
    g: {
      cur: "",
      question: "what color shirt is my snapchat avatar wearing?",
      expects: "whitE"
    },
    j: {
      cur: "",
      question: "find bob. what is his real name?",
      expects: "Ashish"
    },
    a: {
      cur: "",
      question: "in what country was my facebook profile picture?",
      expects: "ireland"
    },
    l: {
      cur: "",
      question: "i got a flat tire on the way to what meetup? (check my twitter)",
      expects: "doCker"
    },
    f: {
      cur: "",
      question: "what fraternity was i in?",
      expects: "aiO"
    },
    o: {
      cur: "",
      question: "my mixes on soundcloud are measured in?",
      expects: "Degrees"
    },
    n: {
      cur: "",
      question: "i like sharing knowledge via fun what? (check my linkedin)",
      expects: "newslEtters"
    },
  })

  function update(args, cb) {
    return this.setState(args, (out) => {
      cb && cb(out)
    })
  }

  function isValid(partName) {
    return this.state[partName].cur.toLowerCase() === this.state[partName].expects.toLowerCase()
  }

  function changer(partName) {
    return (event) => {
      const out = {}
      out[partName] = this.state[partName]
      out[partName].cur = event.target.value
      return this.update(out)
    }
  }

  function allDone() {
    return Object.keys(this.state).every((partName) => {
      return this.isValid(partName)
    })
  }

  function input(partName) {
    const part = this.state[partName]
    return (
      <InputGroup>
        <FormControl
          onChange={changer(partName)}
          value={part.cur}
          isValid={isValid(partName)}
          disabled={isValid(partName)}
          minLength={part.expects.length}
          maxLength={part.expects.length}
        />
        <InputGroup.Append>
          <InputGroup.Text>{part.expects.length - part.cur.length}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup >
    )
  }

  function answer(partName) {
    const part = state[partName]
    let out = part.expects
    if (!allDone()) {
      out = out.toLowerCase()
    }
    return (
      <div className="answer">
        {out}
      </div >
    )
  }

  function q(partName) {
    const part = state[partName]
    return (
      <div key={partName}>
        <div className="sec">
          <p>{part.question}</p>
          {isValid(partName) ? answer(partName) : input(partName)}

        </div>
        <hr />
      </div>
    )
  }

  function final() {
    return (
      <div key="final">
        <div className="sec">
          <p>Go back and look at the CaPiTalS</p>
          <p>also, bob has the key...</p>
        </div>
        <hr />
      </div >
    )
  }

  return (
      <div className="App">
        <Container className="list">
          <div className="top sec">
            <h1>You want the shoes?</h1>
            <p>
              You have 1 hour to discover the code and find the key!
              <br />Let's see if Nancy's Family & Friends have what it takes!
              <br />Type the answers to the questions in the boxes.
              <br />If you type the answer correctly, the box will turn green.
              <br />Answers can be entered on any phone and in any order.
              <br />The number on the right tells you how long the word is.
              <br />
              Good luck!
            </p>
          </div>
          <hr />

          {
            Object.keys(state).map((partName) => {
              return q(partName)
            })
          }

          {allDone() ? final() : null}
          <div className="sec">

            <br />
            <a href="https://twitter.com/akadjfaze" className="fa fa-twitter"></a>
            <a href="https://www.youtube.com/channel/UC8L_dV70c8I7HRm2Xyj3yng" className="fa fa-youtube"></a>
            <a href="https://snapchat.com/add/dj.faze" className="fa fa-snapchat-ghost"></a>
            <a href="https://www.linkedin.com/in/anandkumarpatel/" className="fa fa-linkedin"></a>
            <a href="https://www.instagram.com/akadjfaze/" className="fa fa-instagram"></a>
            <a href="https://soundcloud.com/dj-faze" className="fa fa-soundcloud"></a>

          </div>
        </Container>
      </div>
    )
}
