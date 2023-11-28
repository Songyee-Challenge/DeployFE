import React, {useState} from 'react';
import styled from 'styled-components';
import TypeBar from '../components/TypeBar';
import { Routes, Route } from 'react-router-dom';
import RecruitDetail from './RecruitDetailPage';
import OngoingDetail from './OngoingDetailPage';
import CompletedDetail from './CompletedDetailPage';

const ChallengeBox = styled.div`
    margin-left:2vw;
`;

const SongChallenge = () => {
    const [selectedType, setSelectedType] = useState(null);

    const handleTypeChange = (selectedType) => {
        //여기에서 선택된 타입에 대한 추가 로직을 수행할 수 있습니다.
        console.log(`선택된 타입 : ${selectedType}`);
        setSelectedType(selectedType);
    };

    return (
        <ChallengeBox>                
            <Routes>
        <Route
          path="/"
          element={<TypeBar onSelectType={handleTypeChange} />}
        />
        <Route path="/recruitdetail" element={<RecruitDetail />} />
        <Route path="/ongoingdetail" element={<OngoingDetail/> }/>
        <Route path="/completeddetail" element={<CompletedDetail/>}/>
      </Routes>
        </ChallengeBox>
    );
};

export default SongChallenge;