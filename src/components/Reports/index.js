import {useContext, useState} from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import {MoodContext} from '../../context/MoodContext'
import Navbar from '../Navbar'
import './index.css'

const Reports = () => {
  const {
    selectedDates,
    emojisList,
    initialMonthsList,
    activeEmoji,
  } = useContext(MoodContext)

  const [selectedMonth, setSelectedMonth] = useState(0)

  const totalEmojiCounts = emojisList.reduce((acc, emoji) => {
    acc[emoji.emojiName] = 0
    return acc
  }, {})

  Object.values(selectedDates).forEach(emojiName => {
    if (totalEmojiCounts[emojiName] !== undefined) {
      totalEmojiCounts[emojiName] += 1
    }
  })

  const filteredSelectedDates = Object.entries(selectedDates).filter(
    ([key]) => {
      const [monthIndex] = key.split('_')

      return Number(monthIndex) + 1 === selectedMonth
    },
  )

  const monthEmojiCounts = emojisList.reduce((acc, emoji) => {
    acc[emoji.emojiName] = 0
    return acc
  }, {})

  filteredSelectedDates.forEach(([, emojiName]) => {
    if (monthEmojiCounts[emojiName] !== undefined) {
      monthEmojiCounts[emojiName] += 1
    }
  })

  const data = emojisList.map(emoji => ({
    name: emoji.emojiName,
    count: monthEmojiCounts[emoji.emojiName],
  }))

  const CustomAxisTick = ({x, y, payload}) => {
    const emoji = emojisList.find(e => e.emojiName === payload.value)
    if (!emoji) return null

    return (
      <svg x={x - 15} y={y + 10} width={30} height={30} viewBox="0 0 30 30">
        <image
          href={emoji.emojiUrl}
          width={30}
          height={30}
          alt={emoji.emojiName}
        />
      </svg>
    )
  }

  return (
    <div className="bg-container">
      <Navbar />
      <div className="reports-container">
        <h1 className="reports-title">Overall Emojis Reports</h1>

        <ul className="emoji-report">
          {emojisList.map(emoji => (
            <li key={emoji.emojiName} className="emoji-card">
              <p className="para">{emoji.emojiName}</p>
              <img
                src={emoji.emojiUrl}
                alt={emoji.emojiName}
                className={`emoji-icon ${
                  activeEmoji.emojiName === emoji.emojiName ? 'active-card' : ''
                }`}
              />
              <p>{totalEmojiCounts[emoji.emojiName]}</p>
            </li>
          ))}
        </ul>
        <div>
          <div className="head">
            <h1 className="reports-title">Monthly Reports</h1>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(Number(e.target.value))}
            >
              {initialMonthsList.map(item => (
                <option key={item.month} value={item.month}>
                  {item.monthName}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{top: 20, right: 30, left: 20, bottom: 50}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={<CustomAxisTick />} interval={0} />
              <YAxis />
              <Tooltip
                content={({active, payload}) => {
                  if (active && payload && payload.length) {
                    const emoji = emojisList.find(
                      e => e.emojiName === payload[0].payload.name,
                    )
                    return (
                      <div className="custom-tooltip">
                        <img
                          src={emoji.emojiUrl}
                          alt={emoji.emojiName}
                          width={30}
                          height={30}
                        />
                        <p>{`${emoji.emojiName}: ${payload[0].value}`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="count" fill="#FFBE38" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Reports
