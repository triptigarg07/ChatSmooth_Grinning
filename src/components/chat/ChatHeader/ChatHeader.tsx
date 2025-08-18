import { X } from "lucide-react";

interface ChatHeaderProps {
  isSecondary: boolean;
  count: number;
  onMinimize: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isSecondary,
  count,
  onMinimize,
}) => (
  <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
    <div className="font-medium text-sm text-gray-800">Chat</div>
    <div className="flex items-center gap-3">
      <div className="text-xs text-gray-600">{count} messages</div>
      <button
        aria-label={isSecondary ? "Minimize chat" : "Close chat"}
        className="text-gray-800 hover:opacity-80"
        style={{ marginLeft: 2 }}
        onClick={onMinimize}
      >
        <X size={16} />
      </button>
    </div>
  </div>
);
