import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { X, ShieldCheck, CheckCircle2, Truck, CreditCard, Banknote, ArrowLeft, ArrowRight } from 'lucide-react';
import { playBrandChime } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 7) errs.phone = 'Phone number is required for courier dispatch';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newOrder: OrderDetails = {
      orderId: `AM-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      customer: { ...formData },
      items: [...items],
      subtotal,
      shipping,
      discount: 0,
      total,
      paymentMethod,
      status: 'confirmed',
      estimatedDelivery: '3 – 5 Business Days via Express Courier',
    };

    setConfirmedOrder(newOrder);
    setStep('confirmed');
    playBrandChime();
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl bg-[#101116] border border-white/10 rounded-3xl overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.95)] max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0C0D12]">
          <div className="flex items-center gap-3">
            <h3 className="font-display font-bold text-xl text-white">
              {step === 'form' ? 'Checkout & Courier Delivery' : 'Order Successfully Confirmed'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {step === 'form' ? (
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Customer & Delivery Details */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono text-amber-400 mb-4">
                    1. Shipping Destination
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-zinc-300 font-mono mb-1">Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Tariq Khan"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                      {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-300 font-mono mb-1">Email Address *</label>
                        <input
                          type="email"
                          placeholder="name@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                        />
                        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-300 font-mono mb-1">Phone (for Delivery) *</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 019-2834"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                        />
                        {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 font-mono mb-1">Street Address *</label>
                      <input
                        type="text"
                        placeholder="Apartment, suite, street address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                      {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-300 font-mono mb-1">City *</label>
                        <input
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                        />
                        {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-300 font-mono mb-1">Postal Code</label>
                        <input
                          type="text"
                          placeholder="Postal / Zip code"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono text-amber-400 mb-3">
                    2. Payment Method
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-xl border text-left flex items-start gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'bg-amber-500/10 border-amber-400 text-white'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/30'
                      }`}
                    >
                      <Banknote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-white">Cash on Delivery (COD)</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          Inspect package upon delivery and pay cash to rider.
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border text-left flex items-start gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-amber-500/10 border-amber-400 text-white'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/30'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-white">Debit / Credit Card</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          Instant encrypted checkout with 256-bit SSL.
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>Place Order · ${total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 bg-[#0C0D11] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono text-zinc-400 mb-4">
                    Order Summary ({items.length} items)
                  </h4>

                  <div className="divide-y divide-white/5 max-h-64 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.product.id} className="py-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover bg-zinc-900"
                          />
                          <div>
                            <div className="font-medium text-white line-clamp-1">{item.product.name}</div>
                            <div className="text-zinc-500 font-mono">Qty: {item.quantity} · {item.selectedColor}</div>
                          </div>
                        </div>
                        <div className="font-mono font-bold text-zinc-200 tabular-nums">
                          ${item.product.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="pt-4 mt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal</span>
                      <span className="text-white tabular-nums">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Express Courier Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                      <span>Total Amount</span>
                      <span className="text-amber-400 font-mono text-base tabular-nums">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 text-xs text-zinc-400 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Dispatched in luxury anti-shock audio packaging with tracking number.</span>
                </div>
              </div>

            </form>
          ) : (
            /* Order Confirmation View */
            <div className="py-8 flex flex-col items-center text-center max-w-xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                Order {confirmedOrder?.orderId} Confirmed
              </h3>
              <p className="text-sm text-zinc-300 mb-6">
                Thank you, <strong className="text-white">{confirmedOrder?.customer.fullName}</strong>.
                We have received your order for ALI MURTAZA audio hardware. A tracking link has been registered.
              </p>

              {/* Order Receipt Card */}
              <div className="w-full bg-[#0C0D12] border border-white/10 rounded-2xl p-6 text-left mb-6 font-mono text-xs space-y-3">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Order Number:</span>
                  <span className="text-amber-400 font-bold">{confirmedOrder?.orderId}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Payment Method:</span>
                  <span className="text-white uppercase">{confirmedOrder?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Delivery Address:</span>
                  <span className="text-white text-right max-w-xs truncate">{confirmedOrder?.customer.address}, {confirmedOrder?.customer.city}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Estimated Arrival:</span>
                  <span className="text-emerald-400">{confirmedOrder?.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-zinc-300">Total Paid:</span>
                  <span className="text-amber-300">${confirmedOrder?.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs rounded-xl transition-all uppercase tracking-wider"
              >
                Return to Storefront
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
