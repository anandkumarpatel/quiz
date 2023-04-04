const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Sheets = require('./sheets.js')
const https = require('https')

const port = process.env.PORT || 4001;

const app = express();
const state = {}

async function main() {
  const sheets = new Sheets()
  await sheets.init()

  function save(partName) {
    console.log("saving", partName)
    sheets.save(partName).catch((err) => {
      console.log('save err ' + err)
    })
  }

  function get() {
    return sheets.get()
  }

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    return next()
  })


  app.use(express.static('build'))

  const server = http.createServer(app);

  const io = socketIo(server, {
    cors: {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204
    }
  });

  io.on("connection", (socket) => {
    console.log(socket.id, "New client connected");

    get().then((data) => {
      console.log("sending init", data)
      socket.emit("init", data)
    })

    socket.join("all")

    socket.on("complete", (event) => {
      console.log("emitting", event)
      save(event.partName)
      io.to("all").emit("completed", event)
    })

    socket.on("disconnect", () => {
      console.log(socket.id, "Client disconnected")
    });
  });

  server.listen(port, () => console.log(`Listening on port http://localhost:${port}`));
}

setInterval(() => {
  console.log('-healthcheck start')
  https
    .get('https://shoes.anandkumarpatel.com/ping', (resp) => {
      // A chunk of data has been recieved.
      resp.on('data', () => { })

      resp.on('end', () => {
        console.log('-healthcheck pass')
      })
    })
    .on('error', (err) => {
      console.log('**** healthcheck fail ' + err.message)
    })
}, 900000)

main().catch(console.error)



