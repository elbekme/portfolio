import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import request from '../../server';
const initialState = {
    skills: [],
    selected: null,
    isModalOpen: false,
    error: null,
    total: 0,
    loading: false,
    btnLoading: false,
};

export const getSkills = createAsyncThunk('skill/getskills', async (_, {rejectWithValue} ) => {
    try{
        const { data } = await request.get('skills');
        return data;
    }catch(err){
        return rejectWithValue(err);
    }
});

export const getSkill = createAsyncThunk('skill/getskill', async (action, {rejectWithValue} ) => {
    try{
        const { data } = await request.get(`skills/${action}`);
        return data;
    }catch(err){
        return rejectWithValue(err);
    }
});

export const addSkill = createAsyncThunk(
    "skill/addSkill",
    async (action, {rejectWithValue}) => {
        try{
            await request.post("skills", action);
        }catch(err){
            return rejectWithValue(err);
        }
    }
)

export const updateSkill = createAsyncThunk(
    "skill/putSkill",
    async (action, {rejectWithValue}) => {
        try{
            await request.put(`skills/${action.id}`, action.values);
        }catch(err){
            return rejectWithValue(err);
        }
    }
)

export const deleteSkill = createAsyncThunk(
    "skill/deleteSkill",
    async (action, {rejectWithValue}) => {
        try{
            await request.delete(`skills/${action}`);
        }catch(err){
            return rejectWithValue(err);
        }
    }
)

// export const editSkill = createAsyncThunk(
//     "skill/editSkill",
//     async (action, {rejectWithValue}) => {
//         try{
//             await request.put(`skills/${action}`);
//         }catch(err){
//             return rejectWithValue(err);
//         }
//     }
// )


const skillSlice = createSlice({
    name:'skill',
    initialState,
    reducers: {
        showModal (state, {payload}){
            state.isModalOpen = true;
            state.selected = null;
            payload.resetFields();
        },
        controlModal (state){
            state.isModalOpen = !state.isModalOpen;
        },
        // addSkill:{
        //     reducer:(state, { payload }) => {
        //         if(state.selected === null) {
        //             state.skills.push(payload);
        //         }else{
        //             state.skills = state.skills.map(el => {
        //                 if(el.id === state.selected){
        //                     return payload;
        //                 } else{
        //                     return el;
        //                 }
        //             })
        //         }
        //     },
        //     prepare: (data) => {
        //         return {
        //             payload: {
        //                 ...data,
        //                 id: nanoid(),
        //             }
        //         }
        //     }
        // },
        // deleteSkill (state,{payload}){
        //     state.skills = state.skills.filter((el) => el.id !== payload);
        // },
        editSkill (state, { payload }){
            state.isModalOpen = true;
            state.selected = payload;

        }
    },

    // extraReducers: {
    //     [getSkills.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [getSkills.fulfilled]: (state, {payload}) => {
    //         state.skills = payload.data;
    //         state.total = payload.pagination.total;
    //         state.loading = false;
    //     },
    //     [getSkills.rejected]: (state, {payload}) => {
    //         state.error = payload;
    //         state.loading = false;
    //     },
    //     [addSkill.pending]: (state) => {
    //         state.btnLoading = true;
    //     },
    //     [addSkill.fulfilled]: (state) => {
    //         state.btnLoading = false;
    //     },
    //     [addSkill.rejected]: (state) => {
    //         state.btnLoading = false;
    //     },
    //     [deleteSkill.pending]: (state) => {
    //         state.btnLoading = true;
    //     },
    //     [deleteSkill.fulfilled]: (state) => {
    //         state.btnLoading = false;
    //     },
    //     [deleteSkill.rejected]: (state) => {
    //         state.btnLoading = false;
    //     },
    // }

    extraReducers: (builder) => {
        builder.addCase(getSkills.pending, (state) => {
            state.loading = true;
        }).addCase(
        getSkills.fulfilled, (state, {payload}) => {
            state.skills = payload.data;
            state.total = payload.pagination.total;
            state.loading = false;
        }).addCase(
        getSkills.rejected, (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        }).addCase(
        addSkill.pending, (state) => {
            state.btnLoading = true;
        }).addCase(
        addSkill.fulfilled, (state) => {
            state.btnLoading = false;
        }).addCase(
        addSkill.rejected, (state) => {
            state.btnLoading = false;
        }).addCase(
        deleteSkill.pending, (state) => {
            state.btnLoading = true;
        }).addCase(
        deleteSkill.fulfilled, (state) => {
            state.btnLoading = false;
        }).addCase(
        deleteSkill.rejected, (state) => {
            state.btnLoading = false;
        })
    },
});


// const skillReducer = createReducer(initialState, (builder) =>{
//     builder.addCase(showModal, (state, {payload}) =>{
//         state.isModalOpen = true;
//         state.selected = null;
//         payload.resetFields();
//     }).
//     addCase(controlModal, (state) => {
//         state.isModalOpen = !state.isModalOpen;
//     }).
//     addCase(addSkill, (state, { payload }) => {
//         if(state.selected === null) {
//             state.skills.push(payload);
//         }else{
//             state.skills = state.skills.map(el => {
//                 if(el.id === state.selected){
//                     return payload;
//                 } else{
//                     return el;
//                 }
//             })
//         }
//     }).
//     addCase(deleteSkill, (state,{payload}) => {
//         state.skills = state.skills.filter((el) => el.id !== payload);
//     }).
//     addCase(editSkill, (state, { payload: {id,form} }) => {
//         state.isModalOpen = true;
//         let skill = state.skills.find((el) => el.id === id);
//         state.selected = id;
//         form.setFieldsValue(skill);
//     })
// });

export const {showModal, controlModal, editSkill} = skillSlice.actions;

export default skillSlice.reducer;