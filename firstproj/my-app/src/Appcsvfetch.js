
import './App.css';
import { useState, useEffect } from "react";
import * as d3 from 'd3'




const csvUrl ='https://gist.githubusercontent.com/JosepAnSabate/fb0577df0d71324007f4c02b4c64d7fc/raw/f9bfce0cd6a900674642edcba32f7832e9d0bcaa/cssNamedColors.csv'

const message = data => {
  let message = ''
    message = message + Math.round(d3.csvFormat(data).length / 1024) + ' kB\n';
    message = message + data.length + ' rows\n';
    message = message + data.columns.length + ' columns';
    return message;
}



function App() {

  const [data, setData]= useState(null);

  // With d3.csv
  useEffect(() => {
    d3.csv(csvUrl).then(setData)
  }, []);

  return (
    <>
    <h1>Fetching CSV Data</h1>
    <pre>Data is: {data ? message(data) : 'loading'}</pre>
    </>
  );
}

export default App;
