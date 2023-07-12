import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../common/helpers";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cloudpractitioners.com/api",
    // credentials: "include", // don't have to include for all
  }),
  tagTypes: ["User", "Certifications"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => {
        return {
          url: `/user/${username}`,
          method: "GET",
          //   credentials: "include", // no need b/c all users can query a username.
        };
      },
      providesTags: ["User"],
    }),

    // dynamoDB uses UpdateItem, instead of putItem
    patchUser: builder.mutation({
      query: (userInfo) => {
        return {
          url: `/user/${userInfo.username}`,
          method: "PATCH",
          credentials: "include",
          body: { ...userInfo, username: getCookie("current_user") },
        };
      },
      invalidatesTags: (result, error) => (error ? [] : ["User"]),
    }),

    getCertifications: builder.query({
      query: (certificationtype) => {
        return {
          url: `certifications/${certificationtype}`,
          method: "GET",
        };
      },
      providesTags: ["Certifications"],
    }),

    // in AWS Lambda, if 'body' is returned, invalidatesTags does not work..
    // return {
    //     'statusCode': 200,
    //     'body': "OK"}

    addNewCertification: builder.mutation({
      query: (certificationInfo) => {
        return {
          url: "/certifications",
          method: "POST",
          credentials: "include",
          body: { ...certificationInfo, username: getCookie("current_user") },
        };
      },
      // no need to invalidate certificates
      // since we are in /profile, simply have to re-fetch user details
      // invalidatesTags: (success) => (success ? ["User"] : []),
      invalidatesTags: (result, error) => (error ? [] : ["User"]),
      // this needs to have "result" even if not used, because second parameter is "error"
      // invalidatesTags: (_result, _error, applicationId),
      // https://stackoverflow.com/a/70802235/12001706
    }),
    deleteCertification: builder.mutation({
      query: (certificationSK) => {
        return {
          url: "/certifications",
          method: "DELETE",
          credentials: "include",
          body: { sk: certificationSK, pk: getCookie("current_user") },
        };
      },
      invalidatesTags: (result, error) => (error ? [] : ["User"]),
    }),
  }),
});

export const {
  useGetCertificationsQuery,
  useGetUserQuery,
  usePatchUserMutation,
  useAddNewCertificationMutation,
  useDeleteCertificationMutation,
} = apiSlice;
