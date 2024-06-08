import { Route,Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";


function App(){


    return(
        <Fragment>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/settings" element={<SettingsPage/>}></Route>

            </Routes>

        </Fragment>
    );
}

export default App;