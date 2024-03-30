import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconName} from "@fortawesome/fontawesome-svg-core";

interface Props {
    onClick: () => void
    tooltipId: string
    icon: IconName
    tooltipText: string
}

const OAuthButton = (props: Props) => {
    return (
        <button
            type="button"
            className="btn btn-link btn-floating mx-1"
            onClick={props.onClick}
        >
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={props.tooltipId}>{props.tooltipText}</Tooltip>}
            >
                <FontAwesomeIcon icon={["fab", props.icon]}/>
            </OverlayTrigger>
        </button>
    );
};

export default OAuthButton;
