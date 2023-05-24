import { 
  Stack
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';

import { useFindAllReservationsQuery } from "../api/reservationApi";
import Reservation from "./Reservation";

/**
 * Search page
 */
export default function MyReservations() {

  const location = useLocation();

  const {
    data: reservations,
    refetch: refetchReservations
  } = useFindAllReservationsQuery();

  useEffect(() => {
    refetchReservations()
  }, [location.state?.refetch])

  return (
    <Stack spacing={2} sx={{minWidth: 480}}>
      {reservations?.map((res) => (
        <Reservation key={res?.id} reservation={res} />
      ))}
    </Stack>
  )
}