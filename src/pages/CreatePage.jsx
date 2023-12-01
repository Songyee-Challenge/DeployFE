import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import CustomDatePicker from '../components/DatePicker';
import MDatePicker from '../components/MDatePicker';
import photo from '../images/photo.png';
import camera from '../images/camera.svg';
import { useNavigate } from 'react-router-dom';
import '../style/Radio.css';
import axios from 'axios';

const CreatePage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [inputcount, setInputCount] = useState(0);

    const today = new Date();
    const [startDate, setStartDate] = useState(new Date(today.setDate(today.getDate() + 1)));
    const [endDate, setEndDate] = useState(new Date(today));
    const [missions, setMissions] = useState([]);
    const [mtxt, setMtxt] = useState("");
    const [mdate, setMdate] = useState(new Date());
    const [nextId, setNextId] = useState(1);
    const [explain, setExplain] = useState("");
    const [expcount, setExpcount] = useState(0);
    const [imgname, setImgname] = useState("");
    const [imgFile, setImgFile] = useState("");
    const [realfile, setRealFile] = useState([]);
    const imgRef = useRef();
    const [category, setCategory] = useState("");

    const [istitle, setIstitle] = useState(false);
    const [isdate, setIsdate] = useState(false);
    const [ismission, setIsmission] = useState(false);
    const [isexplain, setIsexplain] = useState(false);
    const [iscateg, setIscateg] = useState(false);

    let ACCESS_TOKEN = localStorage.getItem("accessToken");

    const handleTitle = (e) => {
        setTitle(e.target.value);
        if (e.target.value.length > 30) {
            return
          }
        setInputCount(
            e.target.value.length
        );
    }

    // 미션 추가 관련
    const handleMtxt = e => setMtxt(e.target.value);
    const handleClick = () => {
        const newList = missions.concat({
            id:nextId,
            mission: mtxt,
            missionDate: dateToString(mdate)
        });
        setNextId(nextId+1);
        setMissions(newList);
        setMtxt('');
        setMdate(new Date());
        console.log(newList);
    };
    const handleDelete = id => {
        const newList = missions.filter(mission => mission.id !== id);
        setMissions(newList);
    };
    const missionList = missions.map((mission,index) => 
        <ListBox key={mission.id}>
            <Mli>
                <MissionNum>미션 {index+1}</MissionNum>
                <MissionDate>[{mission.missionDate.substring(0,4)}.{mission.missionDate.substring(4,6)}.{mission.missionDate.substring(6,8)}]</MissionDate>
                {mission.mission}
                <DelBtn onClick={() => handleDelete(mission.id)}>삭제</DelBtn>
            </Mli>
        </ListBox>
    );


    const handleExplain = (e) => {
        setExplain(e.target.value);
        if (e.target.value.length > 500) {
            return
        }
        setExpcount(
            e.target.value.length
        );
    }
    // 이미지 업로드 input의 onChange
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        setRealFile(file);
        setImgname(file.name)
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImgFile(reader.result);
            };
            console.log(file);
        }
    };

    const dateToString = (date) => {
        return date.getFullYear() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0')
    }

    const handleRadio = (e) => {
        setCategory(e.target.value);
    }

    // interface Uploader {
    //     "title": title,
    //     "startDate": dateToString(startDate),
    //     "endDate": dateToString(endDate),
    //     "category": category,
    //     "explain": explain,
    //     "missions": missions
    //   };

    const handleCreate = () => {
        const formData = new FormData();

        const value = {
            "title": title,
            "startDate": dateToString(startDate),
            "endDate": dateToString(endDate),
            "category": category,
            "detail": explain,
            "missions": missions
        }
        
        console.log(value);

        const blob = new Blob([JSON.stringify(value)], {
            type: 'application/json',
          });
        
        formData.append('dto', blob);
        formData.append("picture", realfile);
        // FormData의 key 확인
        for (let key of formData.keys()) {
            console.log(key);
        }
        
        // FormData의 value 확인
        for (let value of formData.values()) {
            console.log(value);
        }

        if (inputcount > 0 && startDate !== endDate && missions.length > 0 && expcount > 0 && category !== "") {
            axios.post('http://43.200.19.7:8080/api/v1/challenge/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': ` Bearer ${ACCESS_TOKEN}`
                }
            })
            .then(response => {
                alert('챌린지 개설 완료!');
                navigate('/challenge/recruiting');
                console.log(response);
            })
            .catch(error => {
                console.log('Error create: ', error);
            })
            // console.log(
            //     '제목: ', title,
            //     '시작일: ', dateToString(startDate),
            //     '마감일: ', dateToString(endDate),
            //     '미션',
            //     '소개: ', explain,
            //     '대표사진: ', imgFile,
            //     '카테고리: ', category
            // )
        }
        else {
            alert('아직 입력하지 않은 부분이 있어요!');
        }
    }

    return (
        <Wrapper>
            <Title>챌린지를 만들어주세요!</Title>
            <Txt>챌린지 제목</Txt>
            <div style={{width:"720px"}}>
            <TitleInput
                name='title' id='title'
                value={title}
                onChange={handleTitle} 
                maxLength='30'/>
            <InputCount>{inputcount}/30</InputCount>
            </div>
            <Txt>챌린지 기간</Txt>
            <div style={{display:"flex"}}>
            <div>
            <SubTxt>챌린지 시작일</SubTxt>
            <CustomDatePicker
                selectedDate={startDate}
                setSelectedDate={setStartDate}
                //minDate={new Date()}
                minDate={startDate}
            />
            </div>
            <Wave>-</Wave>
            <div>
            <SubTxt>챌린지 마감일</SubTxt>
            <CustomDatePicker
                selectedDate={endDate}
                setSelectedDate={setEndDate}
                minDate={startDate}
            />
            </div>
            </div>
            <Txt>미션 내용 입력</Txt>
            <MFlex>
                <MInput 
                    value={mtxt}
                    onChange={handleMtxt}
                    placeholder='미션 추가하기 (날짜 순이 아니어도 좋아요)'
                />
                <MDatePicker
                    selectedDate={mdate}
                    setSelectedDate={setMdate}
                    minDate={startDate}
                    maxDate={endDate}/>
                <MBtn onClick={handleClick}>추가하기</MBtn>
            </MFlex>
            <Mul>{missionList}</Mul>
            <div style={{width:"1020px"}}>
            <Txt>챌린지 소개</Txt>
            <PlusTxt>글을 추가해 챌린지를 소개해보세요.</PlusTxt>
            <ExplainArea
                maxLength="500"
                rows="2" 
                style={{resize: 'none'}}
                placeholder='예) 매일 1만보 걷고 건강해지기! 오늘부터 같이 해봐요 :)'
                onChange={handleExplain}/>
            <InputCount>{expcount}/500</InputCount>
            </div>
            <Txt>대표사진</Txt>
            <PlusTxt>챌린지를 잘 설명할 수 있는 사진으로 선택해주세요. 멋진 썸네일은 인기의 비결!</PlusTxt>
            <Label for="profileImg">
                <Box>
                    <img src={imgFile ? imgFile : photo} style={{width:"100%", height:"100%", borderRadius:'10px'}}/>
                    <PhotoTxt><Photodiv><img src={camera}/>사진 선택</Photodiv></PhotoTxt>
                </Box>
            </Label>
            <FileInput
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
            />
            <Txt>카테고리 선택</Txt>
            <PlusTxt>어느 카테고리에 챌린지를 노출할까요?</PlusTxt>
            <div style={{display:"flex"}}>
            <RadioBtn
                type='radio'
                value="자격증/시험" 
                id="test"
                name='category'
                onChange={handleRadio}
            /><RadioLabel for="test">자격증/시험</RadioLabel>
            <RadioBtn
                type='radio'
                value="공채" 
                id="gong"
                name='category'
                onChange={handleRadio}
            /><RadioLabel for="gong">공채</RadioLabel>
            <RadioBtn
                type='radio'
                value="자유스터디" 
                id="study"
                name='category'
                onChange={handleRadio}
            /><RadioLabel for="study">자유스터디</RadioLabel>
            <RadioBtn
                type='radio'
                value="취미" 
                id="hobby"
                name='category'
                onChange={handleRadio}
            /><RadioLabel for="hobby">취미</RadioLabel>
            <RadioBtn
                type='radio'
                value="운동" 
                id="exc"
                name='category'
                onChange={handleRadio}
            /><RadioLabel for="exc">운동</RadioLabel></div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
            <AgreeTxt><u>챌린지 개설 약관</u>에 동의하며 챌린지를 개설합니다.</AgreeTxt>
            <CreateBtn onClick={handleCreate}>챌린지 개설하기</CreateBtn>
            </div>
        </Wrapper>
    );
};

