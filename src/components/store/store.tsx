// import {
//   PayloadAction,
//   configureStore,
//   createSlice,
//   createAsyncThunk,
// } from "@reduxjs/toolkit";

// import axios from "axios";

// const Post_URL = "https://jsonplaceholder.typicode.com/users";

// export const fetchapi = createAsyncThunk("posts/fetchPosts", async () => {
//   try {
//     const responseData = await axios.get(Post_URL);
//     return [...responseData.data];
//   } catch (err: any) {
//     return err.message;
//   }
// });

// export const fetchapithunk = createAsyncThunk("getapithunk", async () => {
//   try {
//     const response = await axios.get("https://fakestoreapi.com/products/1");
//     return [response.data];
//   } catch (err: any) {
//     return err.message;
//   }
// });

// export interface Counterstate {
//   Value: number;
//   inncrementByOne: number;
// }

// const initialState: Counterstate = {
//   Value: 0,
//   inncrementByOne: 1,
// };

// export interface apidataState {
//   data: Array<any>;
//   status: string;
// }

// const fakeapiinitialdata: apidataState = {
//   data: [],
//   status: "idle",
// };

// export const apidataSlice = createSlice({
//   name: "fakeapi",
//   initialState: fakeapiinitialdata,
//   reducers: {},
//   extraReducers: (builder: any) => {
//     builder
//       .addCase(fetchapithunk.fulfilled, (state: any, action: any) => {
//         state.data = action.payload;
//       })
//       .addCase(fetchapithunk.pending, (state: any) => {
//         state.status = "pending";
//       })
//       .addCase(fetchapithunk.rejected, (state: any) => {
//         state.status = "rejected";
//       });
//   },
// });

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.Value += state.inncrementByOne;
//     },
//     decrement: (state) => {
//       state.Value -= state.inncrementByOne;
//     },
//     clear: (state) => {
//       state.Value = 0;
//     },
//     changeIncrementbyAction: (state, action: PayloadAction<number>) => {
//       state.Value += action.payload;
//     },
//   },
// });

// ///async thunks

// export const { increment, decrement, changeIncrementbyAction, clear } =
//   counterSlice.actions;

// export const store = configureStore({
//   reducer: {
//     counter: counterSlice.reducer,
//     fetchapi: apidataSlice.reducer,
//   },
// });


import {
  createAsyncThunk,
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state

const initialState = {
  lists: [],
  loading: false,
  error: null,
  selectedLists: [],
  creatingNewList: false,
  newListItems: [],
};

// Define thunk for fetching lists

export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  try {
    const response = await axios.get(
      "https://apis.ccbp.in/list-creation/lists"
    );
    return response.data;
  } catch (error) {
    throw Error("Failed to fetch lists");
  }
});

// Create a slice for managing state

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    selectList: (state, action) => {
      // Logic to handle selecting/deselecting lists
    },
    createNewList: (state) => {
      // Logic to handle creating a new list
    },
    moveListItem: (state, action) => {
      // Logic to handle moving list items between containers
    },
    cancelChanges: (state) => {
      // Logic to handle cancelling changes
    },
    updateChanges: (state) => {
      // Logic to handle updating changes
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Create a store
export const store = configureStore({
  reducer: {
    lists: listsSlice.reducer,
  },
});
