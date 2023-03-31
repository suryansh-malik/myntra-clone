import { configureStore, createSlice } from "@reduxjs/toolkit";

  // ======================//
  // response message data
  // ======================//


const responsemessage = createSlice({
  name: "resmessage",
  initialState: {
    message: "login successfully",
    showmessage: false
  },
  reducers: {
    setmessage(state, action) {
      state.message = action.payload
    },
    setshowmessage(state, action) {
      state.showmessage= action.payload
    }


  }
  
})


  // ======================//
  // products gender data
  // ======================//

const displayproducttype = createSlice({
  name: "productgender",
  initialState: {
    gender:""
  },
  reducers: {
    setgender(state,action) {
      state.gender = action.payload
    }
  }
})
  // ======================//
  // login user data
  // ======================//
const userslice = createSlice({
  name: "user",
  initialState: {
    user: "",
  },
  reducers: {
    setuser(state, action) {
      state.user = action.payload;
    },
  },
});

  // ======================//
  // authentication state
  // ======================//

const authenticationslice = createSlice({
  name: "authetication",
  initialState: {
    authenticate: false,
  },
  reducers: {
    setauthenticate(state, action) {
      state.authenticate = action.payload;
    },
  },
});

  // ======================//
  // main products display
  // ======================//
const mainproductslice = createSlice({
  name: "mainproduct",
  initialState: {
    products: [],
  },

  reducers: {
    setproduct(state, action) {
      state.products = action.payload;
    },
  },
});

  // ======================//
  // bag product
  // ======================//

const initialbagproducts = {
  products: [],
};
console.log(initialbagproducts.products);
const bagproductslice = createSlice({
  name: "bagproduct",
  initialState: initialbagproducts,
  reducers: {
    addbagproduct(state, action) {
      state.products = [...state.products,action.payload]
    },
    removeproduct(state, action) {
      state.products = state.products.filter(
        (product) => product.productid !== action.payload
      );
    },
    setbagproduct(state, action) {
      state.products = action.payload;
    },
    quantitychange(state, action) {
      const data = state.products.map((product) =>
      {

        if (product.productid === action.payload.productid) {
          return  {...product,quantity:action.payload.quantity}
        } else {
          return product
        }
      }
        
      )
      state.products = data
    },
  },
});


  // ======================//
  // navbar  menu hover state (we can use it on its own component but i want to  try  that on store that's why i use this)
  // ======================//

const hoverslice = createSlice({
  name: "hover",
  initialState: {
    input: false,
    hover: false,
    content: "",
  },
  reducers: {
    sethoverfalse(state, action) {
      state.hover = action.payload;
    },
    sethovertrue(state, action) {
      state.hover = action.payload;
    },
    mencontent(state) {
      state.content = "men";
    },
    womencontent(state) {
      state.content = "women";
    },
    kidscontent(state) {
      state.content = "kids";
    },
    homelivingcontent(state) {
      state.content = "home";
    },
    studiocontent(state) {
      state.content = "studio";
    },
    beautycontent(state) {
      state.content = "beauty";
    },
  },
});

  // ======================//
  // wishlist products
  // ======================//
const wishlistslice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist:[]
  },
  reducers: {
    setwishlist(state, action) {
      state.wishlist = action.payload
    },
    removewishlist(state, action) {
      state.wishlist = state.wishlist.filter((product)=>product.productid!==action.payload)
    },
    addtowishlist(state, action) {
      state.wishlist = [...state.wishlist,action.payload]
    }
  }
})

  // ======================//
  // store configuration
  // ======================//

const store = configureStore({
  reducer: {
    hover: hoverslice.reducer,
    bagproduct: bagproductslice.reducer,
    // prices: bagprices.reducer,
    mainproduct: mainproductslice.reducer,
    authenticate: authenticationslice.reducer,
    user: userslice.reducer,
    wishlist: wishlistslice.reducer,
    productgender: displayproducttype.reducer,
    resmessage:responsemessage.reducer
  },
});

  // ======================//
  // exporting store data
  // ======================//
export default store;
export const hoverstate = hoverslice.actions;
export const bagproduct = bagproductslice.actions;
export const mainproduct = mainproductslice.actions;
export const authenticate = authenticationslice.actions;
export const user = userslice.actions;
export const wishlist = wishlistslice.actions;
export const gender = displayproducttype.actions;
export const resmessage = responsemessage.actions;
