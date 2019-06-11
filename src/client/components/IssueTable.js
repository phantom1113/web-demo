import React from 'react';
import ReactDOM from 'react-dom';
import IssueRow from './IssueRow';

const IssueTable = (props) => {
    const issueRows = props.issues.map(issue => <IssueRow
        key={issue._id} issue={issue} />)
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>{issueRows}</tbody>
        </table>
    )

}

export default IssueTable;