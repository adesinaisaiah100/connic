import { motion } from "framer-motion"
import { MessageCircle, Repeat, Heart, Share } from "lucide-react"
import ReactMarkdown from 'react-markdown'

export function TwitterPreview({ content }: { content: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black text-white p-4 rounded-xl border border-white/10 max-w-md mx-auto font-sans"
    >
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-bold">Your Name</span>
            <span className="text-gray-500 text-sm">@yourhandle · 1h</span>
          </div>
          <div className="mt-1 text-[15px] leading-normal text-white/90">
            <ReactMarkdown 
              components={{
                p: ({children}) => <p className="mb-2 last:mb-0 whitespace-pre-wrap">{children}</p>,
                a: ({children}) => <span className="text-blue-400 hover:underline">{children}</span>,
                strong: ({children}) => <span className="font-bold text-white">{children}</span>,
                em: ({children}) => <span className="italic text-white/90">{children}</span>,
                ul: ({children}) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                li: ({children}) => <li className="pl-1">{children}</li>
              }}
            >
              {content || "Your tweet content will appear here..."}
            </ReactMarkdown>
          </div>
          
          <div className="mt-3 flex items-center justify-between max-w-[85%] text-gray-500">
            <button className="flex items-center gap-2 group hover:text-blue-400 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs">24</span>
            </button>
            <button className="flex items-center gap-2 group hover:text-green-400 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-green-500/10">
                <Repeat className="w-4 h-4" />
              </div>
              <span className="text-xs">12</span>
            </button>
            <button className="flex items-center gap-2 group hover:text-pink-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-xs">148</span>
            </button>
            <button className="flex items-center gap-2 group hover:text-blue-400 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                <Share className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
