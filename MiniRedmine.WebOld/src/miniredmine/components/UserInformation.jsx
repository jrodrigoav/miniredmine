import React from 'react';

const UserInformation = (props)=>
{
    return (
        <form onSubmit={props.handleSubmit} className="row">
            <label htmlFor="apiKey" className="control-label col-1">
              API KEY
            </label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                name="apiKey"
                onChange={props.handleInputChange}
                value={props.apiKey}
              />
            </div>
            <label htmlFor="issueId" className="control-label col-1">
              Issue Id
            </label>
            <div className="col-4">
              <input
                type="number"
                className="form-control"
                name="issueId"
                onChange={props.handleInputChange}
                value={props.issueId}
              />
            </div>
            <button type="submit" className="btn btn-default col">
              Get User Information
            </button>
          </form>
    );
}

export default UserInformation;