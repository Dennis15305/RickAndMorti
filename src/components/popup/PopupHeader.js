import styled from 'styled-components';
import { CardStatus, CardStatusContainer, StyledCardStatus, CardSpecies, CardType } from '../CardStatus';
import { CardTitle, CardTitleContainer, StyledCardTitle, IconContainer } from '../CardTitle';
import { FaMars, FaVenus, FaGenderless, FaQuestion } from 'react-icons/fa';

export function PopupHeader({ image, name, gender, status, species, type }) {
  return (
    <PopupHeaderContainer>
      <PopupImage src={image?.replace('../', '')} alt={name} />
      <TitleWrapper>
        <PopupTitle>{name}</PopupTitle>
        <GenderIcon gender={gender} />
      </TitleWrapper>
      <PopupStatus status={status} species={species} type={type} />
    </PopupHeaderContainer>
  );
}

function GenderIcon({ gender }) {
  const iconSize = 18;
  const iconColor = '#83bf46';

  if (!gender) return null;
  const g = String(gender).toLowerCase();
  switch (g) {
    case 'male':
      return <FaMars size={iconSize} color={iconColor} title="Male" />;
    case 'female':
      return <FaVenus size={iconSize} color={iconColor} title="Female" />;
    case 'genderless':
    case 'unknown':
      return (
        <FaGenderless size={iconSize} color={iconColor} title="Genderless" />
      );
    default:
      return <FaQuestion size={iconSize} color={iconColor} title="Unknown" />;
  }
}

const PopupHeaderContainer = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
`;

const PopupTitle = styled(StyledCardTitle)`
  font-size: 22px;
  margin: 0;
  justify-content: center;
`;

const PopupStatus = styled(StyledCardStatus)`
  font-size: 20px;
  justify-content: center;

  & p {
    text-align: center;
    margin-top: 10px;
  }
`;

const PopupImage = styled.img`
  display: block;
  border-radius: 5px;
  margin: 0 auto;
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 350px;
  max-height: 350px;
`;
