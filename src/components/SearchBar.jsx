import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import searchicon from '../images/search.png';
import filter from '../images/filter.png';
import Button from '../components/Button';
import axios from 'axios';

const SearchContainer = styled.div`
  display: flex;
  align-items: center; 
  margin-left: auto;
  margin-right: 30vw;
  margin-top: -15px;
  z-index: 99;
`;

const SearchInput = styled.input`
  border: 1px solid #ccc;
  width: 25vw;
  height: 25px;
  padding: 5px;
  margin: 18px auto 0 -5vw;
  position: fixed;
`;

const SearchIcon = styled.img`
  width: 25px;
  cursor: pointer;
  margin: 18px auto 0 18vw;
  position: fixed;
`;

const FilterIcon = styled.img`
  width: 25px;
  cursor: pointer;
  margin: 18px auto 0 24.1vw;
  position: fixed;
  background-color: white;
`;

const BtnContainer = styled.div`
  position: fixed;
  top: 80%;
  right: -20px;
  z-index: 99;
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const handleSearch = () => {
    axios.get(`/api/v1/challenge/search`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${ACCESS_TOKEN}`
        },
        params: {
          searchWord: searchTerm
        }
      })
      .then((response) => {
        console.log('검색 결과:', response.data);
      })
      .catch((error) => {
        console.error('검색 실패:', error);
      });
  };

  return (
    <>
      <SearchContainer>
          <SearchInput 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon src={searchicon} onClick={handleSearch} />
          <FilterIcon src={filter}/>
      </SearchContainer>
      <BtnContainer>
        <Button
          fontSize="2.4rem"
          title={`챌린지 생성\n \u00A0바로가기`}
          marginTop="25px"
          marginLeft="15px"
          onClick={() => {
            navigate("/agree");
          }}
        />
      </BtnContainer>
    </>
  );
};

export default SearchBar;
