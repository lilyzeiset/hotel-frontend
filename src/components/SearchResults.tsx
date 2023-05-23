import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import { 
  Stack, 
  Card, 
  Button, 
  Typography,
  Pagination
} from "@mui/material";

import { 
  // useFindAllRoomsQuery, 
  useFindAvailableRoomsQuery 
} from "../api/roomApi";

export default function SearchResults() {

  const navigate = useNavigate();

  const {t} = useTranslation();

  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const mySearchParams = {
    numGuests: Number(searchParams.get('numGuests')),
    checkinDate: searchParams.get('checkinDate') as string,
    checkoutDate: searchParams.get('checkoutDate') as string,
    minPrice: Number(searchParams.get('minPrice')),
    maxPrice: Number(searchParams.get('maxPrice')),
    numResultsPerPage: 3, //ideally let user decide, but this is fine for now
    pageNumber: page-1 //0-indexed
  };

  const {
    data: rooms,
    refetch: _refetchRooms
  } = useFindAvailableRoomsQuery(mySearchParams);

  /**
   * sends user to makeReservation to book the selected room
   */
  function handleBookRoom() {
    navigate({pathname: '/makeReservation'});
  }

  /**
   * handles pagination
   */
  function handleChangePage(_event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  };

  return (
    <Stack spacing={2} sx={{minWidth: 480}}>
      {rooms?.map((room) => (
        <Card key={room.id} raised={true}>
          <Stack spacing={2} padding={2} direction={'row'} sx={{justifyContent: 'space-between'}}>

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
      
      <Pagination 
        count={100} 
        siblingCount={2} 
        boundaryCount={1}  
        page={page} 
        onChange={handleChangePage}
      />

    </Stack>
  )
}