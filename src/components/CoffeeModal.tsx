import React, { useState } from 'react';
import { X, Coffee, Heart, CheckCircle2 } from 'lucide-react';

interface CoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonateComplete: (amount: number, note: string) => void;
}

export const CoffeeModal: React.FC<CoffeeModalProps> = ({ isOpen, onClose, onDonateComplete }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [customAmount, setCustomAmount] = useState('');
  const [note, setNote] = useState('');
  const [thankYouAmount, setThankYouAmount] = useState<number | null>(null);

  if (!isOpen) return null;

  const activeAmount = customAmount ? Math.max(1, Number(customAmount) || 5) : selectedAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setThankYouAmount(activeAmount);
    onDonateComplete(activeAmount, note.trim());
  };

  const handleClose = () => {
    setThankYouAmount(null);
    setCustomAmount('');
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Support Kids Learning Studio">
      <div className="fixed inset-0 bg-[#0F2A5F]/40 backdrop-blur-[1px]" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#FCFBF8] border border-[#E5E2D9] shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-white border-b border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-[#D97706]" />
            <h2 className="font-display text-base font-bold text-[#0F2A5F]">Buy Us a Coffee</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-[#64748B] hover:bg-[#F4F2EC] cursor-pointer"
            aria-label="Close support modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {thankYouAmount !== null ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#0F2A5F]">
              Thank you for your <span className="font-mono-num">${thankYouAmount.toFixed(2)}</span> coffee!
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Your generosity directly helps our educators illustrate and publish new free printable worksheets for families everywhere.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors cursor-pointer"
            >
              Back to Worksheets
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <p className="text-sm text-[#475569] leading-relaxed">
              Love our free resources? Buy us a coffee and help us create more printable activities for little learners!
            </p>

            <div>
              <span className="block text-xs font-semibold text-[#0F2A5F] mb-2">Choose a cup size</span>
              <div className="grid grid-cols-4 gap-2">
                {[3, 5, 10, 25].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`h-11 rounded-xl font-mono-num text-sm font-bold border transition-colors cursor-pointer ${
                      !customAmount && selectedAmount === amt
                        ? 'bg-[#F5B700] border-[#D97706] text-[#0F2A5F]'
                        : 'bg-white border-[#E5E2D9] text-[#475569] hover:border-[#0F2A5F]'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="coffee-custom" className="block text-xs font-medium text-[#475569] mb-1">
                Or enter custom amount (USD)
              </label>
              <input
                id="coffee-custom"
                type="number"
                min="1"
                step="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="e.g. 15"
                className="w-full h-10 px-3 rounded-xl bg-white border border-[#E5E2D9] text-sm text-[#0F2A5F] focus:outline-none focus:border-[#1B75E8]"
              />
            </div>

            <div>
              <label htmlFor="coffee-note" className="block text-xs font-medium text-[#475569] mb-1">
                Optional note for our studio team
              </label>
              <input
                id="coffee-note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="My 4-year-old loved the dinosaur pages!"
                className="w-full h-10 px-3 rounded-xl bg-white border border-[#E5E2D9] text-sm text-[#0F2A5F] focus:outline-none focus:border-[#1B75E8]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#0F2A5F] text-white text-sm font-semibold hover:bg-[#1B3B7B] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#F5B700]" />
              <span>Support Studio · ${activeAmount.toFixed(2)}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
