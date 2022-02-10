import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input} from "antd"


import { useGetCryptosQuery } from '../services/crypto-api'

const Cryptocurrencies = ({ simplified }) => {
  const count=simplified? 10 : 100
  const {data:cryptoList,isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchedItem, setSearchedItem] = useState("")


  const searchHandler=(e)=>{
    setSearchedItem(e.target.value)

  }
  useEffect(() => {

     const filterdData=cryptoList?.data?.coins.filter(coin=>(coin.name.toLowerCase().includes(searchedItem.toLowerCase())))
     setCryptos(filterdData)
    
  }, [cryptoList,searchedItem])
  

  if(isFetching){
    return "Loading"
  }

  return (
    <div>
      {!simplified&&
      <div className='search-crypto'>
        <Input placeholder='seacrh crypto' onChange={searchHandler}/>

      </div>
      
      }
      <Row gutter={[20,20]} className='crypto-card-container'>
          {cryptos?.map(crypto=>(
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.uuid}>
              <Link to={`/crypto/${crypto.uuid}`}>
              <Card
                  title={`${crypto.rank}. ${crypto.name}`}
                  extra={<img className='crypto-image' src={crypto.iconUrl}/>}
                  hoverable
                >
                  <p>Price: {millify(crypto.price)}</p>
                  <p>Market Cap: {millify(crypto.marketCap)}</p>
                  <p>Daily Changes: {millify(crypto.change)}%</p>
                </Card>
              </Link>
              </Col>
          ))}

      </Row>
    </div>
  )
}

export default Cryptocurrencies