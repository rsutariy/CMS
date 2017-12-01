import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AddStructure from './AddStructure';

class Admin extends Component {
    render() {
        return (
            <div className="container">                
                <div className="admin-panel">
                    <h1>Admin Panel</h1>
                </div>
                <Router>
                    <div>
                        <ul className="admin-panel-routes">
                            <li><Link to='/structures/new'>Add Structure</Link></li>
                            <li><Link to='/structures'>List Structures</Link></li>
                            <li><Link to='/users'>List User(s)</Link></li>
                        </ul>
                        <Switch>
                            <Route exact path='/admin/structures/new' component={AddStructure}/>
                            {/* <Route exact path='/admin/structures/:slug/new' component={EntryFormContainer}/>
                            <Route exact path='/admin/structures/:slug' component={EditStructurePage}/>
                            <Route exact path="/admin/structures/:slug/list" component={StructureEntries} /> 
                            <Route exact path="/admin/structures/:slug/:entrySlug" component={EditEntryContainer} /> 
                            <Route path='/admin/structures' component={StructureList}/>
                            <Route exact path='/admin/users' component={UserList}/>                            */}
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default Admin;