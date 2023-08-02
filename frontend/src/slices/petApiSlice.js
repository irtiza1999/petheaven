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
    getAllPets: builder.query({
            query: () => ({
                url: `${PET_URL}/admin/all`,
                method: 'GET',
            }),
        }),

    markAsVerified: builder.mutation({
            query: (id) => ({
                url: `${PET_URL}/admin/verify/${id}`,
                method: 'PUT',
            }),
        }),
    
    markAsAdopted: builder.mutation({
            query: (id) => ({
                url: `${PET_URL}/admin/adopt/${id}`,
                method: 'PUT',
            }),
        }),
        })
});
export const { 
    useCreatePetMutation,
    useGetAllPetQuery,
    useGetPetByIdQuery,
    useGetAllPetsQuery,
    useMarkAsVerifiedMutation,
    useMarkAsAdoptedMutation,
 } = petApiSlice;
export default petApiSlice ;