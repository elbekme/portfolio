import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from '../../constants';
import Cookies from "js-cookie"; 

export const messageService = createApi({
    reducerPath: "messages",
    baseQuery:  fetchBaseQuery({ baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
        headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
        return headers;
    },
    }),
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (page) => `messages?page=${page}`,
            transformResponse: (res) => res,
        }),
        getMessage: builder.mutation({
            query: (id) => ({
              url: `messages/${id}`,
              method: "GET",
            }),
          }),
        addMessage: builder.mutation({
            query: (body) => ({
                url: "messages",
                method: "POST",
                body,
            })
        }),
        updateMessage: builder.mutation({
            query: ({id, body}) => ({
                url: `messages/${id}`,
                method: "PUT",
                body,
            }),
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `messages/${id}`,
                method: "DELETE",
            })
        })
    }),
});


export const {
    useGetMessagesQuery,
    useGetMessageMutation,
    useAddMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
} = messageService;

export default messageService.reducer;