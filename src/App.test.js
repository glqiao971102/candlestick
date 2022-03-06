import React, { useState } from 'react';
import Chart from 'react-apexcharts'

function App() {

  const [data, setData] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E']
  }
  )

  const updateData = () => {
    setData({ ...data, series: [...data.series, 10] })
  }

  return (
    <div className="donut">
      <Chart options={data.options} series={data.series} type="donut" width="500" />
      <button onClick={() => { updateData() }}>Update</button>
    </div>
  );
}

export default App;
