import { motion } from "framer-motion"
import { ThumbsUp, Heart, MessageSquare, Repeat2, Send, Globe } from "lucide-react"
import ReactMarkdown from 'react-markdown'

export function LinkedInPreview({ content }: { content: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1b1f23] rounded-xl border border-gray-200 dark:border-white/10 max-w-md mx-auto overflow-hidden font-sans"
    >
      <div className="p-3 flex gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
        <div>
          <div className="font-semibold text-sm text-black dark:text-white">Your Name</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Marketing Expert • 1st</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            2h • <Globe className="w-3 h-3" />
          </div>
        </div>
      </div>

      <div className="px-3 pb-2">
        <div className="text-sm leading-relaxed mb-2 text-black dark:text-white">
          <ReactMarkdown
            components={{
              p: ({children}) => <p className="mb-3 last:mb-0 whitespace-pre-wrap">{children}</p>,
              h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
              h2: ({children}) => <h2 className="text-base font-bold mb-2">{children}</h2>,
              h3: ({children}) => <h3 className="text-sm font-bold mb-2">{children}</h3>,
              strong: ({children}) => <span className="font-bold">{children}</span>,
              em: ({children}) => <span className="italic">{children}</span>,
              ul: ({children}) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
              li: ({children}) => <li className="pl-1">{children}</li>,
              blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2 text-gray-600 dark:text-gray-400">{children}</blockquote>
            }}
          >
            {content || "Your LinkedIn post content will appear here..."}
          </ReactMarkdown>
        </div>
      </div>
      
      <div className="px-3 py-1 border-t border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
          <div className="flex -space-x-1">
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
              <ThumbsUp className="w-2 h-2 text-white fill-white" />
            </div>
            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
              <Heart className="w-2 h-2 text-white fill-white" />
            </div>
          </div>
          <span>42</span>
        </div>
      </div>

      <div className="px-1 py-1 border-t border-gray-100 dark:border-white/10 grid grid-cols-4 gap-1">
        <button className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors text-gray-600 dark:text-gray-300">
          <ThumbsUp className="w-5 h-5" />
          <span className="text-xs font-semibold">Like</span>
        </button>
        <button className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors text-gray-600 dark:text-gray-300">
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-semibold">Comment</span>
        </button>
        <button className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors text-gray-600 dark:text-gray-300">
          <Repeat2 className="w-5 h-5" />
          <span className="text-xs font-semibold">Repost</span>
        </button>
        <button className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors text-gray-600 dark:text-gray-300">
          <Send className="w-5 h-5" />
          <span className="text-xs font-semibold">Send</span>
        </button>
      </div>
    </motion.div>
  )
}
