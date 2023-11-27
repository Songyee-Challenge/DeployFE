import React from 'react';
import styled from 'styled-components';
import backimg from '../images/nugul.png';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    background-color: #FFE27C;
    text-align: center;
    width: 100vw;
    height: 100vh;
    position: relative;
`;
const Talk = styled.div`
    font-family: 'Dongle-regular';
    font-size: 2.3rem;
    font-style: normal;
    font-weight: 400;
    position: absolute;
    z-index: 1;
    top: 58vh;
    left: 33vw;
    //transform: translate(-50vw, -5vh);
`
const Color = styled.span`
    color: ${props => props.color};
    font-weight: 600;
    font-size: 2.5rem;
`;
const LoginBtn = styled.div`
    cursor: pointer;
    border-radius: 50px;
    background: #ECC046;
    position: absolute;
    bottom: 2.5vh;
    width: 10vw;
    height: 50px;
    line-height: 50px;
    font-family: 'dongle-regular';
    font-size: 1.5rem;
    font-weight: 700;
    left: 50%;
    transform: translate(-50%, 0);
`;

const InvitePage = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <img src={backimg} style={{width:"100vw",height:"90vh", position:"absolute", zIndex:"0", top: "0",left:"0"}}/>
            <Talk>
            아무것도 없는 무인도에 떨어진 당신!<br/>
            내 손으로 꾸려 나가는 내 미래, 눈송 주민들과 함께 해보세요.<br/>
            <Color color= '#00A7FF'>취미 생활부터 스펙 개발, 스터디</Color>까지 내가 원하는 것 무엇이든!<br/>
            <Color color= '#FF528B;'>나만의 챌린지 메이트</Color>를 구한다면? <Color color='#42AF53'>송이의 숲</Color>으로 오세요~<br/>
            </Talk>
            <LoginBtn onClick={() => {
                navigate('/login');
            }}>
                로그인하고 시작하기
            </LoginBtn>
        </Wrapper>
    );
};

export default InvitePage;