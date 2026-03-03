import { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from './ui/button';
import RevisionStatusBadge from './RevisionStatusBadge';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  latest: boolean;
}

const Modal = ({ onClose, children, title, latest }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <ModalOverlayStyled onClick={onClose}>
      <ModalWrapperStyled onClick={(e) => e.stopPropagation()}>
        <HeaderStyled>
          <TitleWithBadgeWrapper>
            {title && <TitleStyled>{title}</TitleStyled>}
            {latest && <RevisionStatusBadge status="latest" />}
          </TitleWithBadgeWrapper>
          <Button onClick={onClose} variant="ghost">
            ✕
          </Button>
        </HeaderStyled>
        <div>{children}</div>
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
  max-width: 90vw;
  max-height: 90vh;
  padding: 24px;
  overflow: auto;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
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
`;

export default Modal;
