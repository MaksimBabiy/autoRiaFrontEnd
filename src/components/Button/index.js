import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import './button.scss'
const Button = (props) => {
    return (
        <button className="btn" {...props}><PlusOutlined style={{marginRight: 5}}/>{props.children}</button>
    )
}

export default Button
