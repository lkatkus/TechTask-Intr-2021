import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
`;

interface Props {
  isLoading?: boolean;
}

const Spinner: React.FC<Props> = ({ isLoading }) => {
  return isLoading ? (
    <SpinnerContainer>
      <FontAwesomeIcon size="5x" spin icon={faSpinner} color="black" />
    </SpinnerContainer>
  ) : null;
};

export default Spinner;
