'use client';
/**
 * Shows all existing conversations. Allows you to click on conversation and send messages?
 */

// External Components
import Loading from '@components/common/Loading';
import GroupChatBlock from '@components/common/GroupChatBlock';
import ChatMessage from '@components/common/ChatMessage';

// Icons
import {
  BsArrowUpRight,
  BsSendFill,
} from 'react-icons/bs';

// Auth
import { auth } from '@/firebase/clientApp';
import { useUser } from '@context/UserContext';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Inbox() {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);

  if (user && !user.emailVerified) {
    router.push('/dev/verify');
    return <Loading />;
  } else if (loading) {
    return <Loading />;
  } else if (error) {
    router.push('/');
    console.log('no user signed in home');
    return <Loading />;
  }
  
  // WE WILL USE THIS SOON ON THIS PAGE, NEED TO REPLACE INSTANCES OF user WITH fbuser
  // const { fbuser } = useUser();

  return (
    <div className="w-full h-full flex flex-row items-center justify-center p-4">
      <div className="w-1/4 h-full flex flex-col items-center bg-[#252525] p-2 border-[#747474] border-e-2 rounded-l-3xl">
        <h1 className="text-xl font-semibold">Inbox</h1>
        <hr className="my-1 border-t-2 w-full border-[#3b3b3b]" />
        {/* TODO: Add timestamp for messages ? (idk if this is possible with firebase msging) */}
        <div className="flex flex-col w-full overflow-y-scroll">
          <GroupChatBlock
            groupImage={"https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781647228231/minecraft-steve-block-stationery-set-9781647228231_hr.jpg"}
            groupName={"Group Chat A"}
            lastMessage={"This is the last message."}
            isSelected={true}
            hasNotification={false}
          />
          <GroupChatBlock
            groupImage={"https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781647228231/minecraft-steve-block-stationery-set-9781647228231_hr.jpg"}
            groupName={"Group Chat B"}
            lastMessage={"This is the last message."}
            isSelected={false}
            hasNotification={true}
          />
          <GroupChatBlock
            groupImage={"https://media.licdn.com/dms/image/D4E03AQH5CpaCJCgo1A/profile-displayphoto-shrink_800_800/0/1694814673983?e=2147483647&v=beta&t=K1MezuWNQkHxSqXzqjWwQAf4RrzOLJ0vKc5S1Ewi60A"}
            groupName={"Group Chat C"}
            lastMessage={"This is the last message."}
            isSelected={false}
            hasNotification={true}
          />
          <GroupChatBlock
            groupImage={"https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781647228231/minecraft-steve-block-stationery-set-9781647228231_hr.jpg"}
            groupName={"Group Chat D"}
            lastMessage={"This is the last message."}
            isSelected={false}
            hasNotification={true}
          />
        </div>
      </div>
      {/* TODO: componentize this so it can be swapped out based on which group is being viewed */}
      <div className="w-3/4 h-full flex flex-col bg-[#252525] mr-4 overflow-hidden rounded-r-3xl">
        {/* Chat heading container */}
        <div className="w-full h-20 flex items-center justify-between bg-[#1f1f1f] px-2">
          {/* Image + chat name */}
          <div className="flex items-center">
            <img
              src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781647228231/minecraft-steve-block-stationery-set-9781647228231_hr.jpg"
              className="w-12 h-12 rounded-full ml-2 mr-4"
              alt="Group Chat Image">
            </img>
            <h1 className="text-xl font-semibold mr-2">The Crafters</h1>
          </div>
          {/* Link to project page */}
          <div className="transition-all duration-300 ease-in-out rounded-full p-2 mr-2 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7]">
            <BsArrowUpRight className="text-xl" />
          </div>
        </div>
        {/* Chat body container - contains all the messages in the chat */}
        <div className="w-full h-full flex flex-col overflow-y-scroll px-4 py-2">
          <ChatMessage messageContent={"Hey, how's it going?"} isOwnMessage={true} user={user} />
          <ChatMessage messageContent={"Not too bad, just busy with work."} isOwnMessage={false} user={user} />
          <ChatMessage messageContent={"I totally get that. Anything exciting happening?"} isOwnMessage={true} user={user} />
          <ChatMessage messageContent={"Well, I'm planning a trip for next month. Super excited about it!"} isOwnMessage={false} user={user} />
          <ChatMessage messageContent={"That sounds amazing! Where are you planning to go?"} isOwnMessage={true} user={user} />
          <ChatMessage messageContent={"I'm thinking about exploring Europe, maybe visit Italy and France."} isOwnMessage={false} user={user} />
          <ChatMessage messageContent={"Wow, that's a dream vacation! What places are you most excited about?"} isOwnMessage={true} user={user} />
          <ChatMessage messageContent={"Definitely looking forward to the art and history in Florence, and of course, the Eiffel Tower in Paris."} isOwnMessage={false} user={user} />
          <ChatMessage messageContent={"Sounds incredible! Don't forget to try the local cuisine, it's always a highlight."} isOwnMessage={true} user={user} />
          <ChatMessage messageContent={"Absolutely, I'm a foodie, so trying new dishes is a must for me."} isOwnMessage={false} user={user} />
          <ChatMessage messageContent={"Speaking of food, have you tried the new restaurant downtown?"} isOwnMessage={true} user={user} />
          <ChatMessage messageContent={"Not yet, is it any good?"} isOwnMessage={false} user={user} />
          <ChatMessage messageContent={"It's fantastic! We should plan a dinner there sometime."} isOwnMessage={true} user={user} />
          <ChatMessage messageContent={"Sure, that sounds like a plan. I'll check it out soon and let you know."} isOwnMessage={false} user={user} />
          <ChatMessage messageContent={"Great! Looking forward to it. By the way, did you catch the latest movie?"} isOwnMessage={true} user={user} />
          <ChatMessage messageContent={"Not yet, but I heard it's really good. Planning to watch it this weekend."} isOwnMessage={false} user={user} />
          <ChatMessage messageContent={"Nice! Let me know how it is. We can compare notes."} isOwnMessage={true} user={user} />
          <ChatMessage messageContent={"Will do! Anyway, I've got to run. Talk to you later?"} isOwnMessage={false} user={user} />
          <ChatMessage messageContent={"Sure thing! Take care and catch up with you soon."} isOwnMessage={true} user={user} />
        </div>
        {/* Chat messenger container - contains the text bar where users can send messages */}
        <div className="w-full h-20 flex items-center bg-[#1f1f1f] border-[#747474] border-t-2 p-3">
          <input type="text" placeholder="Type a message..." className="w-full h-full bg-[#252525] text-stone-200 outline-none rounded-xl mr-2 p-2 break-words"></input>
          <div className="transition-all duration-300 ease-in-out rounded-full p-3 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7]">
            <BsSendFill className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
