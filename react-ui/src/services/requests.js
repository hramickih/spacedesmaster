import {BACK_END_IP} from "../constants";

export function request(URL, method, data) {

  if(method === "HEAD" || method === "GET") {
    return fetch(BACK_END_IP+URL)
      .then(response => response.json())
      .then(response => {
          console.log(response)
        return response;
      });
  }

  else {
    console.log(data, "DATA");
    return fetch(BACK_END_IP+URL,{
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...data})
    })
      .then(response => response.json())
      .then(response => {
          console.log(response)
        return response;
      });
  }
}