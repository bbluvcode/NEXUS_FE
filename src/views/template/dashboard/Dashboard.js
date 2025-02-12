import React, { useEffect, useState } from 'react'
import { Card, Statistic, Row, Col, Table, Tag } from 'antd'
import axios from 'axios'
import { PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, BarChart, Bar, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const [inStockOrders, setInStockOrders] = useState([])
  const [outStockOrders, setOutStockOrders] = useState([])
  const [summary, setSummary] = useState({
    totalInStock: 0,
    totalOutStock: 0,
    paidInStock: 0,
    paidOutStock: 0,
    totalPaidInStock: 0,
    totalPaidOutStock: 0,
  })
  const [serviceBills, setServiceBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServiceBills = async () => {
      try {
        const { data } = await axios.get('http://localhost:5185/api/ServiceBill')
        setServiceBills(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchServiceBills()
  }, [])

  useEffect(() => {
    axios.get('http://localhost:5185/api/InStockOrder').then((res) => {
      const orders = res.data.data
      console.log('InStock Orders: ', orders)
      setInStockOrders(orders)

      const paidOrders = orders.filter((o) => o.isPay)
      const totalPaidValue = paidOrders.reduce((sum, o) => sum + o.total, 0)

      setSummary((prev) => ({
        ...prev,
        totalInStock: orders.length,
        paidInStock: paidOrders.length,
        totalPaidInStock: totalPaidValue,
      }))
    })

    axios.get('http://localhost:5185/api/OutStockOrder').then((res) => {
      const orders = res.data.data
      console.log('OutStock Orders: ', orders)
      setOutStockOrders(orders)

      const paidOrders = orders.filter((o) => o.isPay)
      const totalPaidValue = paidOrders.reduce((sum, o) => sum + o.total, 0)

      setSummary((prev) => ({
        ...prev,
        totalOutStock: orders.length,
        paidOutStock: paidOrders.length,
        totalPaidOutStock: totalPaidValue,
      }))
    })
  }, [])

  const chartData = serviceBills.map((bill) => ({
    payer: bill.payer,
    total: bill.total || 0,
  }))

  const pieData = [
    { name: 'Paid InStock', value: summary.paidInStock },
    { name: 'Unpaid InStock', value: summary.totalInStock - summary.paidInStock },
    { name: 'Paid OutStock', value: summary.paidOutStock },
    { name: 'Unpaid OutStock', value: summary.totalOutStock - summary.paidOutStock },
  ]

  const colors = ['#0088FE', '#FFBB28', '#00C49F', '#FF8042']

  const inStockColumns = [
    { title: 'Order ID', dataIndex: 'inStockOrderId', key: 'inStockOrderId' },
    { title: 'Stock', dataIndex: ['stock', 'stockName'], key: 'stockName' },
    { title: 'Total', dataIndex: 'total', key: 'total', render: (total) => `$${total}` },
    {
      title: 'Status',
      dataIndex: 'isPay',
      key: 'isPay',
      render: (isPay) => <Tag color={isPay ? 'green' : 'red'}>{isPay ? 'Paid' : 'Unpaid'}</Tag>,
    },
  ]

  const outStockColumns = [
    { title: 'Order ID', dataIndex: 'outStockId', key: 'outStockId' },
    { title: 'Stock', dataIndex: ['stock', 'stockName'], key: 'stockName' },
    { title: 'Total', dataIndex: 'total', key: 'total', render: (total) => `$${total}` },
    {
      title: 'Status',
      dataIndex: 'isPay',
      key: 'isPay',
      render: (isPay) => <Tag color={isPay ? 'green' : 'red'}>{isPay ? 'Paid' : 'Unpaid'}</Tag>,
    },
  ]

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total InStock Orders" value={summary.totalInStock} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total OutStock Orders" value={summary.totalOutStock} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Order Status Breakdown">
            <PieChart width={400} height={300}>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent InStock Orders">
            <Table
              columns={inStockColumns}
              dataSource={inStockOrders.slice(0, 5)}
              rowKey="inStockOrderId"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card title="Recent OutStock Orders">
            <Table
              columns={outStockColumns}
              dataSource={outStockOrders.slice(0, 5)}
              rowKey="outStockId"
            />
          </Card>
        </Col>
      </Row>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Service Bill</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="payer" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
