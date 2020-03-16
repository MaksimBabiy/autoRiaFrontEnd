import React, { useState,useEffect } from 'react'
import { CarOutlined,CaretDownOutlined,WhatsAppOutlined ,BgColorsOutlined} from '@ant-design/icons';
import './addAuto.scss'
import { Link } from 'react-router-dom' 
import { Checkbox,Radio  } from 'antd';
import axios from 'axios'
import { Button as DefaultBtn} from 'components'
import { Select,Input } from 'antd';
const { Option, OptGroup } = Select;
const AddAuto = () => {
    const [isVisiable, setIsVisiable] = useState({
        photoAuto: true,
        mainInfo:true,
        cost: true,
        desc: true,
        extraDesc: true,
        contacts: true
    })
    const [currentCars, setCurrentCars] = useState(null)
    const [currentModels, setCurrentModels] = useState({})
    const [inputValue, setInputValue] = useState({
        typeOfTransport: 'passenger',
        currency: 'грн',
    })
    const [currentRegion, setCurrentRegion] = useState()
    const [currentCity, setCurrentCity] = useState({})
    const handleChange = (id,ss) => {
        setIsVisiable({
            ...isVisiable,
            [id]: !isVisiable[id]
        })
    }
    const handleChangeInput = (e,name) => {
        let cur = document.querySelector(`#${name}`)
        setInputValue({
            ...inputValue,
            [cur.id]: e 
        })
     }
     const create = () => {
         axios.post('http://localhost:3003/car', inputValue)
     }
    useEffect(() => {
        axios.get(`http://localhost:3333/${inputValue.typeOfTransport}`).then(({data}) => {
            setCurrentCars(data)
        })
        axios.get(`http://localhost:3333/${inputValue.typeOfTransport}?mark=${inputValue.mark}`).then(({data}) => {
            setCurrentModels(data)
        })
        
       }, [inputValue.typeOfЕransport, inputValue.mark])
       useEffect(() => {
        axios.get(`http://localhost:3333/regions`).then(({data}) => setCurrentRegion(data))
        axios.get(`http://localhost:3333/regions?region=${inputValue.region}`).then(({data}) => setCurrentCity(data))
     
       },[inputValue.region])
    
    return (
        <div className="add">
        <h2>Добавление объявления</h2>
        <div className="add__content" data="1" >
            <div onClick={() => handleChange('photoAuto')} >
            <p className="add__content-title" >Добавте фото автомобиля</p>
            <CaretDownOutlined onClick={() => handleChange('photoAuto')} className={isVisiable['photoAuto'] ?  "active": null }/>
            </div>
           {isVisiable['photoAuto'] && <Input prefix={<CarOutlined />} style={{width: 300}} id="photoAuto" placeholder="url" onChange={(e) => handleChangeInput(e.target.value,'url')} id="url"/>}
        </div>
        <div className="add__content" data="2">
           <div onClick={() => handleChange('mainInfo')}>
           <p className="add__content-title">Основная информация</p>
            <span>тип транспорта, марка, модель, регион</span>
           </div>
            <CaretDownOutlined onClick={() => handleChange('mainInfo')} className={isVisiable['mainInfo'] ?  "active": null }/>
           {isVisiable['mainInfo'] && 
          
                <div className="add__content-info">
                <div className='add__content-info-item'>
                    <span className="add__content-info-item-header">Тип транспорта</span>
                    <Select defaultValue="Выберите" style={{ width: 200 }} onChange={(e) => handleChangeInput(e,'typeOfTransport')} id="typeOfTransport">
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
                <div className='add__content-info-item'>
                    <span className="add__content-info-item-header">Марка авто</span>
                    <Select defaultValue="Выберите" style={{ width: 200 }} onChange={(e) => handleChangeInput(e,'mark')} id="mark">
                    <OptGroup label="Все марки">
                    {currentCars && currentCars.map( (car,index) => {
                        return <Option value={car.mark} key={index}>{car.mark}</Option>
                    })}
                </OptGroup>
                    </Select>
                </div>
                <div className='add__content-info-item'>
                    <span className="add__content-info-item-header">Модель авто</span>
                    <Select defaultValue="Выберите" style={{ width: 200 }} onChange={(e) => handleChangeInput(e,'model')} id="model">
                        <OptGroup label="Все автомобили">
                            {currentModels.length && currentModels[0].models.map( (item,index) => <Option value={item.model} key={index}>{item.model}</Option>)}
                        </OptGroup>
                    </Select>
                </div>
                <div className='add__content-info-item'>
                    <span className="add__content-info-item-header">Год выпуска</span>
                    <Input style={{ width: 200 }} placeholder="Год" onChange={(e) => handleChangeInput(e.target.value,'year')} id="year">
                    </Input>
                </div>
                <div className='add__content-info-item'>
                    <span className="add__content-info-item-header">Тип кузова</span>
                    <Select defaultValue="Выберите" style={{ width: 200 }} onChange={(e) => handleChangeInput(e,'bodyType')} id="bodyType">
                    <Option value="crossover">Внедорожний/Кросовер</Option>
                        <Option value="other">Другой</Option>
                        <Option value="cabriolet">Кабриолет</Option>
                        <Option value="coupe">Купе</Option>
                        <Option value="lightVan">Легкий фургон</Option>
                        <Option value="limousine">Лимузин</Option>
                        <Option value="liftback">Лифтбек</Option>
                        <Option value="minivan">Минивэн</Option>
                        <Option value="pickup">Пикап</Option>
                        <Option value="roadster">Родстер</Option>
                        <Option value="sedan">Седан</Option>
                        <Option value="stationWagon">Универсал</Option>
                        <Option value="hatchback">Хэтчбек</Option>
                    </Select>
                </div>
                <div className='add__content-info-item'>
                    <span className="add__content-info-item-header">Пробег</span>
                    <Input style={{ width: 200 }} placeholder="тыс.км." onChange={(e) => handleChangeInput(e.target.value,'mileage')} id="mileage"></Input>
                </div>
                <div className='add__content-info-item'>
                    <span className="add__content-info-item-header">Регион</span>
                    <Select defaultValue="Выберите" style={{ width: 200 }} onChange={(e) => handleChangeInput(e,'region')} id="region">
                        {currentRegion && currentRegion.map( (item,index) => <Option value={item.region} key={index}>{item.region}</Option>)}
                    </Select>
                </div>
                <div className='add__content-info-item'>
                    <span className="add__content-info-item-header">Город</span>
                    <Select defaultValue="Выберите" style={{ width: 200 }} onChange={(e) => handleChangeInput(e,'city')} id="city">
                        {currentCity.length && currentCity[0].cities.map( (item,index) => <Option value={item.city} key={index}>{item.city}</Option>)}
                    </Select>
                </div>
                <div className='add__content-info-item VIN'>
                    <div className="VIN__body">
                    <span className="VIN__body-title">Авто со статусом «Перевірений VIN-код» продаются вдвое быстрее</span>
                    <p className="VIN__body-p">Введите VIN-код и мы бесплатно проверим авто на предмет розыска и даты последней операции (по реестрам МВД), а также сверим информацию с порталом открытых данных и дилерскими базами.</p>
                        <span className="add__content-info-item-header">VIN-код</span>
                        <Input style={{ width: 200 }} placeholder="VIN-код" onChange={(e) => handleChangeInput(e.target.value,'VIN')} id="VIN"></Input>
                    </div>
                    </div>
                </div>    
           }
        </div>
        <div className="add__content" data="3">
                <div onClick={() => handleChange('cost')}>
                <p className="add__content-title">Стоимость</p>
                <span>цена, валюта, торг, обмен</span>
                </div>
                <CaretDownOutlined onClick={() => handleChange('cost')} className={isVisiable['cost'] ?  "active": null }/>
                {isVisiable['cost'] &&  
                <div className="add__content-body">
                 <span className="add__content-info-item-header">Цена</span>
                <Input style={{ width: 200 }} placeholder="Цена" onChange={(e) => handleChangeInput(e.target.value,'cost')} id="cost"></Input>
                <Select style={{width: 70}} defaultValue="грн" onChange={e => handleChangeInput(e,'currency')} id="currency">
                    <Option value="грн">грн</Option>
                    <Option value="$">$</Option>
                </Select>
               </div>
                }
        </div>
        <div className="add__content" data="4">
                <div className="add__content-desc-header" onClick={() => handleChange('desc')}>
                <p className="add__content-title">Описание автомобиля</p>
                <span>детально опишите особенности вашего авто</span>
                </div>
                <CaretDownOutlined onClick={() => handleChange('desc')} className={isVisiable['desc'] ?  "active": null }/>
                {isVisiable['desc'] &&  
                <div className="add__content-body">
                 <span className="add__content-info-item-header">Описание</span>
                 <Input.TextArea style={{width: '100%', height: 100}} placeholder="Описание автомобиля" onChange={(e) => handleChangeInput(e.target.value,'desc')} id="desc"/>
               </div>
                }
        </div>
        <div className="add__content" data="5">
                <div className="add__content-desc-header" onClick={() => handleChange('extraDesc')}>
                <p className="add__content-title">Дополнительные характеристики</p>
                <span>заинтересуйте больше покупателей</span>
                </div>
                <CaretDownOutlined onClick={() => handleChange('extraDesc')} className={isVisiable['extraDesc'] ?  "active": null }/>
                {isVisiable['extraDesc'] &&  
                <div className="add__content-body">
                    <div style={{ marginTop: 16 }}>
                    <span className="add__content-info-item-header">Топливо</span>
                    <Radio.Group  buttonStyle="solid" onChange={(e) => handleChangeInput(e.target.value,'fuel')} id="fuel">
                        <Radio.Button value="Бензин">Бензин</Radio.Button>
                        <Radio.Button value="Дизель">Дизель</Radio.Button>
                        <Radio.Button value="Газ">Газ</Radio.Button>
                        <Radio.Button value="Газ/бензин">Газ/бензин</Radio.Button>
                        <Radio.Button value="Гибрид">Гибрид</Radio.Button>
                        <Radio.Button value="Электро">Электро</Radio.Button>
                    </Radio.Group>
                    </div>
                    <div style={{ marginTop: 16 }}>
                    <span className="add__content-info-item-header">КПП</span>
                    <Radio.Group  buttonStyle="solid" onChange={(e) => handleChangeInput(e.target.value,'transmission')} id="transmission">
                        <Radio.Button value="Ручная/Механика">Ручная/Механика</Radio.Button>
                        <Radio.Button value="Автомат">Автомат</Radio.Button>
                        <Radio.Button value="Типтроник">Типтроник</Radio.Button>
                        <Radio.Button value="Адаптивная">Адаптивная</Radio.Button>
                        <Radio.Button value="Вавриатор">Вавриатор</Radio.Button>
                    </Radio.Group>
                    </div>
                    <div style={{ marginTop: 16 }}>
                    <span className="add__content-info-item-header">Тип привода</span>
                    <Radio.Group  buttonStyle="solid" onChange={(e) => handleChangeInput(e.target.value,'typeOfDrive')} id="typeOfDrive">
                        <Radio.Button value="Полный">Полный</Radio.Button>
                        <Radio.Button value="Передний">Передний</Radio.Button>
                        <Radio.Button value="Задний">Задний</Radio.Button>
                    </Radio.Group>
                    </div>
                    <div style={{ marginTop: 16 }}>
                    <span className="add__content-info-item-header">Объём, л.</span>
                        <Input onChange={e => handleChangeInput(e.target.value,'engineCapacity')} placeholder="Литры" style={{width: 100}} id="engineCapacity"/>
                    </div>
                    <div style={{ marginTop: 16 }}>
                    <span className="add__content-info-item-header">Мощность, л.с.</span>
                        <Input onChange={e => handleChangeInput(e.target.value,'power')} placeholder="л.с" style={{width: 100}} id="power"/>
                    </div>
                  <span className="add__content-info-item-header">Цвет</span>
                  <Select style={{width: 170}} defaultValue="Выберите" onChange={e => handleChangeInput(e,'color')} id="color">
                    <Option value="red" style={{background: 'red',color: 'white'}}>Красный</Option>
                    <Option value="beige" style={{background: 'beige',color: 'black'}}>Бежевый</Option>
                    <Option value="black" style={{background: 'black',color: 'white'}}>Черный</Option>
                    <Option value="blue" style={{background: 'blue',color: 'white'}}>Синий</Option>
                    <Option value="gray" style={{background: 'gray',color: 'white'}}>Серый</Option>
                    <Option value="yellow" style={{background: 'yellow',color: 'black'}}>Желтый</Option>
                    <Option value="orange" style={{background: 'orange',color: 'white'}}>Оранжевый</Option>
                    <Option value="purple" style={{background: 'purple',color: 'white'}}>Фиолетовый</Option>
                    <Option value="white" style={{background: 'white',color: 'black'}}>Белый</Option>
                </Select>
                <div>
                    <Checkbox onChange={e => handleChangeInput(e.target.checked,'metallic')} id="metallic">Металлик</Checkbox>
               </div>
               </div>
              
                }
        </div>
        <div className="add__content" data="6">
                <div className="add__content-desc-header" onClick={() => handleChange('contacts')}>
                <p className="add__content-title">Контакты продавца</p>
                </div>
                <CaretDownOutlined onClick={() => handleChange('contacts')} className={isVisiable['contacts'] ?  "active": null }/>
                {isVisiable['contacts'] &&  
                <div className="add__content-body">
                <WhatsAppOutlined style={{fontSize: 20, marginRight: 5}}/>
                 <span className="add__content-info-item-header">Телефон</span>
                 <Input placeholder="Телефон" onChange={e => handleChangeInput(e.target.value, 'phone')} id="phone" style={{width: 200}}/>
               </div>
                }
        </div>
        <Link to="/"><DefaultBtn onClick={create} style={{marginTop: 15}}>Разместить объявление</DefaultBtn></Link>
        </div>
        
    )
}

export default AddAuto
