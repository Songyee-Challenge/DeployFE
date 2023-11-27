import React, { useState } from 'react';
import styled from 'styled-components';
import like_off from "../images/like_off.png";
import like_on from "../images/like_on.png";

const LikeBtn = styled.div`
`;
const LikeImg = styled.img`
  width: 34px;
  height: 32px;
  margin-top: 15px;
  cursor: pointer;
`

const DiaryLike = (props) => {
    const {isLiked, id, onClick} = props;
    const [islike, setIslike ] = useState(isLiked);
    return (
        <LikeBtn id={id} onClick={onClick}>
            {isLiked? <LikeBtn src={like_on}/> : <LikeBtn src={like_on}/>}
        </LikeBtn>
    );
};

export default DiaryLike;