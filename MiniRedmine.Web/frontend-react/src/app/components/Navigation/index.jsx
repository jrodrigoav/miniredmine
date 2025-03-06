import React from 'react';
import { NavLink } from 'react-router';
import { ProtectedWrapperComponent } from '../ProtectedWrapper';

export function NavigationComponent() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <NavLink className="navbar-brand" to="/">MiniRedmine</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <ProtectedWrapperComponent displayIfAuthenticated={true}>
                            <li className="nav-item">
                                <NavLink
                                    to="/timeentries"
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    Time Entries
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/configuration"
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    Configuration
                                </NavLink>
                            </li>
                        </ProtectedWrapperComponent>
                        <ProtectedWrapperComponent displayIfAuthenticated={false}>
                            <li className="nav-item">
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    Login
                                </NavLink>
                            </li>
                        </ProtectedWrapperComponent>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
