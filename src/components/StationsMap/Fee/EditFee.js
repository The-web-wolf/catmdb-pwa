import React, { useState, useEffect } from "react";
import Button from "../../Core/Button";
import Title from "../../Core/Title";
import Text from "../../Core/Text";
import Spinner from "../../Core/Spinner";
import { updateFee } from "../LocationActions";

const EditFeeForm = ({ place, show, onClose, User, onRefreshFees }) => {
  const [amount, setAmount] = useState("0.00");
  const [currency, setCurrency] = useState("$");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    place ? setAmount(place.fee_amount) : setAmount("0.00");
    place ? setCurrency(place.fee_currency) : setCurrency("$");
  }, [place]);

  const handleAmountChange = (e) => {
    if (e.target.value) {
      const newAmount = parseFloat(e.target.value);
      newAmount <= 0 ? setError(true) : setError(false);
    }
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fee_id: parseInt(place.fee_id),
      amount: parseFloat(amount),
      currency: currency || "$",
      User,
    };
    if (!error) {
      setLoading(true);
      updateFee(data).then((res) => {
        setLoading(false);
        setAmount(0);
        onClose();
        onRefreshFees(new Date());
      });
    }
  };
  return (
    <div className={show ? "addFeeForm show" : "addFeeForm"}>
      <a className="close-addFeeForm" onClick={onClose} href="#">
        <i className="fas fa-times"></i>
      </a>
      <div className="row h-100 align-items-center p-5 justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <Title className="text-center mb-4 text-info" variant="section">
            UPDATE FEE
          </Title>

          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <Title variant="pre" className="text-info">
                {place ? place.place_name : "-"}
              </Title>

              <Text variant="sm">
                Report the fee for this ATM, and guide other users 
              </Text>
            </div>
            <div className="form-group">
              <label
                htmlFor="amount"
                className="text-info font-weight-semibold"
              >
                Fee Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                value={amount}
                placeholder="Enter the fee amount"
                onInput={handleAmountChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="currency"
                className="text-info font-weight-semibold"
              >
                Currency
              </label>
              <input
                type="text"
                className="form-control"
                id="currency"
                name="currency"
                placeholder="What currency is this fee in? default ($)"
                value={currency}
                maxLength="3"
                onInput={handleCurrencyChange}
              />
            </div>
            {error && (
              <div className="text-warning font-weight-semibold font-size-3 mt-1">
                <span className="fa fa-exclamation-circle mr-1"></span>
                Please enter a valid amount
              </div>
            )}
            <Button
              bg="info"
              variant="solid"
              className="btn-block"
              disabled={loading || error}
            >
              Update Fee {loading && <Spinner className="ml-2" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFeeForm;
