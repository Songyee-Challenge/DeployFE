import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100%;
    height: 120px;
    line-height: 120px;
    display: flex;
    align-items: center;
    //border-bottom: solid 1px black;
    border-bottom: ${props => props.borderbottom};
    position: fixed;
    top: 0px;
    background-color: white;
    justify-content: space-between;
    font-family: 'Dongle-regular', sans-serif;
    z-index: 99;
`;
const MainMenu = styled.div`
    display: flex;
    margin-left: 3vw;
`;
const Menu = styled.div`
    color: #000;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    margin-right: ${props => props.marginR};
    cursor: pointer;
`;
const LogoMenu = styled.div`
    display: flex;
    align-items: center;
    margin-left: 3vw;
`;

const Topbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Wrapper borderbottom={location.pathname == '/signup' || location.pathname == '/login' || location.pathname == '/home' || location.pathname == '/agree' || location.pathname == '/create' ? 'solid 1px black' : ''}>
            <LogoMenu>
            <img src={logo} style={{width:"180px", cursor:"pointer"}} onClick={() => {
                navigate('/home');
            }}/>
            <MainMenu>
            <Menu marginR="3vw" onClick={() => {
                navigate('/songchallenge');
            }}>송이의 챌린지</Menu>
            <Menu onClick={() => {
                navigate('/diary');
            }}>송이의 일기장</Menu>
            </MainMenu>
            </LogoMenu>
            <Menu marginR="5vw" onClick={() => {
                navigate('/my');
            }}>마이 챌린지</Menu>
        </Wrapper>
    );
};

export default Topbar;