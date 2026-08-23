import { MessageCircle } from 'lucide-react'
import { BUSINESS, waLink } from '../data/business.js'

export default function WhatsAppButton() {
  return (
    <a
      href={waLink(BUSINESS.whatsapp[0], 'Assalam-o-Alaikum, I would like to order Junoon Tea.')}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-3.5 text-white shadow-2xl transition-all duration-300 hover:pr-5 sm:bottom-7 sm:right-7"
      aria-label="Chat with Junoon Tea on WhatsApp"
    >
      <MessageCircle size={24} className="shrink-0" fill="currentColor" strokeWidth={0} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100">
        Order on WhatsApp
      </span>
    </a>
  )
}
