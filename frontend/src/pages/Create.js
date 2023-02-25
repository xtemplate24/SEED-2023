import { useState } from "react";

const Create = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [receiptNum, setReceiptNum] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [followUpClaim, setFollowUpClaim] = useState(false);

  const handleOnChange = () => {
    setFollowUpClaim(!followUpClaim);
  };

  const formatNumber = (num) => {
    num = num.formatNumber(num, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  return (
    <div className="App">
      <label>First Name:</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <label>Last Name:</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <label>Receipt Number:</label>
      <input
        type="text"
        value={receiptNum}
        onChange={(e) => setReceiptNum(e.target.value)}
      />
      <br />
      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br />
      <label>Claim Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => formatNumber(e.target.value)}
      />
      <br />
      <label>Follow-Up Claim?</label>
      <input
        type="checkbox"
        value="Yes"
        checked={followUpClaim}
        onChange={handleOnChange}
      />
      <br />

      <button type="submit" text="Create New Claim" />
    </div>
  );
};

export default Create;
