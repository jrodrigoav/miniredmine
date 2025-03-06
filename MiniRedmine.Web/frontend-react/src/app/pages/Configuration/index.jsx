import { WorkComponent } from '../../components/Work';
import { TimeEntryCommentsComponent } from '../../components/TimeEntryComments';

export function ConfigurationPage() {
    return (
        <div className="row">
            <WorkComponent />
            <TimeEntryCommentsComponent />
        </div>
    );
}