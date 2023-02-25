import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [claims, setClaims] = useState([]);

  const getClaims = () => {
    axios
      .get("http://localhost:8000/claims/58001002")
      .then((res) => {
        setClaims(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    getClaims();
  }, []);

  const deleteClaim = (id) => {
    axios
      .delete(`http://localhost:8000/claims/${id}`)
      .then((res) => {
        getClaims();
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error);
        }
      });
  };

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
      <Button
        variant="contained"
        type="submit"
        sx={{ alignSelf: "end", right: "5%", marginBottom: 4 }}
        onClick={() => navigate("/create")}
      >
        Create New Claim
      </Button>
      <TableContainer component={Paper} sx={{ width: "90%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Policy ID</TableCell>
              <TableCell align="right">Policy Type</TableCell>
              <TableCell align="right">Claim ID</TableCell>
              <TableCell align="right">Expense Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Purpose</TableCell>
              <TableCell align="right">Follow Up</TableCell>
              <TableCell align="right">Previous Claim ID</TableCell>
              <TableCell align="right">Last Edited Claim Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map((claim) => (
              <TableRow
                key={claim.claimId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {claim.insuranceId}
                </TableCell>
                <TableCell align="right">Policy Type</TableCell>
                <TableCell align="right">{claim.claimId ?? ""}</TableCell>
                <TableCell align="right">{claim.expenseDate ?? ""}</TableCell>
                <TableCell align="right">{claim.amount ?? ""}</TableCell>
                <TableCell align="right">{claim.purpose ?? ""}</TableCell>
                <TableCell align="right">{claim.followUp ?? ""}</TableCell>
                <TableCell align="right">
                  {claim.previousClaimId ?? ""}
                </TableCell>
                <TableCell align="right">
                  {claim.lastEditedClaimDate ?? ""}
                </TableCell>
                <TableCell align="right">{claim.status ?? ""}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginRight: 1 }}
                    onClick={() => navigate("/edit")}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginRight: 1 }}
                    onClick={() => {
                      deleteClaim(claim.claimId);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Home;
