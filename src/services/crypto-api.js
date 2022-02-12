import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const cryptoApiHeaders ={
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
}

const baseUrl="https://coinranking1.p.rapidapi.com"

const createRequest = (url) => ({
    url,
    headers:cryptoApiHeaders
})


export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptos: builder.query({
            query: (count)=>createRequest("/coins?limit="+count)

        }),
        getCryptoDetails:builder.query({
            query: (cryptoId)=>createRequest("/coin/"+cryptoId)

        }),
        getCryptoHistory:builder.query({
            query: ({cryptoId,timePeriod})=>createRequest(`/coin/${cryptoId}/history?timeperiod=${timePeriod}`)

        })

    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi


// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/coins',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl',
//     timePeriod: '24h',
//     tiers: '1',
//     orderBy: 'marketCap',
//     orderDirection: 'desc',
//     limit: '50',
//     offset: '0'
//   },
//   headers: {
//     'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//     'x-rapidapi-key': '372c6143afmsha772f70b592105fp15bfd2jsn7b791276b84b'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });