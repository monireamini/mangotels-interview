# Hotel Reservation System

This is a React-based web application that allows users to make hotel reservations. It provides features for searching
available rooms, selecting room types, and creating reservations.

# Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Thought Process and Coding Decisions

1. Started by planning the features and creating wireframes to visualize the user flow in responsive mode
2. Define scenarios for each feature
3. Think about data type definitions and all the models we need (models: GUEST, ROOM, ROOM_TYPE, RESERVATION,
   AVAILABILITY)
4. Define properties of each model in Typescript
5. Decide which framework and tools are appropriate for this project (NEXT-JS, NEXT-UI, Tailwind, Redux, React Form
   Hook,
   Zod)
6. Provide some mock data for initial reservation, initial guests, room types, rooms and weekday rates
7. Investigate the best way to storing data in redux store to provide the most performant way for checking the room
   availabilities
    1. We could check all the reservations for checking room availabilities or defining availability data, one item for
       each
       room and date,
       and checking them, I chose the second way because it's more performant when we have large amount of reservations.
    2. For creating a reservation, user is allowed to reserve a room within today and next two months, so we always have
       about 60 availability instance for each room during this two month.
    3. We can add availability data whenever we want to extend room availability, I've defined a function for randomly
       generating them.
    4. After these investigations, I started coding and completed project gradually.

## How components could be extended to handle new features

1. The project structure is designed to be modular and extensible. New features, such as additional room types or
   filters, can be added by creating new components or extending existing ones. The Redux store can be updated to handle
   additional state requirements.

## Testing Approach

For testing, I followed a combination of unit testing and end-to-end (E2E) testing

1. To check the most critical function in this project, checking room availability, I wrote a test with jest to
   ensure that it works in different scenarios
2. To ensure the overall functionality and user experience, I implemented end-to-end (E2E) tests using Cypress. As it
   was my first time working with Cypress, I focused on covering two essential scenarios: navigation flow and
   reservation cancellation.
