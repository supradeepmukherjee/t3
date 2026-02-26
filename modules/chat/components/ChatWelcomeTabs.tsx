import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code, GraduationCap, Newspaper, Sparkles } from "lucide-react";
import { useState } from "react";


const CHAT_TAB_MESSAGE = [
  {
    tabName: "Create",
    icon: <Sparkles className="h-4 w-4" />,
    messages: [
      "Write a short story about a robot discovering emotions",
      "Help me outline a sci-fi novel set in a post-apocalyptic world",
      "Create a character profile for a complex villain with sympathetic motives",
      "Give me 5 creative writing prompts for flash fiction",
    ],
  },
  {
    tabName: "Explore",
    icon: <Newspaper className="h-4 w-4" />,
    messages: [
      "Good books for fans of Rick Rubin",
      "Countries ranked by number of corgis",
      "Most successful companies in the world",
      "How much does Claude cost?",
    ],
  },
  {
    tabName: "Code",
    icon: <Code className="h-4 w-4" />,
    messages: [
      "Write code to invert a binary search tree in Python",
      "What is the difference between Promise.all and Promise.allSettled?",
      "Explain React's useEffect cleanup function",
      "Best practices for error handling in async/await",
    ],
  },
  {
    tabName: "Learn",
    icon: <GraduationCap className="h-4 w-4" />,
    messages: [
      "Beginner's guide to TypeScript",
      "Explain the CAP theorem in distributed systems",
      "Why is AI so expensive?",
      "Are black holes real?",
    ],
  },
];

const ChatWelcomeTabs = ({ name, onSelectMsg }: {
  name?: string
  onSelectMsg: (msg: string) => void
}) => {
  const [tab, setTab] = useState(0)
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-4xl font-semibold ">
          How can I help you, {name?.slice(0, name.indexOf(' '))}
        </h1>
        <div className="flex flex-wrap gap-2 w-full">
          {CHAT_TAB_MESSAGE.map((t, i) => (
            <Button
              key={i}
              variant={tab === i ? 'default' : 'secondary'}
              onClick={() => setTab(i)}
              className="w-27.5 justify-start">
              {t.icon}
              <span className="ml-2">
                {t.tabName}
              </span>
            </Button>
          ))}
        </div>
        <div className="space-y-3 w-full min-h-60">
          {CHAT_TAB_MESSAGE[tab].messages.map((m, i) => (
            <div key={i} className="">
              <button onClick={() => onSelectMsg(m)} className="w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors duration-300 ease-in-out py-2">
                {m}
              </button>
              {i < CHAT_TAB_MESSAGE[tab].messages.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatWelcomeTabs