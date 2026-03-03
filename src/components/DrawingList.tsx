import { useState } from 'react';
import type { DrawingContext } from '../types/drawing';
import DrawingViewer from './DrawingViewer';
import styled from 'styled-components';
import DrawingTable from './DrawingTable';
import LatestOnlySwitch from './LatestOnlySwitch';

const DrawingList = () => {
  const [selected, setSelected] = useState<DrawingContext | null>(null);
  return (
    <WrapperStyled>
      <HeaderStyled>도면 관리</HeaderStyled>
      <LatestOnlySwitch />
      <DrawingTable />
      <DrawingViewer selected={selected} onClose={() => setSelected(null)} />
    </WrapperStyled>
  );
};

const WrapperStyled = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
  padding: 100px 70px;
`;

const HeaderStyled = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

export default DrawingList;
