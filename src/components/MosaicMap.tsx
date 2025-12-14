"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { FeatureCollection } from "geojson";

export default function WorldMosaic() {
  const ref = useRef<SVGSVGElement | null>(null);   // initlaly null, later an <svg> DOM elem

  // use D3 to paint inside the created "container"
  useEffect(() => {
    if (!ref.current) return;

    const width = 700;
    const height = 360;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%");

    d3.json<FeatureCollection>("/world.geojson").then((world) => {
      if (!world) return;

      const projection = d3
        .geoMercator()
        .fitSize([width, height], world);

      const path = d3.geoPath(projection);

      svg
        .selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#0a0b0a")
        .attr("stroke", "#374151")
        .attr("stroke-width", 0.5);
    });
  }, []);

  return <svg ref={ref} />;   // assign svg here ("container")
}
