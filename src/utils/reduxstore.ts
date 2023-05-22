import {configureStore} from '@reduxjs/toolkit';

import { guestApi } from '../api/guestApi';
import { roomApi } from '../api/roomApi';
import { roomtypeApi } from '../api/roomtypeApi';
import { reservationApi } from '../api/reservationApi';

/**
 * Redux store so we can use the APIs
 */
const store = configureStore({
    reducer: {
      [guestApi.reducerPath]: guestApi.reducer,
      [roomApi.reducerPath]: roomApi.reducer,
      [roomtypeApi.reducerPath]: roomtypeApi.reducer,
      [reservationApi.reducerPath]: reservationApi.reducer,
    },
    middleware: (defaultMiddleware) => defaultMiddleware()
                                        .concat(guestApi.middleware)
                                        .concat(roomApi.middleware)
                                        .concat(roomtypeApi.middleware)
                                        .concat(reservationApi.middleware)
});

export default store;