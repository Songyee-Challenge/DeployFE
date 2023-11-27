import React, { useState } from 'react';
import styled from 'styled-components';
import check from '../images/check.png';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    padding: 50px 100px;
`
const Title = styled.div`
    text-align: center;
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 50px;
`
const Txt = styled.div`
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: 1.5rem;
    text-align: left;
    margin-bottom: 10px;
`
const SubTxt = styled.div`
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: 1.2rem;
    text-align: left;
    color: #646464;
`
const Checkbox = styled.input`
    appearance: none;
    border-radius: 10px;
    border: 2px solid #000;
    background: #FFF;
    width: 40px;
    height: 40px;
    cursor: pointer;

    &:checked {
        background-color: #000;
        background-image: url(${check});
        background-size: 100% 100%;
    }
`
const Label = styled.label`
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: 1.5rem;
    text-align: left;
    margin-left: 15px;
    cursor: pointer;
`
const Checkdiv = styled.div`
    display: flex;
    height: 40px;
    align-items: center;
    margin-bottom: 50px;
`
const ConfirmBtn = styled.div`
    border-radius: 10px;
    background: ${props => props.backcolor};
    width: 222px;
    height: 90px;
    display: inline-block;
    float: right;
    color: ${props => props.fontcolor};
    font-family: 'Pretendard';
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 90px;
`

const AgreePage = () => {
    const navigate = useNavigate();
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);

    const handleCheck1 = () => {
        setCheck1(!check1);
        console.log("1:", check1);
    }
    const handleCheck2 = () => {
        setCheck2(!check2);
        console.log("2:", check2);
    }
    const handleCheck3 = () => {
        setCheck3(!check3);
        console.log("3:", check3);
    }

    return (
        <Wrapper>
            <Title>챌린지 개설하기</Title>
            <Txt>챌린지를 여는 이 순간부터, 당신은 챌린지를 이끌어나갈 ‘리더’가 됩니다.</Txt>
            <SubTxt>그 전에 3가지만 약속해주세요!</SubTxt>
            <div style={{margin:"50px 0"}}>
            <Checkdiv>
                <Checkbox type='checkbox' id='check' onChange={handleCheck1}/>
                <Label for='check'>모두에게 기분 좋은 챌린지가 되도록 노력해주실거죠?</Label>
            </Checkdiv>
            <Checkdiv>
                <Checkbox type='checkbox' id='check2' onChange={handleCheck2}/>
                <Label for='check2'>챌린지에 참가한다는 건 소중한 시간을 투자하는 거예요. 책임감 있게 관리해주실 거죠?</Label>
            </Checkdiv>
            <Checkdiv>
                <Checkbox type='checkbox' id='check3' onChange={handleCheck3}/>
                <Label for='check3'>공정한 미션 검토를 부탁드릴게요!</Label>
            </Checkdiv>
            <SubTxt style={{marginLeft:"60px", marginTop:"-45px"}}>유저가 개설한 챌린지의 미션 검토는 송이의숲에서 하지 않아요. 챌린지를 개설한 리더가 직접 검토해요.</SubTxt>
            </div>
            {check1 && check2 && check3? 
            <ConfirmBtn backcolor='#000' fontcolor='#fff' onClick={() => {navigate('/create')}} style={{cursor:"pointer"}}>
                네, 약속할게요!
            </ConfirmBtn>
             : 
             <ConfirmBtn backcolor='#CECECE' fontcolor='#646464' disabled>
                네, 약속할게요!
            </ConfirmBtn>}
        </Wrapper>
    );
};

export default AgreePage;