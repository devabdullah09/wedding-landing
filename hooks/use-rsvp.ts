import { useState, useEffect } from 'react';
import { 
  submitRSVP, 
  getRSVPResponsesByEvent,
  getGuestsByEvent,
  addGuest,
  updateGuest,
  RSVPResponse,
  Guest
} from '@/lib/events';

export const useRSVP = (eventId?: string) => {
  const [rsvpResponses, setRsvpResponses] = useState<RSVPResponse[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRSVPData = async () => {
    if (!eventId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const [responses, guestsData] = await Promise.all([
        getRSVPResponsesByEvent(eventId),
        getGuestsByEvent(eventId)
      ]);
      
      setRsvpResponses(responses);
      setGuests(guestsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch RSVP data');
    } finally {
      setLoading(false);
    }
  };

  const submitRSVPResponse = async (rsvpData: Omit<RSVPResponse, 'id' | 'submittedAt'>) => {
    try {
      setError(null);
      const responseId = await submitRSVP(rsvpData);
      
      // Refresh RSVP data
      await fetchRSVPData();
      
      return responseId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit RSVP');
      throw err;
    }
  };

  const addGuestToEvent = async (guestData: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      const guestId = await addGuest({
        ...guestData,
        eventId: eventId || '',
      });
      
      // Refresh guests list
      await fetchRSVPData();
      
      return guestId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add guest');
      throw err;
    }
  };

  const updateGuestInfo = async (guestId: string, updates: Partial<Guest>) => {
    try {
      setError(null);
      await updateGuest(guestId, updates);
      
      // Refresh guests list
      await fetchRSVPData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update guest');
      throw err;
    }
  };

  // Calculate RSVP statistics
  const getRSVPStats = () => {
    const totalGuests = guests.length;
    const attendingGuests = guests.filter(g => g.rsvpStatus === 'attending').length;
    const notAttendingGuests = guests.filter(g => g.rsvpStatus === 'not_attending').length;
    const pendingGuests = guests.filter(g => g.rsvpStatus === 'pending').length;
    const maybeGuests = guests.filter(g => g.rsvpStatus === 'maybe').length;

    return {
      total: totalGuests,
      attending: attendingGuests,
      notAttending: notAttendingGuests,
      pending: pendingGuests,
      maybe: maybeGuests,
      responseRate: totalGuests > 0 ? ((attendingGuests + notAttendingGuests + maybeGuests) / totalGuests) * 100 : 0
    };
  };

  useEffect(() => {
    if (eventId) {
      fetchRSVPData();
    }
  }, [eventId]);

  return {
    rsvpResponses,
    guests,
    loading,
    error,
    submitRSVPResponse,
    addGuestToEvent,
    updateGuestInfo,
    getRSVPStats,
    refreshData: fetchRSVPData,
  };
}; 