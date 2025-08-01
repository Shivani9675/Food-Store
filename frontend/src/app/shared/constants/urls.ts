import { environment } from '../../../environments/environment';
const BASE_URL = environment.production ? '' : 'http://localhost:5000';

export const FOODS_URL = BASE_URL + '/api/foods';
export const USERS_URL = BASE_URL + '/api/users';

export const FOODS_CATEGORIES_URL = FOODS_URL + '/categories';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_SUBCATEGORIES_BY_CATEGORY_ID_URL = FOODS_URL + '/category/';
export const FOODS_BY_ID_URL = FOODS_URL + '/';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';
export const ALL_ORDERS_URL = ORDERS_URL + '/getAllOrders';

// export const USER_LOGIN_URL = USERS_URL + '/login';
// export const USER_REGISTER_URL = USERS_URL + '/register';
export const USER_SIGN_UP = USERS_URL + '/sign-up';
export const USER_SIGN_IN = USERS_URL + '/sign-in';
export const USER_VERIFY_OTP = USERS_URL + '/verify-otp';

