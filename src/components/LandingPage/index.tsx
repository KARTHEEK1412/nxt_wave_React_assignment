import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { LandingPageContainer } from "./style";

import ListContainerCard from "../ListContainer";
import { useState, useEffect, useMemo } from "react";

interface List {
  list_number: number;
  description: string;
  id: string;
  name: string;
}

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState(true);
  const [selectedLists, setSelectedLists] = useState({
    1: { listId: 1, isChecked: false },
    2: { listId: 2, isChecked: false },
  });
  const [selectedListsCount, setSelectedListsCount] = useState({
    count: 0,
    selectedListIds: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://apis.ccbp.in/list-creation/lists")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  // const handleTryAgain = () => {
  //   setIsLoading(true);
  //   setError(null);
  //   fetchData();
  // };

  if (isLoading) {
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  const handleCheckList = (checkboxId: number) =>
    setSelectedLists((prevSelectedLists) => {
      const updatedSelectedLists = {
        ...prevSelectedLists,
        [checkboxId]: {
          ...prevSelectedLists[checkboxId],
          isChecked: !prevSelectedLists[checkboxId]?.isChecked,
        },
      };

      const checkedListIds = Object.values(updatedSelectedLists)
        .filter((list) => list.isChecked)
        .map((list) => list.listId);
      if (checkedListIds.length <= 2) {
        setSelectedListsCount({
          count: checkedListIds.length,
          selectedListIds: checkedListIds,
        });
      }
      return updatedSelectedLists;
    });

  const listsArray = data.lists;
  const listsGroupedByNumber: { [key: number]: List[] } = {};

  listsArray.forEach((list: List) => {
    const { list_number } = list;
    if (!listsGroupedByNumber[list_number]) {
      listsGroupedByNumber[list_number] = [];
    }
    listsGroupedByNumber[list_number].push(list);
  });
  const listContainerComponents = Object.keys(listsGroupedByNumber).map(
    (number: any) => {
      const listsForNumber = listsGroupedByNumber[number];
      return (
        <ListContainerCard
          key={`LstContainer-${number}`}
          list_id={number}
          data={listsForNumber}
          handleCheckList={handleCheckList}
          usedfor={true}
          viewMode={viewMode}
        />
      );
    }
  );
  const create_btn_enable = selectedListsCount.count === 2;
  const handleCreatenewListbtn = () => {
    setViewMode((p) => !p);
    setSelectedListsCount((previous) => {
      const listIds = [...previous.selectedListIds];
      listIds.sort((a, b) => a - b);

      const largestNumber = listIds[listIds.length - 1] || 0;
      const newNumber = largestNumber + 1;

      listIds.splice(1, 0, newNumber);

      return {
        count: listIds.length - 1,
        selectedListIds: listIds,
      };
    });
  };
  let filteredObject: never[] = [];
  if (!viewMode) {
    const NewLists = selectedListsCount.selectedListIds;
    filteredObject = Object.keys(listsGroupedByNumber).reduce((result, key) => {
      const keyValue = parseInt(key);
      if (NewLists.includes(keyValue)) {
        result[keyValue] = listsGroupedByNumber[key];
      }
      return result;
    }, {});
  }

  return (
    <LandingPageContainer>
      {viewMode && (
        <>
          <div className="layout-header">
            <Typography fontWeight={600} fontSize={24}>
              List Creation
            </Typography>
            <Button
              size="small"
              className="button"
              disabled={!create_btn_enable}
              onClick={() => handleCreatenewListbtn()}
            >
              Create a new list
            </Button>
            {selectedListsCount.count === 1 && (
              <Typography className="error">
                *You should select exactly 2 lists to create a new list
              </Typography>
            )}
          </div>
          <div className="list-containers">{listContainerComponents}</div>
        </>
      )}
      {!viewMode && (
        <>
          <div className="list-containers">
            {Object.keys(filteredObject).map((number: any, index: number) => {
              const listsForNumber = filteredObject[number];
              const rightorLeftArrow = index < 1;
              return (
                <ListContainerCard
                  key={`LstContainer-${number}`}
                  list_id={number}
                  data={listsForNumber}
                  handleCheckList={handleCheckList}
                  usedfor={false}
                  rightArrowOrleft={rightorLeftArrow}
                  viewMode={false}
                />
              );
            })}
          </div>
          <div className="button-container">
            <Button
              variant="outlined"
              onClick={() => {
                setViewMode((p) => !p);
                setSelectedListsCount((p) => ({
                  count: 0,
                  selectedListIds: p.selectedListIds,
                }));
              }}
            >
              Cancel
            </Button>

            <Button>Save</Button>
          </div>
        </>
      )}
    </LandingPageContainer>
  );
};

export default LandingPage;
