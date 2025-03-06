import { useUser } from '../../providers/User';
import { ProtectedWrapperComponent } from '../../components/ProtectedWrapper';
export function HomePage() {
  const { user } = useUser();

  return (
    <div className="jumbotron">
      <h1 className="display-3">
        🐊 MiniRedmine, React ⚛️ <small>Now running on .NET 9</small>
      </h1>
      <ProtectedWrapperComponent displayIfAuthenticated={true} >
        <p className="lead">Welcome {user.firstname}.</p>
      </ProtectedWrapperComponent>
      <ProtectedWrapperComponent displayIfAuthenticated={false}>
        <p className="lead">
          Welcome, you need to login with your redmine apikey to use the app.
        </p>
      </ProtectedWrapperComponent>

    </div>
  );
}
