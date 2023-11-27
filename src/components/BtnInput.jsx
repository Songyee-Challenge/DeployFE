import React, { useState } from 'react';
import styled from 'styled-components';
import '../style/input.css'

const StyledInput = styled.input`
    border: none;
    outline: none;
    /* &:focus {
        outline: 2px solid #42AF53;
    } */
    width: 400px;
    height: 46px;
    padding: 0 10px 0 10px;
`
const Btn = styled.div`
    width: 100px;
    height: 27px;
    line-height: 27px;
    border-radius: 2px;
    border: 2px solid #000;
    margin-right: 10px;
    font-weight: 600;
    font-size: 12px;
    &:hover {
        background-color: #000;
        color: white;
    }
`
const Label = styled.div`
    width: 400px;
    height: 46px;
    cursor: pointer;
    border-radius: 2px;
    border: 1.5px solid #D4D4D4;
    background: #FFF;
    font-family: 'Pretendard';
    display: flex;
    align-items: center;
`

const BtnInput = (props) => {
    const [focus, setFocus] = useState(false);
    const handleFocus = () => {
        setFocus(!focus);
    }
    const { type, name, defaultValue, value, onChange, placeholder, pattern, btntitle, onBtnClick } = props;
    return (
        <Label style={focus ? {border:"1.5px solid #42AF53"} : {}}>
        <StyledInput type={type} defaultValue={defaultValue} name={name} value={value} onChange={onChange} placeholder={placeholder} patter={pattern}
            onFocus={handleFocus} onBlur={handleFocus}/>
        <Btn onClick={onBtnClick}>{btntitle || '버튼'}</Btn>
        </Label>
    );
};

export default BtnInput;