import { useEffect } from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlayStyled onClick={onClose}>
      <ModalWrapperStyled onClick={(e) => e.stopPropagation()}>
        <HeaderStyled>
          {title && <TitleStyled className="modal-title">{title}</TitleStyled>}
          <CloseButtonStyled className="modal-close" onClick={onClose}>
            ✕
          </CloseButtonStyled>
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

const CloseButtonStyled = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #777;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleStyled = styled.h3`
  margin: 0;
  font-weight: 600;
`;

export default Modal;
