import type { DrawingContext } from '../types/drawing';
import Modal from './Modal';
import styled from 'styled-components';

interface DrawingViewerProps {
  selected: DrawingContext | null;
  onClose: () => void;
}

const DrawingViewer = ({ selected, onClose }: DrawingViewerProps) => {
  if (!selected) return null;

  return (
    <Modal isOpen={!!selected} onClose={onClose} title={selected.drawingName}>
      <WrapperStyled>
        <DrawingInfoWrapperStyled>
          <p>
            <strong>공종:</strong> {selected.disciplineName}
          </p>
          <p>
            <strong>버전:</strong> {selected.version}
          </p>
          {selected.regionName && (
            <p>
              <strong>영역:</strong> {selected.regionName}
            </p>
          )}
          <p>
            <strong>발행일:</strong> {selected.date}
          </p>
        </DrawingInfoWrapperStyled>
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

const DrawingInfoWrapperStyled = styled.div`
  gap: 12px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 6px;
  display: flex;
  justify-content: space-evenly;
  justify-content: space-around;

  & > p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }

  & > strong {
    color: #333;
    font-weight: 600;
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
