import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'
import Table from '../components/table/table'
import StatusCard from '../components/card/card'
import statusCards from '../jsonData/card.json'
import axios from 'axios';
export default function MultiActionAreaCard() {
  const [LeadData, setLeadData] = useState([])
  const [EmployeeData,setEmployeeData]=useState([])
  const [cardData, setCardData] = useState([])

  const fetchLeadData = () => {
    axios.get("http://52.66.244.82:3001/leads").then((response) => {
      setLeadData(response.data)
    })
  }

  const fetchEmploeeData=()=>{
    axios.get("http://52.66.244.82:3001/employees").then((response) => {
      setEmployeeData(response.data)
    })
  }

  useEffect(() => {
    fetchLeadData()
    fetchEmploeeData()
    createCardData()
  }, [LeadData,EmployeeData])

  const createCardData = () => {
    var card = [{
      icon: 'bx bxs-star',
      count: LeadData.length,
      title: 'Total Leads'
    }, {
      icon: "bx bxs-user-account",
      count: EmployeeData.length,
      title: "Employees"
    },
    {
      icon: "bx bxs-cog",
      count: "20",
      title: "Total Services"
    },
    {
      icon: "bx bx-receipt",
      count: "02",
      title: "Customers"
    }]
    setCardData(card)
  }

  const chartOptions = {
    series: [{
      name: 'Customers',
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
    }, {
      name: 'Leads',
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51]
    }],
    options: {
      color: ['#6ab04c', '#2980b9'],
      chart: {
        background: 'transparent'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      },
      legend: {
        position: 'top'
      },
      grid: {
        show: false
      }
    }
  }
  const Employees = {
    head: [
      'Employee',
      'Birth Date'
    ],
    body: [
      {
        "username": "john doe",
        "BirthDate": "2022-10-4",

      },
      {
        "username": "frank iva",
        "BirthDate": "2022-12-31",

      },
      {
        "username": "anthony baker",
        "BirthDate": "2022-10-14",

      },
      {
        "username": "frank iva",
        "BirthDate": "2022-09-25",

      },
      {
        "username": "anthony baker",
        "BirthDate": "2022-10-16",

      }
    ]
  }
  const renderEmployeeHead = (item, index) => (
    <th key={index}>{item}</th>
  )
  const renderEmployeeBody = (item, index) => (
    <tr key={index}>
      <td>{item.username}</td>
      <td>{item.BirthDate}</td>
    </tr>
  )
  return (
    <div>
      <h2 className="page-header ml-2"><i className='bx bxs-dashboard mr-2 mt-1'></i>Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {
              cardData.map((item, index) => (
                <div className="col-6" key={index}>
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            {/* chart */}
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type='line'
              height='100%'
            />
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card__header">
              <h3>Employees Birth Date</h3>
            </div>
            <div className="card__body">
              <Table
                headData={Employees.head}
                renderHead={(item, index) => renderEmployeeHead(item, index)}
                bodyData={Employees.body}
                renderBody={(item, index) => renderEmployeeBody(item, index)}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card__header">
              <h3>Employees Birth Date</h3>
            </div>
            <div className="card__body">
              <Table
                headData={Employees.head}
                renderHead={(item, index) => renderEmployeeHead(item, index)}
                bodyData={Employees.body}
                renderBody={(item, index) => renderEmployeeBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



