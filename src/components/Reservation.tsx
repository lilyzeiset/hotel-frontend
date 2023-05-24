import { useState } from 'react';
import { 
  Typography,
  Stack,
  Card,
  TextField,
  Button
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

import { ReservationType, useDeleteReservationMutation, useUpdateReservationMutation } from "../api/reservationApi";

export type ReservationProps = {
  reservation: ReservationType
}

export default function Reservation(props: ReservationProps) {

  const res = props.reservation;
  
  const [isEdit, setIsEdit] = useState(false);

  const [inputNumGuests, setInputNumGuests] = useState(res?.numberOfGuests);
  const [inputSpecialRequests, setInputSpecialRequests] = useState(res?.specialRequests);

  const [deleteReservation] = useDeleteReservationMutation();
  const [updateReservation] = useUpdateReservationMutation();

  const navigate = useNavigate();
  const {t} = useTranslation();

  function handleSubmitEdit() {
    updateReservation({
      ...res,
      numberOfGuests: inputNumGuests,
      specialRequests: inputSpecialRequests
    })
    .unwrap()
    .then(() => {
      setIsEdit(false);
      navigate('/myReservations', {state: {refetch: new Date()}})
    })
  }

  function handelCancelEdit() {
    setInputNumGuests(res.numberOfGuests ?? '');
    setInputSpecialRequests(res.specialRequests ?? '');
    setIsEdit(false);
  }

  function handleDelete() {
    deleteReservation(res?.id ?? -1)
    .unwrap()
    .then(() => {
      setIsEdit(false);
      navigate('/myReservations', {state: {refetch: new Date()}})
    })
  }

  if (isEdit) {
    return (
      <Card raised={true}>
        <Stack spacing={2} padding={2} direction={'row'} sx={{justifyContent: 'space-between'}}>
        
          <Stack spacing={2} padding={2}>
            <Typography>
              {res?.checkInDate.toString()}
            </Typography>
            <Typography>
              {res?.checkOutDate.toString()}
            </Typography>
              <TextField 
                type='number'
                variant='standard' 
                value={inputNumGuests} 
                onChange={e => setInputNumGuests(Number(e.target.value))} 
              />
            <TextField 
                variant='standard' 
                value={inputSpecialRequests} 
                onChange={e => setInputSpecialRequests(e.target.value)} 
              />
          </Stack>

          <Stack spacing={2}>
            <Button onClick={handleSubmitEdit}>
              {t('submit')}
            </Button>
            <Button onClick={handelCancelEdit}>
              {t('cancel')}
            </Button>
            <Button onClick={handleDelete}>
              {t('delete')}
            </Button>
          </Stack>

        </Stack>
      </Card>
    )
  } else {
    return (
      <Card raised={true}>
        <Stack spacing={2} padding={2} direction={'row'} sx={{justifyContent: 'space-between'}}>

          <Stack spacing={2}>
            <Typography>
              {res?.checkInDate.toString()}
            </Typography>
            <Typography>
              {res?.checkOutDate.toString()}
            </Typography>
            <Typography>
              {res?.numberOfGuests} {t('guests')}
            </Typography>
            <Typography>
              {res?.specialRequests}
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Button onClick={() => setIsEdit(true)}>
              {t('edit')}
            </Button>
          </Stack>

        </Stack>
      </Card>
    )
  }
}