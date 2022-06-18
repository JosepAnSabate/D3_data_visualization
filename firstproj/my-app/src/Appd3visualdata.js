
import './App.css';
import { useState, useEffect } from "react";
import * as d3 from 'd3'
import { csv, arc, pie } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv';

function App() {

  const width = 100;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(width);
  const [data, setData]= useState(null);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if (!data) {
    return <pre>Loading...</pre>;
  }
  const colorPie = pie().value(1);
  //console.log(data[1]);
  return (
    <>
    <svg width={width} height={height}>
      {
        data.map(d => 
          <div  style={{
            backgroundColor: d['RGB hex value'], 
          }} />) 
        
      }
      <g transform={`translate(${centerX},${centerY})`}>
        {colorPie(data).map(d => (
          <path fill={d.data['RGB hex value']} d={pieArc(d)} />
        ))}
      </g>
    </svg>
    
    </>
  );
}

export default App;
