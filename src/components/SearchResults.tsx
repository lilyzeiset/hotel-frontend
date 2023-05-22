import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Stack, Card, Button, Typography } from "@mui/material";

import { useFindAllRoomtypesQuery } from "../api/roomtypeApi";
import { useFindAllRoomsQuery } from "../api/roomApi";

export default function SearchResults() {

  const navigate = useNavigate();

  const {t} = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  const {
    data: _roomtypes,
    refetch: refetchRoomtypes
  } = useFindAllRoomtypesQuery();

  const {
    data: rooms,
    refetch: refetchRooms
  } = useFindAllRoomsQuery();

  // const rooms = [
  //   {id: 0, roomTypeId: 1, roomNumber: '101', nightlyRate: 100},
  //   {id: 1, roomTypeId: 1, roomNumber: '102', nightlyRate: 100},
  //   {id: 2, roomTypeId: 2, roomNumber: '201', nightlyRate: 150},
  //   {id: 3, roomTypeId: 2, roomNumber: '202', nightlyRate: 150},
  //   {id: 4, roomTypeId: 3, roomNumber: '301', nightlyRate: 200},
  //   {id: 5, roomTypeId: 4, roomNumber: '401', nightlyRate: 300}
  // ]

  /**
   * Display nothing until data is loaded
   */
  useEffect(() => {
    setIsLoading(true);
    refetchRoomtypes().then(() => {
      refetchRooms().then(() => {
        setIsLoading(false);
      })
    })
  }, [])

  function handleBookRoom() {
    navigate({pathname: '/makeReservation'});
  }

  /**
   * Display nothing while data is loading
   */
  if (isLoading) {
    return null;
  }

  return (
    <Stack spacing={2} sx={{minWidth: 480}}>
      {rooms?.map((room) => (
        <Card key={room.id} raised={true}>
          <Stack spacing={2} padding={2} direction={'row'} sx={{justifyContent: "space-between"}}>
            <Stack spacing={2}>
              <Typography sx={{fontWeight: 'bold'}}>
                {room?.roomType?.name}
              </Typography>
              <Typography>
                {t('room')} {room?.roomNumber}
              </Typography>
              <Typography>
                ${room?.nightlyRate}/{t('night')} 
              </Typography>
            </Stack>

            <Stack spacing={2}>
            <Button variant='contained' onClick={handleBookRoom}>
              {t('bookroom')}
            </Button>
            </Stack>

                       
          </Stack>
        </Card>
      ))}
    </Stack>
  )
}