import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Topbar from "./components/Topbar";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import InvitePage from "./pages/InvitePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyChallenge from "./pages/MyChallenge";
import MyMission from "./pages/MyMission";
import MyReview from "./pages/MyReview";
import MyInfo from "./pages/MyInfo";
import MyRecruit from "./pages/MyRecruit";
import MyOngoing from "./pages/MyOngoing";
import MyCompleted from "./pages/MyCompleted";
import AgreePage from "./pages/AgreePage";
import CreatePage from "./pages/CreatePage";
import Diary from "./pages/Diary";
import PostRelay from "./pages/PostRelay";
import CategoryPage from "./pages/CategoryPage";
import TestCategoryPage from "./pages/TestCategoryPage";
import ImminentPage from "./pages/ImminentPage";
import HotPage from "./pages/HotPage";
import StudyCategoryPage from "./pages/StudyCategoryPage";
import RecruitingChallenge from "./pages/RecruitingChallenge";
import OngoingChallenge from "./pages/OngoingChallenge";
import CompletedChallenge from "./pages/CompletedChallenge";
import ChallengeDetail from "./pages/ChallengeDetail";
import ChallengeDetailCalendar from "./pages/ChallengeDetailCalendar";
import ChallengeDetailMission from "./pages/ChallengeDetailMission";
import ChallengeDetailGuide from "./pages/ChallengeDetailGuide";
import MyInquire from "./pages/MyInquire";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hello" element={<InvitePage />} />
      </Routes>
      {location.pathname !== "/" && location.pathname !== "/hello" && (
        <>
          <Topbar />
          <Page>
            <Routes>
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/agree" element={<AgreePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/imminent" element={<ImminentPage/>}/>
              <Route path="/hot" element={<HotPage/>}/>
              <Route path="/challenge/recruiting" element={<RecruitingChallenge/>}/>
              <Route path="/challenge/ongoing" element={<OngoingChallenge/>}/>
              <Route path="/challenge/finished" element={<CompletedChallenge/>}/>
              <Route path="/challenge/detail/:id" element={<ChallengeDetail/>}/>
              <Route path="/challenge/detail/:id/calendar" element={<ChallengeDetailCalendar/>}/>
              <Route path="/challenge/detail/:id/mission" element={<ChallengeDetailMission/>}/>
              <Route path="/challenge/detail/:id/guide" element={<ChallengeDetailGuide/>}/>
              <Route path="/category/:id" element={<CategoryPage/>}/>
              <Route path="/category/test" element={<TestCategoryPage/>}/>
              <Route path="/my" element={<MyChallenge />}>
                <Route path="/my/mission" element={<MyMission />} />
                <Route path="/my/review" element={<MyReview />} />
                <Route path="/my/info" element={<MyInfo />} />
                <Route path="/my/challenge/recruit" element={<MyRecruit />} />
                <Route path="/my/challenge/ongoing" element={<MyOngoing />} />
                <Route path="/my/challenge/completed" element={<MyCompleted />} />
                <Route path="/my/inquire" element={<MyInquire />}/>
              </Route>
              <Route path="/diary" element={<Diary />}></Route>
              <Route path="/diary/post" element={<PostRelay />} />
              <Route path="/category/study" element={<StudyCategoryPage />} />
            </Routes>
          </Page>
        </>
      )}
    </>
  );
}

export default App;

const Page = styled.div`
  margin-top: 120px;
`;