export default CreatePage;

const Wrapper = styled.div`
    padding: 50px 100px;
    font-family: 'Pretendard';
`
const Title = styled.div`
    font-weight: 900;
    font-size: 2rem;
    margin-bottom: 50px;
`
const Txt = styled.div`
    font-weight: 800;
    font-size: 1.7rem;
    margin-bottom: 10px;
    margin-top: 50px;
`
const TitleInput = styled.input`
    width: 700px;
    height: 50px;
    border-radius: 10px;
    outline: 2px solid #D9D9D9;
    border: none;
    background: #FFF;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 5px 10px;
    &:focus {
        outline: 2px solid #42AF53;
        border: none;
    }
`
const InputCount = styled.div`
    text-align: right;
    font-size: 1.2rem;
    margin-top: 5px;
    color: #CECECE;
`
const SubTxt = styled.div`
    font-size: 1rem;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 10px;
`
const PlusTxt = styled.div`
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 20px;
`
const Wave = styled.div`
    margin-top: 20px;   
    width: 100px;
    height: 100px;
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    font-weight: 600;
`
const ExplainArea = styled.textarea`
    width: 1000px;
    height: 130px;
    border-radius: 10px;
    outline: 2px solid #D9D9D9;
    border: none;
    background: #FFF;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 10px;
    &:focus {
        outline: 2px solid #42AF53;
        border: none;
    }
    &::placeholder {
        color: #D9D9D9;
    }
`
const FileInput = styled.input`
    display: none;
    width: 253px;
`
const Label = styled.label`
    width: 253px;
`
const Box = styled.div`
    width: 200px;
    height: 194px;
    border-radius: 10px;
    border: 3px solid #D9D9D9;
    z-index: 3;
    cursor: pointer;
    > img {
        position: relative;
        z-index: 0;
        object-fit: cover
    }
`
const PhotoTxt = styled.div`
    width: 100%;
    height: 50px;
    background: rgba(153, 153, 153, 0.30);
    margin-top: -50px;
    position: relative;
    z-index: 98;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: white;
    font-size: 1.2rem;
    text-align: center;
    font-weight: 800;
    line-height: 50px;
    display: flex;
`
const Photodiv = styled.div`
    display: flex;
    justify-content: center;
    > img {
        display: flex;
        justify-content: center;
        width: 30px;
        margin-right: 5px;
    }
    margin: auto;
`
const RadioBtn = styled.input`
    appearance: none;
`
const RadioLabel = styled.label`
    margin-right: 20px;
    cursor: pointer;
    width: 150px;
    height: 70px;
    border-radius: 30px;
    background-color: white;
    text-align: center;
    line-height: 70px;
    border: 3px solid #D9D9D9;
    font-weight: 600;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
        background: #000;
        color: white;
        border: 3px solid #000;
    }
    &:checked {
        background: #000;
        color: white;
        border: 3px solid #000;
    }
`
// const LabelBox = styled.div`
//     width: 150px;
//     height: 70px;
//     border-radius: 30px;
//     background-color: white;
//     text-align: center;
//     line-height: 70px;
//     border: 3px solid #D9D9D9;
//     font-weight: 600;
//     font-size: 1.2rem;
//     cursor: pointer;

