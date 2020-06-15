import React from "react"
import { Statistic, List, Tooltip, Avatar } from "antd"
import {
  CheckCircleFilled,
  CloseCircleFilled,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons"

import "./payment-outcome.style.css"

function PaymentOutcome({ outcomes, success, fail }) {
  return (
    <div className="payment-outcome">
      <div className="payment-stats">
        <Statistic
          title="Success"
          value={success}
          prefix={<CheckCircleFilled style={{ color: "green" }} />}
        />
        <Statistic
          title="Failure"
          value={fail}
          prefix={<CloseCircleFilled style={{ color: "red" }} />}
        />
      </div>
      <List
        className="payment-list"
        itemLayout="horizontal"
        dataSource={outcomes}
        renderItem={(outcome) => (
          <List.Item className="outcome-item">
            {outcome.id}
            {outcome.success ? (
              <CheckOutlined height="150px" style={{ color: "green" }} />
            ) : (
              <Tooltip
                trigger={["hover"]}
                title={outcome.error}
                placement="leftTop"
                overlayClassName="numeric-input"
              >
                <CloseOutlined style={{ color: "red" }} />
              </Tooltip>
            )}
          </List.Item>
        )}
      />
    </div>
  )
}

export default PaymentOutcome
