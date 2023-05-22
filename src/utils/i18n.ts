// config file containing all the translation for my app

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "page-title": "Hotel Reservation Portal",
        "get-started": "Click Search to get started!",
        "sidebar-home": "Home",
        "sidebar-search": "Search for rooms",
        "sidebar-reservations": "My Reservations",
        "search-numberofguests": "Number of guests",
        "search-roomtype": "Room type",
        "search-checkindate": "Check-in date",
        "search-checkoutdate": "Check-out date",
        "search-button": "Search",
        "search-error-numguests": "You must have at least one guest.",
        "search-error-roomtype": "Please select a room type.",
        "search-error-dates": "Check-out date must be at least 1 day after check-in date!",
        "res-tempreserved": "Your room has been temporarily reserved for the next 5 minutes.",
        "res-enterinfo": "Please enter your information to confirm your reservation.",
        "name": "Name",
        "email": "Email",
        "phonenumber": "Phone number",
        "address": "Address",
        "specialrequests": "Requests for hotel staff",
        "cancel": "Cancel",
        "create-reservation": "Create reservation"
      }
    },
    de: {
      translation: {
        "page-title": "[de] Hotel Reservation Portal",
        "get-started": "[de] Click Search to get started!",
        "sidebar-home": "de Home",
        "sidebar-search": "de Search for rooms",
        "sidebar-reservations": "de My Reservations",
        "search-numberofguests": "de Number of guests",
        "search-roomtype": "de Room type",
        "search-checkindate": "de Check-in date",
        "search-checkoutdate": "de Check-out date",
        "search-button": "de Search",
        "search-error-numguests": "de You must have at least one guest.",
        "search-error-roomtype": "de Please select a room type.",
        "search-error-dates": "de Check-out date must be at least 1 day after check-in date!",
        "res-tempreserved": "de Your room has been temporarily reserved for the next 5 minutes.",
        "res-enterinfo": "de Please enter your information to confirm your reservation.",
        "name": "de Name",
        "email": "de Email",
        "phonenumber": "de Phone number",
        "address": "de Address",
        "specialrequests": "de Requests for hotel staff",
        "cancel": "de Cancel",
        "create-reservation": "de Create reservation"
      }
    }
  },
  fallbackLng: "en"
});

export default i18n;