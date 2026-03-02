import type { Drawing, DrawingContext } from '../types/drawing';

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
          id: `${d.id}-${disciplineName}-${r.version}`,
          version: r.version,
          ...context,
        }),
      );

      Object.entries(discipline.regions || {}).forEach(
        ([regionName, region]) => {
          (region.revisions || []).forEach((r) =>
            items.push({
              id: `${d.id}-${disciplineName}-${r.version}`,
              version: r.version,
              regionName,
              ...context,
            }),
          );
        },
      );
    });
  });

  return items;
};
