import axios from 'axios';

class GPT {
  static async GET_ANS(MSG: string): Promise<string> {
    const url = "https://api.openai.com/v1/chat/completions";
    const api_key = "";
    const model = "gpt-3.5-turbo";

    try {
      const headers = {
        "Authorization": `Bearer ${api_key}`,
        "Content-Type": "application/json"
      };

      const temperature = (Math.floor(Math.random() * 9) + 1) / 10; // 0.1 - 0.9
	  // console.log(`TEMP: ${temperature}`);
      const body = {
        model: model,
        temperature: temperature,
        messages: [{ role: "user", content: MSG }]
      };

      const response = await axios.post(url, body, { headers });
      try {
        return response.data.choices[0].message.content;
      } catch (error) {
        throw new Error(`Error parsing response: ${error}`);
      }
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  }
}

async function main() {
  let message = "";
  let subject = "9x9 ascii face";
  let chars = "~ _ - \ / | *"
  
  message = "no extra description or explanation: draw a " + subject + " using only these available characters as needed: " + chars;
  try {
    const answer = await GPT.GET_ANS(message);
    console.log(`${answer}`);
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
  await new Promise(f => setTimeout(f, 1000));
  
  let grade = "";
  message = "respond with a single letter: could you improve this face any further? FALSE - 'A' , TRUE - 'B'";
  try {
    const answer = await GPT.GET_ANS(message);
	grade = answer[0];
    console.log(`> ${answer}`);
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
  await new Promise(f => setTimeout(f, 500));
  
  while(grade != "A") {
	message = "no extra drawing or explanation: redraw the " + subject + " using a different method and still using only these avaiable characters as needed: " + chars;
	try {
      const answer = await GPT.GET_ANS(message);
      console.log(`${answer}`);
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
	await new Promise(f => setTimeout(f, 500));
	
	message = "respond with a single letter: could you improve this face any further? FALSE - 'A' , TRUE - 'B'";
    try {
      const answer = await GPT.GET_ANS(message);
   	  grade = answer[0];
      console.log(`> ${answer}`);
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
	await new Promise(f => setTimeout(f, 500));
  }
}

main();
