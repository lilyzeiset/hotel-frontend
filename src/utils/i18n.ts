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
        "search-minprice": "Minimum nightly rate",
        "search-maxprice": "Maximum nightly rate",
        "search-button": "Search",
        "search-error-numguests": "You must have at least one guest.",
        "search-error-roomtype": "Please select a room type.",
        "search-error-dates": "Check-out date must be at least 1 day after check-in date!",
        "search-error-price": "Maximum nightly rate must be greater than minimum nightly rate.",
        "res-tempreserved": "Your room has been temporarily reserved for the next 5 minutes.",
        "res-enterinfo": "Please enter your information to confirm your reservation.",
        "name": "Name",
        "email": "Email",
        "phonenumber": "Phone number",
        "address": "Address",
        "specialrequests": "Requests for hotel staff",
        "cancel": "Cancel",
        "create-reservation": "Create reservation",
        "room": "Room",
        "floor": "Floor",
        "night": "night",
        "bookroom": "Book room",
        "checkinday": "Check-in day",
        "checkoutday": "Check-out day",
        "edit": "Edit",
        "submit": "Submit",
        "delete": "Delete",
        "guests": "Guests",
        "password": "Password",
        "login": "Log in",
        "register": "Register",
        "login-error": "Unable to log in. Do you have the right email and password?",
        "logged-in-as": "Logged in as"
      }
    },
    de: {
      translation: {
        "page-title": "Hotelreservierungsportal",
        "get-started": "Klicken Sie auf „Suchen“, um loszulegen!",
        "sidebar-home": "Heim",
        "sidebar-search": "Suche nach Räumen",
        "sidebar-reservations": "Meine Reservierungen",
        "search-numberofguests": "Anzahl der Gäste",
        "search-roomtype": "Zimmertyp",
        "search-checkindate": "Check-in Datum",
        "search-checkoutdate": "Überprüfe das Datum",
        "search-minprice": "Mindestpreis pro Nacht",
        "search-maxprice": "Maximaler Übernachtungspreis",
        "search-button": "Suchen",
        "search-error-numguests": "Sie müssen mindestens einen Gast haben.",
        "search-error-roomtype": "Bitte wählen Sie einen Zimmertyp aus.",
        "search-error-dates": "Das Check-out-Datum muss mindestens 1 Tag nach dem Check-in-Datum liegen!",
        "search-error-price": "Der maximale Übernachtungspreis muss höher sein als der Mindestnachtpreis.",
        "res-tempreserved": "Ihr Zimmer ist für die nächsten 5 Minuten vorübergehend reserviert.",
        "res-enterinfo": "Bitte geben Sie Ihre Daten ein, um Ihre Reservierung zu bestätigen.",
        "name": "Name",
        "email": "Email",
        "phonenumber": "Telefonnummer",
        "address": "Adresse",
        "specialrequests": "Anfragen für Hotelpersonal",
        "cancel": "Stornieren",
        "create-reservation": "Reservierung erstellen",
        "room": "Zimmer",
        "floor": "Boden",
        "night": "Nacht",
        "bookroom": "Ein Zimmer buchen",
        "checkinday": "Check-in-Tag",
        "checkoutday": "Check-out-Tag",
        "edit": "Bearbeiten",
        "submit": "Einreichen",
        "delete": "Löschen",
        "guests": "Gäste",
        "password": "Passwort",
        "login": "Anmeldung",
        "register": "Registrieren",
        "login-error": "Anmeldung nicht möglich. Haben Sie die richtige E-Mail-Adresse und das richtige Passwort?",
        "logged-in-as": "Angemeldet als"
      }
    }
  },
  fallbackLng: "en"
});

export default i18n;