import React, { useState } from "react"
import { Row, Col, Button, Modal } from "antd"

import PaymentInputs from "../../components/payment-inputs/payment-inputs.component"
import PaymentOutcome from "../../components/payment-outcome/payment-outcome.component"

import "./payments.style.css"

function PaymentActions() {
  const [loading, setLoading] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [key, setKey] = useState("")
  const [action, setAction] = useState("")
  const [payments, setPayments] = useState([])
  const [outcomes, setOutcomes] = useState([])
  const [success, setSuccess] = useState(0)
  const [fail, setFail] = useState(0)

  const showModal = () => {
    setVisibleModal(true)
  }

  const modalConfirm = (e) => {
    setVisibleModal(false)
    run()
  }

  const modalCancel = (e) => {
    setVisibleModal(false)
  }

  const run = async () => {
    setLoading(true)
    let results = []
    if (!key) {
      alert("You forgot the secret key!")
      return
    }
    if (payments.length === 0) {
      alert("You forgot the payment ids or you did not put them each on a new line!")
      return
    }

    // reset outcomes
    setOutcomes([])
    setSuccess(0)
    setFail(0)

    for (const id of payments) {
      try {
        const response = await fetch(
          `${window.location.protocol}//${window.location.host}/batch`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sk: key,
              id: id,
              action: action,
            }),
          }
        )
        let json = await response.json()

        setOutcomes((prevOutcomes) => [...prevOutcomes, json])
        console.log(json)
        json.success ? setSuccess((prev) => prev + 1) : setFail((prev) => prev + 1)
      } catch (error) {
        setOutcomes((prevOutcomes) => [
          ...prevOutcomes,
          { id: id, success: false, error: "error" },
        ])
        setFail((prev) => prev + 1)
      }
    }
    setLoading(false)
  }

  return (
    <Row className className="payment-actions-container">
      <Col xs={24} sm={24} lg={11} xl={11}>
        <PaymentInputs
          actionChange={(e) => setAction(e)}
          keyChange={(e) => setKey(e)}
          paymentsChange={(e) => setPayments(e)}
        />
        <Button
          type="primary"
          className="run"
          loading={loading}
          onClick={showModal}
          disabled={key && action && payments.length > 0 ? false : true}
        >
          Run Batcher
        </Button>

        <Modal
          title="Are you sure?"
          visible={visibleModal}
          onOk={modalConfirm}
          onCancel={modalCancel}
        >
          {`You are about to ${action} ${payments.length} payment(s).`}
        </Modal>
      </Col>
      <Col xs={24} sm={24} lg={13} xl={13} className="payment-outcome-area">
        <PaymentOutcome success={success} fail={fail} outcomes={outcomes} />
      </Col>
    </Row>
  )
}

export default PaymentActions
