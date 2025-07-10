import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { Loader, Text } from '../common';

const API_EPISODES_URL = 'https://rickandmortyapi.com/api/episode';

export function PopupEpisodes({ episodes }) {
  const [series, setSeries] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    let episodeArr = Array.isArray(episodes)
      ? episodes
      : typeof episodes === 'string' && episodes
      ? [episodes]
      : [];
    if (!episodeArr.length) {
      setSeries([]);
      setIsFetching(false);
      return;
    }

    const episodesIds = episodeArr
      .map((ep) => ep?.match(/\d+$/)?.[0])
      .filter(Boolean);

    if (episodesIds.length === 0) {
      setSeries([]);
      setIsFetching(false);
      return;
    }

    setIsFetching(true);

    axios
      .get(`${API_EPISODES_URL}/${episodesIds.join(',')}`)
      .then(({ data }) => {
        const sortedData = Array.isArray(data)
          ? data.sort((a, b) => a.id - b.id)
          : [data];
        setSeries(sortedData);
      })
      .catch(() => {
        setSeries([]);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [episodes]);

  if (isFetching) {
    return <Loader />;
  }

  if (!series.length) {
    return (
      <PopupEpisodesContainer>
        <Text>Нет эпизодов</Text>
      </PopupEpisodesContainer>
    );
  }

  return (
    <PopupEpisodesContainer>
      <Text>Participated in episodes:</Text>

      <StyledPopupEpisodes $length={series.length}>
        {series.map(({ id, name, episode }) => (
          <Episode key={id}>
            <EpisodeMarking>
              {episode
                .replace(/S0?(\d+)/i, 'Season $1 - ')
                .replace(/E0?(\d+)/i, 'Ep. $1')}
            </EpisodeMarking>
            {name}
          </Episode>
        ))}
      </StyledPopupEpisodes>
    </PopupEpisodesContainer>
  );
}

const PopupEpisodesContainer = styled.div`
  margin-top: 24px;
`;

const StyledPopupEpisodes = styled.div`
  display: flex;
  flex-direction: column;

  ${({ $length }) =>
    $length > 20 &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      & p {
        width: 100%;
        border-bottom: 2px solid #eee;
      }

      & span {
        margin-bottom: 10px;
      }
    `}
`;

const Episode = styled.p`
  display: grid;
  align-items: center;
  padding: 10px 0;
`;

const EpisodeMarking = styled.span`
  margin-bottom: 8px;
  color: #83bf46;
  font-weight: 500;
`;
