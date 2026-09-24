import { useState, useEffect } from 'react';
import { X, ShieldCheck, Building2, Key, Users, DollarSign, TrendingUp, Calendar, Star, FileText } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab?: (tab: 'landing' | 'archive' | 'portal' | 'dashboard' | 'concierge') => void;
}

const PASSKEY = 'estate2026';

const mockInquiries = [
  { id: 'INQ-901', client: 'Sir Alistair Vance', property: 'Villa Bellissima — Bel Air ($28.5M)', status: 'under-review', date: 'Today 2:30 PM', verified: true },
  { id: 'INQ-902', client: 'Elena Rostova', property: 'The Obsidian Penthouse ($16.8M)', status: 'escrow-ready', date: 'Yesterday', verified: true },
  { id: 'INQ-903', client: 'Kenji Takahashi', property: 'Kurogane Estate — Kyoto ($12.4M)', status: 'viewing-set', date: '2 days ago', verified: false },
  { id: 'INQ-904', client: 'Marcus & Thorne LP', property: 'Malibu Cliffside Sanctuary ($34.0M)', status: 'loi-received', date: '3 days ago', verified: true },
];

const metrics = [
  { label: 'Active Pipeline', value: '$91.7M', icon: DollarSign, color: 'text-amber-400' },
  { label: 'Verified HNWI', value: '48', icon: Users, color: 'text-amber-300' },
  { label: 'Private Escrows', value: '3', icon: Building2, color: 'text-emerald-400' },
  { label: 'Closing Ratio', value: '94.2%', icon: TrendingUp, color: 'text-yellow-400' },
];

export default function AdminPortalModal({ isOpen, onClose, onSelectTab }: AdminPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'listings' | 'settings'>('overview');
  const [passkey, setPasskey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAuthenticated(false);
      setPasskey('');
      setAuthError('');
      setActiveTab('overview');
    }
  }, [isOpen]);

  const handleAuth = () => {
    if (passkey === PASSKEY) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passkey. Use the 1-click auto-fill below.');
    }
  };

  if (!isOpen) return null;

  const statusColors: Record<string, string> = {
    'escrow-ready': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    'loi-received': 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    'viewing-set': 'text-sky-400 bg-sky-400/10 border-sky-400/30',
    'under-review': 'text-zinc-400 bg-zinc-400/10 border-zinc-700',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0A0A0B] border border-amber-500/20 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30">
              <Key className="h-4.5 w-4.5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Luxury Real Estate Portal OS</p>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Managing Broker Command Gate</h2>
            </div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-white transition-all cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {!authenticated ? (
            <div className="flex flex-col items-center justify-center p-10 space-y-6 min-h-[380px]">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
                    <ShieldCheck className="h-8 w-8 text-amber-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider mt-4">Broker Passkey Required</h3>
                <p className="text-xs text-zinc-400 font-mono max-w-xs mx-auto">Ultra-high-net-worth real estate operations gate. Enter broker passkey or use 1-click bypass demo.</p>
              </div>
              <div className="w-full max-w-sm space-y-3">
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                  placeholder="Enter passkey..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-500/50 placeholder:text-zinc-700"
                />
                {authError && <p className="text-xs text-red-400 font-mono">{authError}</p>}
                <button onClick={handleAuth} className="w-full rounded-lg bg-amber-500 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-all cursor-pointer">
                  Unlock Broker Suite
                </button>
                <button
                  onClick={() => { setPasskey(PASSKEY); setAuthError(''); }}
                  className="w-full rounded-lg border border-amber-500/30 bg-amber-500/5 py-2.5 text-xs font-mono text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer"
                >
                  [ 1-CLICK DEMO AUTO-FILL: estate2026 ]
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              <div className="flex gap-1 bg-zinc-950 rounded-lg p-1 border border-zinc-800">
                {([
                  { id: 'overview', label: 'Overview', icon: TrendingUp },
                  { id: 'inquiries', label: 'HNWI Inquiries', icon: Users },
                  { id: 'listings', label: 'Private Portfolio', icon: Building2 },
                  { id: 'settings', label: 'System', icon: ShieldCheck },
                ] as const).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === id ? 'bg-amber-500 text-black font-bold' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {metrics.map(({ label, value, icon: Icon, color }) => (
                      <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                        <Icon className={`h-4 w-4 ${color}`} />
                        <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Active High-Ticket Deals</h4>
                      {onSelectTab && (
                        <button
                          onClick={() => { onSelectTab('dashboard'); onClose(); }}
                          className="text-[10px] text-amber-400 hover:text-amber-300 font-mono uppercase underline"
                        >
                          Launch Full Broker Board →
                        </button>
                      )}
                    </div>
                    {mockInquiries.slice(0, 3).map((inq) => (
                      <div key={inq.id} className="flex items-center justify-between py-2 border-b border-zinc-800/60 last:border-0">
                        <div>
                          <p className="text-xs font-medium text-white">{inq.client}</p>
                          <p className="text-[10px] text-zinc-400 font-mono">{inq.property}</p>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${statusColors[inq.status]}`}>{inq.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'inquiries' && (
                <div className="space-y-2">
                  {mockInquiries.map((inq) => (
                    <div key={inq.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-zinc-500">{inq.id}</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase ${statusColors[inq.status]}`}>{inq.status}</span>
                          {inq.verified && <span className="text-[9px] bg-amber-500/10 text-amber-400 px-1 py-0.5 rounded">HNWI VERIFIED</span>}
                        </div>
                        <p className="text-sm font-medium text-white">{inq.client}</p>
                        <p className="text-xs text-zinc-400 font-mono">{inq.property} · {inq.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'listings' && (
                <div className="space-y-3">
                  {[
                    { name: 'Villa Bellissima', loc: 'Bel Air, CA', price: '$28,500,000', sqft: '14,200 sqft', beds: '7 Beds · 9 Baths' },
                    { name: 'The Obsidian Penthouse', loc: 'Tribeca, NYC', price: '$16,800,000', sqft: '8,400 sqft', beds: '4 Beds · 5.5 Baths' },
                    { name: 'Malibu Cliffside Sanctuary', loc: 'Malibu, CA', price: '$34,000,000', sqft: '11,800 sqft', beds: '6 Beds · 8 Baths' },
                  ].map((l) => (
                    <div key={l.name} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{l.name}</h4>
                        <p className="text-xs text-zinc-400 font-mono">{l.loc} · {l.sqft} · {l.beds}</p>
                      </div>
                      <p className="text-base font-bold text-amber-400 font-mono">{l.price}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
                    <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Portal Credentials</h4>
                    {[
                      { label: 'Portal Name', value: 'Aura & Grid Luxury Real Estate Portal' },
                      { label: 'Broker Passkey', value: 'estate2026' },
                      { label: 'Live Showcase', value: 'luxury-real-estate-portal-os.onrender.com' },
                      { label: 'Database', value: 'Supabase PostgreSQL (RLS Enabled)' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-zinc-800/60 last:border-0">
                        <span className="text-xs text-zinc-500 font-mono uppercase">{label}</span>
                        <span className="text-xs text-zinc-200 font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-300 font-mono">
                    ✅ Ghost Factory™ Verified — Target #47 | Private Wealth & Real Estate Vault (7/35)
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
