import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';

const RecruitBox = styled.div`
  margin-left: 47.5px;
  margin-right: 40px;
  padding-top: 10px;
  font-family:'Pretendard';
  margin-bottom: 180px;
`;

const RecruitList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 60px;
  width: 100%;
`;

const RecruitImageContainer = styled.div`
  border: 2px solid #ffd700;
  border-radius: 30px;
  overflow: hidden;
  width: 253px;
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
`;

const RecruitTitle = styled.h3`
  font-weight: 600;
  font-size: 1.2rem;
  color: black;
  margin-bottom: 5px;
  width: 245px;
  text-align: left;
  word-wrap: break-word;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RecruitDetails = styled.div`
  width: 245px;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  border-top: 1px solid #ccc;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const RecruitExplain = styled.div`
  width: 245px;
  border-top: 1px solid #ccc;
  padding-top: 0.5rem;
  font-size: 1rem;   
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`

const TitleBox = styled.div`
  margin-right: 30px;
  margin-left: 10px;
  margin-bottom: 23px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  font-weight:bold;
  font-size: 1.8rem;
  position: fixed;
  padding-bottom: 10px;
  padding-top: 10px;
  width: 100%;
  background-color: white;
`;

const ChallengeNumber = styled.div`
  margin-left: 230px;
  margin-top: 10px;
  font-size: 1.1rem;
  position: fixed;
`;

const Line = styled.div`
  margin-left: 10px;
  width: 295px;
  border-bottom: 3px solid #000;
  position: fixed;
`

const Body = styled.div`
  padding-top: 40px;
  margin-left: 10px;
  margin-right: 3.3vw; 
  overflow-y: auto;
`;

const CategoryPage = () => {
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
        axios.get(`http://43.200.19.7:8080/api/v1/main/category?category=자유스터디`,  {
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
                <Title>자유스터디 챌린지</Title>
                <ChallengeNumber>
                    (총 {total}개)
                </ChallengeNumber>
                <SearchBar/>
            </TitleBox>
            <Line/>
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
                            <span>기간</span>
                            <span style={{fontWeight:'bold'}}>{challenge.startDate.substring(0, 4)}.{challenge.startDate.substring(4, 6)}.{challenge.startDate.substring(6, 8)}
                            &nbsp;~&nbsp;
                            {challenge.endDate.substring(0, 4)}.{challenge.endDate.substring(4, 6)}.{challenge.endDate.substring(6, 8)}</span></RecruitDetails>
                        <RecruitExplain>{challenge.detail}</RecruitExplain>
                    </RecruitInfo>
                    </div>
                ))}
                </RecruitList>
            </Body>
        </RecruitBox>
    );
};

export default CategoryPage;