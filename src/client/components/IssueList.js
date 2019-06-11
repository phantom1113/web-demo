import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import IssueTable from './IssueTable'
import IssueAdd from './IssueAdd'
import IssueFilter from './IssueFilter'

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    componentDidUpdate(prevProps) {
        const oldQuery = prevProps.location.search.split('=');
        const newQuery = this.props.location.search.split('=');
        if (oldQuery[1] === newQuery[1]) {
            return;
        }
        this.loadData();
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        const status = this.props.location.search.split('=');
        axios.get("api/issues", {
            params: {
                status: status[1]
            }
        })
            .then(res => {
                console.log("Total count of records:", res.data._metadata.total_count);
                res.data.records.forEach(issue => {
                    issue.created = new Date(issue.created);
                    if (issue.completionDate)
                        issue.completionDate = new Date(issue.completionDate);
                });
                this.setState({ issues: res.data.records });
            })
            .catch(err => console.log(err))
    }
    createIssue(newIssue) {
        const { title, owner } = newIssue;
        console.log(title);
        axios.post("api/issues", {
            title,
            owner
        })
            .then(res => {
                res.data.created = new Date(res.data.created);
                if (res.data.completionDate)
                    res.data.completionDate = new Date(res.data.completionDate);
                const newIssues = this.state.issues.concat(res.data);
                this.setState({ issues: newIssues });
                console.log("Adding is successful");
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </div>
        );
    }
}