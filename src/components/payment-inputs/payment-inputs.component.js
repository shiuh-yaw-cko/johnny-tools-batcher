import React from "react"
import { Input, Select, Tooltip } from "antd"
import {
  UnlockOutlined,
  InfoCircleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons"

const { TextArea } = Input
const { Option } = Select

import { VOID_ACTION, REFUND_ACTION, CAPTURE_ACTION } from "../../utils/actions"

import "./payment-inputs.style.css"

function PaymentInputs({ actionChange, keyChange, paymentsChange }) {
  return (
    <div className="payment-inputs">
      <Select
        defaultValue="Select Action"
        style={{ width: "100%" }}
        size="large"
        className="payment-input"
        onChange={actionChange}
      >
        <Option value={CAPTURE_ACTION}>Bulk Capture</Option>
        <Option value={VOID_ACTION}>Bulk Void</Option>
        <Option value={REFUND_ACTION}>Bulk Refund</Option>
      </Select>
      <h3>Secret Key:</h3>
      <Input
        className="payment-input"
        placeholder="sk_••••••••"
        size="large"
        prefix={<UnlockOutlined />}
        suffix={
          <Tooltip title="The environment will be determined based on the secret key">
            <InfoCircleOutlined />
          </Tooltip>
        }
        onChange={(e) => keyChange(e.target.value)}
      />
      <h3>List of payment ids:</h3>
      <Tooltip
        placement="right"
        title="Put each payment id on a new line, without a comma or other delimiter"
      >
        <TextArea
          className="payment-input"
          rows={18}
          onChange={(e) => {
            let payments = e.target.value.split(/\n/)
            let filtered = payments.filter((el) => el.length > 0)
            paymentsChange(filtered)
          }}
        />
      </Tooltip>
    </div>
  )
}

export default PaymentInputs
