"use client"

import { useState } from "react"
import { useCompletion } from "@ai-sdk/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Sparkles, Copy, Check, Loader2, Twitter, Linkedin, Instagram, Video, Wand2, RefreshCw, Minus, Plus, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { TwitterPreview } from "@/components/previews/TwitterPreview"
import { LinkedInPreview } from "@/components/previews/LinkedInPreview"
import { InstagramPreview } from "@/components/previews/InstagramPreview"
import { TikTokPreview } from "@/components/previews/TikTokPreview"
import { createClient } from "@/lib/supabase/client"

export default function DashboardPage() {
  const [audience, setAudience] = useState("General Public")
  const [platform, setPlatform] = useState("Twitter")
  const [tone, setTone] = useState("Professional")
  const [useTrends, setUseTrends] = useState(false)
  const [useEmojis, setUseEmojis] = useState(true)
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }
  
  const { completion, input, setInput, handleInputChange, handleSubmit, isLoading, complete } = useCompletion({
    api: '/api/generate',
    body: {
      audience,
      platform,
      tone,
      useTrends,
      useEmojis
    },
    onFinish: () => {
      // Animate result in if needed
    }
  })

  const handleRefine = (action: string) => {
    if (!completion) return
    const refinementPrompt = `Original: ${completion}\n\nTask: ${action}`
    complete(refinementPrompt)
  }

  const copyToClipboard = () => {
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
              onClick={handleSignOut}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-white">
              U
            </div>
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
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy Text"}
              </Button>
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
    </div>
  )
}
