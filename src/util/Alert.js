import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import AddSurveyContent from "./AddSurveyContent";
import Configuration from "./Configuration";
import Preview from "./Preview";
import ShareSurvey from "./ShareSurvey";



class Alert extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <Aux>
                <Tabs
                    className="d-flex justify-content-center"
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                >
                    <Tab tabClassName="rounded" eventKey="home" title="Create Survey">
                        <AddSurveyContent />
                    </Tab>
                    <Tab tabClassName="rounded" eventKey="profile" title="Configuration">
                        <Configuration />
                    </Tab>
                    <Tab tabClassName="rounded" eventKey="contact" title="Preview">
                        <Preview />
                    </Tab>
                    <Tab tabClassName="rounded" eventKey="preview" title="Share">
                        <ShareSurvey />
                    </Tab>
                </Tabs>
            </Aux>
        );
    }
}

export default AddSurvey;
