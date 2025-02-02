import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Paper, Title, Text, Skeleton } from '@mantine/core';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend
);

const Analytics = () => {
  // State to hold mock data
  const [data, setData] = useState(null);

  // Simulating an API call with generated data
  useEffect(() => {
    const generateData = () => {
      setData({
        lineChartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Sales Growth',
              data: [1200, 2000, 1800, 2500, 3000, 3200, 3600],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        },
        pieChartData: {
          labels: ['Product A', 'Product B', 'Product C', 'Product D'],
          datasets: [
            {
              data: [300, 500, 700, 100],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              hoverOffset: 4,
            },
          ],
        },
        revenueData: 2655000  ,
        activeUsers: 2486,
        newOrders: 11,
      });
    };

    setTimeout(generateData, 1500); // Simulate an API call delay
  }, []);

  // If data is still loading, show skeleton loaders
  if (!data) {
    return (
      <Container>
        <Skeleton height={300} mb="sm" />
        <Skeleton height={300} mb="sm" />
        <Skeleton height={300} />
      </Container>
    );
  }

  return (
    <Container>
      {/* <Title order={1} align="center" mb="xl">Analytics Dashboard</Title> */}

      <Grid gutter="xl">
        {/* Line Chart */}
        <Grid.Col xs={12} md={6}>
          <Card shadow="sm" padding="lg">
            <Title order={2}>Sales Growth</Title>
            <Paper padding="md" shadow="xs">
              <Line data={data.lineChartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Sales Over Time' } } }} />
            </Paper>
          </Card>
        </Grid.Col>

        {/* Pie Chart */}
        <Grid.Col xs={12} md={6}>
          <Card shadow="sm" padding="lg">
            <Title order={2}>Product Distribution</Title>
            <Paper padding="md" shadow="xs">
              <Pie data={data.pieChartData} options={{ responsive: true }} />
            </Paper>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid gutter="xl" mt="xl">
        {/* Data Cards */}
        <Grid.Col xs={12} md={4}>
          <Card shadow="sm" padding="lg">
            <Title order={3}>Last week's revenue</Title>
            <Text size="xl" weight={500}>SDG {data.revenueData.toLocaleString()}</Text>
          </Card>
        </Grid.Col>

        <Grid.Col xs={12} md={4}>
          <Card shadow="sm" padding="lg">
            <Title order={3}>Sales this week</Title>
            <Text size="xl" weight={500}>{data.activeUsers}</Text>
          </Card>
        </Grid.Col>

        <Grid.Col xs={12} md={4}>
          <Card shadow="sm" padding="lg">
            <Title order={3}>New Orders</Title>
            <Text size="xl" weight={500}>{data.newOrders}</Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Analytics;