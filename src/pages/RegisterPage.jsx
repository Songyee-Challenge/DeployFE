import React, { useState } from 'react';
import styled from 'styled-components';
import BtnInput from '../components/BtnInput';
import RegInput from '../components/RegInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Wrapper = styled.div`
    text-align: center;
    font-family: 'Pretendard';
`;
const Box = styled.div`
    width: 400px;
    margin: auto;
    margin-bottom: 200px;
`
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
    width: 400px;
`
const InviteTxt = styled.div`
    color: #000;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: left;
    margin-top: 30px;
    margin-bottom: 40px;
`
const InputTxt = styled.span`
    color: #000;
    font-family: 'Pretendard';
    font-size: 17px;
    font-weight: 700;
`
const FlexBox = styled.div`
    display: flex;
    line-height: 20px;
    margin: 20px 0 10px 0;
`
const SubTxt = styled.span`
    color: #838383;
    font-family: 'Pretendard';
    font-size: 10px;
    font-weight: 700;
    margin-top: 3px;
    margin-left: 10px;
`
const Emsg = styled.div`
    text-align: left;
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 5px;
`
const Container = styled.div`
    text-align: left;
`
const SubmitBtn = styled.div`
    height: 46px;
    background: #000;
    text-align: center;
    color: white;
    line-height: 46px;
    font-weight: 600;
    margin-top: 30px;
    cursor: pointer;
`

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [isSMemail, setIsSMemail] = useState(false);
    const [code, setCode] = useState("");
    const [codecheck, setCodecheck] = useState(false);
    const [pw1, setPw1] = useState("");
    const [pw1Message, setPw1Message] = useState("");
    const [pw2, setPw2] = useState("");
    const [pwMessage, setPwMessage] = useState("");
    const [username, setUsername] = useState("");
    const [major, setMajor] = useState("");
    const [stdID, setStdID] = useState("");

    const [ispwform, setIspwform] = useState(false); // pwform이 맞는지
    const [pwcheck, setpwcheck] = useState(false); // pw1 == pw2인지


    // 숙명 이메일 유효성 검사
    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);

        const emailRegex = /^[A-Za-z0-9_\.\-]+@(sookmyung)\.(ac)\.(kr)/;

        if (!emailRegex.test(currentEmail)) {
            setEmailMessage("숙명 이메일 계정을 입력해주세요.");
            console.log(emailMessage);

        } else {
            setEmailMessage("");
            setIsSMemail(true);
            console.log('유효 이메일');
        }
      };

    // 코드 전송
    const sendCode = () => {
        if (isSMemail) {
            axios.post('http://43.200.19.7:8080/api/v1/user/signup/email', {
                email: email,
                password: pw1,
                name: username,
                major: major,
                student_id: stdID
            })
            .then(response => {
                console.log(response);
            alert("숙명 이메일로 인증코드가 전송되었습니다.");
            })
        } else {
            alert("숙명 이메일 계정을 입력해주세요.")
        }
    }

    // 코드 작성
    const onChangeCode = (e) => {
        const currentCode = e.target.value;
        setCode(currentCode);
    };
    // 코드 검사
    const handleCode = (e) => {
        axios.post('http://43.200.19.7:8080/api/v1/user/signup/email/verify', {
            verificationCode: code
        })
        .then(response => {
            console.log(response);
            if (response === 'Verification failed. Please check the code.') {
                alert("코드 인증에 실패했습니다. 다시 시도해주세요.");
            } else {
                setCodecheck(true);
                alert('인증 완료!');
            }
        })
        .catch(error => {
            console.error('Error handle code: ', error);
        })
    };

    // 비밀번호1
    const onChangePw1 = (e) => {
        const currentPw = e.target.value;
        setPw1(currentPw);

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

        if (!passwordRegex.test(currentPw)) {
            setPw1Message(
                <span style={{ color: 'red' }}>
                비밀번호는 8-16자, 영문, 숫자, 특수문자(!@#$%^&*?_)를 포함해야 합니다.
                </span>
            );
        } else {
            setPw1Message("");
            setIspwform(true);
        }

    };

    // 비밀번호2
    const onChangePw2 = (e) => {
        const currentPw2 = e.target.value;
        setPw2(currentPw2);

        if (currentPw2 !== pw1) {
            setPwMessage(
                <span style={{ color: 'red' }}>
                비밀번호가 일치하지 않습니다.
                </span>
            );
        } else {
            setPwMessage("");
            setpwcheck(true);
        }
    };

    // 이름
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    // 전공
    const onChangeMajor = (e) => {
        setMajor(e.target.value);
    }

    // 학번
    const onChangeStdID = (e) => {
        setStdID(e.target.value);
    }

    const handleSubmit = () => {
        // if (codecheck) {
            if (isSMemail && ispwform && pwcheck) {
                axios.post('http://43.200.19.7:8080/api/v1/user/signup', {
                    email: email,
                    password: pw1,
                    name: username,
                    major: major, 
                    student_id: stdID 
                })
                .then(response => {
                    alert("회원가입이 완료되었습니다.");
                    navigate('/login');
                    console.log(response);
                })
                .catch(error => {
                    console.error('Error handle signup: ', error);
                    if (error.response.status === 500) {
                        alert('이미 회원가입이 되어있습니다. 로그인 페이지로 이동합니다.');
                        navigate('/login');
                    }
                });
            } else {
                alert('회원가입 형식에 맞게 진행해주세요.');
            }
        // } else {
        //     alert("코드 인증에 실패했습니다.");
        // }
    }


    return (
        <Wrapper>
            <Box>
                <Title>회원가입</Title>
                <Line/>
                <InviteTxt>송이, 반갑습니다!<br/>바로 가입을 도와드릴게요.</InviteTxt>
                <FlexBox>
                    <InputTxt>이메일</InputTxt>
                    <SubTxt>실제 사용하시는 학교 이메일을 등록해 주세요.</SubTxt>
                </FlexBox>
                <BtnInput 
                    name="email"
                    type="email"
                    placeholder='학교 이메일을 입력해 주세요.'
                    value={email}
                    pattern= "^[A-Za-z0-9_\.\-]+@(sookmyung)\.(ac)\.(kr)"
                    onChange={onChangeEmail}
                    btntitle='인증코드 전송'
                    onBtnClick={sendCode}/>
                <Emsg>{emailMessage}</Emsg>
                <FlexBox>
                    <InputTxt>인증코드 입력</InputTxt>
                </FlexBox>
                <BtnInput 
                    name="code"
                    type="text"
                    placeholder='이메일로 전송된 인증코드를 입력해주세요.'
                    value={code}
                    onChange={onChangeCode}
                    btntitle='인증하기'
                    onBtnClick={handleCode}/>
                <Emsg>{emailMessage}</Emsg>
                <FlexBox>
                    <InputTxt>비밀번호</InputTxt>
                    {/* <SubTxt>비밀번호는 8-16자, 영문, 숫자, 특수문자를 포함해야 합니다.</SubTxt> */}
                </FlexBox>
                <RegInput
                    inputwidth="100%"
                    labelwidth="100%"
                    name="password1"
                    type="password"
                    placeholder='비밀번호를 입력해 주세요.'
                    value={pw1}
                    onChange={onChangePw1}/>
                <Emsg>{pw1Message}</Emsg>
                <FlexBox>
                    <InputTxt>비밀번호 확인</InputTxt>
                </FlexBox>
                <RegInput
                    inputwidth="100%"
                    labelwidth="100%"
                    name="password2"
                    type="password"
                    placeholder='비밀번호를 입력해 주세요.'
                    value={pw2}
                    onChange={onChangePw2}/>
                <Emsg>{pwMessage}</Emsg>
                <FlexBox>
                    <InputTxt>이름</InputTxt>
                </FlexBox>
                <RegInput
                    inputwidth="100%"
                    labelwidth="100%"
                    name="username"
                    type="text"
                    placeholder=''
                    value={username}
                    onChange={onChangeUsername}/>
                <FlexBox style={{justifyContent:"space-between"}}>
                    <Container>
                        <FlexBox>
                        <InputTxt>전공 입력</InputTxt>
                        </FlexBox>
                        <RegInput
                            inputwidth="160px"
                            labelwidth="160px"
                            name="major"
                            type="text"
                            placeholder=''
                            value={major}
                            onChange={onChangeMajor}/>
                    </Container>
                    <Container>
                        <FlexBox>
                        <InputTxt>학번 입력</InputTxt>
                        </FlexBox>
                        <RegInput
                            inputwidth="160px"
                            labelwidth="160px"
                            name="stdID"
                            type="text"
                            placeholder=''
                            value={stdID}
                            onChange={onChangeStdID}/>
                    </Container>
                </FlexBox>
                <SubmitBtn onClick={handleSubmit}>가입 완료</SubmitBtn>
            </Box>
        </Wrapper>
    );
};

export default RegisterPage;