import React from 'react';
import Form from 'react-bootstrap/Form';

function TimeEntryActivitiesSelect(props) {
    const selectOptions = props.timeEntryActivities.map((item, index) => <option key={index} value={item.id}>{item.name}</option>);
    return (
        <Form.Control as="select" defaultValue={props.selectedActivity} name={props.name} onChange={props.onChange}>
            <option key={-1} value="">--- Select Activity ---</option>
            {selectOptions}
        </Form.Control>
    );
}

export default TimeEntryActivitiesSelect;
