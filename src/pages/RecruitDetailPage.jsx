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
    margin-top:-10px;
`;

const RecruitDetailPage = () => {
    return (
        <Wrapper>
            <Title>모집 중인 챌린지</Title>
            <SeparateLine/>
            <DetailBar context="recruiting"/>
        </Wrapper>
    );
};

export default RecruitDetailPage;