"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const Agent = ({ userName, userId, type }: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    } 
    
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/quiz");
      }
    }

    }, [messages, callStatus, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

      await vapi.start(
        undefined,
        undefined,
        undefined,
        process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
        {
          variableValues: {
            username: userName,
            userid: userId,
          },
        }
      );
    
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="w-full px-4 sm:px-10 py-6">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-stretch justify-center w-full">
          {/* AI Interviewer Card */}
          <div className="flex flex-col items-center justify-center gap-4 flex-1 rounded-2xl border border-primary-200/50 bg-white shadow-md p-6 sm:p-8">
            <div className="relative flex items-center justify-center size-28 sm:size-32 rounded-full bg-gray-100">
              <Image
                src="/images/ai-avatar.png"
                alt="AI Interviewer"
                width={80}
                height={80}
                className="object-cover"
              />
              {isSpeaking && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-900 opacity-50" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              AI Interviewer
            </h3>
          </div>

          {/* User Card */}
          <div className="flex flex-col items-center justify-center gap-4 flex-1 rounded-2xl border border-primary-200/50 bg-white shadow-md p-6 sm:p-8">
            <div className="relative flex items-center justify-center size-28 sm:size-32 rounded-full bg-gray-100">
              <Image
                src="/images/user-avatar.png"
                alt="User"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{userName}</h3>
          </div>
        </div>

        {messages.length > 0 && (
          <div className="transcript">
            <div className="transcript-message no-scrollbar">
              <p
                key={lastMessage}
                className={cn(
                  "transition-fade duration-500 opacity-0",
                  "animate-fadeIn opacity-100"
                )}
              >
                {lastMessage}
              </p>
            </div>
          </div>
        )}

        <div className="w-full flex justify-center">
          {/* <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus ===CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                               {callStatus === CallStatus.ACTIVE
                               ? "End Session"
                               : callStatus === CallStatus.CONNECTING
                                   ? 'Connecting'
                               : 'Start Session'
                               }
                           </button> */}
          {callStatus !== "ACTIVE" ? (
            <button className="relative btn-call" onClick={() => handleCall()}>
              <span
                className={cn(
                  "absolute animate-ping rounded-full opacity-75",
                  callStatus !== "CONNECTING" && "hidden"
                )}
              />

              <span className="relative">
                {callStatus === "INACTIVE" || callStatus === "FINISHED"
                  ? "Call"
                  : ". . ."}
              </span>
            </button>
          ) : (
            <button
              className="btn-disconnect"
              onClick={() => handleDisconnect()}
            >
              End
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Agent;
