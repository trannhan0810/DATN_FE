import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRoles } from 'api/user'
import { getJobsConfig, getPriorityConfig, getStatusConfig, getReasonConfig } from 'api/lead'

export const getUserRoles = createAsyncThunk('roles', async (_, { rejectWithValue }) => {
  try {
    const response = await getRoles()
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getJobs = createAsyncThunk('configs/jobs', async (_, { rejectWithValue }) => {
  try {
    const response = await getJobsConfig()
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getPriority = createAsyncThunk('configs/priority', async (_, { rejectWithValue }) => {
  try {
    const response = await getPriorityConfig()
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getStatusLead = createAsyncThunk('configs/status', async (_, { rejectWithValue }) => {
  try {
    const response = await getStatusConfig()
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getReason = createAsyncThunk('configs/reason', async (_, { rejectWithValue }) => {
  try {
    const response = await getReasonConfig()
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

const configSlice = createSlice({
  name: 'config',
  initialState: {
    isLoadingRoles: false,
    roles: [],
    isLoadingJobs: false,
    jobs: [],
    isLoadingPriority: false,
    priority: [],
    isLoadingStatus: false,
    statusLead: [],
    isLoadingReason: false,
    reasons: [],
  },
  reducers: {},
  extraReducers: {
    // Roles
    [getUserRoles.pending]: state => {
      state.isLoadingRoles = true
    },
    [getUserRoles.fulfilled]: (state, { payload }) => {
      state.isLoadingRoles = false
      state.roles = payload
    },
    [getUserRoles.rejected]: state => {
      state.isLoadingRoles = false
    },
    // Jobs
    [getJobs.pending]: state => {
      state.isLoadingJobs = true
    },
    [getJobs.fulfilled]: (state, { payload }) => {
      state.isLoadingJobs = false
      state.jobs = payload
    },
    [getJobs.rejected]: state => {
      state.isLoadingJobs = false
    },
    // Priority
    [getPriority.pending]: state => {
      state.isLoadingPriority = true
    },
    [getPriority.fulfilled]: (state, { payload }) => {
      state.isLoadingPriority = false
      state.priority = payload
    },
    [getPriority.rejected]: state => {
      state.isLoadingPriority = false
    },
    // Status Lead
    [getStatusLead.pending]: state => {
      state.isLoadingStatus = true
    },
    [getStatusLead.fulfilled]: (state, { payload }) => {
      state.isLoadingStatus = false
      state.statusLead = payload
    },
    [getStatusLead.rejected]: state => {
      state.isLoadingStatus = false
    },
    // Reason
    [getReason.pending]: state => {
      state.isLoadingReason = true
    },
    [getReason.fulfilled]: (state, { payload }) => {
      state.isLoadingReason = false
      state.reasons = payload
    },
    [getReason.rejected]: state => {
      state.isLoadingReason = false
    },
  },
})

export default configSlice.reducer
