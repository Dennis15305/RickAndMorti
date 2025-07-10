
import React from 'react';
import { ReactComponent as Male } from '../assets/genders/male.svg';
import { ReactComponent as Female } from '../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../assets/genders/genderless.svg';
import styled from 'styled-components';

export function CardTitle({ name, gender, className }) {
  const g = String(gender).toLowerCase();
  let Icon = null;
  if (g === 'male') {
    Icon = <Male width={20} height={20} fill="#33b3c8" title="Male" />;
  } else if (g === 'female') {
    Icon = <Female width={24} height={24} fill="pink" title="Female" />;
  } else if (g === 'genderless' || g === 'unknown') {
    Icon = <Genderless width={24} height={24} fill="#999" title="Genderless" />;
  }

  return (
    <CardTitleContainer className={className}>
      <StyledCardTitle className="card-title">{name}</StyledCardTitle>
      <IconContainer>{Icon}</IconContainer>
    </CardTitleContainer>
  );
}

export const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const StyledCardTitle = styled.h2`
  margin-right: 8px;
  transition: color 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  font-size: 24px;

  @media (max-width: 450px) {
    max-width: 130px;
    font-size: 18px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
`;
