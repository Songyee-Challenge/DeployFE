import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import example from '../images/exampleimage.png';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import Button from './Button';

const CompletedBox = styled.div`
    margin-left:3vw;
    margin-top:5vw;
    font-family:'Pretendard';
`;

const CompletedList = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 50px;
`;

const CompletedImageContainer = styled.div`
    border: 2px solid #ffd700;
    border-radius: 30px;
    overflow: hidden;
    width:253px;
    height:347px;
    cursor: pointer;
`;

const CompletedImage = styled.img`
    width:100%;
    height: 100%;
    border-bottom: 1px solid #ccc;
    object-fit: cover;
`;

const CompletedInfo = styled.div`
    width:17rem;
    color: #747474;
`;

const CompletedTitle= styled.h3`
    font-weight: bold;
    font-size:1.25rem;
`;

const CompletedDetails =styled.p`
    margin-top:0.5rem;
    border-top: 1px solid #ccc;
    padding-top: 0.5rem;
    font-size:1.1rem;
    display: flex;
    justify-content: space-between;
`;
const BtnContainer = styled.div`
  position: fixed;
  top: 75%;
  right: -20px;
`;

const CompletedChallenge = () => {
    const navigate = useNavigate();
    const [complete, setComplete] = useState([]);
    const [total, setTotal] = useState("0");
    let ACCESS_TOKEN = localStorage.getItem("accessToken");

    const handleImageClick = (e) => {
        //console.log(e.target.id);
        navigate(`/songchallenge/completeddetail`, { state: {state: e.target.id, 
            start: e.target.parentElement.parentElement.children[1].children[1].children[1].textContent}});
    };

    const getCompleted = () => {
        axios.get('http://43.200.19.7:8080/api/v1/challenge/finished',  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${ACCESS_TOKEN}`
            }
        })
        .then(response => {
            console.log(response.data);
            setComplete(response.data);
            setTotal(response.data.length);
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getCompleted();
    }, []);

    return (
        <CompletedBox>
            <h3 style={{marginBottom:'70px'}}>총 {total}개의 챌린지</h3>
            <CompletedList>
            {complete && complete.map(challenge=>( 
                <div>
                <CompletedImageContainer onClick={handleImageClick}>
                    <CompletedImage id={challenge.challenge_id} src={`http://43.200.19.7:8080/api/v1/picture?pictureName=${challenge.picture}`}/>
                </CompletedImageContainer>
            <CompletedInfo>
                <CompletedTitle>{challenge.challenge_title}</CompletedTitle>
                <CompletedDetails>
                    <span>기간</span>
                    <span style={{fontWeight:'bold'}}>{challenge.startDate.substring(0, 4)}.{challenge.startDate.substring(4, 6)}.{challenge.startDate.substring(6, 8)}
                    &nbsp;~&nbsp;
                    {challenge.endDate.substring(0, 4)}.{challenge.endDate.substring(4, 6)}.{challenge.endDate.substring(6, 8)}</span>
                </CompletedDetails>
                <CompletedDetails>
                        <span>진행</span>
                        <span><ProgressBar percentage={challenge.progressPercent}/></span>
                </CompletedDetails>
                {/* 진행바 추가!! */}
                <CompletedDetails>{challenge.explain}</CompletedDetails>
            </CompletedInfo>
            </div>
        ))}
        </CompletedList>
        <BtnContainer>
        <Button
          fontSize="2.3rem"
          title={`챌린지 생성\n \u00A0바로가기`}
          marginTop="25px"
          marginLeft="15px"
          onClick={() => {
            navigate("/agree");
          }}
        />
      </BtnContainer>
        </CompletedBox>
    );
};

export default CompletedChallenge;