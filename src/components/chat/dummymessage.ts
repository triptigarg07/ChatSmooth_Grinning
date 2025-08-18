import { ChatMessage } from "./ChatProvider";

export const dummyMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "system",
    createdAt: Date.now(),
    text: `Here are your matches for the day!
      
As you can see, all of these were posted just over a few days ago and they fit your strengths perfectly.`
  },
  {
    id: "2",
    sender: "user",
    createdAt: Date.now(),
    text: `Hey Felix, thank you so much for getting me these matches. I have a few questions about them.`,
  },
  {
    id: "3",
    sender: "system",
    createdAt: Date.now(),
    text: `Definitely! Your resume mentions Python and Matlab for GNC systems.`,
  },
];
