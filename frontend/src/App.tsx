import { useEffect, useState } from 'react';

type Reading = {
  title: string;
  text: string;
  summary: string;
};

function App() {
  const [today, setToday] = useState<Reading | null>(null);
  const [tomorrow, setTomorrow] = useState<Reading | null>(null);
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/reading/today')
      .then(res => res.json())
      .then(data => setToday(data.reading));

    fetch('http://127.0.0.1:8000/reading/tomorrow')
      .then(res => res.json())
      .then(data => setTomorrow(data.reading));
  }, []);

  const handleInsight = async () => {
    if (!today) return;
    setLoadingInsight(true);
    const res = await fetch('http://127.0.0.1:8000/insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: today.title,
        text: today.text,
      }),
    });
    const data = await res.json();
    setInsight(data.insight);
    setLoadingInsight(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 space-y-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">📖 Today's Bible Reading</h1>
        {today ? (
          <>
            <h2 className="text-xl font-semibold">{today.title}</h2>
            <p className="mt-2">{today.text}</p>
            <p className="mt-4 italic text-sm text-gray-600">{today.summary}</p>

            <button
              onClick={handleInsight}
              disabled={loadingInsight}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {loadingInsight ? 'Loading Insight...' : '✨ Generate Insight'}
            </button>

            {insight && (
              <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-line">
                <h3 className="font-bold text-lg mb-2 text-purple-700">Insight</h3>
                <p>{insight}</p>
              </div>
            )}
          </>
        ) : (
          <p>Loading today's reading...</p>
        )}
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-xl font-bold mb-4 text-purple-700">📘 Tomorrow’s Preview</h1>
        {tomorrow ? (
          <>
            <h2 className="text-lg font-semibold">{tomorrow.title}</h2>
            <p className="mt-2">{tomorrow.text}</p>
            <p className="mt-4 italic text-sm text-gray-600">{tomorrow.summary}</p>
          </>
        ) : (
          <p>Loading tomorrow’s reading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
