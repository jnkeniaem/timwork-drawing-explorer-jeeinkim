import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from './ui/button';
import RevisionStatusBadge from './RevisionStatusBadge';
import type { DrawingContext } from '@/types/drawing';
import VersionList from './VersionList';
import { useDrawingStore } from '@/stores/drawingStore';
import SelectedDrawingContext from './SelectedDrawingContext';

const DrawingModal = () => {
  const { selected, setSelected, revisionItems } = useDrawingStore();
  const [title, setTitle] = useState('');
  const [latest, setLatest] = useState(false);
  const [related, setRelated] = useState<DrawingContext[]>([]);
  const onClose = () => setSelected(null);

  useEffect(() => {
    if (selected) {
      setLatest(selected.latest);
    }
  }, [selected]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (selected) {
      setTitle(selected.drawingName);
      setRelated(
        revisionItems.filter(
          (item) =>
            item.drawingName === selected.drawingName &&
            item.disciplineName === selected.disciplineName &&
            item.regionName === selected.regionName,
        ),
      );
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  if (!selected) return null;

  return (
    <ModalOverlayStyled onClick={onClose}>
      <ModalWrapperStyled onClick={(e) => e.stopPropagation()}>
        <HeaderStyled>
          <div className="flex flex-col">
            <TitleWithBadgeWrapper>
              {title && <TitleStyled>{title}</TitleStyled>}
              {latest && <RevisionStatusBadge status="latest" />}
            </TitleWithBadgeWrapper>
            <SelectedDrawingContext selected={selected} />
          </div>
          <div className="flex">
            {related.length > 1 && <Button size="sm">변경 이력 추적</Button>}
            <Button size="sm" onClick={onClose} variant="ghost">
              ✕
            </Button>
          </div>
        </HeaderStyled>
        <ContentStyled>
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
        </ContentStyled>
      </ModalWrapperStyled>
    </ModalOverlayStyled>
  );
};

const ModalOverlayStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const ModalWrapperStyled = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90vw;
  height: 90vh;
  padding: 24px;
  overflow: auto;
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const TitleStyled = styled.span`
  margin: 0;
  font-weight: 600;
  font-size: 1.2rem;
`;

const TitleWithBadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
  height: 32px;
  align-items: center;
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

const ContentStyled = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export default DrawingModal;
