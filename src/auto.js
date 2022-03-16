import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let [index, setIndex] = useState(0)
  // let [currentData, setCurrentData] = useState([])



  const [data, setData] = useState({

    series: [{
      data: [{
        x: new Date(1538778600000),
        y: [6629.81, 6650.5, 6623.04, 6633.33]
      }
      ]
    }],
    options: {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'CandleStick Chart',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    },


  }
  )

  const [timer, setTimer] = useState(10)

  useEffect(() => {
    // exit early when we reach 0
    // if (!timer) return

    if (!timer) {
      setTimer(5)

      setData({
        ...data, series: [{
          data: [...data.series[0].data,
          candleData[index]]
        }]
      })
      setIndex(index + 1)
    }



    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimer(timer - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timer])

  console.log('data', data)

  const updateData = () => {
    setData({
      ...data, series: [{
        data: [...data.series[0].data,
        candleData[index]]
      }]
    })
    setIndex(index + 1)

  }

  const previousData = () => {
    console.log('data.series[0].data.pop()', data.series[0].data.pop())
    setData({
      ...data, series: [{
        data: [data.series[0].data.pop()]
      }]
    })
    candleData.unshift(data.series[0].data.pop())
    setIndex(index - 1)

  }


  return (
    <div className="donut" style={{ padding: '100px' }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: timer <= 3 ? 'red' : '' }}>{timer}</h3>
        {/* <button onClick={() => { updateData() }}>Update</button> */}
        {/* <button onClick={() => { previousData() }}>Previous</button> */}
      </div>
      <ReactApexChart options={data.options} series={data.series} type="candlestick" height={500} />



      <Row style={{ textAlign: 'center' }}>
        <Col>
          <h5>Current Price</h5>
          {data?.series[0]?.data[data.series[0]?.data?.length - 1]?.y[0]}
        </Col>
      </Row>



    </div>
  );
}

export default App;
