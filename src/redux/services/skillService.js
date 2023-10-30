import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from '../../constants';
import Cookies from "js-cookie"; 

export const skillService = createApi({
    reducerPath: "skills",
    baseQuery:  fetchBaseQuery({ baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
        headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
        return headers;
    },
    }),
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: (page) => `skills?page=${page}`,
            transformResponse: (res) => res,
        }),
        getSkill: builder.mutation({
            query: (id) => ({
              url: `skills/${id}`,
              method: "GET",
            }),
          }),
        addSkill: builder.mutation({
            query: (body) => ({
                url: "skills",
                method: "POST",
                body,
            })
        }),
        updateSkill: builder.mutation({
            query: ({id, body}) => ({
                url: `skills/${id}`,
                method: "PUT",
                body,
            }),
        }),
        deleteSkill: builder.mutation({
            query: (id) => ({
                url: `skills/${id}`,
                method: "DELETE",
            })
        })
    }),
});

export const {
    useGetSkillsQuery,
    useGetSkillMutation,
    useAddSkillMutation,
    useUpdateSkillMutation,
    useDeleteSkillMutation,
} = skillService;

export default skillService.reducer;