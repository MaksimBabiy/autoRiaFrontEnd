import React from 'react'
import { Radio,Select } from 'antd';
const { Option, OptGroup } = Select;
const FormInput = ({type, amount}) => {
    return (
        type == 'radio' ?
        <Radio.Group defaultValue="a" buttonStyle="solid"> 
            <Radio.Button value="a">Hangzhou</Radio.Button>
            <Radio.Button value="b">Shanghai</Radio.Button>
            <Radio.Button value="c">Beijing</Radio.Button>
            <Radio.Button value="d">Chengdu</Radio.Button>
        </Radio.Group>
        :
        <Select defaultValue="lucy" style={{ width: 200 }} >
        <OptGroup label="Manager">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
        </OptGroup>
            <OptGroup label="Engineer">
            <Option value="Yiminghe">yiminghe</Option>
        </OptGroup>
        </Select>
    )
}

export default FormInput
