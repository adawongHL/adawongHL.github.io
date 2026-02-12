"use client";
import { useEffect, useState } from "react";

type Day = {
  date: string;
  level: number;
};

export default function GithubHeatmap() {
    const [days, setDays] = useState<Day[]>([]);
    console.log("before fetch in github heatmap...");

    // fetch the github commit 2026 data upon initial render
    useEffect(() => {
        // fetch("https://github.com/users/adawonghl/contributions?from=2026-01-01&to=2026-12-31")   <-- was giving CORS error so lets try switching to local route
        fetch("/api/github")
            .then(res => {
                return res.text()
            })    // convert to dict
            .then(  // parse data
                html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    const cells = doc.querySelectorAll("td[data-date]");    // cells is node list - gotta convert to array before using .map
                    
                    const data: Day[] = Array.from(cells).map(cell => ({
                        date: cell.getAttribute("data-date")!,
                        level: Number(cell.getAttribute("data-level")),
                    }));

                    setDays(data)}
            )
        }, [] )

        console.log("after fetch in github heatmap...");


    return (
    <div>
        {/* <h1>HEATMAP</h1> */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(53, 12px)", gap: "2px" }}>
            {days.map(day => (
                <div
                key={day.date}
                title={`${day.date}: commits`}
                style={{
                width: 12,
                height: 12,
                backgroundColor: levelToColor(day.level),
                borderRadius: 2,
                // transition: "background-color 3s ease-out",
                }}
                className="heatmap-cell"
            />
            ))}
        </div>
    
    </div>)
}

// Helper function: color in the square based on its level
function levelToColor(level: number) {
    return ["var(--muted)", "#9be9a8", "#40c463", "#30a14e", "#216e39"][level]; // level goes from 0 to 4
}

// Sample grid data (single day) from github:
// date-date
// data-level is for coloring the intensity of the square
    // <td
    //   tabindex="0"
    //   data-ix="51"
    //   aria-selected="false"
    //   aria-describedby="contribution-graph-legend-level-0"
    //   style="width: 10px"
    //   data-date="2026-12-22"
    //   id="contribution-day-component-2-51"
    //   data-level="0"
    //   role="gridcell"
    //   data-view-component="true"
    //   class="ContributionCalendar-day">
    // </td>