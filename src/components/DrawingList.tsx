import metadata from '../assets/metadata.json';
import type { Drawing } from '../types/drawing';

interface RevisionItem {
  id: string;
  version: string;
  drawingName: string;
  disciplineName: string;
}

const DrawingList = () => {
  const data = metadata;
  const drawings: Drawing[] = Object.values(data.drawings);
  const revisionItems: RevisionItem[] = [];

  drawings.forEach((d) => {
    const disciplines = d.disciplines ?? [];

    return Object.entries(disciplines).forEach(([disciplineName, data]) => {
      const revisions = data.revisions ?? [];

      revisions.forEach((r) =>
        revisionItems.push({
          id: `${d.id}-${disciplineName}-${r.version}`,
          version: r.version,
          drawingName: d.name,
          disciplineName,
        }),
      );
    });
  });

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
