import React, { useEffect, useState } from 'react';
import axios from 'axios';

const cardColors = [
  '#fef9c3', '#e0f2fe', '#ede9fe', '#d1fae5', '#fee2e2'
];

const DataList = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/${endpoint}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [endpoint]);

  const renderItemDetails = (item) => {
    switch (endpoint) {
      case 'posts':
        return (
          <>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Post ID:</strong> {item.id}</p>
          </>
        );
      case 'comments':
        return (
          <>
            <h3>{item.name}</h3>
            <p><strong>Email:</strong> {item.email}</p>
            <p>{item.body}</p>
            <p><strong>Post ID:</strong> {item.postId}</p>
          </>
        );
      case 'albums':
        return (
          <>
            <h3>Album #{item.id}</h3>
            <p><strong>Title:</strong> {item.title}</p>
            <p><strong>User ID:</strong> {item.userId}</p>
          </>
        );
      case 'todos':
        return (
          <>
            <h3>{item.title}</h3>
            <p>Status: {item.completed ? '✅ Completed' : '❌ Not completed'}</p>
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Todo ID:</strong> {item.id}</p>
          </>
        );
      case 'users':
        return (
          <>
            <h3>{item.name}</h3>
            <p><strong>Username:</strong> {item.username}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Phone:</strong> {item.phone}</p>
            <p><strong>Website:</strong> {item.website}</p>
            <p><strong>Company:</strong> {item.company?.name}</p>
            <p><strong>Address:</strong> {item.address?.suite}, {item.address?.street}, {item.address?.city} - {item.address?.zipcode}</p>
          </>
        );
      default:
        return <pre>{JSON.stringify(item, null, 2)}</pre>;
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4c1d95' }}>
        {endpoint.toUpperCase()}
      </h2>

      {loading ? (
        <p>Loading {endpoint}...</p>
      ) : (
        <div className="card-grid">
          {data.map((item, i) => (
            <div
              key={item.id || i}
              style={{
                backgroundColor: cardColors[i % cardColors.length],
                padding: '15px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              {renderItemDetails(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataList;
