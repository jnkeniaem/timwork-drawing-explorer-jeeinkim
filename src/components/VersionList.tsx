import type { DrawingContext } from '@/types/drawing';
import styled from 'styled-components';
import VersionCard from './VersionCard';

const VersionList = ({
  related,
  selectedId,
  onSelect,
}: {
  related: DrawingContext[];
  selectedId: string;
  onSelect: (selected: DrawingContext | null) => void;
}) => {
  return (
    <VersionListStyled>
      <VersionListTitleStyled>버전 이력</VersionListTitleStyled>
      {related.map((rev) => (
        <VersionCard
          key={rev.id}
          revision={rev}
          selected={rev.id === selectedId}
          onClick={onSelect}
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
