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
  const projectName = metadata.project.name;

  useEffect(() => {
    setRevisionItems(getAllRevisions(drawings));
  }, []);

  return (
    <WrapperStyled>
      <HeaderStyled>
        <span className="text-4xl font-bold">도면 관리</span>
        <span className="text-gray-700 text-lg font-semibold">
          {projectName}
        </span>
      </HeaderStyled>
      <MainStyled>
        <LatestOnlySwitch
          checked={latestOnly}
          onCheckedChange={setLatestOnly}
        />
        <DrawingTable latestOnly={latestOnly} />
      </MainStyled>
      {selected ? <DrawingViewer selected={selected} /> : null}
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
  padding: 100px 70px;
  gap: 48px;
`;

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: column;
`;

const MainStyled = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default DrawingList;
