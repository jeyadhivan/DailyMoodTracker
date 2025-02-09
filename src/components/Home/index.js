import {useContext, useEffect, useCallback} from 'react'
import {MoodContext} from '../../context/MoodContext'
import Navbar from '../Navbar'
import './index.css'

const Home = () => {
  const {
    selectedDates,
    setSelectedDates,
    activeMonthIndex,
    setActiveMonthIndex,
    activeEmoji,
    setActiveEmoji,
    selectedDay,
    setSelectedDay,
    selectedEmojiFilter,
    setSelectedEmojiFilter,
    nameDayCount,
    setNameDayCount,
    emojisList,
    initialMonthsList,
    daysList,
  } = useContext(MoodContext)

  const activeMonth = initialMonthsList[activeMonthIndex]

  const getNameDayCount = useCallback(() => {
    const selectedDayNumber = daysList.find(day => day.day === selectedDay)
      ?.dayNumber
    if (selectedDayNumber === undefined) return

    let count = 0
    activeMonth.dates.forEach((item, index) => {
      const dateKey = `${activeMonthIndex}_${item.date}`

      const dayNum = ((index % 7) + 1) % 7

      if (
        dayNum === selectedDayNumber &&
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
    daysList,
    setNameDayCount,
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
      prev > 0 ? prev - 1 : initialMonthsList.length - 1,
    )
  }

  const goToNextMonth = () => {
    setActiveMonthIndex(prev =>
      prev < initialMonthsList.length - 1 ? prev + 1 : 0,
    )
  }

  return (
    <div className="bg-container">
      <Navbar />
      <div className="home-container">
        <div className="home-card">
          <h1>Months in a Mood</h1>
          <div className="home-display">
            <div className="login-card home">
              <div className="month-carousel">
                <button
                  type="button"
                  className="carousel-button"
                  data-testid="previous-button"
                  onClick={goToPreviousMonth}
                >
                  &#8249;
                </button>
                <h2>{activeMonth.monthName}</h2>
                <button
                  type="button"
                  className="carousel-button"
                  data-testid="next-button"
                  onClick={goToNextMonth}
                >
                  &#8250;
                </button>
              </div>
              <div className="calender-view">
                <ul className="days-list">
                  {daysList.map(day => (
                    <li key={day.day}>
                      <p>{day.day}</p>
                    </li>
                  ))}
                </ul>
                <ul className="calendar">
                  {activeMonth.dates.map(dateObj => {
                    const dateKey = `${activeMonthIndex}_${dateObj.date}`
                    const emojiName = selectedDates[dateKey]
                    const emojiObj = emojisList.find(
                      e => e.emojiName === emojiName,
                    )
                    return (
                      <li key={dateObj.date} className="dateObj">
                        <button
                          className="date-item"
                          type="button"
                          onClick={() => toggleEmojiOnDate(dateObj.date)}
                        >
                          <p>{dateObj.date}</p>
                          {emojiObj && (
                            <img
                              src={emojiObj.emojiUrl}
                              alt={dateObj.date}
                              className="emoji-icon"
                            />
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
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
                      <option key={emoji.emojiName} value={emoji.emojiName}>
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
                <h1 className="name-day-count">{nameDayCount}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
