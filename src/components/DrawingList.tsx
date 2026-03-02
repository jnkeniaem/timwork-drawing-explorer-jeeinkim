import { useState } from 'react';
import metadata from '../assets/metadata.json';
import type { Drawing, DrawingContext } from '../types/drawing';
import { getAllRevisions } from '../utils/drawingUtils';

const DrawingList = () => {
  const drawings: Drawing[] = Object.values(metadata.drawings);
  const revisionItems = getAllRevisions(drawings);
  const [selected, setSelected] = useState<DrawingContext | null>(null);

  return (
    <>
      <ul>
        {revisionItems.map((elem) => (
          <li key={elem.id} onClick={() => setSelected(elem)}>
            {elem.drawingName} / {elem.disciplineName} / {elem.version}
          </li>
        ))}
      </ul>
      {selected && <img src={`/drawings/${selected.image}`} />}
    </>
  );
};

export default DrawingList;
