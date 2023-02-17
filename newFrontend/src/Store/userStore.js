import axios from "axios";

import create from 'zustand';

import { persist } from 'zustand/middleware'


const URL = "http://localhost:5000/auth";


const currentUser = JSON.parse(localStorage.getItem('user'))


const useUserStore =  create(
    persist((set, get) => ({

        user: currentUser ? currentUser : null,
        

        // registerUser: async () => {
        //     const state = get();
        //     const response = await axios.post(URL, userData);
        //     set({ loading: false, user: localStorage.setItem('user', JSON.stringify(response.data))})
        // }

    }))
)

export default useUserStore;