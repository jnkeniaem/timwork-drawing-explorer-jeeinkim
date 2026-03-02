import metadata from '../assets/metadata.json';
import type { Drawing } from '../types/drawing';

interface RevisionItem {
  id: string;
  version: string;
  drawingName: string;
  disciplineName: string;
  regionName?: string;
}

const DrawingList = () => {
  const data = metadata;
  const drawings: Drawing[] = Object.values(data.drawings);
  const revisionItems: RevisionItem[] = [];

  drawings.forEach((d) => {
    const disciplines = d.disciplines ?? [];

    Object.entries(disciplines).forEach(([disciplineName, discipline]) => {
      const revisions = discipline.revisions ?? [];

      revisions.forEach((r) =>
        revisionItems.push({
          id: `${d.id}-${disciplineName}-${r.version}`,
          version: r.version,
          drawingName: d.name,
          disciplineName,
        }),
      );

      const regions = discipline.regions ?? {};
      Object.entries(regions).forEach(([regionName, region]) => {
        const regionRevisions = region.revisions ?? [];

        regionRevisions.forEach((r) =>
          revisionItems.push({
            id: `${d.id}-${disciplineName}-${r.version}`,
            version: r.version,
            drawingName: d.name,
            disciplineName,
            regionName,
          }),
        );
      });
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
