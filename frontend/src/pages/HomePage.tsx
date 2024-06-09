import { Fragment } from "react/jsx-runtime";
import NavigationBar from "../components/Navigation";
import TaskView from "../components/Tasks";

function HomePage(){

    return(
        <Fragment>
        <NavigationBar></NavigationBar>
        <TaskView></TaskView>
        </Fragment>
    );
}

export default HomePage;