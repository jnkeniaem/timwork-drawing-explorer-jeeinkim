import type { DrawingContext } from '@/types/drawing';
import styled from 'styled-components';
import VersionCard from './VersionCard';

const VersionList = ({
  related,
  selectedId,
}: {
  related: DrawingContext[];
  selectedId: string;
}) => {
  const sorted = [...related].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <VersionListStyled>
      <VersionListTitleStyled>버전 이력</VersionListTitleStyled>
      {sorted.map((rev, idx) => (
        <VersionCard
          key={rev.id}
          revision={rev}
          selected={rev.id === selectedId}
          latest={idx === 0}
        />
      ))}
    </VersionListStyled>
  );
};

const VersionListStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const VersionListTitleStyled = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #444;
`;

export default VersionList;
