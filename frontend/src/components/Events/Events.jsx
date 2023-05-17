import React from 'react';
import styles from '../../styles/styles';
import EventCard from './EventCard.jsx';
import { useSelector } from 'react-redux';

const Events = () => {
  const { events, isLoading } = useSelector((state) => state.event);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <h1 className={`${styles.heading}`}>Popular Events</h1>
          <EventCard data={events && events[0]} />
        </div>
      )}
    </div>
  );
};

export default Events;
