import { motion } from "framer-motion"
import { Music2, Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import ReactMarkdown from 'react-markdown'

export function TikTokPreview({ content }: { content: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black text-white rounded-xl border border-white/10 max-w-xs mx-auto h-[500px] relative overflow-hidden font-sans"
    >
      {/* Video Placeholder */}
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <span className="text-white/20 text-lg font-bold">Video Content</span>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-b from-transparent via-transparent to-black/60">
        <div className="flex items-end justify-between">
          <div className="flex-1 mr-12">
            <div className="font-semibold mb-2">@yourbrand</div>
            <div className="text-sm leading-relaxed text-shadow-sm h-[280px] overflow-y-auto pr-2">
              <ReactMarkdown
                components={{
                  p: ({children}) => <p className="mb-2 last:mb-0 whitespace-pre-wrap text-white">{children}</p>,
                  strong: ({children}) => <span className="font-bold text-white">{children}</span>,
                  em: ({children}) => <span className="italic text-white/90">{children}</span>,
                  ul: ({children}) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                  li: ({children}) => <li>{children}</li>,
                  h1: ({children}) => <h1 className="text-base font-bold mb-1 mt-2">{children}</h1>,
                  h2: ({children}) => <h2 className="text-sm font-bold mb-1 mt-2">{children}</h2>
                }}
              >
                {content || "Your TikTok script or caption will appear here..."}
              </ReactMarkdown>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium mt-2">
              <Music2 className="w-3 h-3 animate-spin-slow" />
              <div className="w-24 overflow-hidden">
                <div className="whitespace-nowrap animate-marquee">Original Sound - Your Brand</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pb-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-gray-700 border border-white flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white/20" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Heart className="w-8 h-8 text-white drop-shadow-md" />
              <span className="text-xs font-medium drop-shadow-md">84.2K</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MessageCircle className="w-8 h-8 text-white drop-shadow-md" />
              <span className="text-xs font-medium drop-shadow-md">1.2K</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Bookmark className="w-8 h-8 text-white drop-shadow-md" />
              <span className="text-xs font-medium drop-shadow-md">4.5K</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Share2 className="w-8 h-8 text-white drop-shadow-md" />
              <span className="text-xs font-medium drop-shadow-md">Share</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
