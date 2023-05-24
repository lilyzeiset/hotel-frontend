import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  useNavigate, 
  useSearchParams,
  createSearchParams
} from "react-router-dom";

import { 
  Stack, 
  Card, 
  Button, 
  Typography,
  Pagination
} from "@mui/material";

import { 
  // useFindAllRoomsQuery, 
  useFindAvailableRoomsQuery, 
  useFindAvailableRoomsTotalQuery 
} from "../api/roomApi";

export default function SearchResults() {

  const navigate = useNavigate();

  const {t} = useTranslation();

  const [page, setPage] = useState(1);

  const numResultsPerPage = 3; //ideally let user decide, but this is fine for now
  const [searchParams] = useSearchParams();
  const mySearchParams = {
    numGuests: Number(searchParams.get('numGuests')),
    checkinDate: searchParams.get('checkinDate') as string,
    checkoutDate: searchParams.get('checkoutDate') as string,
    minPrice: Number(searchParams.get('minPrice')),
    maxPrice: Number(searchParams.get('maxPrice')),
    numResultsPerPage: numResultsPerPage, 
    pageNumber: page-1 //0-indexed
  };

  const {
    data: rooms,
    refetch: _refetchRooms
  } = useFindAvailableRoomsQuery(mySearchParams);

  const {
    data: totalResults,
    refetch: _refetchTotal
  } = useFindAvailableRoomsTotalQuery(mySearchParams);

  /**
   * sends user to makeReservation to book the selected room
   */
  function handleBookRoom(roomId: number) {
    const params = {
      numGuests: String(mySearchParams.numGuests),
      checkinDate: mySearchParams.checkinDate,
      checkoutDate: mySearchParams.checkoutDate,
      roomId: String(roomId)
    }
    navigate({pathname: '/makeReservation', search: `?${createSearchParams(params)}`});
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
            <Button variant='contained' onClick={() => handleBookRoom(room.id ?? -1)}>
              {t('bookroom')}
            </Button>
            </Stack>

          </Stack>
        </Card>
      ))}
      
      <Pagination 
        count={Math.ceil((totalResults ?? 0) / numResultsPerPage)} 
        siblingCount={2} 
        boundaryCount={1}  
        page={page} 
        onChange={handleChangePage}
      />

    </Stack>
  )
}