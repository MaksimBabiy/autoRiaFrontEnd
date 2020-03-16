import React, { useState, useEffect } from 'react'
import { Radio,Select,Input } from 'antd';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import './MainSearch.scss'
import { connect } from 'react-redux'
import { mainActions } from 'redux/actions' 
const { Option, OptGroup } = Select;
const MainSearchForm = (props) => {
   let history = useHistory()
   const [currentCars, setCurrentCars] = useState(null)
   const [currentModels, setCurrentModels] = useState({})
   const [inputValue, setInputValue] = useState({
    typeOfTransport: 'passenger'
   })
   useEffect(() => {
    axios.get(`http://localhost:3333/${inputValue.typeOfTransport}`).then(({data}) => {
        setCurrentCars(data)
    })
    axios.get(`http://localhost:3333/${inputValue.typeOfTransport}?mark=${inputValue.mark}`).then(({data}) => {
        setCurrentModels(data)
    })
   }, [inputValue])
   const handleSearch = (e) => {
    e.preventDefault()
    let str = ``
    for(let key in inputValue){
         str += (`${key}=${inputValue[key]}&`)
    }
    props.setValue(inputValue)
    console.log(history)
    localStorage.setItem('value', JSON.stringify(inputValue))
    history.push(`/carParams?${str}`)
   }
   const handleChangeInput = (e,name) => {
      let cur = document.querySelector(`#${name}`)
      setInputValue({
          ...inputValue,
          [cur.id]: e 
      })
   }
    return (
        <form className="form">
        <div className="form__header">
        <Radio.Group defaultValue="a" buttonStyle="solid"> 
            <Radio.Button value="a">Все</Radio.Button>
            <Radio.Button value="b">Б/у</Radio.Button>
            <Radio.Button value="c">Новые</Radio.Button>
            <Radio.Button value="d">Под пригон</Radio.Button>
        </Radio.Group>
        </div>
        <div className="form__body">
            <div className="form__body-left">
            <Select defaultValue="passenger" style={{ width: 250 }} onChange={(e) => handleChangeInput(e,'typeOfTransport')} id="typeOfTransport">
                    <Option value="passenger">Легковые</Option>
                    <Option value="moto">Мото</Option>
                    <Option value="Грузовики">Грузовики</Option>
            </Select>
            <Select defaultValue="Марка" style={{ width: 250 }} onChange={(e) => handleChangeInput(e,'mark')} id="mark">
                    <OptGroup label="Все марки">
                    {currentCars && currentCars.map( (car,index) => {
                        return <Option value={car.mark} key={index}>{car.mark}</Option>
                    })}
                </OptGroup>
            </Select>
            <Select defaultValue="Модель" style={{ width: 250 }} onChange={(e) => handleChangeInput(e,'model')} id="model">
                <OptGroup label="Все автомобили">
                    {currentModels.length && currentModels[0].models.map( (item,index) => <Option value={item.model} key={index}>{item.model}</Option>)}
                </OptGroup>
            </Select>
            <button >Расширенный поиск</button>
            </div>
            <div className="form__body-right">
            <div>
            <span className="label">Регион</span>
            <Select defaultValue="Регионы" style={{ width: 200 }} onChange={(e) => handleChangeInput(e,'region')} id="region">
                <OptGroup label="Регионы">
                    <Option value="Odessa">Одесса</Option>
                    <Option value="Kiev">Киев</Option>
                    <Option value="Lviv">Львов</Option>
                </OptGroup>
            </Select>
            </div>
            <div>
            <span className="label">Год</span>
            <Select defaultValue="от" style={{ width: 93 }} onChange={(e) => handleChangeInput(e,'yearFrom')} id="yearFrom">
                <Option value="2020">2020</Option>
                <Option value="2019">2019</Option>
                <Option value="2018">2018</Option>
             </Select>
             <Select defaultValue="до" style={{ width: 93 }} onChange={(e) => handleChangeInput(e,'yearUntil')} id="yearUntil">
                <Option value="2020">2020</Option>
                <Option value="2019">2019</Option>
                <Option value="2018">2018</Option>
             </Select>
            </div>
            <div>
            <span className="label">Цена$</span>
                <Input
                onChange={(e) => handleChangeInput(e.target.value,'costFrom')} id="costFrom"
                style={{width: 93, marginBottom: 10, marginTop: 10} }
                size="middle"
                placeholder="от"
                />
              <Input
                style={{width: 93, marginBottom: 10, marginTop: 10} }
                onChange={(e) => handleChangeInput(e.target.value,'costTo')} id="costTo"
                size="middle"
                placeholder="до"
                />
            </div>
           <div className="btn__block">
           <button onClick={handleSearch}>Поиск</button>
           </div>
            </div>
        </div>
        </form>
    )
}

export default connect((inputValue) => inputValue, mainActions)(MainSearchForm)
