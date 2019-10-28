import React from 'react'
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd'
import { NavLink } from 'react-router-dom'


const AppHeader = () => {
    const { Header } = Layout
    return (
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                // defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1">
                    <NavLink to="/" exact >Vote</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="/results" exact >Results</NavLink>
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default AppHeader