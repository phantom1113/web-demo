import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-type';

const IssueRow = (props) => (             ///Stateless component
  <tr>
    <td><Link to={`/issues/${props.issue._id}`}>{props.issue._id.substr(-4)}
    </Link></td>
    <td>{props.issue.status}</td>
    <td>{props.issue.owner}</td>
    <td>{props.issue.created.toDateString()}</td>
    <td>{props.issue.effort}</td>
    <td>{props.issue.completionDate ?
      props.issue.completionDate.toDateString() : ''}</td>
    <td>{props.issue.title}</td>
  </tr>
)

export default IssueRow;

IssueRow.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string
  })
};
