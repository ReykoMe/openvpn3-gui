import { Typography, Paper } from "@mui/material";
export const EmptyConnections: React.FC = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        p: 3,
      }}
      variant="outlined"
    >
      <Typography variant="body2" fontWeight="500" color="grey.600">
        No active connections
      </Typography>
    </Paper>
  );
};
