import React from 'react';
import styled from 'styled-components';
import DetailBar from '../components/DetailBar';

const Wrapper = styled.div`
    margin-top: 139.5px;
    margin-left: 27.5px;
`;

const Title = styled.p`
    font-family:'Pretendard';
    font-weight:bold;
    font-size: 25px;
`;

const SeparateLine = styled.hr`
    border: none;
    border-top: 3px solid #000;
    width: 95%;
    margin-left:0px;
    margin-top:-14px;
`;

const CompletedDetailPage = () => {
    return (
        <DetailBar context="completed"/>            
    );
};

export default CompletedDetailPage;