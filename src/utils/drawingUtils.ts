import type { Drawing, DrawingContext } from '../types/drawing';

const buildRevisionId = ({
  drawingId,
  disciplineName,
  version,
  regionName,
}: {
  drawingId: string;
  disciplineName: string;
  version: string;
  regionName?: string;
}) => {
  return [drawingId, disciplineName, regionName, version]
    .filter(Boolean)
    .join('-');
};

export const getAllRevisions = (drawings: Drawing[]): DrawingContext[] => {
  const items: DrawingContext[] = [];

  drawings.forEach((d) => {
    const disciplines = d.disciplines ?? {};
    Object.entries(disciplines).forEach(([disciplineName, discipline]) => {
      const context = {
        drawingName: d.name,
        disciplineName,
      };

      (discipline.revisions || []).forEach((r) =>
        items.push({
          id: buildRevisionId({
            drawingId: d.id,
            disciplineName,
            version: r.version,
          }),
          version: r.version,
          image: r.image,
          date: r.date,
          description: r.description,
          changes: r.changes,
          ...context,
        }),
      );

      Object.entries(discipline.regions || {}).forEach(
        ([regionName, region]) => {
          (region.revisions || []).forEach((r) =>
            items.push({
              id: buildRevisionId({
                drawingId: d.id,
                disciplineName,
                version: r.version,
                regionName,
              }),
              version: r.version,
              regionName,
              image: r.image,
              date: r.date,
              description: r.description,
              changes: r.changes,
              ...context,
            }),
          );
        },
      );
    });
  });

  return items;
};

export const getLatestRevisionIds = (
  revisionItems: DrawingContext[],
): Set<string> => {
  const latestMap = new Map<string, DrawingContext>();

  revisionItems.forEach((item) => {
    const key = [item.drawingName, item.disciplineName, item.regionName]
      .filter(Boolean)
      .join('-');
    const existing = latestMap.get(key);

    // 날짜로 비교
    if (!existing || item.date > existing.date) {
      latestMap.set(key, item);
    }
  });

  return new Set(Array.from(latestMap.values()).map((item) => item.id));
};
