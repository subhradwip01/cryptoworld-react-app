import React,{useState, useEffect} from "react";
import { Button,Menu,Typography,Avatar } from "antd";
import {Link} from "react-router-dom"
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined,MenuOutlined } from "@ant-design/icons/lib/icons";

import icon from "../images/cryptocurrency.png"

const Navbar = () => {
    const [activeMenu,setActiveMenu]=useState(true)
    const [screenSize,setScreenSize]=useState(null)

    useEffect(() => {
      const handleResize=()=>setScreenSize(window.innerWidth)

      window.addEventListener("resize",handleResize);

      handleResize();

      return ()=>window.removeEventListener("resize".handleResize)
    }, [])
    

    useEffect(() => {
      if(screenSize<768){
          setActiveMenu(false)
      }else{
          setActiveMenu(true)
      }
    }, [screenSize])
    

  return (
    <div className="nav-container">
        <div className="logo-container">
            <div className="logo-container-main">
            <Avatar src={icon} size="large"/>
            <Typography.Title level={2} className="logo">
                <Link to="/">CryptoWorld</Link>
            </Typography.Title>
            </div>
            {screenSize<768 && 
            <Button className="menu-control-conatainer" onClick={()=>setActiveMenu(!activeMenu)}>
                <MenuOutlined/>
            </Button>
            }
        </div>
        {activeMenu && 
            <Menu theme="dark">
                <Menu.Item icon={<HomeOutlined/>}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined/>}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
            </Menu>
            }
        
    </div>
  )
}

export default Navbar
