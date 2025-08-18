"use client";

import { Paperclip, Smile, Mic, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ChatInput({
  input,
  setInput,
  send,
}: {
  input: string;
  setInput: (v: string) => void;
  send: () => void;
}) {
  return (
    <div className="p-3 bg-[#e0f2fe] rounded-b-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex flex-col gap-3"
      >
        {/* Textarea */}
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Please type your message"
          aria-label="Chat message input"
          className="min-h-[80px] sm:min-h-[120px] resize-none bg-white text-gray-800 placeholder:text-gray-500"
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Select options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 w-full">
            {[1, 2, 3, 4].map((i) => (
              <Select key={i}>
                <SelectTrigger className="h-8 text-xs bg-white text-gray-800 [&>span]:text-gray-800 [&>svg]:text-gray-800">
                  <SelectValue placeholder={`Option ${i}`} />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-800">
                  <SelectItem value="a">A</SelectItem>
                  <SelectItem value="b">B</SelectItem>
                </SelectContent>
              </Select>
            ))}
          </div>

          {/* Send button */}
          <Button
            type="submit"
            size="sm"
            className="shrink-0 bg-[#ffcc80] text-gray-800 hover:bg-[#ffbb66] mt-2 sm:mt-0"
          >
            <SendIcon size={16} className="mr-1" /> Send
          </Button>

          {/* Attachment/emoji/voice buttons */}
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              type="button"
              aria-label="Add attachment"
              className="hover:opacity-80 text-gray-600"
            >
              <Paperclip size={16} />
            </button>
            <button
              type="button"
              aria-label="Add emoji"
              className="hover:opacity-80 text-gray-600"
            >
              <Smile size={16} />
            </button>
            <button
              type="button"
              aria-label="Record voice"
              className="hover:opacity-80 text-gray-600"
            >
              <Mic size={16} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
