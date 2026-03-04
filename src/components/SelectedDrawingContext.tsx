import styled from 'styled-components';
import { Badge } from './ui/badge';
import type { DrawingContext } from '@/types/drawing';

const SelectedDrawingContext = ({ selected }: { selected: DrawingContext }) => {
  return (
    <ContextGroupStyled>
      <ContextStyled>
        <span>{selected.disciplineName}</span>
        <span>·</span>
        {selected.regionName && (
          <>
            <span>{selected.regionName}</span>
            <span>·</span>
          </>
        )}
        <span>{selected.version}</span>
        <span>·</span>
        <span>{selected.date}</span>
        <span>·</span>
        <span>{selected.description}</span>
      </ContextStyled>
      {selected.changes.length ? (
        <>
          <span className="text-gray-300">|</span>
          <ContextStyled>
            {selected.changes.map((change) => (
              <Badge key={change} variant="outline">
                {change}
              </Badge>
            ))}
          </ContextStyled>
        </>
      ) : null}
    </ContextGroupStyled>
  );
};

const ContextGroupStyled = styled.div`
  gap: 12px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 26px;
`;

const ContextStyled = styled.div`
  display: flex;
  gap: 6px;

  & > span {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }
`;

export default SelectedDrawingContext;
