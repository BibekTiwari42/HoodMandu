import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Drawer,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link,
  Toolbar,
} from '@mui/material';
import {
  FilterList,
  GridView,
  ViewList,
  NavigateNext,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import ProductQuickView from '../components/products/ProductQuickView';
import { selectFilters, setSortBy, setViewMode, selectViewMode } from '../store/slices/productsSlice';
import { SORT_OPTIONS } from '../utils/constants';

const ProductsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const viewMode = useSelector(selectViewMode);
  const [searchParams] = useSearchParams();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const categoryParam = searchParams.get('category');

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const handleViewModeChange = (mode) => {
    dispatch(setViewMode(mode));
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Page Header */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          color: 'white',
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="xl">
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: 'grey.500' }} />}
            sx={{ mb: 2 }}
          >
            <Link href="/" color="grey.400" underline="hover">
              Home
            </Link>
            <Typography color="white">Products</Typography>
          </Breadcrumbs>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: '"Bebas Neue", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            {categoryParam ? categoryParam.toUpperCase() : 'ALL PRODUCTS'}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'grey.400',
              maxWidth: 500,
              mt: 2,
            }}
          >
            Discover our collection of premium streetwear designed for the urban lifestyle.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Toolbar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {/* Filter Button (Mobile) */}
          {isMobile && (
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setFilterDrawerOpen(true)}
              sx={{
                borderColor: 'grey.300',
                color: 'text.primary',
              }}
            >
              Filters
            </Button>
          )}

          {/* Sort Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
            {!isMobile && (
              <>
                <Typography variant="body2" color="text.secondary">
                  Sort by:
                </Typography>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <Select
                    value={filters.sortBy}
                    onChange={handleSortChange}
                    displayEmpty
                  >
                    {SORT_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}

            {/* View Mode Toggle */}
            {!isMobile && (
              <Box sx={{ display: 'flex', border: '1px solid', borderColor: 'grey.300' }}>
                <IconButton
                  onClick={() => handleViewModeChange('grid')}
                  sx={{
                    borderRadius: 0,
                    bgcolor: viewMode === 'grid' ? 'grey.100' : 'transparent',
                  }}
                >
                  <GridView />
                </IconButton>
                <IconButton
                  onClick={() => handleViewModeChange('list')}
                  sx={{
                    borderRadius: 0,
                    bgcolor: viewMode === 'list' ? 'grey.100' : 'transparent',
                  }}
                >
                  <ViewList />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>

        {/* Products Layout */}
        <Grid container spacing={4}>
          {/* Filters Sidebar (Desktop) */}
          {!isMobile && (
            <Grid item md={3} lg={2.5}>
              <Box
                sx={{
                  position: 'sticky',
                  top: 100,
                  maxHeight: 'calc(100vh - 120px)',
                  overflowY: 'auto',
                  pr: 2,
                }}
              >
                <ProductFilters />
              </Box>
            </Grid>
          )}

          {/* Products Grid */}
          <Grid item xs={12} md={9} lg={9.5}>
            <ProductGrid />
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: { width: '100%', maxWidth: 360 },
        }}
      >
        <ProductFilters isMobile onClose={() => setFilterDrawerOpen(false)} />
      </Drawer>

      {/* Quick View Modal */}
      <ProductQuickView />
    </Box>
  );
};

export default ProductsPage;