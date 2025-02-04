import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import {useState} from 'react'
import {initialMonthsList} from '../Data/data'
import Navbar from '../Navbar'
import './index.css'

const Reports = ({selectedDates, emojisList}) => {
  const [selectedMonth, setSelectedMonth] = useState(0)

  const filteredSelectedDates = Object.entries(selectedDates).filter(
    ([key]) => {
      const [monthIndex] = key.split('_')
      return Number(monthIndex) === selectedMonth
    },
  )

  const emojiCounts = emojisList.reduce((acc, emoji) => {
    acc[emoji.emojiName] = 0
    return acc
  }, {})

  filteredSelectedDates.forEach(([, emojiName]) => {
    if (emojiCounts[emojiName] !== undefined) {
      emojiCounts[emojiName] += 1
    }
  })

  const data = emojisList.map(emoji => ({
    name: emoji.emojiName,
    count: emojiCounts[emoji.emojiName],
  }))

  return (
    <>
      <Navbar />
      <div className="reports-container">
        <h1 className="reports-title">Overall Emoji Report</h1>
        <div className="emoji-report">
          {emojisList.map(emoji => (
            <div key={emoji.id} className="emoji-card">
              <p className="para">{emoji.emojiName}</p>
              <img
                src={emoji.emojiUrl}
                alt={emoji.emojiName}
                className="emoji-icon"
              />
              <p>{emojiCounts[emoji.emojiName]}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="head">
            <h1 className="reports-title">Monthly Reports</h1>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(Number(e.target.value))}
            >
              {initialMonthsList.map((month, index) => (
                <option key={month.month} value={index}>
                  {month.monthName}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{top: 20, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#FFBE38" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default Reports
