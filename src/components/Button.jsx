import React from 'react';
import styled from 'styled-components';
import arrow from '../images/arrow.svg';

const Btn = styled.div `
    background-color: #FF528B;
    cursor: pointer;
    font-family: 'Dongle-regular';
    font-weight: 600;
    font-size: ${props => props.fontSize};
    color: white;
    width: 20vw;
    height: 120px;
    border-radius: 25px;
    line-height: 40px;
    display: flex;
    align-items: center;
    letter-spacing: 3px;
    white-space: pre-wrap;
`
const Txt = styled.div`
    margin: auto;
    display: flex;
    align-items: center;
    margin-top: ${props => props.marginTop};
`
const Img = styled.img`
    margin-left: ${props => props.marginLeft};
    width: ${props => props.width};
`

const Button = (props) => {
    const { onClick, title, fontSize, marginLeft, width, marginTop } = props;
    return (
        <Btn onClick={onClick} fontSize={fontSize || "3.5rem"}>
            <Txt marginTop={marginTop}>
            {title || "버튼"}
            <Img src={arrow} width={width || "80px"} marginLeft={marginLeft || "30px"}/>
            </Txt>
        </Btn>
    );
};

export default Button;