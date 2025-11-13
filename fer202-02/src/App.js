import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { store } from "./store/store";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
