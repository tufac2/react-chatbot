import {ApiAiClient} from 'api-ai-javascript';
import {applyMiddleware, createStore} from 'redux';

const accessToken = "1fee9bf4e7d44f1483787534c054848e";
const client = new ApiAiClient({accessToken});

const ON_MESSAGE = 'ON_MESSAGE';

export const sendMessage = (text, sender='user') => ({
  type: ON_MESSAGE,
  payload: [{text,  sender}]
});

const messageMiddleware = () => next => action => {
  next(action);
  
  if(action.type === ON_MESSAGE) {
    debugger
    const text = action.payload[0].text;
    
    client.textRequest(text)
      .then( onSuccess )
    
    function onSuccess(response) {
      const {result: {fulfillment}} = response;
      next(sendMessage(fulfillment.speech, 'bot'));
    }
  }
};

const initState = [{ text: "hey"}];

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case ON_MESSAGE:
      debugger
      return [...state, ...action.payload];
    default:
      return state;
  }
};
debugger
export const store = createStore(messageReducer, applyMiddleware(messageMiddleware));