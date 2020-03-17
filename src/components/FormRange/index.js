import React from 'react'
import { Radio,Select, Input } from 'antd';
const { Option, OptGroup } = Select;
const FormRange = (props) => {
    const { title,fTitle,sTitle,fId,sId,fItem,sItem, handleChangeInput, select } = props
    console.log(fId)
    return (
        <div className="main__list-body-left-item">
        <span className="add__content-info-item-header" style={{fontWeight: 700}}>{title}</span>
        <div className="main__list-body-left-item-year">
       {select ? <Select  style={{ width: 97 }} defaultValue={'от'} onChange={(e) => handleChangeInput(e,`${fId}`)} id={fId}>
            <Option value={''}>{fTitle}</Option>
            { fItem && fItem.map((item,index) => <Option value={item} key={index}>{item}</Option>) }
        </Select> 
        :
        <Input placeholder="от" style={{width: 97, height: 32, marginRight: 5, marginTop: 5}} />
        } 
        {select ? <Select  style={{ width: 97 }} defaultValue={'до'} onChange={(e) => {
            handleChangeInput(e,`${sId}`)
        }} id={sId}>
        <Option value={''}>{sTitle}</Option>
            {sItem && sItem.map((item,index) => <Option value={item} key={index}>{item}</Option>)}
        </Select>
        :
        <Input placeholder="до" style={{width: 97, height: 32,marginTop: 5}} />
        } 
        </div>
        </div>
    )
}

export default FormRange
