import React from 'react';
import Form from 'react-bootstrap/Form';

export function TimeEntryActivitiesSelect(props) {

    const selectOptions = props.timeEntryActivities.map((item, index) => <option key={index} value={item.id}>{item.name}</option>);

    return (
        <Form.Control as="select">
            <option key={-1} value="">---Select Activity</option>
            {selectOptions}
        </Form.Control>
    );

}
