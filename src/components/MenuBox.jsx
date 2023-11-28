import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MenuBoxContainer = styled.div`
    background: rgba(66, 175, 83, 0.90);
    height: 240px;
    display: flex;
    align-items: center;
`
const Box = styled.div`
    display: flex;
    justify-content: space-between;
    width: calc(100vw - 400px);
    padding: 0 200px;
`
const Menu = styled.div`
    white-space: nowrap;
    border-radius: 50%;
    background-color: #FFE27C;
    color: black;
    width: 150px;
    height: 150px;
    min-width: 110px;
    font-family: 'Dongle-regular';
    font-size: 2.7rem;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const MenuBox = () => {
    const navigate = useNavigate();

    const handleMenu = (e) => {
        console.log(e.target.id);
        navigate(`/category/${e.target.id}`, {state: e.target.id});
    }
    return (
        <MenuBoxContainer>
                <Box>
                    <Menu onClick={() => {navigate('/category/test')}}>자격증/<br/>&nbsp;시험</Menu>
                    <Menu onClick={handleMenu} id="공채">공채</Menu>
                    <Menu onClick={handleMenu} id="자유스터디">&nbsp;자유<br/>스터디</Menu>
                    <Menu onClick={handleMenu} id="취미">취미</Menu>
                    <Menu onClick={handleMenu} id="운동">운동</Menu>
                </Box>
        </MenuBoxContainer>
    );
};

export default MenuBox;