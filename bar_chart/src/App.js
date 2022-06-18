import * as d3 from 'd3'
import { useState, useEffect } from 'react';
import './App.css';
import { csv, scaleBand, scaleLinear, max } from 'd3';



const csvUrl = 'https://gist.githubusercontent.com/JosepAnSabate/8d0924b30be2b958a6ba6665a9ecfabd/raw/4f48cfa7fbc8212a95f79b74be4979115d1c974a/gold_prod_2020.csv';

function App() {
  const width = 100;
  const height = 500;

  const [data, setData]= useState(null);
  
  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);
  
  console.log(data);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const yScale = scaleBand()
    .domain(data.map(d => d.Country)) 
    .range([0, height]);

  const xScale = scaleLinear()
    .domain([0,max(data, d => d.gold_prod_tons)])
    .range([0, width]);


  return (
    <>
    <svg width={width} height={height}>
      {data.map(d => (
        <rect 
          x={0} y={yScale(d.Country)} key={d.Country}
          width={xScale(d.gold_prod_tons)} height={yScale.bandwidth()}
          />
          ))}
    </svg>
    </>
  );
}

export default App;
