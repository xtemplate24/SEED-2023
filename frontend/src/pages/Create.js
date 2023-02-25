import axios from "axios";
import "./style.css";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

const Create = ({ iid }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [followUpClaim, setFollowUpClaim] = useState(false);
  const [purpose, setPurpose] = useState("");

  const eid = sessionStorage.getItem("eid");

  const handleOnChange = () => {
    setFollowUpClaim(!followUpClaim);
  };

  const data = {
    eid: 58001001,
    iid: 1005,
    Purpose: purpose,
    ExpenseDate: date,
    Amount: amount,
    FollowUp: followUpClaim,
  };

  const submitData = (data) => {
    axios
      .post("http://localhost:8000/claims", data, {
        mode: "cors",
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error");
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitData(data);
  };

  /* const getPolicyType = async () => {
    console.log("test");
    axios
      .get("http://localhost:8000/users/getPoliciesById", data, {
        username: "cors",
      })
      .then((res) => {
        setPurpose(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error);
        }
      });

  }; */

  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <h1>Create New Claim</h1>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Policy Type:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <MenuItem value={"Personal Accident"}>Personal Accident</MenuItem>
            <MenuItem value={"Housing"}>Housing</MenuItem>
            <MenuItem value={"Car"}>Car</MenuItem>
            <MenuItem value={"Travel"}>Travel</MenuItem>
          </Select>
        </FormControl>
        <br />
        <label>Date:</label>
        <TextField
          id="date"
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <label>Claim Amount:</label>
        <TextField
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <label>Follow-Up Claim?</label>
        <TextField
          type="checkbox"
          value="Yes"
          checked={followUpClaim}
          onChange={handleOnChange}
        />
        <br />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Create;
