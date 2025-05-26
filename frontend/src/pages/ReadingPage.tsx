import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Reading = {
  title: string;
  text: string;
  summary: string;
};

export default function ReadingPage() {
  const { date } = useParams<{ date: string }>();
  const [reading, setReading] = useState<Reading | null>(null);
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState<string>("");

  useEffect(() => {
    if (!date) return;
    fetch(`http://127.0.0.1:8000/reading/${date}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Reading not found");
        }
        return res.json();
      })
      .then(data => setReading(data.reading))
      .catch(() => setReading(null));
  }, [date]);

  const generateInsight = async () => {
    if (!reading) return;
    setLoading(true);
    const res = await fetch("http://127.0.0.1:8000/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: reading.title,
        text: reading.text,
      }),
    });
    const data = await res.json();
    setInsight(data.insight);
    setLoading(false);
  };

  if (!reading) return <p className="p-8 text-center text-red-600">Reading not found for this date.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-blue-700">{reading.title}</h1>
        <div className="prose prose-lg text-gray-900 max-h-96 overflow-y-auto bg-gray-50 p-4 rounded">
          <p>{reading.text}</p>
        </div>
        <button
          onClick={generateInsight}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Generating Insight..." : "✨ Generate Insight"}
        </button>

        {insight && (
          <div className="bg-purple-50 border border-purple-200 p-4 rounded whitespace-pre-line">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">AI Insight</h3>
            <p>{insight}</p>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">📝 Journal</h2>
          <textarea
            className="w-full h-40 p-3 border rounded resize-none"
            placeholder="Write your thoughts here..."
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
          />
          <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
}
