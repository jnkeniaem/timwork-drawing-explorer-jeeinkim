import { useState, useEffect } from 'react';
import type { Drawing } from '../types/drawing';
import DrawingViewer from './DrawingViewer';
import styled from 'styled-components';
import DrawingTable from './DrawingTable';
import LatestOnlySwitch from './LatestOnlySwitch';
import metadata from '../assets/metadata.json';
import { getAllRevisions } from '@/utils/drawingUtils';
import { useDrawingStore } from '@/stores/drawingStore';

const DrawingList = () => {
  const { selected, setRevisionItems } = useDrawingStore();
  const [latestOnly, setLatestOnly] = useState(false);
  const drawings: Drawing[] = Object.values(metadata.drawings);

  useEffect(() => {
    setRevisionItems(getAllRevisions(drawings));
  }, []);

  return (
    <WrapperStyled>
      <HeaderStyled>도면 관리</HeaderStyled>
      <LatestOnlySwitch checked={latestOnly} onCheckedChange={setLatestOnly} />
      <DrawingTable latestOnly={latestOnly} />
      {selected ? <DrawingViewer selected={selected} /> : null}
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

const HeaderStyled = styled.span`
  font-size: 2rem;
  font-weight: 700;
`;

export default DrawingList;
