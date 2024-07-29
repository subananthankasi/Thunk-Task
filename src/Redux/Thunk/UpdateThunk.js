import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Environment/Environment";
import axios from "axios";

const API_URL = baseUrl

export const UpdateThunk = createAsyncThunk('UpdateThunk/data',
    async ({id:currentUserId,userName,password,gender,developer,languages}) => {
        const response = await axios ({
            method:'PUT',
            url:API_URL +'/'+ currentUserId,
            data:{
                userName,password,gender,developer,languages
            }
        })
        return response.data
    }
)