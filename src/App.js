import React from "react"
import { Layout, Menu, Result, Button } from "antd"
import { CreditCardOutlined, DeploymentUnitOutlined } from "@ant-design/icons"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "./App.css"

import Payments from "./pages/payments/payments.component"
import Home from "./pages/home/home.component"

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

function App() {
  return (
    <Router>
      <Layout className="home-page">
        <Sider breakpoint="lg" collapsedWidth="0">
          <Link to="/">
            <div className="logo" />
          </Link>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1" icon={<CreditCardOutlined />}>
              <Link to="/payments">Payment Actions</Link>
            </Menu.Item>

            {/* <Menu.Item key="2" icon={<DeploymentUnitOutlined />}>
              <Link to="/webhooks">Webhooks</Link>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/payments">
                  <Payments />
                </Route>
                {/* <Route path="/webhooks">
                  <h2>webhooks</h2>
                </Route> */}
              </Switch>
            </div>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>Johnny Tools Batcher ©2020</Footer> */}
        </Layout>
      </Layout>
    </Router>
  )
}

export default App
