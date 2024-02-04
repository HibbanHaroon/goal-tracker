import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./styles/Calendar.css";

const theme = createTheme({
  palette: {
    primary: grey,
  },
});

export default function DateCalendarValue() {
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar", "DateCalendar"]}>
          <DateCalendar
            className="date-calendar"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            color="primary"
          />
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
