import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const songApi = createApi({
    reducerPath:'songApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://shazam-api7.p.rapidapi.com', 
        prepareHeaders:(header)=> {
            header.set('x-rapidapi-key', process.env.EXPO_PUBLIC_API_TOKEN as string);
            header.set('x-rapidapi-host','shazam-api7.p.rapidapi.com');
            return header
        }
    }),
    endpoints:(builder)=>({
        getWorldTopSongs: builder.query({
            query:()=> `/charts/get-top-songs-in-world?limit=10`
        })
    })
})

export const {useGetWorldTopSongsQuery} = songApi