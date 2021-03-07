import React from "react";
import ClassCard from "../components/ClassCard";


export default class StudentDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: "StudentDashboard"
        };
    }

    render() {
        const { pageName } = this.state;

        return (
            <div className="classes">
                <h1>D3L</h1>
                <p>{pageName}</p>
                <div className="row">
                    <ClassCard
                        title="Class 1"
                        id="1"
                        image="https://newevolutiondesigns.com/images/freebies/cool-wallpaper-1.jpg"
                    />
                    <ClassCard
                        title="Class 2"
                        id="2"
                        image="https://cdn.wallpapersafari.com/62/47/yXrzD7.jpg"
                    />
                    <ClassCard
                        title="Class 3"
                        id="3"
                        image="https://www.wallpapertip.com/wmimgs/13-137279_supe-cool-wallpaper-cool.jpg"
                    />
                    <ClassCard
                        title="Class 4"
                        id="4"
                        image="https://wallpapercave.com/wp/tU28R46.jpg"
                    />
                </div>

            </div>
        );
    }
}
