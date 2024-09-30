/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "react-bootstrap";

export default function GameProgressButton(props : any) {
  const handleClick = () => {
    props.onClickNext();
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Button style={{backgroundColor:"green", width: '13vh'}} variant="contained" onClick={handleClick}>
        {props.isTheLastGame ? "FINISH" : "Play again"}
      </Button>
    </div>
  );
}