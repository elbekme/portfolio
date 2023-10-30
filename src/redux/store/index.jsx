import { Provider } from "react-redux"
import { configureStore  } from "@reduxjs/toolkit";
import PropTypes from 'prop-types';

import authReducer from "../slices/authSlice";
import portfolioReducer, {portfolioService} from "../services/portfolioService";
import userReducer, { userService } from "../services/userService";
import educationReducer, {educationService} from "../services/educationService";
import experienceReducer, { experienceService } from "../services/experienceServices";
import skillReducer, {skillService} from "../services/skillService";

const reducer = {
  auth: authReducer,
  [portfolioService.reducerPath]: portfolioReducer,
  [userService.reducerPath]: userReducer,
  [educationService.reducerPath]: educationReducer,
  [experienceService.reducerPath]: experienceReducer,
  [skillService.reducerPath]: skillReducer
}

export const Store = configureStore({reducer, 
  middleware:(getDefaultMiddleware) =>
  getDefaultMiddleware().concat(portfolioService.middleware)
  .concat(userService.middleware).concat(educationService.middleware).concat(experienceService.middleware).concat(skillService.middleware)
});

const StoreProvider = ({children}) => {
  return (
    <Provider store={Store}>{children}</Provider>
  )
};

StoreProvider.propTypes = {
    children: PropTypes.node,
}

export default StoreProvider