//     &:hover {
//         background: #000;
//         color: white;
//         border: 3px solid #000;
        
//     }
// `
const AgreeTxt = styled.div`
    color: #646464;
    font-weight: 700;
    font-size: 1.2rem;
    margin-top: 90px;
`
const CreateBtn = styled.div`
    width: 222px;
    height: 90px;
    border-radius: 10px;
    background: #000;
    color: white;
    text-align: center;
    line-height: 90px;
    font-size: 1.5rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 80px;
`
const MFlex = styled.div`
    display: flex;
`
const MInput = styled.input`
    width: 800px;
    height: 70px;
    border-radius: 10px;
    outline: 2px solid #D9D9D9;
    border: none;
    background: #FFF;
    padding: 0 20px;
    font-size: 1.2rem;
    margin-right: 10px;
    &::placeholder {
        color: #D9D9D9;
        font-size: 1.2rem;
    }
    &:focus {
        outline: 2px solid #42AF53;
        border: none;
    }
`
const MBtn = styled.button`
    width: 160px;
    height: 70px;
    border-radius: 10px;
    background: #000;
    color: white;
    font-size: 1.4rem;
    font-weight: 700;
    cursor: pointer;
    margin-left: 20px;
`
const Mul = styled.ul`
    list-style:none;
    padding-left:0px;
`
const ListBox = styled.div`
    background-color: #F2F2F2;
    border-radius: 10px;
    width: 850px;
    color: #262626;
    height: 70px;
    margin-bottom: 10px;
`
const Mli = styled.li`
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 70px;
    padding-left: 30px;
    padding-right: 30px;
`
const DelBtn = styled.button`
    float: right;
    margin-top: 15px;
    display: flex;
    width:60px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: black;
    color: white;
    border: 0;
    border-radius: 3px;
    padding-left: 15px;
    font-size: 1rem;
    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
        padding-left: 15px;
        cursor: pointer;
    }
`
const MissionDate = styled.span`
    margin-left: 20px;
    margin-right: 20px;
`
const MissionNum = styled.span`
`