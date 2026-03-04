import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { DrawingContext } from '@/types/drawing';
import styled from 'styled-components';
import RevisionStatusBadge from './RevisionStatusBadge';

const VersionCard = ({
  revision,
  selected,
  latest,
}: {
  revision: DrawingContext;
  selected: boolean;
  latest: boolean;
}) => {
  return (
    <Card
      className={`shadow-none mx-auto w-full max-w-sm ${selected ? ' border-[var(--primary)]' : ''}`}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{revision.version}</CardTitle>
          {latest && <RevisionStatusBadge status="latest" />}
        </div>
        <DescriptionWrapperStyled>
          <CardDescription>{revision.date}</CardDescription>
          <CardDescription>·</CardDescription>
          <CardDescription>{revision.description}</CardDescription>
        </DescriptionWrapperStyled>
      </CardHeader>
    </Card>
  );
};

const DescriptionWrapperStyled = styled.div`
  display: flex;
  gap: 4px;
`;

export default VersionCard;
