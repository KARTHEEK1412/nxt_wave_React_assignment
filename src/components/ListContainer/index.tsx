import { Checkbox, Typography } from "@mui/material";
import { ListContainer } from "./style";
import ListElement from "../Card";
interface ListContainerCardProps {
  list_id: string;
  data: any;
  handleCheckList: any;
  usedfor: boolean;
  rightArrowOrleft?: boolean;
  viewMode: boolean;
}

const ListContainerCard: React.FC<ListContainerCardProps> = ({
  list_id,
  data,
  handleCheckList,
  usedfor,
  rightArrowOrleft,
  viewMode,
}) => {
  return (
    <ListContainer>
      <div className="Checkbox-container" key={list_id}>
        {usedfor && <Checkbox onClick={() => handleCheckList(list_id)} />}
        <Typography fontWeight={600} className="heading">
          List {list_id}
        </Typography>
      </div>
      <div className="list-container">
        {data.map((ele: any, index: number) => (
          <ListElement
            description={ele.description}
            key={ele.name}
            name={ele.name}
            rightArrowOrleft={rightArrowOrleft}
            viewMode={viewMode}
          />
        ))}
      </div>
    </ListContainer>
  );
};

export default ListContainerCard;
