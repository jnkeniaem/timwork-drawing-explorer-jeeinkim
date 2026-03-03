export interface Transform {
  relativeTo?: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export type Vertex = number[];

export interface Polygon {
  vertices: Vertex[];
  polygonTransform: Transform;
}

export interface Revision {
  version: string;
  image: string;
  date: string; // "YYYY-MM-DD"
  //   TODO: date?
  description: string;
  changes: string[];
  imageTransform?: Transform;
  polygon?: Polygon;
}

export interface Position {
  vertices: Vertex[];
  imageTransform: Transform;
}

export interface Region {
  polygon: Polygon;
  revisions: Revision[];
}

export interface Discipline {
  imageTransform?: Transform;
  image?: string;
  polygon?: Polygon;
  regions?: Record<string, Region>; // ex) "Region A": { ... }
  revisions?: Revision[];
}

export interface Drawing {
  id: string;
  name: string;
  image: string;
  parent: string | null;
  position: Position | null;
  disciplines?: Record<string, Discipline>;
}

export interface DrawingContext {
  id: string;
  version: string;
  drawingName: string;
  disciplineName: string;
  regionName?: string;
  image: string;
  date: string;
  description: string;
}
