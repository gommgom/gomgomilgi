import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    body{
      width: 100%;
      height: 100vh;
    };
    button{
      background-color: white;
      border-radius: 3px;
      cursor: pointer;
    };
    .ql-editor{
      height: 60vh;
    }
`;

export default GlobalStyles;