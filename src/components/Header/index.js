import React from 'react'
import { Button } from 'components'
import { Link } from 'react-router-dom'
import './index.scss'
const Header = () => {
    return (
        <div className="header">
            <div className="header__container">
            <div className='header__logo'>
                <Link to="/"><img src="https://auto.ria.com/images/autoria-seo.png" alt="something"/></Link>
            </div>
            <ul className="header__list">
                <li className="header__list-item">Автомобили б/у</li>
                <li className="header__list-item">Новые авто</li>
                <li className="header__list-item">Новости</li>
                <li className="header__list-item">Все для авто</li>
            </ul>
            <Link to="add_auto"><Button>Продать авто</Button></Link>
            </div>
        </div>
    )
}

export default Header
