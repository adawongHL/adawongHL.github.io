import * as d3 from 'd3';
import { FeatureCollection } from 'geojson';

type MapProps = {
  width: number;
  height: number;
  data: FeatureCollection;
};


export default function MosaicMap  ({ width, height, data }: MapProps) {
  console.log("*** Mosaic Map loaded ***")

  // data = data.features.filter(shape => shape.id === 'AUS' )
  const projection = d3
    .geoMercator()
    .scale(width / (2*Math.PI))
    .center([50, 10])
    .translate([515,250]);

  const cellSize = 1;
  const spacing = 5;
  const points: { x: number; y: number }[] = []; // array of points to draw squares for
  const path = d3.geoPath(projection);

  // loop through countries
  for (let i = 0; i < data.features.length; i++) {
    // find bounding box for each country
    const [[x0, y0], [x1, y1]] = path.bounds(data.features[i]);
    // loop through each point in bounding box
    for (let y = y0; y < y1; y += spacing) {
      for (let x = x0; x < x1; x += spacing) {
        const geoPoint = projection.invert([x,y]); //  convert this point to longitude, latitude
        if (!geoPoint) continue;

        // if point lies within land area, include this point
        if (d3.geoContains(data.features[i], geoPoint)) {
          points.push({ x, y });
        }
      }
    }
  }

  // now, points contains all the points to draw squares for
  // iterate over each point, draw the tiny square
  const tiles = points.map( (point, index) => 
    <circle
    key={index}
    cx={point.x}
    cy={point.y}
    r={1}
    fill="black"
  />
    // <rect 
    // key={index}
    // x={point.x}
    // y={point.y}
    // width={cellSize}
    // height={cellSize}
    // fill="red" />
  )

  return (
    <div className="">
    <svg width={width} height={height} className="">
  {tiles}
</svg></div>
  )

};
