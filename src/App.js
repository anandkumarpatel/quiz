import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super()
    this.expects = JSON.parse(atob("eyJmaXJzdCI6eyJkb25lIjpmYWxzZX0sInNlY29uZCI6eyJleHBlY3QiOiJ0b2dldGhlciIsImxlbiI6OH0sImYzIjp7ImV4cGVjdCI6IlluSnZkR2hsY25NPSIsImxlbiI6MTJ9LCJmNCI6eyJleHBlY3QiOiJicm90aGVycyIsImxlbiI6OH0sImY1Ijp7ImV4cGVjdCI6InJlZCIsImxlbiI6M30sImY2Ijp7ImV4cGVjdCI6InNvcnQiLCJsZW4iOjR9LCJib3R0b20iOnsicGVlcHMiOnsicDEiOnsibmFtZSI6InRvbnkiLCJudW1iZXIiOiI0MTUyMjUyNTI1IiwicG9zIjo3fSwicDIiOnsibmFtZSI6InN1bmRpcCIsIm51bWJlciI6IjUwMjQyNDI5NTQiLCJwb3MiOjZ9LCJwMyI6eyJuYW1lIjoibmlyYmhheSIsIm51bWJlciI6IjMwOTYzNTg4NTYiLCJwb3MiOjN9LCJwNCI6eyJuYW1lIjoiYmhhcmF0IiwibnVtYmVyIjoiNjMwODgwNzI5MyIsInBvcyI6MX0sInA1Ijp7Im5hbWUiOiJzb2hhaWwiLCJudW1iZXIiOiIyMDMzMDA2MDY2IiwicG9zIjo1fSwicDYiOnsibmFtZSI6Im5laWwiLCJudW1iZXIiOiI2MDk5NDcxNTE3IiwicG9zIjoyfSwicDciOnsibmFtZSI6InNpZCIsIm51bWJlciI6IjcwODUyODYzOTQiLCJwb3MiOjR9LCJwOCI6eyJuYW1lIjoiYW1hciIsIm51bWJlciI6IjkxNjYwMDg5MjkiLCJwb3MiOjB9fX19"))
    this.state = {
      b: {
        cur: "",
        question: "What's my favorite Indian restaurant in San Francisco",
        expects: "Mela"
      },
      k: {
        cur: "",
        question: "In the video on my youtube channel, event-driven architecture can promote rapid what?",
        expects: "prototYping"
      },
      q: {
        cur: "",
        question: "Find Alejandro. Ask him what country he is from",
        expects: "argentina"
      },
      d: {
        cur: "",
        question: "My second instagram post contains glasses made by what company?",
        expects: "snaPchat"
      },
      i: {
        cur: "",
        question: "Find Jorge and ask him what people remember about him the most",
        expects: "laugH"
      },
      c: {
        cur: "",
        question: "The two precious stones on the sides of nancy's wedding ring a reference to houses in?",
        expects: "hOgwarts"
      },
      m: {
        cur: "",
        question: "Find my elementary school friend and get his last name.",
        expects: "kesayaN"
      },
      p: {
        cur: "",
        question: "Find Anton ask what country he is from",
        expects: "ukrainE"
      },
      r: {
        cur: "",
        question: "Find Suhag and Purvi and ask them what town they are from",
        expects: "mcrae"
      },
      h: {
        cur: "",
        question: "What is my DJ name?",
        expects: "fAze"
      },
      e: {
        cur: "",
        question: "What's the name of my families bird",
        expects: "Ramu"
      },
      g: {
        cur: "",
        question: "What color shirt is my snapchat avatar wearing?",
        expects: "whitE"
      },
      j: {
        cur: "",
        question: "Find bob and get his real name",
        expects: "Ashish"
      },
      a: {
        cur: "",
        question: "My facebook profile picture is from what country",
        expects: "ireland"
      },
      l: {
        cur: "",
        question: "On my twitter, I got a busted my tire on the way to what?",
        expects: "doCker"
      },
      f: {
        cur: "",
        question: "What fraternity was I in?",
        expects: "aiO"
      },
      o: {
        cur: "",
        question: "My mixes on soundcloud are measured in",
        expects: "Degrees"
      },
      n: {
        cur: "",
        question: "My Linkedin shows I enjoy distributing information with joyful",
        expects: "newslEtter"
      },
    }
    this.update = this.update.bind(this)
    this.changer = this.changer.bind(this)
    this.answer = this.answer.bind(this)
    this.q = this.q.bind(this)
    this.input = this.input.bind(this)
    this.input = this.input.bind(this)
  }

  componentDidMount() {
    if (!this.socket) {
      this.socket = socketIOClient(`${window.location.href}`)
      // this.socket = socketIOClient(`http://localhost:4001`)
      this.socket.on("completed", (e) => {
        if (e.from !== this.socket.id) {
          return this.changer(e.partName)(e)
        }
      })

      this.socket.on("init", (e) => {
        console.log("init", e)
        const out = {}
        if (e) {
          Object.keys(e).forEach((partName) => {
            console.log("partName x", partName)
            out[partName] = this.state[partName]
            out[partName].cur = out[partName].expects
          })
          return this.setState(out)
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.socket) {
      return this.socket.close()
    }
  }

  update(args, cb) {
    return this.setState(args, (out) => {
      cb && cb(out)
    })
  }

  isValid(partName) {
    return this.state[partName].cur.toLowerCase() === this.state[partName].expects.toLowerCase()
  }

  changer(partName) {
    return (event) => {
      const out = {}
      out[partName] = this.state[partName]
      out[partName].cur = event.target.value
      if (!event.from && this.isValid(partName)) {
        this.socket.emit("complete", {
          from: this.socket.id,
          partName,
          target: {
            value: event.target.value
          }
        })
      }
      return this.update(out)
    }
  }

  allDone() {
    return Object.keys(this.state).every((partName) => {
      return this.isValid(partName)
    })
  }

  input(partName) {
    const part = this.state[partName]
    return (
      <InputGroup>
        <FormControl
          onChange={this.changer(partName)}
          value={part.cur}
          isValid={this.isValid(partName)}
          disabled={this.isValid(partName)}
          minLength={part.expects.length}
          maxLength={part.expects.length}
        />
        <InputGroup.Append>
          <InputGroup.Text>{part.expects.length - part.cur.length}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup >
    )
  }

  answer(partName) {
    const part = this.state[partName]
    let out = part.expects
    if (!this.allDone()) {
      out = out.toLowerCase()
    }
    return (
      <div className="answer">
        {out}
      </div >
    )
  }

  q(partName) {
    const part = this.state[partName]
    return (
      <div key={partName}>
        <hr />
        <div className="sec">
          <p>{part.question}</p>
          {this.isValid(partName) ? this.answer(partName) : this.input(partName)}

        </div>
        <hr />
      </div>
    )
  }

  final() {
    return (
      <div key="final">
        <hr />
        <div className="sec">
          <p>Go back and look at the CaPiTalS</p>
          <p>also, bob has the key...</p>
        </div>
        <hr />
      </div >
    )
  }
  render() {
    return (
      <div className="App">
        <Container className="list">
          <div className="top sec">
            <h1>You want the shoes?</h1>
            <p>
              You have 1 hour to discover the code and find the key!
              <br />Lets see if Nancy's Family & Friends have what it takes!
              <br />Type the answers to the questions in the boxes.
              <br />If you typed the answer correctly, the text will be locked in.
              <br />Answers can be typed in on any phone and in any order.
              <br />The number on the right tell you how long the word is.

              Good luck!
            </p>
          </div>
          <hr />

          {
            Object.keys(this.state).map((partName) => {
              return this.q(partName)
            })
          }

          {this.allDone() ? this.final() : null}

          <p>Snapchat: dj.faze</p>
          <p>Twitter: dj.faze</p>
          <p>Snapchat: dj.faze</p>
          <p>Snapchat: dj.faze</p>
        </Container>
      </div>
    );
  }
}

export default App;
