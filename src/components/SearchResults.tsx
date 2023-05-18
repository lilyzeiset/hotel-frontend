import { Stack, Card, Button } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";

export default function SearchResults() {

  const navigate = useNavigate();

  const roomTypes = [
    'Standard',
    'Deluxe',
    'Family',
    'Executive',
    'Penthouse'
  ];

  const rooms = [
    {id: 0, roomTypeId: 1, roomNumber: '101', nightlyRate: 100},
    {id: 1, roomTypeId: 1, roomNumber: '102', nightlyRate: 100},
    {id: 2, roomTypeId: 2, roomNumber: '201', nightlyRate: 150},
    {id: 3, roomTypeId: 2, roomNumber: '202', nightlyRate: 150},
    {id: 4, roomTypeId: 3, roomNumber: '301', nightlyRate: 200},
    {id: 5, roomTypeId: 4, roomNumber: '401', nightlyRate: 300}
  ]

  function handleBookRoom() {
    navigate({pathname: '/makeReservation'});
  }

  return (
    <Stack spacing={2} sx={{minWidth: 480}}>
      {rooms?.map((room) => (
        <Card key={room.id}>
          {roomTypes[room.roomTypeId+1]} Room
          <br />
          Floor {room.roomNumber[0]}
          <br />
          ${room.nightlyRate}/night
          <br />
          <Button variant='contained' onClick={handleBookRoom}>
            Book room
          </Button>
        </Card>
      ))}
    </Stack>
  )
}