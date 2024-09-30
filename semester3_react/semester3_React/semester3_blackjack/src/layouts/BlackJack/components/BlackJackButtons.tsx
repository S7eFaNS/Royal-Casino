/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "react-bootstrap";

export default function BlackJackButtons(props : any) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
        <div >
        <Button style={{backgroundColor:"white", width: '13vh'}} variant="contained" onClick={props.onClickHit}>
            HIT
        </Button>
        </div>
        <div>
        <Button style={{backgroundColor:"white", width: '13vh'}} variant="contained" onClick={props.onClickStand}>
            STAND
        </Button>
        </div>
    </div>
  );
}
