import styled from "@emotion/styled";

export const ListContainer = styled.div`
  height: 600px;
  max-width: 300px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #e7f0fd;
  padding: 25px 14px 10px 14px;
  border-radius: 10px;
  gap: 20px;
  .heading {
    align-self: center;
  }
  .list-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .Checkbox-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
