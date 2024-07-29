import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Environment/Environment";
import axios from "axios";

const API_URL = baseUrl
export const DeleteThunk = createAsyncThunk('DeleteThunk/data',
    async (id) =>{
        console.log('id',id);
        const response = await axios ({
            method:'Delete',
            url:API_URL+'/'+ id
        })
        return response.data
    }
)