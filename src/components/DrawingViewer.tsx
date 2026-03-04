import type { DrawingContext } from '../types/drawing';
import Modal from './Modal';
import styled from 'styled-components';
import { Badge } from './ui/badge';
import VersionList from './VersionList';
import { useSelectedRevision } from '@/stores/drawingStore';

const DrawingViewer = ({
  selected,
  revisionItems,
}: {
  selected: DrawingContext;
  revisionItems: DrawingContext[];
}) => {
  const setSelected = useSelectedRevision((state) => state.setSelected);
  const related =
    selected == null
      ? []
      : revisionItems.filter(
          (item) =>
            item.drawingName === selected.drawingName &&
            item.disciplineName === selected.disciplineName &&
            item.regionName === selected.regionName,
        );

  return (
    <Modal
      onClose={() => setSelected(null)}
      title={selected.drawingName}
      latest={selected.latest}
      hasMultipleVersions={related.length > 1}
    >
      <WrapperStyled>
        <ContextGroupStyled>
          <ContextStyled>
            <span>{selected.version}</span>
            <span>·</span>
            <span>{selected.disciplineName}</span>
            <span>·</span>
            <span>{selected.date}</span>
            <span>·</span>
            {selected.regionName && (
              <>
                <span>{selected.regionName}</span>
                <span>·</span>
              </>
            )}
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
        {related.length > 1 ? (
          <VersionList
            related={related}
            selectedId={selected.id}
            onSelect={setSelected}
          />
        ) : null}
        <ImgWrapperStyled>
          <ImgStyled src={`/drawings/${selected.image}`} />
        </ImgWrapperStyled>
      </WrapperStyled>
    </Modal>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContextGroupStyled = styled.div`
  gap: 12px;
  display: flex;
  align-items: center;
  width: 100%;
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

const ImgWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const ImgStyled = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export default DrawingViewer;
