"use client"

import { useState, useEffect, useMemo } from "react"
import { useCompletion } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Copy, Check, Loader2, Twitter, Linkedin, Instagram, Video, Minus, Plus, RefreshCw, Clock, Trash2, Download, X, ArrowRight, FileText } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { TwitterPreview } from "@/components/previews/TwitterPreview"
import { LinkedInPreview } from "@/components/previews/LinkedInPreview"
import { InstagramPreview } from "@/components/previews/InstagramPreview"
import { TikTokPreview } from "@/components/previews/TikTokPreview"

export default function DashboardPage() {
  const [audience, setAudience] = useState("General Public")
  const [platform, setPlatform] = useState("Twitter")
  const [tone, setTone] = useState("Professional")
  const [useTrends, setUseTrends] = useState(false)
  const [useEmojis, setUseEmojis] = useState(true)
  const [copied, setCopied] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [history, setHistory] = useState<Array<{ prompt: string; content: string; platform: string; audience: string; tone: string; timestamp: string }>>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem("connic-history")
      if (stored) setHistory(JSON.parse(stored))
    } catch (error) {
      console.error("Failed to load history from localStorage:", error)
    }
  }, [])

  const { completion, input, setInput, handleInputChange, handleSubmit, isLoading, complete } = useCompletion({
    api: '/api/generate',
    body: {
      audience,
      platform,
      tone,
      useTrends,
      useEmojis
    },
    onFinish: (_prompt, completion) => {
      const entry = {
        prompt: input,
        content: completion,
        platform,
        audience,
        tone,
        timestamp: new Date().toISOString(),
      }
      setHistory(prev => {
        const updated = [entry, ...prev].slice(0, 10)
        localStorage.setItem("connic-history", JSON.stringify(updated))
        return updated
      })
    }
  })

  const handleRefine = (action: string) => {
    if (!completion) return
    const refinementPrompt = `Original: ${completion}\n\nTask: ${action}`
    complete(refinementPrompt)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(completion)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getPlatformIcon = (p: string) => {
    switch(p) {
      case "Twitter": return <Twitter className="w-5 h-5 text-blue-400" />
      case "LinkedIn": return <Linkedin className="w-5 h-5 text-blue-700" />
      case "Instagram": return <Instagram className="w-5 h-5 text-pink-600" />
      case "TikTok": return <Video className="w-5 h-5 text-black dark:text-white" />
      default: return <Sparkles className="w-5 h-5" />
    }
  }

  const platformCharLimits: Record<string, number> = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
    TikTok: 2200,
  }

  const charLimit = platformCharLimits[platform] || 280
  const charRatio = input.length / charLimit
  const charColor = charRatio > 1 ? "text-red-400" : charRatio > 0.8 ? "text-yellow-400" : "text-muted-foreground"

  const handleDownload = () => {
    if (!completion) return
    const date = new Date().toISOString().split("T")[0]
    const filename = `connic-${platform.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${date}.txt`
    const blob = new Blob([completion], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("connic-history")
  }

  const loadHistoryItem = (item: typeof history[number]) => {
    setInput(item.prompt)
    setPlatform(item.platform)
    setAudience(item.audience)
    setTone(item.tone)
    complete(item.prompt, { body: { audience: item.audience, platform: item.platform, tone: item.tone, useTrends, useEmojis } })
    setHistoryOpen(false)
  }

  const wordCount = useMemo(() => completion ? completion.trim().split(/\s+/).filter(Boolean).length : 0, [completion])
  const readingTime = useMemo(() => Math.max(1, Math.ceil(wordCount / 200)), [wordCount])

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <header className="border-b bg-black/20 backdrop-blur-md sticky top-0 z-10 border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <Sparkles size={18} />
            </div>
            Connic AI
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHistoryOpen(true)}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <Clock className="w-4 h-4 mr-2" />
              History
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Create Campaign</h1>
            <p className="text-muted-foreground">
              Configure your target audience and platform to generate optimized copy.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">What are you promoting?</Label>
              <Textarea 
                placeholder="e.g. A new coffee shop opening in downtown Lagos with free wifi and student discounts..."
                className="min-h-[120px] resize-none text-base bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-white/20"
                value={input}
                onChange={handleInputChange}
                required
              />
              <p className={`text-xs mt-1 ${charColor}`}>
                {input.length} / {charLimit} for {platform}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Target Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-white/10 text-white">
                    <SelectItem value="General Public">General Public</SelectItem>
                    <SelectItem value="University Students">University Students</SelectItem>
                    <SelectItem value="Busy Parents">Busy Parents</SelectItem>
                    <SelectItem value="Corporate Professionals">Corporate Professionals</SelectItem>
                    <SelectItem value="Small Business Owners">Small Business Owners</SelectItem>
                    <SelectItem value="Tech Enthusiasts">Tech Enthusiasts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-white/10 text-white">
                    <SelectItem value="Twitter">Twitter / X</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="TikTok">TikTok (Script)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Tone of Voice</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-white/10 text-white">
                  <SelectItem value="Professional">Professional & Trustworthy</SelectItem>
                  <SelectItem value="Casual">Casual & Friendly</SelectItem>
                  <SelectItem value="Witty">Witty & Humorous</SelectItem>
                  <SelectItem value="Urgent">Urgent (FOMO)</SelectItem>
                  <SelectItem value="Empathetic">Empathetic & Understanding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                <Label className="text-white cursor-pointer" htmlFor="trends">Trend Injection</Label>
                <button
                  type="button"
                  id="trends"
                  onClick={() => setUseTrends(!useTrends)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${useTrends ? 'bg-primary' : 'bg-white/20'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${useTrends ? 'left-5' : 'left-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                <Label className="text-white cursor-pointer" htmlFor="emojis">Use Emojis</Label>
                <button
                  type="button"
                  id="emojis"
                  onClick={() => setUseEmojis(!useEmojis)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${useEmojis ? 'bg-primary' : 'bg-white/20'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${useEmojis ? 'left-5' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base bg-white text-black hover:bg-gray-200" disabled={isLoading || !input}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Copy
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between h-[52px]">
            <h2 className="text-xl font-semibold text-white">Preview</h2>
            {completion && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy} className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? "Copied" : "Copy Text"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </div>



          <div className="h-[calc(100%-80px)] rounded-3xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-md relative group">
            <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            {completion ? (
              <div className="h-full overflow-y-auto p-6 custom-scrollbar flex flex-col">
                <div className="flex-1 flex items-center justify-center min-h-[400px]">
                  {platform === "Twitter" && <TwitterPreview content={completion} />}
                  {platform === "LinkedIn" && <LinkedInPreview content={completion} />}
                  {platform === "Instagram" && <InstagramPreview content={completion} />}
                  {platform === "TikTok" && <TikTokPreview content={completion} />}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-3 gap-3 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => handleRefine("Make it shorter")} className="text-xs text-muted-foreground hover:text-white hover:bg-white/10 h-9">
                    <Minus className="w-3.5 h-3.5 mr-2" /> Shorten
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleRefine("Make it longer")} className="text-xs text-muted-foreground hover:text-white hover:bg-white/10 h-9">
                    <Plus className="w-3.5 h-3.5 mr-2" /> Expand
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleRefine("Rewrite it completely")} className="text-xs text-muted-foreground hover:text-white hover:bg-white/10 h-9">
                    <RefreshCw className="w-3.5 h-3.5 mr-2" /> Rewrite
                  </Button>
                </div>

                <p className="mt-3 text-xs text-muted-foreground text-center">
                  {wordCount} words · ~{readingTime} min read
                </p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                  <Sparkles className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Create</h3>
                <p className="text-sm max-w-xs mx-auto text-gray-400">
                  Configure your audience and platform settings on the left to generate premium marketing copy.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* History Slide-out Panel */}
      <AnimatePresence>
        {historyOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setHistoryOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-neutral-950 border-l border-white/10 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Clock className="w-5 h-5" />
                  Generation History
                </div>
                <div className="flex items-center gap-2">
                  {history.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearHistory} className="text-red-400 hover:text-red-300 hover:bg-white/10">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => setHistoryOpen(false)} className="text-white/70 hover:text-white hover:bg-white/10">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                    <FileText className="w-10 h-10 mb-3 opacity-20" />
                    <p className="text-sm">No generations yet</p>
                  </div>
                ) : (
                  history.map((item, index) => (
                    <div key={`${item.timestamp}-${index}`} className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(item.platform)}
                          <span className="text-xs text-muted-foreground">{item.platform}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-sm text-white/80 line-clamp-2">{item.prompt}</p>
                      <Button variant="ghost" size="sm" onClick={() => loadHistoryItem(item)} className="w-full text-xs text-muted-foreground hover:text-white hover:bg-white/10 h-8">
                        <ArrowRight className="w-3.5 h-3.5 mr-2" />
                        Load
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
