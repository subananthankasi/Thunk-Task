import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Environment/Environment";
import axios from "axios";

const API_URL= baseUrl
export const CreateThunk = createAsyncThunk('CreateThunk/data',
    async({userName,password,gender,languages,developer}) => {
        const response = await axios ({
            method:'Post',
            url:API_URL,
            data:{userName,password,gender,languages,developer}
            
        })
        return response.data
    }
)