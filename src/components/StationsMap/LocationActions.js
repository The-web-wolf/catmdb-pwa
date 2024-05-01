import { round } from 'lodash'
import { gql } from '@apollo/client'
import Client from '../Client'

const GET_FEES = gql`
  query getFees($place_id: StringFilterInput) {
    fees(filters: { place_id: $place_id }) {
      data {
        id
        attributes {
          place_id
          amount
          currency
          User
          updatedAt
        }
      }
    }
  }
`

const GET_RATINGS = gql`
  query getRatings($place_id: StringFilterInput) {
    ratings(filters: { place_id: $place_id }, pagination: { limit: 10000 }) {
      data {
        attributes {
          place_id
          rating
        }
      }
    }
  }
`

const CREATE_RATING = gql`
  mutation createRating($newRating: RatingInput!) {
    createRating(data: $newRating) {
      data {
        attributes {
          place_id
        }
      }
    }
  }
`

const CREATE_FEE = gql`
  mutation createFee($data: FeeInput!) {
    createFee(data: $data) {
      data {
        attributes {
          place_id
          place_name
          amount
          currency
        }
      }
    }
  }
`

const UPDATE_FEE = gql`
  mutation updateFee($data: FeeInput!, $id: ID!) {
    updateFee(id: $id, data: $data) {
      data {
        attributes {
          place_name
        }
      }
    }
  }
`

const getFees = async (place_id) => {
  try {
    // get fees without cache
    const { data } = await Client.query({
      query: GET_FEES,
      variables: {
        place_id: {
          eq: place_id,
        },
      },
      fetchPolicy: 'network-only',
    })
    return data.fees.data.map(({ id, attributes }) => {
      return {
        id,
        place_id: attributes.place_id,
        amount: attributes.amount,
        currency: attributes.currency,
        User: attributes.User,
        updatedAt: attributes.updatedAt,
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const getRatings = async (place_id) => {
  try {
    const { data } = await Client.query({
      query: GET_RATINGS,
      variables: {
        place_id: {
          eq: place_id,
        },
      },
      fetchPolicy: 'network-only',
    })
    // loop through ratings and get average
    const ratings = data.ratings.data.map(({ attributes }) => {
      return attributes.rating
    })
    const sum = ratings.reduce((a, b) => a + b, 0)
    const avg = sum / ratings.length
    return {
      rating: avg || 0,
      user_ratings_total: ratings.length || 0,
    }
  } catch (err) {
    console.log(err)
  }
}

const createRating = async ({ rating, place_id, user }) => {
  try {
    await Client.mutate({
      mutation: CREATE_RATING,
      variables: {
        newRating: {
          rating: rating,
          place_id: place_id,
          user: user,
        },
      },
    })
    const fetchRatings = await getRatings(place_id)
    return fetchRatings
  } catch (err) {
    console.log(err)
  }
}

const createFee = async ({ amount, currency, place_id, place_name, User }) => {
  try {
    const { data } = await Client.mutate({
      mutation: CREATE_FEE,
      variables: {
        data: {
          amount: amount,
          currency: currency,
          place_id: place_id,
          place_name: place_name,
          User: User,
        },
      },
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

const updateFee = async ({ fee_id, amount, currency, User }) => {
  try {
    const { data } = await Client.mutate({
      mutation: UPDATE_FEE,
      variables: {
        data: {
          amount: amount,
          currency: currency,
          User: User,
        },
        id: fee_id,
      },
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

const getDistance = (lat1, lon1, lat2, lon2) => {
  // get distance between two points in miles
  var R = 3959 // Radius of the earth in miles
  var dLat = ((lat2 - lat1) * Math.PI) / 180 // deg2rad below
  var dLon = ((lon2 - lon1) * Math.PI) / 180
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in miles
  return round(d, 1) + ' mi'
}

export { getFees, getRatings, getDistance, createRating, createFee, updateFee }
