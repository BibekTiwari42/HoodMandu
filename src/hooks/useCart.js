import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalAmount,
} from '../store/slices/cartSlice';
import { showSnackbar } from '../store/slices/uiSlice';

const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);

  const addItem = useCallback((product, size, color, quantity = 1) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      size,
      color,
      quantity,
    }));
    dispatch(showSnackbar({
      message: `${product.name} added to cart!`,
      severity: 'success',
    }));
  }, [dispatch]);

  const removeItem = useCallback((itemKey) => {
    dispatch(removeFromCart(itemKey));
    dispatch(showSnackbar({
      message: 'Item removed from cart',
      severity: 'info',
    }));
  }, [dispatch]);

  const updateItemQuantity = useCallback((itemKey, quantity) => {
    dispatch(updateQuantity({ itemKey, quantity }));
  }, [dispatch]);

  const incrementItem = useCallback((itemKey) => {
    dispatch(incrementQuantity(itemKey));
  }, [dispatch]);

  const decrementItem = useCallback((itemKey) => {
    dispatch(decrementQuantity(itemKey));
  }, [dispatch]);

  const clearAllItems = useCallback(() => {
    dispatch(clearCart());
    dispatch(showSnackbar({
      message: 'Cart cleared',
      severity: 'info',
    }));
  }, [dispatch]);

  const getItemByKey = useCallback((itemKey) => {
    return items.find(item => item.itemKey === itemKey);
  }, [items]);

  const isInCart = useCallback((productId, size, color) => {
    const itemKey = `${productId}-${size}-${color}`;
    return items.some(item => item.itemKey === itemKey);
  }, [items]);

  return {
    items,
    totalQuantity,
    totalAmount,
    addItem,
    removeItem,
    updateItemQuantity,
    incrementItem,
    decrementItem,
    clearAllItems,
    getItemByKey,
    isInCart,
    isEmpty: items.length === 0,
  };
};

export default useCart;