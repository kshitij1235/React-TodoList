
import { Fragment } from "react/jsx-runtime";
function NavigationBar() {

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
<<<<<<< HEAD
                    <a className="navbar-brand" href="/">TASKUS</a>
=======
                    <a className="navbar-brand" href="/">TasksManager</a>
>>>>>>> ddb6b644b748596b0fe500c82d09e89e436e65fc
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link" href="/settings">Settings</a>
                            <a className="nav-link" href="/timetravel">Timetravel</a>
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>

    );
}


export default NavigationBar;