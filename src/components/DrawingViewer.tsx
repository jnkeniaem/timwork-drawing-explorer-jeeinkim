import type { DrawingContext } from '../types/drawing';
import Modal from './Modal';
import '../styles/DrawingViewer.css';

interface DrawingViewerProps {
  selected: DrawingContext | null;
  onClose: () => void;
}

const DrawingViewer = ({ selected, onClose }: DrawingViewerProps) => {
  if (!selected) return null;

  return (
    <Modal isOpen={!!selected} onClose={onClose} title={selected.drawingName}>
      <div className="drawing-viewer">
        <div className="drawing-info">
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
        </div>
        <div className="drawing-image-container">
          <img src={`/drawings/${selected.image}`} className="drawing-image" />
        </div>
      </div>
    </Modal>
  );
};

export default DrawingViewer;
