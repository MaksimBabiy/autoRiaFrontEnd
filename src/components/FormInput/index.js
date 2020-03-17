import React from 'react'
import { Radio,Select } from 'antd';
const { Option, OptGroup } = Select;
const FormInput = (props) => {
    const { defaultValue,title } = props 
    return (

        <div className="main__list-body-left-item">
        <span className="add__content-info-item-header" style={{fontWeight: 700}}>{title}</span>
        <Select defaultValue={defaultValue} style={{ width: 200 }} {...props}>
            
        </Select>
        </div>
    )
}

export default FormInput
