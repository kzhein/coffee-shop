import React, { useContext, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertContext from '../../context/alert/alertContext';
import './Alerts.css';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  // to fix findDOMNode deprecated error of react-transition-group
  const nodeRef = useRef(null);

  return (
    <div className='alerts-container'>
      <TransitionGroup>
        {alertContext.alerts.length > 0 &&
          alertContext.alerts.map(alert => (
            <CSSTransition
              nodeRef={nodeRef}
              key={alert.id}
              timeout={500}
              classNames='alert-item'
            >
              <div className={`alert alert-${alert.type}`}>{alert.msg}</div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

export default Alerts;
