import { apiSlice } from "./apiSlice";

const ROOM_URL = '/api/accommodation';

export const roomApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllAvailableRooms: builder.query({
            query: () => ({
                url: `${ROOM_URL}/available`,
            }),
        }),
        
        getRoomById: builder.query({
            query: (id) => ({
                url: `${ROOM_URL}/${id}`,
            }),
        }),

        createBooking: builder.mutation({
            query: (body) => ({
                url: `${ROOM_URL}/book/room`,
                method: 'PUT',
                body,
            }),
        }),

        getMyBookings: builder.query({
            query: (id) => ({
                url: `${ROOM_URL}/myBookings/${id}`,
            }),
        }),
    })
    
})

export const { 
    useGetAllAvailableRoomsQuery,
    useGetRoomByIdQuery,
    useCreateBookingMutation,
    useGetMyBookingsQuery,
 } = roomApiSlice;