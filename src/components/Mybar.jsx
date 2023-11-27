import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Wrapper = styled.div`
  font-family: "Pretendard";
`;

const BarTxt = styled.p`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 15px;
  cursor: pointer;
`;

const BarBox = styled.div`
  width: 180px;
  border-top: 5px solid black;
`;
const MenuTxt = styled.p`
  font-weight: 900;
  font-size: 1.4rem;
`;

const Txt = styled.p`
  font-weight: 500;
  font-size: 1.3rem;
  cursor: pointer;
  position: relative;

  &:after {
    content: ${(props) => (props.isCurrent ? '">"' : '""')};
    position: absolute;
    margin-left: 20px;
    font-weight: bolder;
    font-size: 1.4rem;
  }
`;

const Mybar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Wrapper>
      <BarTxt
        onClick={() => {
          navigate("/my");
        }}
      >
        마이챌린지
      </BarTxt>
      <BarBox>
        <MenuTxt>내 도전들</MenuTxt>
        <Txt
          isCurrent={location.pathname === "/my"}
          onClick={() => {
            navigate("/my");
          }}
        >
          챌린지
        </Txt>
        <Txt
          isCurrent={location.pathname === "/my/mission"}
          onClick={() => {
            navigate("/my/mission");
          }}
        >
          미션
        </Txt>
        <Txt
          isCurrent={location.pathname === "/my/review"}
          style={{ marginBottom: "50px" }}
          onClick={() => {
            navigate("/my/review");
          }}
        >
          소감
        </Txt>
        <MenuTxt>내 정보들</MenuTxt>
        <Txt
          isCurrent={location.pathname === "/my/info"}
          style={{ marginBottom: "50px" }}
          onClick={() => {
            navigate("/my/info");
          }}
        >
          내 정보 관리
        </Txt>
        <MenuTxt>고객센터</MenuTxt>
        <Txt>1:1 문의</Txt>
      </BarBox>
    </Wrapper>
  );
};

export default Mybar;
