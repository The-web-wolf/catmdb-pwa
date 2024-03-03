import React, { useContext, useState, useEffect } from 'react'
import Title from '../../Core/Title'
import Button from '../../Core/Button'
import Spinner from '../../Core/Spinner'
import { getFees } from '../LocationActions'
import Moment from 'react-moment'
import GlobalContext from '../../../context/GlobalContext'

const Fee = ({ onAddFee, onEditFee, place_id }) => {
  const [fees, setFees] = useState([])
  const [loading, setLoading] = useState(false)
  const gContext = useContext(GlobalContext)

  useEffect(() => {
    const place_fees = async () => {
      setLoading(true)
      const fees = await getFees(place_id)
      setFees(fees)
      setLoading(false)
    }
    place_fees()
  }, [gContext.refreshFees, place_id])

  const fee = fees && fees.find((fee) => fee.place_id === place_id)

  return fee ? (
    <div className="row align-items-end fee-display">
      <div className="col-4">
        <div className="price">
          <span className=" mr-1">{fee.currency}</span>
          <h4 className="amount">{fee.amount}</h4>
        </div>
      </div>
      <div className="col-8">
        <Title variant="pre" className="text-right">
          Last Updated By
        </Title>
        <div className="userCard">
          <span className="userName">
            <i className="far fa-user image mr-2"></i>
            {fee.User}
          </span>
          <span className="time">
            <i className="far fa-clock mr-2"></i> <Moment fromNow>{fee.updatedAt}</Moment>
          </span>
        </div>
      </div>
      <div className="col-12 mt-2">
        <Button
          bg="secondary"
          variant="solid"
          className="btn-block bg-transparent text-secondary"
          onClick={() => {
            onEditFee(fee)
          }}
        >
          Wrong Fee
        </Button>
      </div>
    </div>
  ) : (
    <div className="row">
      <div className="col-12">
        <Title variant="pre">Fee</Title>
        <div className="price my-3">
          <span className="fa fa-coins mr-4"></span>
          No Fee Recorded Yet {loading && <Spinner className="ml-2" />}
        </div>
        <Button
          bg="info"
          variant="outline"
          className="btn-block bg-transparent text-info"
          onClick={onAddFee}
        >
          Add Fee
        </Button>
      </div>
    </div>
  )
}

export default Fee
