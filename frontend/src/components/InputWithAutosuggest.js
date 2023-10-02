import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import '../autosuggest.css'

export const InputWithAutosuggest = ({setSelectedFlags, selectedFlags, suggestions}) => {
  const [value, setValue] = useState('')
  const [suggestionsList, setSuggestionsList] = useState([])

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  }

  const onSuggestionsFetchRequested = () => {
    const suggestionsArray = suggestions
    .map((item)=> item.name)
    .filter(item => item.toLowerCase().includes(value.toLowerCase()))
    setSuggestionsList(suggestionsArray)
  }
  
  const onSuggestionsClearRequested = () => {
    setSuggestionsList([])
  }

  const getSuggestionValue = suggestion => suggestion

  const renderSuggestion = suggestion => <div>{suggestion}</div>

  const inputProps = {
    placeholder: selectedFlags.length === 3 ? '3 selected topics' : 'Example: HTML, CSS, JavaScript',
    value,
    onChange,
    disabled: selectedFlags.length === 3 ? true : false
  }

  const onSuggestionSelected = (_, { suggestionValue }) => {
    setSelectedFlags([...selectedFlags, suggestionValue])
    setValue("")
  }

  return (
    <Autosuggest
      suggestions={suggestionsList}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  )
}
