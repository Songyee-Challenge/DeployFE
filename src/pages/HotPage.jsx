import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

const RecruitBox = styled.div`
    margin-left: 4vw;
    margin-right: 3vw;
    padding-top: 1.2vw;
    font-family:'Pretendard';
    margin-bottom: 200px;
`;

const RecruitList = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
`;

const RecruitImageContainer = styled.div`
  border: 2px solid #ffd700;
  border-radius: 30px;
  overflow: hidden;
  width:253px;
  height:347px;
  cursor: pointer;
`;

const RecruitImage = styled.img`
    width:100%;
    height: 100%;
    border-bottom: 1px solid #ccc;
    object-fit: cover;
`;

const RecruitInfo = styled.div`
    width:17rem;
    margin-bottom: 100px;
`;

const RecruitTitle = styled.h3`
    font-weight: bold;
    font-size:1.25rem;
`;

const RecruitDetails = styled.div`
    margin-top: 0.5rem;
    border-top: 1px solid #ccc;
    padding-top: 0.5rem;
    font-size:1.1rem;
    display: flex;
    justify-content: space-between;
`;
const RecruitExplain = styled.div`
    margin-top: 0.5rem;
    border-top: 1px solid #ccc;
    padding-top: 0.5rem;
    font-size:1.1rem;   
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    width: 17rem;
    display: -webkit-box;
    -webkit-line-clamp: 2; // 원하는 라인수
    -webkit-box-orient: vertical;
    display: flex;
    justify-content: space-between;
`
const BtnContainer = styled.div`
  position: fixed;
  top: 75%;
  right: -20px;
`;

const TitleBox = styled.div`
    margin-right: 2vw;
    margin-bottom: 23px;
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    font-family: 'Pretendard';
    font-weight:bold;
    font-size: 1.6rem;
`

const ChallengeNumber = styled.div`
    margin-left: auto;
    margin-right: 2vw;
    font-family: 'Pretendard';
    font-size: 1.1rem;
`
const SeparateLine = styled.hr`
    border: none;
    border-top: 3px solid #000;
    margin-right: 3vw;
    margin-left:0px;
    margin-top:-10px;
`;

const Body = styled.div`
    margin-top: 4vw;
    margin-left: 0.5vw;
`;

const HotPage = () => {
    const navigate = useNavigate();
    const [recruit, setRecruit] = useState([]);
    const [total, setTotal] = useState("0");
    const [title, setTitle] = useState("");
    const state = useLocation();
    let ACCESS_TOKEN = localStorage.getItem("accessToken");

    const handleImageClick = (e) => {
        console.log(e.target.parentElement.parentElement.children[1].children[1].children[1].textContent);
        navigate(`/songchallenge/recruitdetail`, { state: {state: e.target.id, 
            start: e.target.parentElement.parentElement.children[1].children[1].children[1].textContent}});
    };

    const getRecruit = () => {
        axios.get(`http://43.200.19.7:8080/api/v1/main/hot`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${ACCESS_TOKEN}`
            }
        })
        .then(response => {
            console.log(response.data);
            setRecruit(response.data);
            setTotal(response.data.length);
        })
    }

    useEffect(() => {
        getRecruit();
    }, []);

    return (
        <RecruitBox>
            <TitleBox>
                <Title>실시간 인기 챌린지</Title>
                <ChallengeNumber>
                    총 {total}개의 챌린지
                </ChallengeNumber>
            </TitleBox>
            <SeparateLine/>
            <Body>
                <RecruitList>
                {recruit && recruit.map(challenge=>(
                    <div>
                    <RecruitImageContainer onClick={handleImageClick}>    
                        <RecruitImage id={challenge.challenge_id} src={`http://43.200.19.7:8080/api/v1/picture?pictureName=${challenge.picture}`}/>
                    </RecruitImageContainer>
                    <RecruitInfo>
                        <RecruitTitle>{challenge.challenge_title}</RecruitTitle>
                        <RecruitDetails>
                            <span style={{fontWeight:'bold'}}>기간</span>
                            <span style={{fontWeight:'bold'}}>{challenge.startDate.substring(0, 4)}.{challenge.startDate.substring(4, 6)}.{challenge.startDate.substring(6, 8)}
                            &nbsp;~&nbsp;
                            {challenge.endDate.substring(0, 4)}.{challenge.endDate.substring(4, 6)}.{challenge.endDate.substring(6, 8)}</span></RecruitDetails>
                        <RecruitExplain><div style={{fontWeight:"500"}}>신칭인원</div><div style={{color:"#42AF53", fontWeight:'bold'}}>{challenge.participantsNumber} 명</div></RecruitExplain>
                    </RecruitInfo>
                    </div>
                ))}
                </RecruitList>
            </Body>
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
        </RecruitBox>
    );
};

export default HotPage;