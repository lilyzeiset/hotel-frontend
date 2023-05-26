
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { 
  Stack, 
  Typography
} from "@mui/material";

import UserIdContext from "../contexts/UserContext";
import { useFindReservationsByGuestIdQuery } from "../api/reservationApi";
import Reservation from "./Reservation";

/**
 * My reservations page
 */
export default function MyReservations() {

  /**
   * Context and utils
   */
  const {t} = useTranslation();
  const location = useLocation();
  const [user] = useContext(UserIdContext);

  /**
   * API Call
   */
  const {
    data: reservations,
    refetch: refetchReservations
  } = useFindReservationsByGuestIdQuery(user?.id);

  /**
   * Refetch data when its updated
   * sent from Reservation components
   */
  useEffect(() => {
    refetchReservations()
  }, [location.state?.refetch])

  /**
   * Must be logged in to view reservations
   * Tell user to log in if they're not
   */
  if (!user) {
    return (
      <Typography variant="h5">
        {t('login-required')}
      </Typography>
    )
  }

  /**
   * Display a message if user has no reservations
   */
  if ((reservations?.length ?? 0) < 1) {
    return (
      <Typography variant="h5">
      {t('no-res-found')}
      </Typography>
    )
  }

  return (
    <Stack spacing={2} sx={{maxWidth: 480}}>
      {reservations?.map((res) => (
        <Reservation key={res?.id} reservation={res} />
      ))}
    </Stack>
  )
}