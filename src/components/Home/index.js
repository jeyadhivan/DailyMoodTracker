import {useState, useEffect, useCallback} from 'react'
import {emojisList, initialMonthsList, daysList} from '../Data/data'
import Navbar from '../Navbar'
import './index.css'

const Home = ({selectedDates, setSelectedDates}) => {
  const [activeMonthIndex, setActiveMonthIndex] = useState(0)

  const [activeEmoji, setActiveEmoji] = useState(emojisList[0])

  const [selectedDay, setSelectedDay] = useState(daysList[0].day)

  const [selectedEmojiFilter, setSelectedEmojiFilter] = useState(
    emojisList[0].emojiName,
  )
  const [nameDayCount, setNameDayCount] = useState('00')

  const [initialMonths] = useState(initialMonthsList)

  const activeMonth = initialMonths[activeMonthIndex]

  const getNameDayCount = useCallback(() => {
    const selectedDayNumber = daysList.find(day => day.day === selectedDay)
      ?.dayNumber
    if (selectedDayNumber === undefined) return

    let count = 0
    activeMonth.dates.forEach(item => {
      const dateKey = `${activeMonthIndex}_${item.date}`

      const dayNum =
        new Date(`${activeMonth.monthName} ${item.date}, 2023`).getDay() + 1
      if (
        dayNum === Number(selectedDayNumber) &&
        selectedDates[dateKey] === selectedEmojiFilter
      ) {
        count += 1
      }
    })
    setNameDayCount(count < 10 ? `0${count}` : `${count}`)
  }, [
    activeMonth,
    activeMonthIndex,
    selectedDay,
    selectedEmojiFilter,
    selectedDates,
  ])

  useEffect(() => {
    getNameDayCount()
  }, [getNameDayCount])

  const toggleEmojiOnDate = date => {
    const dateKey = `${activeMonthIndex}_${date}`
    setSelectedDates(prev => {
      const updated = {...prev}
      if (updated[dateKey] === activeEmoji.emojiName) {
        delete updated[dateKey]
      } else {
        updated[dateKey] = activeEmoji.emojiName
      }
      return updated
    })
  }

  const goToPreviousMonth = () => {
    setActiveMonthIndex(prev =>
      prev > 0 ? prev - 1 : initialMonths.length - 1,
    )
  }

  const goToNextMonth = () => {
    setActiveMonthIndex(prev =>
      prev < initialMonths.length - 1 ? prev + 1 : 0,
    )
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-card">
        <h1>Months in a Mood</h1>
        <div className="home-display">
          <div className="login-card home">
            <div className="month-carousel">
              <button
                type="button"
                className="carousel-button"
                onClick={goToPreviousMonth}
                data-testid="previous-button"
              >
                &#8249;
              </button>
              <h2>{activeMonth.monthName}</h2>
              <button
                type="button"
                className="carousel-button"
                onClick={goToNextMonth}
                data-testid="next-button"
              >
                &#8250;
              </button>
            </div>

            <ul className="days-list">
              {daysList.map(day => (
                <li key={day.day}>
                  <p>{day.day}</p>
                </li>
              ))}
            </ul>

            <ul className="calendar">
              {activeMonth.dates.map(({date}) => {
                const dateKey = `${activeMonthIndex}_${date}`
                const emojiName = selectedDates[dateKey]

                const emojiObj = emojisList.find(e => e.emojiName === emojiName)
                return (
                  <li key={date}>
                    <button
                      className="date-item"
                      type="button"
                      onClick={() => toggleEmojiOnDate(date)}
                      data-testid={`date-${date}`}
                    >
                      {date}
                      {emojiObj && (
                        <img
                          src={emojiObj.emojiUrl}
                          alt={date}
                          className="emoji-icon"
                          data-testid={`emoji-${date}`}
                        />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="calender-dropdowns">
            <ul className="emoji-selector">
              {emojisList.map(emoji => (
                <li key={emoji.id}>
                  <button
                    type="button"
                    className="emoji-item"
                    onClick={() => {
                      setActiveEmoji(emoji)
                      setSelectedEmojiFilter(emoji.emojiName)
                    }}
                  >
                    <p>{emoji.emojiName}</p>
                    <img
                      src={emoji.emojiUrl}
                      alt={emoji.emojiName}
                      className={`emoji-icon ${
                        activeEmoji.emojiName === emoji.emojiName
                          ? 'active'
                          : ''
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="emoji-selectors">
              <div className="dropdowns">
                <select
                  value={selectedEmojiFilter}
                  onChange={e => {
                    const selected = emojisList.find(
                      emoji => emoji.emojiName === e.target.value,
                    )
                    setActiveEmoji(selected)
                    setSelectedEmojiFilter(selected.emojiName)
                  }}
                >
                  {emojisList.map(emoji => (
                    <option key={emoji.id} value={emoji.emojiName}>
                      {emoji.emojiName}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDay}
                  onChange={e => setSelectedDay(e.target.value)}
                >
                  {daysList.map(day => (
                    <option key={day.day} value={day.day}>
                      {day.day}
                    </option>
                  ))}
                </select>
              </div>
              <h1 className="count">{nameDayCount}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
