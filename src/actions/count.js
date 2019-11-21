export const INCREMENT = 'count/INCREMENT'
export const DECREMENT = 'count/DECREMENT'
export const RESET = 'count/RESET'

export function increment() {
  return {
    type: INCREMENT
  }
}

export function decrement() {
  return {
    type: DECREMENT
  }
}

export function reset() {
  return {
    type: RESET
  }
}
