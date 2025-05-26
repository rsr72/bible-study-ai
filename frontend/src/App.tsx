import { useEffect, useState } from 'react';

type Reading = {
  title: string;
  text: string;
  summary: string;
};

function App() {
  const [reading, setReading] = useState<Reading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/reading/today')
      .then((res) => res.json())
      .then((data) => {
        setReading(data.reading);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          📖 Today's Bible Reading
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : reading ? (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {reading.title}
            </h2>
            <p className="mb-4 whitespace-pre-wrap">{reading.text}</p>
            <p className="italic text-sm text-gray-600">
              {reading.summary}
            </p>
          </>
        ) : (
          <p className="text-red-500">Failed to load reading.</p>
        )}
      </div>
    </div>
  );
}

export default App;
