import { Typography } from "@mui/material";
import { ListElementContainer } from "./style";
import { ArrowLeft, ArrowRight } from "react-feather";
import { useState } from "react";

interface CardProps {
  description: string;
  name: string;
  viewMode: boolean;
  rightArrowOrleft?: boolean;
}

const ListElement: React.FC<CardProps> = ({
  description,
  name,
  viewMode,
  rightArrowOrleft,
}) => {
  const [disbleArrow, setDisableArrow] = useState<boolean>(false);
  return (
    <ListElementContainer>
      <Typography fontWeight={600} fontSize={16}>
        {name}
      </Typography>
      <Typography fontSize={14} color="#838D9E" fontWeight={400}>
        {description}
      </Typography>
      {!viewMode && (
        <div className="arrow-container">
          {!rightArrowOrleft && (
            <ArrowLeft
              color="#4f5d75"
              size={20}
              className="element1"
            ></ArrowLeft>
          )}
          {rightArrowOrleft && (
            <ArrowRight
              color="#4f5d75"
              size={20}
              className="element2"
            ></ArrowRight>
          )}
        </div>
      )}
    </ListElementContainer>
  );
};

export default ListElement;
