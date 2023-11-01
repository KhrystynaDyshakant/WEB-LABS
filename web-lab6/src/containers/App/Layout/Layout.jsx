import React, { useState } from "react";
import {
    AppstoreFilled,
    HomeOutlined,
    ShoppingOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import logo from "../../../icons/logo.png";
import { LinkingWrapper, StyledHeader } from "./Layout.styled";
import { BrowserRouter, Link } from "react-router-dom";

const items = [
    {
        label: (<Link to="/">Home</Link>),
        key: 'home',
        icon: <HomeOutlined />
    },
    {
        label: (<Link to="/catalog">Catalog</Link>),
        key: 'catalog',
        icon: <AppstoreFilled />
    },
    {
        label: (<Link to="/cart">Cart</Link>),
        key: 'cart',
        icon: <ShoppingOutlined />
    }
];

function Layout() {
    const [current, setCurrent] = useState('home');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    
    return (
        <StyledHeader>
            <img src={logo} alt="" width={80}/>

            <LinkingWrapper>
                <Menu 
                    onClick={onClick} 
                    selectedKeys={[current]} 
                    mode="horizontal" 
                    defaultSelectedKeys={['mail']}
                    items={items}
                />
            </LinkingWrapper>
        </StyledHeader>
    );
}

export default Layout;