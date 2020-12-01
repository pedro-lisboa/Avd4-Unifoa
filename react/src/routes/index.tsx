import React from 'react';
import { Switch } from 'react-router-dom';

// Public routes
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

// Private routes
//import Event from '../pages/Event';
import Doctors from '../pages/Doctor';
import Pacients from '../pages/Pacient';
import Appointments from '../pages/Appointment';
import AppointmentsEdit from '../pages/AppointmentEdit';

// Useful components
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={SignIn} exact path="/" />
      <Route component={SignUp} path="/signup" />
      <Route component={ForgotPassword} path="/forgot" />
      <Route component={ResetPassword} path="/reset_password" />
      <Route component={Doctors} path="/doctor" isPrivate/>
      <Route component={Pacients} path="/pacient" isPrivate/>
      <Route component={Appointments} path="/appointment" exact isPrivate/>
      <Route component={AppointmentsEdit} path="/appointment/oi" isPrivate/>

    </Switch>
  );
};

export default Routes;
