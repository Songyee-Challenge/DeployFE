import React from 'react';
import styled from 'styled-components';
import DetailBar from '../components/DetailBar';

const Wrapper = styled.div`
    margin-top:50px;
`;

const Title = styled.p`
    font-family:'Pretendard';
    font-weight:bold;
    font-size: 1.7rem;
`;

const SeparateLine = styled.hr`
    border: none;
    border-top: 3px solid #000;
    width: 95%;
    margin-left:0px;
    margin-top:10px;
`;

const CompletedDetailPage = () => {
    return (
        <Wrapper>
            <Title>종료된 챌린지</Title>
            <SeparateLine/>
            <DetailBar context="completed"/>            
        </Wrapper>
    );
};

export default CompletedDetailPage;