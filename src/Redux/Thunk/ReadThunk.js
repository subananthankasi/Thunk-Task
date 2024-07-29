import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Environment/Environment";
import axios from "axios";

const API_URL = baseUrl

export const ReadThunk = createAsyncThunk('ReadThunk/data',
    async  () => {
        const response = await axios({
            mathod:'GET',
            url:API_URL,
        })
        return response.data
    }
)