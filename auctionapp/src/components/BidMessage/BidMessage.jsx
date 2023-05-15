import "./bidMessage.scss";
import { Row } from "antd";

const BidMessage = ({bold, regular, type}) => {
    return (
        <>
        <Row id={`message-container-${type}`}>
            {bold ? <span id="bold-span">{bold}&nbsp;</span> : <></>}
            <span id="regular-span">{regular}</span>
        </Row>
        </>
    )
}

export default BidMessage;
