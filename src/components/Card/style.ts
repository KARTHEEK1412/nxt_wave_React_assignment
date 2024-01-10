import styled from "@emotion/styled";

export const ListElementContainer = styled.div`
  height: auto;
  width: 280px;
  background-color: #ffff;
  border: 2px solid #e3e6e8;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 18px;
  gap: 0.4rem;
  box-sizing: border-box;
  border-radius: 14px;
  .arrow-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & > * {
      cursor: pointer;
    }
  }
`;
