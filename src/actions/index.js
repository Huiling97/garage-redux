// TODO: add and export your own actions
export const FETCH_CARS = "FETCH_CARS"
export const CAR_CREATED = "CAR_CREATED"
export const FETCH_CAR = "FETCH_CAR"
export const CAR_DELETED = "CAR_DELETED"

const base_url = "https://wagon-garage-api.herokuapp.com"

export function fetchCars(garage) {
  const promise = fetch(`${base_url}/${garage}/cars`)
    .then(res => res.json())

  return {
    type: FETCH_CARS,
    payload: promise
  }
}

export function createCar(garage, body, callback) {
  const promise = fetch(`${base_url}/${garage}/cars`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(callback)

  return {
    type: CAR_CREATED,
    payload: promise
  }
}

export function fetchCar(id) {
  const promise = fetch(`${base_url}/cars/${id}`)
    .then(res => res.json())

    return {
      type: FETCH_CAR,
      payload: promise
    }
}

export function deleteCar(id, callback) {
  const promise = fetch(`${base_url}/cars/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(callback)

  return {
    type: CAR_DELETED,
    payload: promise
  }
}
