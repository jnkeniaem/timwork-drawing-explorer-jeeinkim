import metadata from '../assets/metadata.json';
import type { Drawing } from '../types/drawing';
import { getAllRevisions } from '../utils/drawingUtils';

const DrawingList = () => {
  const drawings: Drawing[] = Object.values(metadata.drawings);
  const revisionItems = getAllRevisions(drawings);

  return (
    <>
      <ul>
        {revisionItems.map((elem) => (
          <li key={elem.id}>
            {elem.drawingName} / {elem.disciplineName} / {elem.version}
          </li>
        ))}
      </ul>
    </>
  );
};

export default DrawingList;
