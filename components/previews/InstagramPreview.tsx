import { motion } from "framer-motion"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"
import ReactMarkdown from 'react-markdown'

export function InstagramPreview({ content }: { content: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white text-black rounded-xl border border-gray-200 max-w-md mx-auto overflow-hidden font-sans"
    >
      <div className="p-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-white border-2 border-transparent" />
          </div>
          <span className="text-sm font-semibold">yourbrand</span>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-600" />
      </div>
      
      <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
        <span className="text-sm">Image Placeholder</span>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Heart className="w-6 h-6" />
            <MessageCircle className="w-6 h-6" />
            <Send className="w-6 h-6" />
          </div>
          <Bookmark className="w-6 h-6" />
        </div>
        
        <div className="font-semibold text-sm mb-1">1,234 likes</div>
        
        <div className="text-sm">
          <span className="font-semibold mr-2">yourbrand</span>
          <div className="inline">
            <ReactMarkdown
              components={{
                p: ({children}) => <p className="mb-2 last:mb-0 whitespace-pre-wrap">{children}</p>,
                strong: ({children}) => <span className="font-semibold">{children}</span>,
                em: ({children}) => <span className="italic">{children}</span>,
                ul: ({children}) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                li: ({children}) => <li>{children}</li>
              }}
            >
              {content || "Your caption will appear here..."}
            </ReactMarkdown>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-2 uppercase">2 hours ago</div>
      </div>
    </motion.div>
  )
}
