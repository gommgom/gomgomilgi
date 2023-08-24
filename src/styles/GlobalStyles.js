import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    body{
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      flex-direction: column;

    };
    button{
      background-color: white;
      border-radius: 3px;
      cursor: pointer;
    };
`;

export default GlobalStyles;