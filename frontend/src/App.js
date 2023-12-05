import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/appRoutes';
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
 
  return (
    <div>
      <BrowserRouter>
          <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
