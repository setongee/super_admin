import ApexCharts from 'apexcharts'
import Chart from "react-apexcharts";

import React from 'react'

export default function Charts() {

    const options = {

        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["June 21st", "June 22nd", "June 23rd", "June 24th", "June 25th", "June 26th", "June 27th"]
        },

        title: {

            text: 'Website Statistics ( Visits & New Subscribers )',
            align: 'left',
            margin: 10,
            offsetX: 10,
            offsetY: 0,
            floating: false,
            style: {
                fontSize:  '16px',
                fontWeight:  '700',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color:  '#101010'
            }
        },

        colors: ['#287F71', '#EB862A'],

        tooltip : {
            theme : "dark"
        }

    }

    const series = [
        {
          name: "Web Visits",
          data: [340, 123, 129, 554, 983, 601, 189]
        },
        {
            name: "New Subscribers",
            data: [110, 23, 9, 500, 539, 32, 102]
          }
      ]

  return (

    <Chart
        options={options}
        series={series}
        type="area"
        height={450}
    />

  )

}
