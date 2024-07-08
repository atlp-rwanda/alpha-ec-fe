import { createSelector, Selector } from 'reselect';
import { RootState } from '@/redux/store';
import { ProductInterface } from '../slices/ProductSlice';
import { CategoryAttributes } from '../slices/categorySlice';

const wishlistSelector: Selector<RootState, ProductInterface[]> = state =>
  state.wishlist.wishlist?.rows || [];

const wishStatusSelector: Selector<RootState, string> = state =>
  state.wishlist.status;

const cartSelector: Selector<RootState, any> = state => state.cart.cart;

const tokenSelector: Selector<RootState, string | null> = state =>
  state.user.token;

const cartStatusSelector: Selector<RootState, string> = state =>
  state.cart.status;

const categoriesSelector: Selector<
  RootState,
  CategoryAttributes[] | null
> = state => state.categories.categoriesData;

export const getWishlist = createSelector(
  [wishlistSelector, wishStatusSelector],
  (wishlist, wishStatus) => ({ wishlist, wishStatus })
);

export const getCartState = createSelector(
  [cartSelector, cartStatusSelector],
  (cart, cartStatus) => ({ cart, cartStatus })
);

export const getCategoriesData = createSelector(
  categoriesSelector,
  categoriesData => categoriesData
);

export const getUserToken = createSelector(
  tokenSelector,
  userToken => userToken
);
