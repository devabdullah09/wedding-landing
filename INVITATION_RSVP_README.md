# Invitation RSVP System

This document describes the implementation of the backend functionality for the invitation reply system.

## Overview

The invitation RSVP system now includes:

- **Frontend**: All invitation pages with state management
- **Backend**: Firebase Firestore database integration
- **API**: REST endpoints for submitting and retrieving RSVP data
- **Dashboard**: Admin view of all submitted RSVPs

## Architecture

### 1. Data Flow

```
Guest fills out invitation forms → Data saved to React Context →
Submitted to API endpoint → Stored in Firebase Firestore →
Retrieved for dashboard display
```

### 2. Components Structure

- `InvitationProvider`: Context provider managing RSVP state across all pages
- `InvitationContext`: React context for state management
- Individual invitation pages: Each page updates context and navigates to next step

### 3. Data Models

#### InvitationGuest

```typescript
interface InvitationGuest {
  name: string;
  surname: string;
  isChild: boolean;
  age?: string;
}
```

#### InvitationRSVP

```typescript
interface InvitationRSVP {
  id?: string;
  eventId: string;
  mainGuest: InvitationGuest;
  additionalGuests: InvitationGuest[];
  weddingDayAttendance: { [guestName: string]: "will" | "cant" };
  afterPartyAttendance: { [guestName: string]: "will" | "cant" };
  foodPreferences: { [guestName: string]: "Regular" | "Vegetarian" | "Vegan" };
  accommodationNeeded: { [guestName: string]: "Yes" | "No" };
  transportationNeeded: { [guestName: string]: "Yes" | "No" };
  notes: { [guestName: string]: string };
  email?: string;
  sendEmailConfirmation: boolean;
  submittedAt: Date;
  status: "pending" | "confirmed" | "cancelled";
}
```

## Implementation Details

### 1. State Management

- Uses React Context with useReducer for complex state management
- State persists across page navigation within the invitation flow
- Data is automatically saved to context as users progress through forms

### 2. API Endpoints

#### Submit RSVP

```
POST /api/invitation/rsvp
Body: InvitationRSVP data
Response: { success: true, rsvpId: string, message: string }
```

#### Get RSVPs

```
GET /api/invitation/rsvps?eventId={eventId}
Response: { success: true, rsvps: InvitationRSVP[], count: number }
```

### 3. Firebase Integration

- Data stored in `invitation_rsvps` collection
- Automatic timestamps for submission and updates
- Support for RSVP status management (pending/confirmed/cancelled)

### 4. Error Handling

- Form validation on frontend
- API error handling with user-friendly messages
- Loading states during submission

## Usage

### 1. Guest Flow

1. Navigate to `/invitation`
2. Fill out guest information
3. Progress through each step (attendance, food preferences, etc.)
4. Submit final RSVP with email confirmation
5. View confirmation summary

### 2. Admin Dashboard

- Navigate to `/invitation/dashboard`
- View all submitted RSVPs
- See attendance counts and food preferences
- Monitor guest numbers and responses

### 3. Data Export

RSVP data can be exported from Firebase for:

- Catering planning
- Seating arrangements
- Transportation coordination
- Accommodation planning

## Configuration

### Event Configuration

Update `lib/event-config.ts` to match your wedding details:

```typescript
export const EVENT_CONFIG = {
  id: "your-event-id",
  title: "Your Wedding Title",
  coupleNames: "Your Names",
  date: "YYYY-MM-DD",
  venue: "Your Venue",
  // ... other settings
};
```

### Firebase Setup

Ensure your Firebase configuration in `lib/firebase.ts` is correct and the project has Firestore enabled.

## Future Enhancements

1. **Email Notifications**: Send confirmation emails to guests
2. **RSVP Management**: Allow guests to edit their responses
3. **Guest List Import**: Bulk import guest lists
4. **Analytics**: Detailed reporting and statistics
5. **Mobile App**: Native mobile application for RSVP management

## Troubleshooting

### Common Issues

1. **Data not saving**: Check Firebase configuration and permissions
2. **Context not persisting**: Ensure InvitationProvider wraps all invitation pages
3. **API errors**: Check browser console and API endpoint logs
4. **Guest names not showing**: Verify guest data is properly saved in context

### Debug Mode

Enable console logging in development to track data flow:

- Context updates
- API calls
- Firebase operations

## Security Considerations

1. **Input Validation**: All user inputs are validated before storage
2. **Rate Limiting**: Consider implementing API rate limiting
3. **Data Privacy**: Ensure compliance with data protection regulations
4. **Access Control**: Dashboard access should be restricted to authorized users

## Performance

1. **Context Optimization**: Context updates are batched to prevent unnecessary re-renders
2. **Lazy Loading**: Dashboard data is loaded on-demand
3. **Caching**: Consider implementing client-side caching for better performance
4. **Database Indexing**: Ensure proper Firestore indexes for query performance
