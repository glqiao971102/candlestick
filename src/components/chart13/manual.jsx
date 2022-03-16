import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap'
import ReactApexChart from 'react-apexcharts'


import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { usePapaParse } from 'react-papaparse';

import Chart1 from './1.13/1.13.csv'
import GameChart from './1.13/game1.13.csv'

function Chart2() {

  let [index, setIndex] = useState(0)
  // let [currentData, setCurrentData] = useState([])

  const { readRemoteFile } = usePapaParse();

  let [firstIndex, setFirstIndex] = useState(0)
  let [secondIndex, setSecondIndex] = useState(5)

  const [initialChart, setInitialChart] = useState([])
  const [gameChart, setGameChart] = useState([])


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

  const handleGameReadRemoteFile = () => {
    let chart = []
    readRemoteFile(GameChart, {
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
        setGameChart(chart)

        return chart
      },

    });
    setGameChart(chart)
    return chart
  };

  useEffect(() => {
    handleReadRemoteFile()
    handleGameReadRemoteFile()
  }, [])



  const [timer, setTimer] = useState(1)

  // let [index, setIndex] = useState(0)
  let [startGame, setStartGame] = useState(false)
  let [isBusy, setIsBusy] = useState(false)
  let [counter, setCounter] = useState(0)

  useEffect(() => {
    // exit early when we reach 0
    // if (!timer) return

    if (!timer && startGame && counter < 5 && gameChart[index] != null) {

      setTimer(1)

      setData({
        ...data, series: [{
          data: [...data.series[0].data,
          gameChart[index]]
        }]
      })
      setIndex(index + 1)

      setCounter(counter + 1)

      if (counter === 5) {
        setStartGame(false)
      }

      console.log(counter)
    } else if (counter >= 5) {

      setCounter(0)

      if (counter === 5) {
        setStartGame(false)
      }

    }



    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimer(timer - 1)
    }, 500)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timer, startGame])


  // const updateData = () => {

  //   let sliceDate = gameChart.slice(firstIndex, secondIndex)

  //   console.log('sliceDate', sliceDate)

  //   setData({
  //     ...data, series: [{
  //       data: [...data.series[0].data.concat(sliceDate)
  //       ]
  //     }]
  //   })
  //   setFirstIndex(firstIndex + 5)
  //   setSecondIndex(secondIndex + 5)
  //   if (sliceDate.length <= 0) {
  //     alert('Chart End')
  //   }
  // }



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



  const updateData = () => {

    let sliceDate = gameChart.slice(firstIndex, secondIndex)

    console.log('sliceDate', sliceDate)

    setData({
      ...data, series: [{
        data: [...data.series[0].data.concat(sliceDate)
        ]
      }]
    })
    setFirstIndex(firstIndex + 5)
    setSecondIndex(secondIndex + 5)
    if (sliceDate.length <= 0) {
      alert('Chart End')
    }
  }


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




      <div className="donut" style={{ padding: '0px 200px 0px 40px' }}>
        <div style={{ textAlign: 'center' }}>
          {/* <h3 style={{ color: timer <= 3 ? 'red' : '' }}>{timer}</h3> */}

          {/* <button onClick={() => { previousData() }}>Previous</button> */}
        </div>

        <Row style={{ marginTop: '20px', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <Col>
            <h5>Current Price</h5>
            {/* {console.log('data54321', data)} */}
            <h2>{data?.series[0]?.data[data?.series[0]?.data?.length - 1]?.y[0]}</h2>
          </Col>
          <Col>
            <Button disabled={counter != 0} size="lg" color='success' onClick={() => {

              setIsBusy(true)
              setStartGame(!startGame)
              setTimer(1)
              // setCounter(5)
              // 
              // updateData()
            }}>Update</Button>
          </Col>
        </Row>

        <ReactApexChart options={data?.options} series={data?.series} type="candlestick" height={650} />





      </div>

    </>
  );
}

export default Chart2;
