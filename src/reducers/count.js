import {
  INCREMENT,
  DECREMENT,
  RESET
} from '@/actions/count'

const initState = {
  count: 0
}

export default (state = initState, { type }) => {
  switch (type) {
    case INCREMENT:
      return {
        count: state.count + 1
      }
    case DECREMENT:
      return {
        count: state.count - 1
      }
    case RESET:
      return {
        count: 0
      }
    default:
      return state
  }
}
