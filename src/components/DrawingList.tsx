import { useState } from 'react';
import type { Drawing, DrawingContext } from '../types/drawing';
import DrawingViewer from './DrawingViewer';
import styled from 'styled-components';
import DrawingTable from './DrawingTable';
import LatestOnlySwitch from './LatestOnlySwitch';
import metadata from '../assets/metadata.json';
import { getAllRevisions } from '@/utils/drawingUtils';

const DrawingList = () => {
  const [selected, setSelected] = useState<DrawingContext | null>(null);
  const [latestOnly, setLatestOnly] = useState(false);
  const drawings: Drawing[] = Object.values(metadata.drawings);
  const revisionItems = getAllRevisions(drawings);
  const selectedGroup =
    selected == null
      ? []
      : revisionItems.filter(
          (item) =>
            item.drawingName === selected.drawingName &&
            item.disciplineName === selected.disciplineName &&
            item.regionName === selected.regionName,
        );

  return (
    <WrapperStyled>
      <HeaderStyled>도면 관리</HeaderStyled>
      <LatestOnlySwitch checked={latestOnly} onCheckedChange={setLatestOnly} />
      <DrawingTable
        latestOnly={latestOnly}
        revisionItems={revisionItems}
        onRowClick={setSelected}
      />
      {selected ? (
        <DrawingViewer
          selected={selected}
          related={selectedGroup}
          onClose={() => setSelected(null)}
        />
      ) : null}
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
