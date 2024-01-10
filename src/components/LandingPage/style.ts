import styled from "@emotion/styled";

export const LandingPageContainer = styled.div`
  height: auto;
  width: 100%;
  .layout-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .error {
    font-size: 12px;
    color: red;
    font-weight: 400;
  }
  .button {
    border-radius: 5px;
    font-size: 12px;
    text-transform: none;
    font-weight: 400;
    width: 150px;
    background-color: lightblue;
  }
  .list-containers {
    padding-left: 20px;
    margin-top: 40px;
    display: flex;
    gap: 20px;
  }
  .button-container {
    margin-top: 30px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    gap: 20px;
    & > * {
      border-radius: 5px;
      font-size: 12px;
      text-transform: none;
      font-weight: 400;
      width: 100px;
    }
  }
`;
