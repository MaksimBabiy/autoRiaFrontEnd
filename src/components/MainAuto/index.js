import React, { useEffect, useState } from 'react'
import './MainAuto.scss';
import { ClockCircleOutlined,GlobalOutlined,ToolOutlined,ForkOutlined,LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import { mainActions } from 'redux/actions'
import { format,parseISO } from 'date-fns'
import { Select,Input,Checkbox } from 'antd';
const { Option, OptGroup } = Select;

const AutoCard = (props) => {
 let date = parseISO(props.createdAt)
    return (
        <div className="main__list-body-right-item">
                <div className="main__list-body-right-item__img">
                    <img src={props.url}></img>
                </div>
                <div className="main__list-body-right-item__content">
                    <span className="main__list-body-right-item__content-title">{props.mark}&nbsp;{props.model}&nbsp;{props.year}</span>
                    <div className="main__list-body-right-item__content-price">
                        <span className="main__list-body-right-item__content-price-dollors">{props.costByDollor}</span>
                        &nbsp;
                        <span className="main__list-body-right-item__content-price-dollors">$</span>
                        &nbsp;
                        <span className="main__list-body-right-item__content-price-dot">•</span>
                        &nbsp;
                        <span data-currency={`uah`} style={{fontSize: 15}}>{props.cost}&nbsp;грн</span>
                    </div>
                    <div className="main__list-body-right-item__content-data">
                        <ul className="main__list-body-right-item__content-data-list">
                            <li className="main__list-body-right-item__content-data-list-item"><ClockCircleOutlined style={{color: 'tomato'}}/>{props.mileage} тыс.км.</li>
                            <li className="main__list-body-right-item__content-data-list-item"><GlobalOutlined style={{color: 'tomato'}}/>{props.region}</li>
                            <li className="main__list-body-right-item__content-data-list-item"><ToolOutlined style={{color: 'tomato'}}/>{props.specifications.fuel}, {props.specifications.engineCapacity}л</li>
                            <li className="main__list-body-right-item__content-data-list-item"><ForkOutlined style={{color: 'tomato'}}/>{props.specifications.transmission}</li>
                        </ul>
                        <div className="main__list-body-right-item__content-data-desc">
                            <p>{props.desc}</p>
                        </div>
                    </div>
                    <div className="main__list-body-right-item__content-footer">
                        <span style={{color: 'green'}}><ClockCircleOutlined style={{color: 'green'}}/> {`${format(date,'EEEE')}, ${format(date,'p')}`}</span>
                    </div>
                </div>
        </div>
    )
}


const MainAuto = ({value}) => {
const [data, setData] = useState()
const [inputValue, setInputValue] = useState(JSON.parse(localStorage.getItem('value')))
const [currentCars, setCurrentCars] = useState(null)
const [currentModels, setCurrentModels] = useState({})

let history = useHistory()
useEffect(() => {
    axios.get(`http://localhost:3333/${inputValue.typeOfTransport}`).then(({data}) => {
        setCurrentCars(data)
    })
    axios.get(`http://localhost:3333/${inputValue.typeOfTransport}?mark=${inputValue.mark}`).then(({data}) => {
        setCurrentModels(data)
    })
   }, [inputValue.typeOfTransport, inputValue.mark])
useEffect(() => {
    axios.get(`http://localhost:3003${history.location.pathname}${history.location.search}`).then(({data}) =>setData(data))
}, [])
const handleChangeInput = (e,name) => {
    let cur = document.querySelector(`#${name}`)
    setInputValue({
        ...inputValue,
        [cur.id]: e 
    })
 }
 useEffect(() => {
    let str = ``
    for(let key in inputValue){
        if(key !== 'bodyType') {
            str += (`${key}=${inputValue[key]}&`)
        }
    }
    for(let key in inputValue['bodyType']){
        str += (`bodyType=${inputValue['bodyType'][key]}&`)
    }
    history.push(`/carParams?${str}`)
    axios.get(`http://localhost:3003${history.location.pathname}${history.location.search}`).then(({data}) =>setData(data))
 },[inputValue])
    return (
      <>
        <div className="main__list">
           <h1 className="main__list-h1">Поиск б/у авто в Украине</h1>
            <div className="main__list-body">
                <div className="main__list-body-left">
                <div className="main__list-body-left-item">
                <span className="add__content-info-item-header" style={{fontWeight: 700}}>Тип транспорта</span>
                    <Select defaultValue={value.typeOfTransport} style={{ width: 200}} onChange={(e) => handleChangeInput(e, 'typeOfTransport')} id="typeOfTransport">
                        <Option value="passenger">Легковые</Option>
                        <Option value="moto">Мото</Option>
                        <Option value="Грузовики">Грузовики</Option>
                        <Option value="Прицепы">Прицепы</Option>
                        <Option value="СпецТехника">СпецТехника</Option>
                        <Option value="СельхозТехника">СельхозТехника</Option>
                        <Option value="Автобусы">Автобусы</Option>
                        <Option value="Водный транспорт">Водный транспорт</Option>
                        <Option value="Воздушный транспорт">Воздушный транспорт</Option>
                    </Select>
                </div>
                <div className="main__list-body-left-item">
                <span className="add__content-info-item-header" style={{fontWeight: 700}}>Тип кузова</span>
                    <Checkbox.Group onChange={(e) => handleChangeInput(e, 'bodyType')} id="bodyType">
                    <Checkbox value="sedan">Cедан</Checkbox>
                    <Checkbox value="crossover" checked={'crossover'}>Внедорожник/Кроссовер</Checkbox>
                    <Checkbox value="Минивэн">Минивэн</Checkbox>
                    <Checkbox value="Хэтчбек">Хэтчбек</Checkbox>
                    <Checkbox value="Универсал">Универсал</Checkbox>
                    </Checkbox.Group>
                </div>
                <div className="main__list-body-left-item">
                <span className="add__content-info-item-header" style={{fontWeight: 700}}>Марка</span>
                    <Select defaultValue={value.mark ? value.mark : 'Выберите'} style={{ width: 200 }} onChange={(e) => handleChangeInput(e, 'mark')} id="mark">
                        <OptGroup label="Все марки" >
                        {currentCars && currentCars.map( (car,index) => {
                            return <Option value={car.mark} key={index}>{car.mark}</Option>
                        })}
                        </OptGroup>
                    </Select>
                </div>
                <div className="main__list-body-left-item">
                <span className="add__content-info-item-header" style={{fontWeight: 700}}>Модель</span>
                <Select defaultValue="Модель" style={{ width: 200 }} onChange={(e) => handleChangeInput(e,'model')} id="model">
                    <OptGroup label="Все автомобили">
                        {currentModels.length && currentModels[0].models.map( (item,index) => <Option value={item.model} key={index}>{item.model}</Option>)}
                    </OptGroup>
                </Select>
                </div>
                </div>
                <div className="main__list-body-right">
                {data && data.data.reverse().map((item,index) => <AutoCard {...item} key={index}/>)}
                </div>
            </div>
             </div>
       </>
    )
}
export default connect(({main}) => main, mainActions)(MainAuto)
