import React,{useState,useEffect} from "react";
import moment from "moment";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";

import { useGetCryptoNewsQuery } from "../services/crypto-news-api";
import { useGetCryptosQuery } from "../services/crypto-api";


const { Text, Title } = Typography;
const { Option } = Select;
const demoUrl = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';


const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState("cryptocurreny")
  
  const { data:cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified?6:30,
  });

  const { data:cryptoList } = useGetCryptosQuery(100);
  
  if (isFetching) {
    return (
        <p>Loading...</p> 
    );
  }
  
  console.log(cryptoNews);

  return (
    <div>
      <Row gutter={[12,12]} >
        {!simplified && 
            <Col span={24}>
              <Select
                showSearch
                className="select-news"
                placeholder="select a crypto"
                optionFilterProp="children"
                onChange={(value)=>setNewsCategory(value)}
                filterOption ={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>=0}
              >
                <Option value="Cryptocurrency">Cryptocurrency</Option>
                {cryptoList?.data?.coins?.map(crypto=>(
                  <Option value={crypto.name}>{crypto.name}</Option>
                ))}
              </Select>
            </Col>
        }


        {cryptoNews.value.length===0 ? <p>No News Found...</p> : cryptoNews.value.map((news,i)=>(
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>{news.name}</Title>
                  <img style={{maxWidth:"200px" , maxHeight:"200px"}} src={news?.image?.thumbnail?.contentUrl || demoUrl} alt="news"/>
                  </div>
                  <p>
                    {news.description.length >100 ? `${news.description.substring(0,100)}..` : news.description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoUrl}></Avatar>
                      <Text className="provider-name">{news.provider[0]?.name}</Text>
                    </div>
                      <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                  </div>
                
              </a>
            </Card>
          </Col>
        ))}

      </Row>
    </div>
  )
};

export default News;
