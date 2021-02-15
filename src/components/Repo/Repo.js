import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components"
import Loading from "../Loading";
import { getRepos } from "../../WebAPI";
import { LoadingContext } from "../../contexts";
import { MEDIA_QUERY_MD } from "../../constants/style";


const RepoContainer = styled.div`
  
`;
const Title = styled.h1`
  font-size: 28px;
  text-align: center;

  ${MEDIA_QUERY_MD} {
    font-size: 20px;
  }
`;

const TableContaineer = styled.div`
  display: flex;
  justify-content: center;
`;

const RepoTable = styled.table`
  text-align: left;
  overflow: auto;
  border-spacing: 0;

  thead {
    text-align: center;

    th {
      font-size: 24px;
      border: solid 1px black;
      width: 250px;

      ${MEDIA_QUERY_MD} {
        font-size: 18px;
      }
    }
  }
  td {
    border: solid 1px black;
    height: 200px;
    text-align: center;
    white-space: pre-wrap;

    a {
      text-decoration: none;
      color: blue;
    }
  }
  tr {
    font-size: 20px;
    background: #e1feef;
    height: 80px;

    ${MEDIA_QUERY_MD} {
      font-size: 14px;
      height: 40px;
    }
  }
`;

const Repos = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [repos, setRepos] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const loadMore = () => {
    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    const loadRepos = async () => {
      setIsLoading(true);
      const newRepo = await getRepos(page);
      setRepos((prev) => [...prev, ...newRepo]);
      setHasMore(true);
      setIsLoading(false);
    };
    loadRepos();
  }, [page, setIsLoading]);

  const pageEnd = useRef()
  let num = 1;
  useEffect(() => {
    if (hasMore) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            num++;
            loadMore();
            if (num >= 5) {
              observer.unobserve(pageEnd.current);
            }
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [hasMore, num]);

  return (
    <RepoContainer>
      {isLoading && <Loading />}
      <Title>我的 Repositories</Title>
      <TableContaineer>
        <RepoTable>
          <thead>
            <tr>
              <th>名稱</th>
              <th>敘述</th>
              <th>建立時間</th>
              <th>連結</th>
            </tr>
          </thead>
          {repos &&
            repos.map((repo) => (
              <tbody key={repo.id}>
                <tr>
                  <td>{repo.name}</td>
                  <td>{repo.description}</td>
                  <td>{repo.created_at.slice(0, 10)}</td>
                  <td>
                    <a href={repo.html_url}>Source Code</a>
                  </td>
                </tr>
              </tbody>
            ))}
        </RepoTable>
      </TableContaineer>
      <div ref={pageEnd}></div>
    </RepoContainer>
  );
};

export default Repos;