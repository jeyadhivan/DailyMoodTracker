import {createContext, useState} from 'react'
import {daysList, initialMonthsList, emojisList} from '../components/Data/data'

export const MoodContext = createContext()

export const MoodProvider = ({children}) => {
  const [selectedDates, setSelectedDates] = useState({})
  const [activeMonthIndex, setActiveMonthIndex] = useState(0)
  const [activeEmoji, setActiveEmoji] = useState(emojisList[0])
  const [selectedDay, setSelectedDay] = useState(daysList[0].day)
  const [selectedEmojiFilter, setSelectedEmojiFilter] = useState(
    emojisList[0].emojiName,
  )
  const [nameDayCount, setNameDayCount] = useState('00')

  return (
    <MoodContext.Provider
      value={{
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
      }}
    >
      {children}
    </MoodContext.Provider>
  )
}
