import React, { useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    border: none;
    outline: none;
    /* &:focus {
        outline: 2px solid #42AF53;
    } */
    width: ${props => props.inputwidth};
    height: 46px;
    padding: 0 10px 0 10px;
`
const Label = styled.div`
    width: ${props => props.labelwidth};
    height: 46px;
    cursor: pointer;
    border-radius: 2px;
    border: 1.5px solid ${props => props.bordercolor};
    background: #FFF;
    font-family: 'Pretendard';
    display: flex;
    align-items: center;
    margin-bottom: ${props => props.marginbottom};
`

const RegInput = (props) => {
    const { type, name, defaultValue, value, onChange, placeholder, pattern, btntitle, onBtnClick, width, inputwidth, marginbottom, bordercolor } = props;
    const [focus, setFocus] = useState(false);
    const handleFocus = () => {
        setFocus(!focus);
    }
    return (
        <Label style={focus ? {border:"1.5px solid #42AF53"} : {}} labelwidth={width} marginbottom={marginbottom} bordercolor={bordercolor || '#D4D4D4'}>
        <StyledInput type={type} defaultValue={defaultValue} name={name} value={value} onChange={onChange} placeholder={placeholder} patter={pattern}
         onFocus={handleFocus} onBlur={handleFocus} inputwidth={inputwidth}/>
        </Label>
    );
};

export default RegInput;