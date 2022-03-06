import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'
import ManualPage from './components/manual/manual.jsx'


import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { usePapaParse } from 'react-papaparse';

import Chart1 from './chart2/1.2.csv'
import GameChart from './chart1/gameStart1.csv'

function Chart2() {

  let [index, setIndex] = useState(0)
  // let [currentData, setCurrentData] = useState([])

  const { readRemoteFile } = usePapaParse();
  const [gameChart, setGameChart] = useState([])

  const [initialChart, setInitialChart] = useState([])

  const handleReadRemoteFile = () => {
    let chart = []
    readRemoteFile(Chart1, {
      complete: (results) => {

        const chartYear = results.data?.map(data => {
          return data[0]
        })

        const chartData = results.data?.map(data => {
          return [data[1], data[2], data[3], data[4]]
        })

        for (let i = 0; i < chartYear.length; i++) {
          chart.push({
            x: new Date(chartYear[i]),
            y: [chartData[i][0], chartData[i][1], chartData[i][2], chartData[i][3]]
          })
        }
        setInitialChart(chart)


        setData({
          ...data, series: [{
            data: chart
          }]
        })
        return chart
      },

    });
    setInitialChart(chart)
    return chart
  };

  useEffect(() => {
    handleReadRemoteFile()
  }, [])



  const [timer, setTimer] = useState(1)



  // useEffect(() => {
  //   // exit early when we reach 0
  //   // if (!timer) return

  //   if (!timer) {
  //     setTimer(1)

  //     setData({
  //       ...data, series: [{
  //         data: [...data.series[0].data,
  //         candleData[index]]
  //       }]
  //     })
  //     setIndex(index + 1)
  //   }



  //   // save intervalId to clear the interval when the
  //   // component re-renders
  //   const intervalId = setInterval(() => {
  //     setTimer(timer - 0.5)
  //   }, 500)

  //   // clear interval on re-render to avoid memory leaks
  //   return () => clearInterval(intervalId)
  //   // add timeLeft as a dependency to re-rerun the effect
  //   // when we update it
  // }, [timer])



  // const updateData = () => {
  //   setData({
  //     ...data, series: [{
  //       data: [...data.series[0].data,
  //       candleData[index]]
  //     }]
  //   })
  //   setIndex(index + 1)

  // }

  const [data, setData] = useState({

    series: [{
      data: []
    }],
    options: {
      chart: {
        type: 'candlestick',
        height: 500,
        toolbar: {
          show: false
        }
      },
      title: {
        text: '`',
        align: 'right'
      },
      xaxis: {
        type: "category",
        labels: {
          formatter: function (value) {
            return "";
          }
        }
      },
      yaxis: {
        show: true,
        tooltip: {
          enabled: true
        },
        showAlways: true,
        labels: {
          show: true,
          align: 'right',

        },
      }
    },

  }
  )

  return (
    <>
      



            <div className="donut" style={{ padding: '0px' }}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: timer <= 3 ? 'red' : '' }}>{timer}</h3>
                {/* <button onClick={() => { updateData() }}>Update</button> */}
                {/* <button onClick={() => { previousData() }}>Previous</button> */}
              </div>

              <ReactApexChart options={data?.options} series={data?.series} type="candlestick" height={650} />



              <Row style={{ textAlign: 'center' }}>
                <Col>
                  <h5>Current Price</h5>
                  {/* {console.log('data54321', data)} */}
                  {data?.series[0]?.data[data?.series[0]?.data?.length - 1]?.y[0]}
                </Col>

                {/* <Col>
                  <h5>High</h5>
                  {data?.series[0]?.data[data.series[0]?.data.length - 1]?.y[1]}
                </Col>

                <Col>
                  <h5>Low</h5>
                  {data?.series[0]?.data[data.series[0]?.data?.length - 1]?.y[2]}
                </Col>

                <Col>
                  <h5>Close</h5>
                  {data?.series[0]?.data[data.series[0]?.data?.length - 1]?.y[3]}
                </Col> */}
              </Row>

            </div>
         
    </>
  );
}

export default Chart2;
