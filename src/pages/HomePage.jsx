import { Box } from '@mui/material';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryShowcase from '../components/home/CategoryShowcase';

const HomePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HeroBanner />

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Featured Products */}
      <FeaturedProducts />
    </Box>
  );
};

export default HomePage;