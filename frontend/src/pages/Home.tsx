import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  const handleDateChange = (value: Date | Date[] | null) => {
    if (!value || Array.isArray(value)) return;
    setSelectedDate(value);
    const iso = value.toISOString().split('T')[0];
    console.log("📅 Navigating to:", iso); // ✅ Debug log
    navigate(`/reading/${iso}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center p-8 space-y-8">
      <h1
        className="text-5xl font-semibold text-blue-800"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        📖 Bible Study Calendar
      </h1>

      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-3xl">
        <div className="flex justify-center text-lg">
          <Calendar
            onChange={handleDateChange as any}
            value={selectedDate}
            calendarType="gregory" // ✅ FIXED: week starts on Sunday
            tileClassName={({ date }) =>
              date.toDateString() === new Date().toDateString() ? 'bg-blue-200' : undefined
            }
          />
        </div>
      </div>

      <footer className="fixed bottom-0 w-full bg-white border-t text-center py-2 text-sm text-gray-600">
        Bible Study AI ⛅️ | Click a date to study
      </footer>
    </div>
  );
}
