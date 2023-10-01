import '../autosuggest.css'
// import React, { useState, useEffect } from 'react';
// import Autosuggest from 'react-autosuggest';
import { BASE_URL } from '../App';
import axios from 'axios';

// export const InputWithAutosuggest = (props) => {
//   const [suggestions, setSuggestions] = useState([])

//   function escapeRegexCharacters(str) {
//     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
//   }
  
//   function getSuggestions(value) {
//     const escapedValue = escapeRegexCharacters(value.trim())
//     if (escapedValue === '') {
//       return [];
//     }

//     const regex = new RegExp('^' + escapedValue, 'i')
//     return flags.filter(item => regex.test(item.flag))
//   }

//   function getSuggestionValue(suggestion) {
//     return suggestion.name;
//   }
  
//   function onClickSuggestion(item){
//     props.setFlags(...props.flags, props.flags.push(item))
//     console.log(props.flags)
//   }

//   function renderSuggestion(suggestion) {
//     return (
//       <span onClick={() => onClickSuggestion(suggestion)}>{suggestion.flag}</span>
//     );
//   }

//   const onSuggestionsFetchRequested = ({ value }) => {
//     setSuggestions(getSuggestions(value));
//   };

//   const onSuggestionsClearRequested = () => {
//     setSuggestions([]);
//   };

//   const inputProps = {
//     placeholder: "Type flags to your post",
//     value: props.value,
//     onChange: props.onChange
//   }

//   useEffect(() => {
//     getFlags()
//   }, []);

//   return (
//     <Autosuggest
//       required
//       suggestions={suggestions}
//       onSuggestionsFetchRequested={onSuggestionsFetchRequested}
//       onSuggestionsClearRequested={onSuggestionsClearRequested}
//       getSuggestionValue={getSuggestionValue}
//       renderSuggestion={renderSuggestion}
//       inputProps={inputProps}
//     />
//   );
// };

import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
// import './AutosuggestInput.css'; // Estilos opcionais

export const InputWithAutosuggest = ({setSelectedFlags, selectedFlags}) => {
  const [value, setValue] = useState('');
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [flags, setFlags] = useState([])

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const headers = {
    headers: {
      authorization: localStorage.getItem("token")
    }
  }

  const getFlags = async () => {
  try {
    const response = await axios.get(BASE_URL + `/flags`, headers)
    setFlags(response.data)
  } catch (error) {
    console.log(error.response.data)
  }
}
  useEffect(() => {
    getFlags()
  }, []);

  const onSuggestionsFetchRequested = () => {
    const Suggestions = flags.map((item)=> item.flag)
    // const filteredSuggestions = flags.filter(item =>
    //   item.flag.toLowerCase().includes(value.toLowerCase())
    // );
    setSuggestionsList(Suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

  const getSuggestionValue = suggestion => suggestion;

  const renderSuggestion = suggestion => <div>{suggestion}</div>;

  const inputProps = {
    placeholder: 'Select up to 3 flags related to this post',
    value,
    onChange,
    disabled: selectedFlags.length === 3 ? true : false
  };

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
  );
};

// export default AutosuggestInput;
