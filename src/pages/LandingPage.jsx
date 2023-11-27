import React from 'react';
import styled from 'styled-components';
import biglogo from '../images/songyee.png';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    background-color: #FFE27C;
    width: 100vw;
    height: 100vh;
    text-align: center;
`;
const Txt = styled.div`
    font-family: 'Dongle-regular';
    font-weight: 600;
    font-size: 3.5rem;
    letter-spacing: 3px;
    margin-right: 250px;
    margin-top: -10px;
`;
const TxtBtn = styled.div`
    display: flex;
    align-items: center;
`;
const Container = styled.div`
    display: flex;
    align-items: center;
    margin: auto;
    height: 30vh;
`

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <img src={biglogo} style={{width:"70vw", height:"60vh", marginTop:"5vh"}}/>
            <TxtBtn>
                <Container>
                <Txt>나만의 챌린지 메이트!<br/>송이들과 함께라면 어디든지 갈 수 있어~</Txt>
                <Button title='시작하기' onClick={() => {
                    navigate('/hello')
                }}/>
                </Container>
            </TxtBtn>
        </Wrapper>
    );
};

export default LandingPage;