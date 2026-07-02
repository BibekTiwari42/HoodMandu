import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, ShoppingBag, People, Star } from '@mui/icons-material';
import { SALES_DATA } from '../../utils/constants';
import { formatCompactCurrency } from '../../utils/formatCurrency';

const stats = [
  {
    title: 'Total Revenue',
    value: '$78,500',
    change: '+24%',
    icon: TrendingUp,
    positive: true,
  },
  {
    title: 'Total Orders',
    value: '4,892',
    change: '+18%',
    icon: ShoppingBag,
    positive: true,
  },
  {
    title: 'New Customers',
    value: '1,247',
    change: '+32%',
    icon: People,
    positive: true,
  },
  {
    title: 'Avg. Rating',
    value: '4.8',
    change: '+0.3',
    icon: Star,
    positive: true,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        sx={{
          bgcolor: 'background.dark',
          color: 'white',
          p: 2,
          border: 'none',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Typography key={index} variant="body2" sx={{ color: entry.color }}>
            {entry.name}: {entry.name === 'sales' ? formatCompactCurrency(entry.value) : entry.value}
          </Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

const SalesChart = () => {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: 'grey.50',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              display: 'block',
              mb: 1,
            }}
          >
            Performance
          </Typography>
          <Typography variant="h2">
            Brand Analytics
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', mt: 2, maxWidth: 600, mx: 'auto' }}
          >
            Track our growth and see why thousands choose HoodMandu for their streetwear needs.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <stat.icon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: stat.positive ? 'success.main' : 'error.main',
                      fontWeight: 600,
                      bgcolor: stat.positive ? 'success.light' : 'error.light',
                      px: 1,
                      py: 0.5,
                    }}
                  >
                    {stat.change}
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    mb: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {stat.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={4}>
          {/* Revenue Chart */}
          <Grid item xs={12} lg={8}>
            <Paper
              sx={{
                p: 3,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3 }}>
                Revenue Overview
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <AreaChart data={SALES_DATA}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: '#666' }}
                      axisLine={{ stroke: '#E0E0E0' }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#666' }}
                      axisLine={{ stroke: '#E0E0E0' }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#0066FF"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorSales)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Orders Chart */}
          <Grid item xs={12} lg={4}>
            <Paper
              sx={{
                p: 3,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'grey.200',
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3 }}>
                Monthly Orders
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={SALES_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 10, fill: '#666' }}
                      axisLine={{ stroke: '#E0E0E0' }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#666' }}
                      axisLine={{ stroke: '#E0E0E0' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="orders"
                      fill="#000000"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SalesChart;