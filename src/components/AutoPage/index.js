import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { LoadingOutlined } from '@ant-design/icons'
import './AutoPage.scss'

const AutoPage = (props) => {
    const [data, setData] = useState()
    const history = useHistory()
    useState(() => {
    axios.get(`http://localhost:3003/car/${history.location.pathname.slice(9,history.location.pathname.length)}`).then(({data}) => setData(data.data))
    })
    console.log(data)
    return (
        data ? <div className="auto__page">
            <h1 className="auto__page-title">{data.mark}&nbsp;{data.model}&nbsp;{data.year}</h1>
            <div className="auto__page-body">
                 <div className="auto__page-body-left">
                    <div className="auto__page-body-left-cost">
                        <span className="mainPrice">{data.costByDollor}$</span>
                        <div className="secondPrice">
                        <span><span className="secondPrice__currency">{data.cost}</span>&nbsp;%</span>
                        <span className="secondPrice__point">•</span>
                        <span><span className="secondPrice__currency">{data.cost}</span>&nbsp;грн</span>
                        </div>
                    </div>
                    <div className="auto__page-body-left-mileage">
                        <span className="auto__page-body-left-mileage">{data.mileage}&nbsp;тыс.км пробег</span>
                    </div>
                 </div>
                 <div className="auto__page-body-right">
                    <img src={data.url} className="auto__page-body-right-img"/>
                 </div>
            </div>
        </div>
        :
        <div>
            <LoadingOutlined />
        </div>
    )
}

export default AutoPage
