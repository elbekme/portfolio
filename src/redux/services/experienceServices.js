import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from '../../constants';
import Cookies from "js-cookie"; 

export const experienceService = createApi({
    reducerPath: "experiences",
    baseQuery:  fetchBaseQuery({ baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
        headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
        return headers;
    },
    }),
    endpoints: (builder) => ({
        getExperiences: builder.query({
            query: (page) => `experiences?page=${page}`,
            transformResponse: (res) => res,
        }),
        getEducation: builder.mutation({
            query: (id) => ({
              url: `experiences/${id}`,
              method: "GET",
            }),
          }),
        addEducation: builder.mutation({
            query: (body) => ({
                url: "experiences",
                method: "POST",
                body,
            })
        }),
        updateEducation: builder.mutation({
            query: ({id, body}) => ({
                url: `experiences/${id}`,
                method: "PUT",
                body,
            }),
        }),
        deleteEducation: builder.mutation({
            query: (id) => ({
                url: `experiences/${id}`,
                method: "DELETE",
            })
        })
    }),
});


export const {
    useGetExperiencesQuery,
    useGetEducationMutation,
    useAddEducationMutation,
    useUpdateEducationMutation,
    useDeleteEducationMutation,
} = experienceService;

export default experienceService.reducer;