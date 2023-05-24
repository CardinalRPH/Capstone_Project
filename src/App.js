import router from './routes/router';
import { RouterProvider } from 'react-router';


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
