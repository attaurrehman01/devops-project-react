import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>{endpoint.toUpperCase()}</h2>
      {loading ? (
        <p>Loading {endpoint}...</p>
      ) : (
        <div className="data-grid">
          {data.slice(0, 10).map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#ddd6fe',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            >
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataList;
