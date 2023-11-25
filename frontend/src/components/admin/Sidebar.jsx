import React from 'react'
import {Link } from 'react-router-dom'
import {Layout, Menu} from 'antd';
const {Sider} = Layout;


function Sidebar() {
  return (
    <div>
            <Sider width={200}  theme="dark">
                <div className="logo"/>
                  <Menu theme="dark" mode="vertical" >
                    <Menu.Item key="1"> <Link to="/admin">Dashboard</Link> </Menu.Item>
                    <Menu.Item key="2"> <Link to="/admin/users">Users</Link> </Menu.Item>
                    <Menu.Item key="3"> <Link to="/admin/trainers">Trainers</Link> </Menu.Item>
                    <Menu.Item key="4"> <Link to="/admin/categories">Categories</Link> </Menu.Item>
                </Menu>
            </Sider>
    </div>
  )
}
 
export default Sidebar
