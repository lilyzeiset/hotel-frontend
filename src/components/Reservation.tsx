import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { 
  Typography,
  Stack,
  Card,
  TextField,
  Button
} from "@mui/material";

import { 
  ReservationType, 
  useDeleteReservationMutation, 
  useUpdateReservationMutation 
} from "../api/reservationApi";
import { useFindRoomByIdQuery } from '../api/roomApi';

/**
 * type for passing in reservation as prop
 */
export type ReservationProps = {
  reservation: ReservationType
}

export default function Reservation(props: ReservationProps) {

  /**
   * Utilities
   */
  const navigate = useNavigate();
  const {t} = useTranslation();

  /**
   * Get reservation from props
   */
  const res = props.reservation;
  
  /**
   * States
   */
  const [isEdit, setIsEdit] = useState(false);
  const [inputNumGuests, setInputNumGuests] = useState(res?.numberOfGuests);
  const [inputSpecialRequests, setInputSpecialRequests] = useState(res?.specialRequests);

  /**
   * API Call
   */
  const [deleteReservation] = useDeleteReservationMutation();
  const [updateReservation] = useUpdateReservationMutation();
  const {
    data: room,
    refetch: _refetchRoom
  } = useFindRoomByIdQuery(res.roomId);

  /**
   * Handles submitting an edit to the reservation
   */
  function handleSubmitEdit() {
    setIsEdit(false);
    updateReservation({
      ...res,
      numberOfGuests: inputNumGuests,
      specialRequests: inputSpecialRequests
    })
    .unwrap()
    .then(() => {
      navigate('/myReservations', {state: {refetch: new Date()}})
    })
  }

  /**
   * Handles cancelling an edit
   */
  function handelCancelEdit() {
    setInputNumGuests(res.numberOfGuests ?? '');
    setInputSpecialRequests(res.specialRequests ?? '');
    setIsEdit(false);
  }

  /**
   * Handles deleting a reservation
   */
  function handleDelete() {
    setIsEdit(false);
    deleteReservation(res?.id ?? -1)
    .unwrap()
    .then(() => {
      navigate('/myReservations', {state: {refetch: new Date()}})
    })
  }

  return (
    <Card raised={true}>
      <Stack spacing={2} padding={2} direction={'row'} sx={{justifyContent: 'space-between'}}>
      
        <Stack spacing={2}>
          <Typography variant='h6' sx={{fontWeight: 'bold'}}>
            {t('room')} {room?.roomNumber}
          </Typography>
          <Typography sx={{fontWeight: 'bold'}}>
            {room?.roomType.description}
          </Typography>
          <Typography>
            {t('checkinday')}: &nbsp;
            {new Date(res?.checkInDate.toString()).toDateString()}
          </Typography>
          <Typography>
            {t('checkoutday')}: &nbsp;
            {new Date(res?.checkOutDate.toString()).toDateString()}
          </Typography>
          
          {isEdit ? (
            <>
              <Typography>
                {t('guests')}: &nbsp;
                <TextField 
                  type='number'
                  variant='standard' 
                  value={inputNumGuests} 
                  onChange={e => setInputNumGuests(Number(e.target.value))} 
                />
              </Typography>
              <Typography>
                {t('requests')}: &nbsp;
                <TextField 
                  variant='standard' 
                  value={inputSpecialRequests} 
                  onChange={e => setInputSpecialRequests(e.target.value)} 
                />
              </Typography>
            </>
          ) : (
            <>
              <Typography>
                {t('guests')}: &nbsp;
                {res?.numberOfGuests} 
              </Typography>
              <Typography>
                {t('requests')}: &nbsp;
                {res?.specialRequests}
              </Typography>
            </>
          )}
        </Stack>

        <Stack spacing={2}>
          {isEdit ? (
            <>
              <Button 
                variant='contained'
                onClick={handleSubmitEdit}
              >
                {t('submit')}
              </Button>
              <Button 
                variant='outlined'
                onClick={handelCancelEdit}
              >
                {t('cancel')}
              </Button>
              <Button 
                color='error'
                variant='contained'
                onClick={handleDelete}
              >
                {t('delete')}
              </Button>
            </>
          ) : (
            <>
              <Button variant='contained' onClick={() => setIsEdit(true)}>
                {t('edit')}
              </Button>
            </>
          )}
        </Stack>

      </Stack>
    </Card>
  )
}