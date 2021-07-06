import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  makeStyles,
  Switch,
  TextField
} from "@material-ui/core";
import Chars from "./Chars";
import InputSlider from "../Components/InputSlider";

const useStyle = makeStyles({
  password: {
    border: "1px solid #000",
    borderRadius: "5px",
    width: "100%",
    height: "25px"
  },
  copy: {
    cursor: "pointer",
    backgroundColor: "#000",
    color: "#fff"
  }
});

function PasswordGenerate() {
  const classes = useStyle();
  const [settings, setSettings] = useState({
    Upper: true,
    Lower: true,
    Number: true,
    Symbol: true
  });
  const [password, setPassword] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const [value, setValue] = useState(15);

  console.log(value);

  const handleChange = (event) => {
    setSettings({ ...settings, [event.target.name]: event.target.checked });
  };

  let charList = "";
  let finalPass = "";

  let handleClick = () => {
    setPassword("");
    if (settings.Upper) {
      charList += Chars.upper;
    }
    if (settings.Lower) {
      charList += Chars.lower;
    }
    if (settings.Number) {
      charList += Chars.numbers;
    }
    if (settings.Symbol) {
      charList += Chars.Symbol;
    }
    let setRandomPass = () => {
      const charListLength = charList.length;

      for (let i = 0; i < value; i++) {
        const charIndex = Math.floor(Math.random() * charListLength);
        console.log(finalPass);
        finalPass += charList.charAt(charIndex);
      }
    };
    setRandomPass();
    setPassword(finalPass);
  };

  const copyClip = (e) => {
    const textArea = document.createElement("textarea");
    textArea.innerText = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  };

  let handlleCopy = () => {
    copyClip();
    setCopyMessage("Password Copied");
    setTimeout(() => {
      setCopyMessage("");
    }, 1500);
  };

  return (
    <Container>
      <Box width="400px" alignItems="center">
        <Box component="h1">Password Generator</Box>
        <Box component="div">
          <Box component="div">
            <Grid container>
              <Grid xs={10} className={classes.password}>
                {password}
              </Grid>
              <Grid xs={2} onClick={handlleCopy} className={classes.copy}>
                copy
              </Grid>
              <Box component="span" className={classes.copyMessage}>
                {copyMessage}
              </Box>
            </Grid>
          </Box>
        </Box>
        <InputSlider value={value} setValue={setValue} />
        <Grid>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.Upper}
                    onChange={handleChange}
                    name="Upper"
                  />
                }
                label="Inlcude Uppercase"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.Lower}
                    onChange={handleChange}
                    name="Lower"
                  />
                }
                label="Inlcude Lowercase"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.Number}
                    onChange={handleChange}
                    name="Number"
                  />
                }
                label="Inllude Number"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.Symbol}
                    onChange={handleChange}
                    name="Symbol"
                  />
                }
                label="Include Symbol"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Button onClick={handleClick}>Generate Pass</Button>
      </Box>
    </Container>
  );
}

export default PasswordGenerate;
