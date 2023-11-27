import React, { useState } from 'react';
import styled from 'styled-components';
import RegInput from '../components/RegInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Wrapper = styled.div`
    text-align: center;
    font-family: 'Pretendard';
`;
const Box = styled.div`
    width: 577px;
    margin: auto;
    margin-bottom: 200px;
`;
const Title = styled.div`
    color: #000;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    padding-top: 50px;
    padding-bottom: 30px;
`
const Line = styled.div`
    background: #000;
    height:4px;
    border:0;
    width: 577px;
    margin-bottom: 50px;
`
const LoginBtn = styled.div`
    width: 577px;
    height: 56px;
    border-radius: 2px;
    background: #222;
    text-align: center;
    color: white;
    line-height: 56px;
    margin-top: 25px;
    cursor: pointer;
`
const RegBtn = styled.div`
    width: 577px;
    border-radius: 28px;
    border: 1px solid #5D5D5D;
    color: #1D1D1D;
    text-align: center;
    font-weight: 700;
    line-height: 56px;
    margin: auto;
    margin-top: 30px;
    cursor: pointer;
`

const LoginPage = () => {
    const [email, setEamil] = useState("");
    const [pw, setPw] = useState("");
    const [ispw, setIspw] = useState(true);
    const navigate = useNavigate();
    
    const onChangeEmail = (e) => {
        setEamil(e.target.value);
    }

    const onChangePw = (e) => {
        setPw(e.target.value);
    }

    const handleLogin = () => {
        axios.post('http://43.200.19.7:8080/api/v1/user/signin', {
            email: email,
            password: pw,
        })
        .then(response => {
            console.log(response);
            localStorage.setItem("accessToken", response.data);
            //console.log('accessToken: ', localStorage.getItem("accessToken"));
            //alert('로그인 성공!');
            navigate('/home');
        })
        .catch(error => {
            console.log('Error login: ', error);
            if (error.response.status === 403) {
                alert('회원가입이 되어 있지 않습니다. 회원가입 페이지로 이동합니다.');
                navigate('/signup');
            } else if (error.response.status === 500) {
                alert('비밀번호가 틀렸습니다.');
                setIspw(false);
            }
        })
    }
 
    return (
        <Wrapper>
            <Box>
                <Title>로그인</Title>
                <Line/>
                <RegInput
                    marginbottom="15px"
                    inputwidth="577px"
                    name="email"
                    type="email"
                    placeholder='이메일'
                    value={email}
                    onChange={onChangeEmail}/>
                <RegInput
                    bordercolor={ispw? '#D4D4D4' : '#FF2424'}
                    inputwidth="577px"
                    name="password"
                    type="password"
                    placeholder='비밀번호'
                    value={pw}
                    onChange={onChangePw}/>
                <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
                <RegBtn onClick={() => {
                    navigate('/signup')
                }}>간편 회원가입하기</RegBtn>
            </Box>
        </Wrapper>
    );
};

export default LoginPage;