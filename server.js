const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const fetch = require("node-fetch")
const { REFUND_ACTION, VOID_ACTION, CAPTURE_ACTION } = require("./src/utils/actions")
const app = express()
const { Checkout } = require("checkout-sdk-node")
app.use(express.static(path.join(__dirname, "build")))
app.use(express.static(path.join(__dirname, "src")))

app.use(
  cors({
    origin: "*",
  })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/batch", async (req, res) => {
  const { sk, id, action } = req.body

  const cko = new Checkout(sk)
  try {
    switch (action) {
      case REFUND_ACTION:
        const refundAction = await cko.payments.refund(id)
        res.send({ id: id, success: true })
        break
      case VOID_ACTION:
        const voidAction = await cko.payments.void(id)
        res.send({ id: id, success: true })
        break
      case CAPTURE_ACTION:
        const captureAction = await cko.payments.capture(id)
        res.send({ id: id, success: true })
        break
      default:
        res.send({ id: id, success: true })
        break
    }
  } catch (error) {
    console.log("fail")
    console.log(error)
    res.send({ id: req.body.id, success: false, error: error.name })
  }
})

app.post("/retryAuths", async (req, res) => {
  const { sk, id } = req.body
  console.log(sk, id)
  const cko = new Checkout(sk)

  try {
    let stream = await fetch(
      `https://devapi.ckotech.co/webhooktester/events/decode/${id.replace(
        "pay_",
        ""
      )}`
    )

    const steamId = await stream.text()

    const response = await fetch(
      `http://eventstore-prod-gossip.cko.ire:2113/streams/Gateway.CardCharge-${steamId}/1`,
      {
        method: "get",
        headers: {
          Authorization: "Basic ZGV2OmppZTRvb3JlaTRpZXllam9IYW1h",
          Accept: "application/vnd.eventstore.atom+json",
        },
      }
    )

    let eventResponse = await response.json()

    console.log(eventResponse)

    let encode = await fetch(
      `https://devapi.ckotech.co/webhooktester/events/encode/${eventResponse.content.eventId}`
    )

    const eventId = await encode.text()

    res.send("evt_" + eventId)

    // const cko = new Checkout(sk);

    // const eventDetails = await cko.events.retrieveEvent(`evt_${eventId}`);

    // console.log(eventDetails._links["webhooks-retry"].href);

    // const retryUrl = eventDetails._links["webhooks-retry"].href;

    // const retryResponse = await fetch(retryUrl, {
    //   method: "post",
    //   headers: {
    //     Authorization: sk,
    //     Accept: "application/vnd.eventstore.atom+json",
    //   },
    // });

    // res.send(await retryResponse.text());
  } catch (error) {
    console.log(error)
    res.send(500)
  }
})

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(
    "\x1b[36m%s\x1b[34m%s\x1b[0m",
    "💪 Server running on ➡️ ",
    `http://localhost:${port}`
  )
})
