import React, { useState } from 'react';
import { 
  Heart, 
  HeartHandshake, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Gift, 
  Building2 
} from 'lucide-react';

export const JoinSaathiPage: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'volunteer' | 'sponsor' | 'partner'>('volunteer');
  
  // Volunteer Sign Up State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    neighborhood: 'Mylapore',
    availabilityHours: '2-4 hours / week',
    interest: 'Companionship & Phone Calls',
    motivation: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [sponsorSuccess, setSponsorSuccess] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSponsor = (amount: number) => {
    setSponsorSuccess(amount);
    setTimeout(() => {
      setSponsorSuccess(null);
    }, 4000);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner with Licensed Trade Charity warmth */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/80 px-4 py-1.5 text-xs font-bold text-emerald-200 border border-emerald-600/40">
            <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
            <span>Join the Saathi Movement • Chennai</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            "No Elder Should Ever Feel Forgotten in Our City."
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
            Behind closed doors across Mylapore, Triplicane, and T. Nagar, thousands of elderly citizens spend days without hearing another human voice. At Saathi Foundation, we believe aging should be met with dignity, warmth, and lifelong companionship.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => {
                setActiveTier('volunteer');
                document.getElementById('action-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-emerald-400 transition-all transform hover:-translate-y-0.5"
            >
              Become a Companion Volunteer
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTier('sponsor');
                document.getElementById('action-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-xl bg-white/10 backdrop-blur-md px-6 py-3 text-sm font-extrabold text-white border border-white/20 hover:bg-white/20 transition-all"
            >
              Sponsor an Elder's Care
            </button>
          </div>
        </div>
      </div>

      {/* Human Story Callout: Inspired by Licensed Trade Charity storytelling */}
      <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/50 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center font-black text-2xl text-amber-900 shrink-0">
            KP
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                Real Impact Story
              </span>
              <span className="text-xs text-slate-400">• Mylapore Hub</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              "When my husband passed away, the silence in my apartment was deafening. Today, Divya's weekly call feels like sunshine."
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              — <strong>Kamala Paati (79)</strong>, joined Saathi in 2024. Her volunteer companion Divya visits twice a month to share filter coffee and ensure her BP medications are refilled on time.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Action Tabs */}
      <div id="action-section" className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How You Can Make a Tangible Difference
          </h2>
          <p className="text-sm text-slate-500">
            Whether through your time, your contribution, or your organization's partnership, every gesture restores someone's dignity.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTier('volunteer')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                activeTier === 'volunteer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HeartHandshake className="h-4 w-4" />
              <span>Volunteer Companion</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTier('sponsor')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                activeTier === 'sponsor'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Gift className="h-4 w-4" />
              <span>Sponsor Care Tiers</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTier('partner')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                activeTier === 'partner'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Partner Clinic / RWA</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Volunteer Companion Sign-up Form */}
        {activeTier === 'volunteer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <span>Why Volunteer with Saathi?</span>
                </h3>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Flexible Commitment:</strong> Just 1–2 hours each week makes a monumental difference.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Hyper-local Matching:</strong> We pair you with an elder right in your own neighborhood (Mylapore, Adyar, Anna Nagar, etc.).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Full Coordinator Support:</strong> You will never be alone; our coordinators provide guidance, background history, and safety protocols.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>True Intergenerational Bond:</strong> Discover incredible life stories, wisdom, and warm smiles.</span>
                  </li>
                </ul>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Volunteer Testimonial
                  </div>
                  <p className="text-xs text-slate-600 italic bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                    "Volunteering with Saathi grounded me. Listening to Uncle Swaminathan share stories of 1960s Madras during our Sunday calls brings more joy to my week than any screen time."
                  </p>
                  <p className="text-[11px] text-emerald-800 font-bold mt-1.5 text-right">
                    — K. Vignesh, Software Engineer & Saathi Volunteer
                  </p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-8 shadow-sm">
                {submitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Nandri! Thank You, {formData.name || 'Friend'}!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Your willingness to share warmth and companionship has been received. Our Chennai volunteer coordinator will connect with you at <strong>{formData.phone}</strong> within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          neighborhood: 'Mylapore',
                          availabilityHours: '2-4 hours / week',
                          interest: 'Companionship & Phone Calls',
                          motivation: ''
                        });
                      }}
                      className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"
                    >
                      Submit Another Companion
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Join as a Volunteer Companion
                      </h3>
                      <p className="text-xs text-slate-500">
                        Fill in your details below to begin bringing smiles to elderly citizens in Chennai.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., Aravind Rajan"
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98400 12345"
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="aravind@example.com"
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Preferred Chennai Neighborhood
                        </label>
                        <select
                          value={formData.neighborhood}
                          onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                        >
                          <option value="Mylapore">Mylapore</option>
                          <option value="T. Nagar">T. Nagar</option>
                          <option value="Triplicane">Triplicane</option>
                          <option value="Royapettah">Royapettah</option>
                          <option value="Adyar">Adyar</option>
                          <option value="Anna Nagar">Anna Nagar</option>
                          <option value="Besant Nagar">Besant Nagar</option>
                          <option value="Kilpauk">Kilpauk</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Availability
                        </label>
                        <select
                          value={formData.availabilityHours}
                          onChange={(e) => setFormData({ ...formData, availabilityHours: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                        >
                          <option value="1-2 hours / week">1–2 hours / week</option>
                          <option value="2-4 hours / week">2–4 hours / week</option>
                          <option value="Weekends Only">Weekends Only</option>
                          <option value="On-Call Emergency Support">On-Call Emergency Support</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Preferred Support Mode
                        </label>
                        <select
                          value={formData.interest}
                          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                        >
                          <option value="Companionship & Phone Calls">Weekly Phone Calls & Check-ins</option>
                          <option value="Home Visits & Tea">Home Visits & Tea Companionship</option>
                          <option value="Event Transport & Mobility">Mobility & Clinic Escort</option>
                          <option value="Cultural / Music Activities">Carnatic Music / Art Sessions</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        A sentence on why you would like to help:
                      </label>
                      <textarea
                        rows={2}
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        placeholder="I'd love to spend time listening to elders in my locality and making sure they feel valued."
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-md hover:bg-emerald-700 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                      <span>Submit Volunteer Application</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Care Sponsorship Tiers (Licensed Trade Charity style) */}
        {activeTier === 'sponsor' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs uppercase font-bold tracking-widest text-emerald-700">
                Transparent & Direct Giving
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Every Rupee Directly Enriches an Elder's Life
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                All donations are 80G tax-exempt. 100% of community sponsorship funds go directly to elder support kits, transport, and community circles.
              </p>
            </div>

            {sponsorSuccess && (
              <div className="max-w-md mx-auto rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-center text-emerald-950 font-bold text-sm flex items-center justify-center gap-2 animate-bounce">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Pledge of ₹{sponsorSuccess.toLocaleString()} recorded! Thank you for your kindness.</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tier 1 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all">
                <div className="space-y-4">
                  <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    Essential Lifeline
                  </div>
                  <div>
                    <span className="text-3xl font-black text-slate-900">₹500</span>
                    <span className="text-xs text-slate-500"> / month</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-800">
                    Wellness & Medical Transport
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ensures an elder with knee or mobility challenges receives doorstep auto-rickshaw transport for monthly hospital visits and diabetes prescription reviews.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Two clinic escorts per month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Medicine pill organizer box</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Monthly coordinator wellness check</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => handleSponsor(500)}
                    className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                  >
                    Sponsor ₹500 / mo
                  </button>
                </div>
              </div>

              {/* Tier 2: Recommended */}
              <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-50/50 via-white to-white p-6 shadow-md flex flex-col justify-between relative transform md:-translate-y-2">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-xs">
                  Most Compassionate Choice
                </div>

                <div className="space-y-4 pt-2">
                  <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    Community & Companionship
                  </div>
                  <div>
                    <span className="text-3xl font-black text-emerald-950">₹1,500</span>
                    <span className="text-xs text-slate-500"> / month</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-800">
                    Social Inclusion & Chai Circle
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Brings an isolated elder out of their home to monthly community gatherings, bhajans, art workshops, and provides nutritious seasonal fruits.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-emerald-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Full activity participation + tea snacks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Bi-weekly volunteer companionship visits</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Direct quarterly update on elder's well-being</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => handleSponsor(1500)}
                    className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    Sponsor ₹1,500 / mo
                  </button>
                </div>
              </div>

              {/* Tier 3 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all">
                <div className="space-y-4">
                  <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    Holistic Guardian
                  </div>
                  <div>
                    <span className="text-3xl font-black text-slate-900">₹3,500</span>
                    <span className="text-xs text-slate-500"> / month</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-800">
                    Complete Dignified Elderly Care
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Comprehensive sponsorship for a frail or solo elder: emergency pendant lifeline, home nurse check-ups, and weekly companion visits.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Emergency lifeline button installation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Dedicated primary volunteer companion</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Nutritional grocery care package</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => handleSponsor(3500)}
                    className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                  >
                    Sponsor ₹3,500 / mo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Partner Clinics & RWAs */}
        {activeTier === 'partner' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Partner with Saathi Foundation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Are you a local clinic, doctor, Resident Welfare Association (RWA), or youth organization in Chennai? Help us build a zero-isolation neighborhood.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Neighborhood RWAs</h4>
                <p className="text-slate-600">
                  Notify our coordinators when an elderly resident living alone has not been seen for consecutive days or when family moves abroad.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Local Doctors & Pharmacies</h4>
                <p className="text-slate-600">
                  Provide priority appointments or medicine delivery coordination for registered Saathi Foundation beneficiaries.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">College & Youth Chapters</h4>
                <p className="text-slate-600">
                  Adopt a neighborhood hub to host digital literacy bootcamps and oral history recording circles with senior citizens.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                For institutional inquiries: <span className="font-bold text-slate-900">partnerships@saathifoundation.org</span> or call <span className="font-bold text-emerald-700">+91 44 2498 0000</span>
              </div>
              <a
                href="mailto:partnerships@saathifoundation.org"
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shrink-0"
              >
                Reach Out to Partner &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
