import { useState, useEffect } from 'react';
import { 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  getEvent, 
  getEventsByOrganizer, 
  getAllEvents,
  WeddingEvent 
} from '@/lib/events';
import { useAuth } from '@/components/auth-provider';

export const useEvents = () => {
  const [events, setEvents] = useState<WeddingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userProfile } = useAuth();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let eventsData: WeddingEvent[];
      
      if (userProfile?.role === 'superadmin') {
        eventsData = await getAllEvents();
      } else if (userProfile?.role === 'organizer') {
        eventsData = await getEventsByOrganizer(userProfile.uid);
      } else {
        eventsData = [];
      }
      
      setEvents(eventsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData: Omit<WeddingEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      const eventId = await createEvent({
        ...eventData,
        organizerId: userProfile?.uid || '',
      });
      
      // Refresh events list
      await fetchEvents();
      
      return eventId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
      throw err;
    }
  };

  const editEvent = async (eventId: string, updates: Partial<WeddingEvent>) => {
    try {
      setError(null);
      await updateEvent(eventId, updates);
      
      // Refresh events list
      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update event');
      throw err;
    }
  };

  const removeEvent = async (eventId: string) => {
    try {
      setError(null);
      await deleteEvent(eventId);
      
      // Refresh events list
      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
      throw err;
    }
  };

  const getEventById = async (eventId: string) => {
    try {
      setError(null);
      return await getEvent(eventId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch event');
      throw err;
    }
  };

  useEffect(() => {
    if (userProfile) {
      fetchEvents();
    }
  }, [userProfile]);

  return {
    events,
    loading,
    error,
    addEvent,
    editEvent,
    removeEvent,
    getEventById,
    refreshEvents: fetchEvents,
  };
}; 