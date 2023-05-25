import { 
  Stack, Typography
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from 'react';

import { useFindReservationsByGuestIdQuery } from "../api/reservationApi";
import Reservation from "./Reservation";
import UserIdContext from "../contexts/UserContext";
import { useTranslation } from "react-i18next";

/**
 * Search page
 */
export default function MyReservations() {

  const {t} = useTranslation();
  const location = useLocation();
  
  const [user] = useContext(UserIdContext);

  const {
    data: reservations,
    refetch: refetchReservations
  } = useFindReservationsByGuestIdQuery(user?.id);

  useEffect(() => {
    refetchReservations()
  }, [location.state?.refetch])

  if (!user) {
    return (
      <Typography variant="h5">
        {t('login-required')}
      </Typography>
    )
  }

  if ((reservations?.length ?? 0) < 1) {
    return (
      <Typography variant="h5">
      {t('no-res-found')}
      </Typography>
    )
  }

  return (
    <Stack spacing={2} sx={{minWidth: 480}}>
      {reservations?.map((res) => (
        <Reservation key={res?.id} reservation={res} />
      ))}
    </Stack>
  )
}