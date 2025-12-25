import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import {RouterProvider} from "react-router";
import {store} from "./redux/store.ts";
import {routes} from "./router/routes.tsx";
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <RouterProvider router={routes}/>
  </Provider>
)
