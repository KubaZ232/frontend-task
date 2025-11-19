import { faker } from '@faker-js/faker';

/*
# Task Description

You will create a very simple app that allows the user to save a hypothetical file to the server by clicking a button. 
When the button is clicked, a save request should be sent to the server. 
Please note - occasionally, there may be errors on the server side that need to be handled appropriately.

## Levels

This task is divided into three difficulty levels. 
Please choose the one you are most comfortable solving:

1. Single Request Only
Ensure that only one request can be sent at a time. No parallel requests should be allowed.

2. Limit to Three Parallel Requests
Allow up to three requests to be sent in parallel. No more than three requests should run simultaneously.

3. Three Parallel Requests with Feedback
Allow up to three requests to be sent in parallel (maximum of three). 
Additionally, inform the user about the status of each action—whether the file was saved successfully or not.

## Additional Notes

- Keep the UI minimalistic but meaningful!
- The design should be simple and intuitive while clearly conveying the necessary information.
- If possible use proper TypeScript types.
- If you have a preferred library that fits the requirements, you’re welcome to use it!

GLHF 🚀

*/

const SaveFile = () =>
  new Promise((res, rej) => {
    const timeToResolve = faker.number.int({ min: 1000, max: 3000 });

    setTimeout(() => {
      Math.random() > 0.5
        ? res(`Success: ${faker.system.commonFileName()} saved`)
        : rej(`Error: ${faker.system.commonFileName()} not saved`);
    }, timeToResolve);
  });

function App() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen">
      <h1>Async Challange</h1>
      <button className="bg-blue-400" onClick={() => SaveFile()}>
        Save File
      </button>
    </div>
  );
}

export default App;
