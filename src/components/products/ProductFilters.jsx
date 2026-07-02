import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Chip,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  ExpandMore,
  FilterList,
  Close,
} from '@mui/icons-material';
import {
  selectFilters,
  setCategory,
  setPriceRange,
  toggleSize,
  toggleColor,
  setSortBy,
  resetFilters,
} from '../../store/slices/productsSlice';
import { CATEGORIES, SIZES, COLORS, SORT_OPTIONS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductFilters = ({ isMobile = false, onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0);

  const handleCategoryChange = (categoryId) => {
    dispatch(setCategory(categoryId));
  };

  const handlePriceChange = (event, newValue) => {
    dispatch(setPriceRange(newValue));
  };

  const handleSizeToggle = (size) => {
    dispatch(toggleSize(size));
  };

  const handleColorToggle = (color) => {
    dispatch(toggleColor(color));
  };

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <Box
      sx={{
        p: isMobile ? 3 : 0,
        height: isMobile ? '100%' : 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip
              label={activeFiltersCount}
              size="small"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 700,
                height: 24,
                minWidth: 24,
              }}
            />
          )}
        </Box>
        {isMobile && (
          <Button onClick={onClose} sx={{ minWidth: 'auto' }}>
            <Close />
          </Button>
        )}
      </Box>

      {/* Sort (Mobile) */}
      {isMobile && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sortBy}
            label="Sort By"
            onChange={handleSortChange}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Categories */}
      <Accordion
        defaultExpanded
        disableGutters
        elevation={0}
        sx={{
          border: 'none',
          '&:before': { display: 'none' },
          bgcolor: 'transparent',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Categories
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {CATEGORIES.map((category) => (
              <Box
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                sx={{
                  py: 1,
                  px: 2,
                  cursor: 'pointer',
                  bgcolor: filters.category === category.id ? 'grey.100' : 'transparent',
                  borderLeft: '2px solid',
                  borderColor: filters.category === category.id ? 'primary.main' : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: filters.category === category.id ? 600 : 400,
                    color: filters.category === category.id ? 'primary.main' : 'text.primary',
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* Price Range */}
      <Accordion
        defaultExpanded
        disableGutters
        elevation={0}
        sx={{
          border: 'none',
          '&:before': { display: 'none' },
          bgcolor: 'transparent',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ px: 1 }}>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={100}
              sx={{
                color: 'primary.main',
                '& .MuiSlider-thumb': {
                  bgcolor: 'black',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(filters.priceRange[0])}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(filters.priceRange[1])}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* Sizes */}
      <Accordion
        defaultExpanded
        disableGutters
        elevation={0}
        sx={{
          border: 'none',
          '&:before': { display: 'none' },
          bgcolor: 'transparent',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Sizes
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {SIZES.map((size) => (
              <Chip
                key={size}
                label={size}
                onClick={() => handleSizeToggle(size)}
                variant={filters.sizes.includes(size) ? 'filled' : 'outlined'}
                sx={{
                  borderColor: filters.sizes.includes(size) ? 'primary.main' : 'grey.300',
                  bgcolor: filters.sizes.includes(size) ? 'primary.main' : 'transparent',
                  color: filters.sizes.includes(size) ? 'white' : 'text.primary',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: filters.sizes.includes(size) ? 'primary.dark' : 'grey.100',
                  },
                }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* Colors */}
      <Accordion
        defaultExpanded
        disableGutters
        elevation={0}
        sx={{
          border: 'none',
          '&:before': { display: 'none' },
          bgcolor: 'transparent',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Colors
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {COLORS.map((color) => (
              <Box
                key={color.name}
                onClick={() => handleColorToggle(color.name)}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: color.value,
                  border: '2px solid',
                  borderColor: filters.colors.includes(color.name)
                    ? 'primary.main'
                    : color.name === 'White'
                    ? 'grey.300'
                    : 'transparent',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  '&::after': filters.colors.includes(color.name)
                    ? {
                        content: '"✓"',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: color.name === 'White' || color.name === 'Yellow' ? 'black' : 'white',
                        fontWeight: 'bold',
                        fontSize: '14px',
                      }
                    : {},
                }}
                title={color.name}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Reset Button */}
      {activeFiltersCount > 0 && (
        <Box sx={{ mt: 'auto', pt: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleResetFilters}
          >
            Clear All Filters ({activeFiltersCount})
          </Button>
        </Box>
      )}

      {/* Apply Button (Mobile) */}
      {isMobile && (
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          Apply Filters
        </Button>
      )}
    </Box>
  );
};

export default ProductFilters;