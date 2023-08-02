import { apiSlice } from "./apiSlice";

const PET_URL = '/api/pet';

export const petApiSlice = apiSlice.injectEndpoints({
endpoints: (builder) => ({
    createPet: builder.mutation({
            query: (pet) => ({
                url: `${PET_URL}`,
                method: 'POST',
                body: pet,
            }),
        }),
    getAllPet: builder.query({
            query: () => ({
                url: `${PET_URL}`,
                method: 'GET',
            }),
        }),
    
    getPetById: builder.query({
            query: (id) => ({
                url: `${PET_URL}/${id}`,
                method: 'GET',
            }),
        }),
    })
});
export const { 
    useCreatePetMutation,
    useGetAllPetQuery,
    useGetPetByIdQuery,
    
 } = petApiSlice;
export default petApiSlice ;