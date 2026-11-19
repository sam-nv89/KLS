import React, { useState } from 'react';
import { X, Trash2, Download, Tag, CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import type { CartItem, DigitalOrder, LearningResource, PromoCode } from '../types/studio';
import { WorksheetPreview } from './WorksheetPreview';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  resources: LearningResource[];
  promoCodes: PromoCode[];
  onRemoveItem: (resourceId: string) => void;
  onCheckoutComplete: (order: DigitalOrder) => void;
  onDownloadResource: (resource: LearningResource) => void;
  onBrowseShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  resources,
  promoCodes,
  onRemoveItem,
  onCheckoutComplete,
  onDownloadResource,
  onBrowseShop,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<DigitalOrder | null>(null);

  if (!isOpen) return null;

  const cartItems = cart
    .map((item) => ({
      ...item,
      resource: resources.find((r) => r.id === item.resourceId),
    }))
    .filter((entry): entry is { resourceId: string; quantity: number; resource: LearningResource } => Boolean(entry.resource));

  const subtotal = cartItems.reduce((sum, item) => sum + item.resource.price, 0);
  const discountAmount = appliedPromo ? Number(((subtotal * appliedPromo.discountPercent) / 100).toFixed(2)) : 0;
  const total = Math.max(0, Number((subtotal - discountAmount).toFixed(2)));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = promoInput.trim().toUpperCase();
    const match = promoCodes.find((p) => p.code.toUpperCase() === cleaned && p.active);
    if (!match) {
      setPromoError('Promo code not found or inactive. Try STUDIO20.');
      setAppliedPromo(null);
      return;
    }
    setPromoError('');
    setAppliedPromo(match);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.includes('@')) {
      setFormError('Please enter your name and a valid email for your PDF receipt.');
      return;
    }
    setFormError('');
    const order: DigitalOrder = {
      id: `KLS-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      items: cartItems.map((i) => ({
        resourceId: i.resource.id,
        title: i.resource.title,
        price: i.resource.price,
      })),
      promoCode: appliedPromo?.code,
      discountAmount,
      totalPaid: total,
      createdAt: new Date().toISOString(),
      downloadToken: Math.random().toString(36).slice(2, 12).toUpperCase(),
    };
    setCompletedOrder(order);
    onCheckoutComplete(order);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Bag">
      <div className="fixed inset-0 bg-[#0F2A5F]/40 backdrop-blur-[1px]" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-md bg-[#FCFBF8] h-full shadow-2xl border-l border-[#E5E2D9] flex flex-col">
        <div className="px-6 py-5 border-b border-[#E5E2D9] bg-white flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-[#0F2A5F]">
              {completedOrder ? 'Order Confirmed' : 'Your Digital Bag'}
            </h2>
            <p className="text-xs text-[#64748B]">
              {completedOrder ? 'Instant PDF downloads ready' : `${cartItems.length} printable pack${cartItems.length === 1 ? '' : 's'}`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-xl inline-flex items-center justify-center text-[#475569] hover:bg-[#F4F2EC] cursor-pointer"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {completedOrder ? (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
                <div className="flex items-center gap-2 text-[#15803D] font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Payment Successful · Order #{completedOrder.id}</span>
                </div>
                <p className="text-xs text-[#166534] leading-relaxed">
                  A receipt and backup download link have been sent to <strong>{completedOrder.customerEmail}</strong>. You can also re-download anytime from My Downloads.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-sm font-bold text-[#0F2A5F]">Your Printable PDFs</h3>
                {completedOrder.items.map((item) => {
                  const res = resources.find((r) => r.id === item.resourceId);
                  if (!res) return null;
                  return (
                    <div key={item.resourceId} className="p-4 rounded-2xl bg-white border border-[#E5E2D9] flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#0F2A5F] truncate">{res.title}</p>
                        <p className="text-xs text-[#64748B] font-mono-num">{res.pages} pages · {res.fileFormat}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDownloadResource(res)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1B75E8] text-white text-xs font-semibold hover:bg-[#155EC0] transition-colors shrink-0 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F4F2EC] flex items-center justify-center text-[#64748B]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-display text-base font-bold text-[#0F2A5F]">Your bag is empty</p>
                <p className="text-sm text-[#64748B] max-w-xs mx-auto">
                  Explore our printable preschool bundles and activity packs, or download free worksheets directly.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onBrowseShop();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors cursor-pointer"
              >
                <span>Browse Digital Shop</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {cartItems.map(({ resource }) => (
                  <div key={resource.id} className="p-3 rounded-2xl bg-white border border-[#E5E2D9] flex items-center gap-3">
                    <div className="w-20 shrink-0 rounded-xl overflow-hidden border border-[#E5E2D9]">
                      <WorksheetPreview variant={resource.previewVariant} compact />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0F2A5F] truncate">{resource.title}</p>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        Ages {resource.ageGroup} · <span className="font-mono-num">{resource.pages} pp</span> PDF
                      </p>
                      <p className="font-mono-num text-sm font-bold text-[#0F2A5F] mt-1">
                        ${resource.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(resource.id)}
                      className="p-2 rounded-xl text-[#94A3B8] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors cursor-pointer"
                      aria-label={`Remove ${resource.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-xs font-semibold text-[#475569] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo Code (try STUDIO20)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 h-10 px-3 rounded-xl bg-white border border-[#E5E2D9] text-sm text-[#0F2A5F] focus:outline-none focus:border-[#1B75E8]"
                  />
                  <button
                    type="submit"
                    className="px-4 h-10 rounded-xl bg-[#F4F2EC] text-[#0F2A5F] text-xs font-semibold hover:bg-[#E5E2D9] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-xs text-[#DC2626]">{promoError}</p>}
                {appliedPromo && (
                  <p className="text-xs text-[#15803D] font-medium">
                    Applied {appliedPromo.code}: {appliedPromo.discountPercent}% off
                  </p>
                )}
              </form>

              {/* Summary */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5E2D9] space-y-2 text-sm">
                <div className="flex justify-between text-[#475569]">
                  <span>Subtotal</span>
                  <span className="font-mono-num">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#15803D]">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span className="font-mono-num">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#F1EFE9] flex justify-between font-bold text-[#0F2A5F]">
                  <span>Total (Instant PDF)</span>
                  <span className="font-mono-num">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Form */}
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-3">
                <h3 className="font-display text-sm font-bold text-[#0F2A5F]">Digital Delivery Details</h3>
                <div>
                  <label htmlFor="checkout-name" className="block text-xs font-medium text-[#475569] mb-1">
                    Your Name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full h-10 px-3 rounded-xl bg-white border border-[#E5E2D9] text-sm text-[#0F2A5F] focus:outline-none focus:border-[#1B75E8]"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-email" className="block text-xs font-medium text-[#475569] mb-1">
                    Email for Receipt &amp; Download Link
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full h-10 px-3 rounded-xl bg-white border border-[#E5E2D9] text-sm text-[#0F2A5F] focus:outline-none focus:border-[#1B75E8]"
                  />
                </div>
                {formError && <p className="text-xs text-[#DC2626]">{formError}</p>}
              </form>
            </>
          )}
        </div>

        {!completedOrder && cartItems.length > 0 && (
          <div className="p-6 border-t border-[#E5E2D9] bg-white">
            <button
              type="submit"
              form="checkout-form"
              className="w-full h-12 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors cursor-pointer"
            >
              Complete Purchase · ${total.toFixed(2)}
            </button>
            <p className="mt-2 text-[11px] text-center text-[#64748B]">
              Instant PDF download · Personal &amp; single-classroom license included
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
