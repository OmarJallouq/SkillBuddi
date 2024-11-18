// Matching.jsx
import React from 'react';
import UserCard from '../components/UserCard';

const Matching = () => {
  const users = [
    {
      username: 'john_doe',
      skills: ['JavaScript', 'React', 'Node.js'],
      profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      username: 'jane_smith',
      skills: ['Python', 'Django', 'Data Analysis'],
      profilePic: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    {
      username: 'mike_brown',
      skills: ['Java', 'Spring', 'SQL'],
      profilePic: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
  ];

  return (
    <div className="matching-page">
      <h2>Matching Profiles</h2>
      <div className="user-cards">
        {users.map((user, index) => (
          <UserCard 
            key={index} 
            username={user.username} 
            skills={user.skills} 
            profilePic={user.profilePic} 
          />
        ))}
      </div>
    </div>
  );
};

export default Matching;
