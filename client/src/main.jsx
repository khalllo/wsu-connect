// Importing necessary modules and components from React and related libraries

import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering
import App from "./App.jsx"; // Importing main application component
import "./index.css"; // Importing CSS styles
import { persistor, store } from "./redux/store.js"; // Importing Redux store and persistor
import { Provider } from "react-redux"; // Importing Provider component from react-redux
import { PersistGate } from "redux-persist/integration/react"; // Importing PersistGate component for Redux state persistence

// Rendering the main application component wrapped in Redux Provider and PersistGate
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {" "}
    {/* Providing Redux store to the application */}
    <PersistGate persistor={persistor} loading={null}>
      {" "}
      {/* PersistGate for Redux state persistence */}
      <App /> {/* Main application component */}
    </PersistGate>
  </Provider>
);
