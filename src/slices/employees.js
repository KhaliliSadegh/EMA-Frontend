import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeDataService from "../services/employee.service";

const initialState = [];

export const createbatchemployee = createAsyncThunk(
  "employee/create_batch",
  async (batch) => {
    const res = await employeeDataService.create( batch );
    return res;
  }
);

export const retrieveemployees = createAsyncThunk(
  "employee/retrieve",
  async () => {
    const res = await employeeDataService.getAll();
    return res.data;
  }
);

export const updateemployee = createAsyncThunk(
  "employees/update",
  async ({ id, data }) => {
    const res = await employeeDataService.update(id, data);
    return res.data;
  }
);
export const addcomment = createAsyncThunk(
  "employees/addcomment",
  async ({ id, data }) => {
    console.log('asdasdasd')
    const res = await employeeDataService.addcomment(id, data);
    return res.data;
  }
);
export const deleteemployee = createAsyncThunk(
  "employees/delete",
  async ({ id }) => {
    await employeeDataService.delete(id);
    return { id };
  }
);

export const deleteAllemployees = createAsyncThunk(
  "employees/deleteAll",
  async () => {
    const res = await employeeDataService.deleteAll();
    return res.data;
  }
);

export const findemployeesByTitle = createAsyncThunk(
  "employees/findByTitle",
  async ({ title }) => {
    const res = await employeeDataService.findByTitle(title);
    return res.data;
  }
);

const employeeslice = createSlice({
  name: "employee",
  initialState,
  extraReducers: {
    [createbatchemployee.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveemployees.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateemployee.fulfilled]: (state, action) => {
      const index = state.findIndex(employee => employee.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteemployee.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllemployees.fulfilled]: (state, action) => {
      return [];
    },
    [findemployeesByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = employeeslice;
export default reducer;