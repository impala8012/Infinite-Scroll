import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faBook, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Loading from "../Loading";
import {getMe} from "../../WebAPI";
import { LoadingContext } from "../../contexts";
import styled from "styled-components";

const AboutMeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  width: 800px;
  min-width: 300px;
  margin: 0 20px;
  padding: 40px;
  background-color: whitesmoke;
  text-align: center;
  position: relative;
  top: 50px;
  border-radius: 20px;
`;

const ProfilePhoto = styled.div`
  img {
    min-width: 100px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
`;

const ProfileContentContainer = styled.div`
  display: flex;
  justify-content:center;
`

const ProfileContent = styled.div`
  text-align:left;
  margin-top: 10px;
  white-space: pre-line;

  a {
    text-decoration: none;
    color: blue;
  }
`;
const AboutMe = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [info, setInfo] = useState("")

  useEffect(() => {
    const aboutMe = async () => {
      setIsLoading(true);
      const infos = await getMe();
      setInfo(infos)
      setIsLoading(false);
    };
    aboutMe()
  }, [setIsLoading]);


  return (
    <AboutMeContainer>
      {isLoading && <Loading />}
      <ProfileContainer>
        <ProfilePhoto>
          <img src={info.avatar_url} alt="avatar" />
        </ProfilePhoto>
        <h2>Dylan Lo</h2>
        <ProfileContentContainer>
          <ProfileContent>
            <p>
              <FontAwesomeIcon icon={faGithub} />
              <a href={info.html_url}> gitHub</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faBook} /> Total Repositories:{" "}
              {info.public_repos}
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Location：
              {info.location}
            </p>
            <p>
              <FontAwesomeIcon icon={faUser} /> {info.following} following
            </p>
            <p>
              <FontAwesomeIcon icon={faUser} /> {info.followers} followers
            </p>
          </ProfileContent>
        </ProfileContentContainer>
      </ProfileContainer>
    </AboutMeContainer>
  );
}

export default AboutMe