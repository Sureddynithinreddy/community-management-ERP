import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, Building2, ShieldCheck, Phone } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Secretary',
    societyName: '',
    city: '',
    flatCount: 200,
    phone: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5" /> Request Onboarding Proposal
              </div>
              <h3 className="text-2xl font-black text-white">Schedule Society Demo</h3>
              <p className="text-xs text-slate-400">
                Get a personalized walkthrough and custom pricing proposal for your RWA committee.
              </p>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Chandra"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Your Role in RWA</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-900 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Secretary">RWA Secretary</option>
                  <option value="Treasurer">RWA Treasurer</option>
                  <option value="President">RWA President</option>
                  <option value="Board Member">Committee Member</option>
                  <option value="Facility Manager">Facility Manager</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Number of Flats</label>
                <input
                  type="number"
                  required
                  value={formData.flatCount}
                  onChange={(e) => setFormData({ ...formData, flatCount: Number(e.target.value) })}
                  className="w-full bg-slate-900 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Society Name & City</label>
              <input
                type="text"
                required
                placeholder="e.g. Green Palms Heights, Bengaluru"
                value={formData.societyName}
                onChange={(e) => setFormData({ ...formData, societyName: e.target.value })}
                className="w-full bg-slate-900 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="secretary@greenpalms.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-900/40 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Demo Request
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Demo Request Received!</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-white">{formData.name}</strong> ({formData.role}). Our society implementation engineer will contact you at <strong className="text-indigo-300">{formData.phone}</strong> with your customized proposal.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 hover:bg-slate-700"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
