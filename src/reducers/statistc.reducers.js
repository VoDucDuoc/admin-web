import { statisticConstants } from "../actions/constants";

const initState = {
  revenue: 0,
  totalOrder: 0,
  totalProduct: 0,
  top5: null,
  total7day: null,
  totalPerMonth: null,
  isGettingStatistic: false,
};

const statisticReducer = (state = initState, action) => {
  switch (action.type) {
    case statisticConstants.GET_STATISTIC_REQUEST:
      state = {
        ...state,
        isGettingStatistic: true,
      };
      break;
    case statisticConstants.GET_STATISTIC_SUCCESS:
      state = {
        ...state,
        revenue: action.payload.statistic.revenue,
        totalOrder: action.payload.statistic.totalOrder,
        totalProduct: action.payload.statistic.totalProduct,
        top5: action.payload.statistic.top5,
        total7day: action.payload.statistic.total7day,
        totalPerMonth: action.payload.statistic.totalPerMonth,
        isGettingStatistic: false,
      };
      break;
    case statisticConstants.GET_STATISTIC_FAILURE:
      state = {
        ...state,
        isGettingStatistic: false,
      };
      break;
    case statisticConstants.GET_getTotalOrderPricePerMonthByYear_SUCCESS:
      state = {
        ...state,
        totalPerMonth: action.payload.statistic.totalPerMonth,
      };
      break;
    default:
      break;
  }
  return state;
};
export default statisticReducer;
