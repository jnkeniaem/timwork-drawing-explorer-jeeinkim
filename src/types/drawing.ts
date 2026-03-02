export interface IPolygonTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface IImageTransform extends IPolygonTransform {
  relativeTo: string;
}

export type Verticle = [number, number];

export interface IPolygon {
  vertices: Verticle[];
  polygonTransform: IPolygonTransform;
}

export interface IRevision {
  version: string;
  image: string;
  date: string; // "YYYY-MM-DD"
  //   TODO: date?
  description: string;
  changes: string[];
  imageTransform: IImageTransform;
  polygon?: IPolygon;
}

export interface IPosition {
  vertices: Verticle[];
  imageTransform: IImageTransform;
}

export interface IRegion {
  polygon: IPolygon;
  revisions: IRevision[];
}

export interface IDiscipline {
  imageTransform?: IImageTransform;
  image?: string;
  polygon?: IPolygon;
  regions?: Record<string, IRegion>; // ex) "Region A": { ... }
  revisions: IRevision[];
}

export interface Drawing {
  id: string;
  name: string;
  image: string;
  parent: string;
  position: IPosition;
  disciplines: Record<string, IDiscipline>;
}
