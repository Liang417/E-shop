import React from 'react';
import Header from '../components/Layout/Header';
import EventCard from '../components/Events/EventCard';
import { useSelector } from 'react-redux';
import Loader from '../components/Layout/Loader';

const EventPage = () => {
  const { events, isLoading } = useSelector((state) => state.event);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="mt-20 800px:mt-0">
            <Header activeHeading={4} />
          </div>
          <div className="my-6">
            <EventCard data={events && events[0]} />
          </div>
        </div>
      )}
    </>
  );
};

export default EventPage;
