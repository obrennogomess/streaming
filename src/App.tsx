/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  CheckCircle2, 
  ChevronRight, 
  Copy, 
  Zap, 
  Lock, 
  Check, 
  ShieldCheck
} from "lucide-react";
import cinevaHorizontalLogo from "./assets/images/cineva_horizontal_1790650835186.jpg";
import cinevaBrandLogo from "./assets/images/cineva_brand_logo_1790650823861.jpg";

type Step = "landing" | "checkout" | "payment";

export default function App() {
  const [step, setStep] = useState<Step>("landing");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyPix = () => {
    const pixKey = "34331522000198";
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(pixKey).catch(() => {
        const textArea = document.createElement("textarea");
        textArea.value = pixKey;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
        } catch {
          // Fallback handled
        }
        document.body.removeChild(textArea);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = pixKey;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
      } catch {
        // Fallback handled
      }
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartActivation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("checkout");
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        // Safe fallback
      }
    }, 350);
  };

  const handleProceedToPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("payment");
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        // Safe fallback
      }
    }, 350);
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-red-600 selection:text-white relative bg-[#050505] flex flex-col justify-between">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[150px]" />
        <div className="absolute top-[25%] right-[10%] w-[320px] h-[320px] bg-red-700/15 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-5 md:px-12 border-b border-white/5">
        <div 
          onClick={() => setStep("landing")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Uncropped, high-resolution horizontal Cineva logo */}
          <div className="h-10 md:h-12 flex items-center">
            <img 
              src={cinevaHorizontalLogo} 
              alt="Cineva" 
              className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:scale-105 transition-transform duration-300 rounded-lg"
              onError={(e) => {
                // Fallback to brand logo if horizontal fails
                (e.currentTarget as HTMLImageElement).src = cinevaBrandLogo;
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-8 text-sm font-medium text-white/60 uppercase tracking-widest hidden sm:flex">
          <button 
            onClick={() => setStep("landing")} 
            className={`transition-colors hover:text-white cursor-pointer ${step === 'landing' ? 'text-white border-b-2 border-red-600 pb-1 font-bold' : ''}`}
          >
            Ativação
          </button>
          <button 
            onClick={() => setStep("landing")}
            className="transition-colors hover:text-white cursor-pointer"
          >
            Catálogo
          </button>
          <button 
            onClick={() => setStep("landing")}
            className="transition-colors hover:text-white cursor-pointer"
          >
            Suporte
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 px-6 py-10 md:px-12 max-w-7xl mx-auto w-full flex-1 flex items-center">
        {step === "landing" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full animate-fade-in">
            {/* Left: Value Proposition */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 md:h-16 px-3 py-1.5 rounded-2xl bg-black/60 border border-red-500/40 shadow-xl shadow-red-600/30 flex items-center justify-center shrink-0">
                    <img 
                      src={cinevaHorizontalLogo} 
                      alt="Cineva Logo" 
                      className="h-full w-auto object-contain drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/20 text-red-500 text-[11px] font-black uppercase tracking-widest border border-red-600/30 shadow-sm">
                      <Zap size={14} className="fill-red-500" />
                      Ativação Imediata Cineva
                    </div>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-1">Logo Oficial & Acesso VIP</p>
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
                  Seu cinema <br />
                  <span className="text-red-600 italic underline decoration-white/20 underline-offset-8">em 4K.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/60 max-w-md leading-relaxed font-medium">
                  Desbloqueie todo o catálogo Cineva com filmes recém-saídos do cinema, séries exclusivas e esportes ao vivo.
                </p>
              </div>

              <div className="flex gap-8 pt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-white/40 tracking-widest mb-1 font-bold">Catálogo</span>
                  <span className="text-2xl font-black">+15.000 títulos</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-white/40 tracking-widest mb-1 font-bold">Qualidade</span>
                  <span className="text-2xl font-black">4K Ultra HD</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-white/40 tracking-widest mb-1 font-bold">Telas</span>
                  <span className="text-2xl font-black">Sem Limites</span>
                </div>
              </div>
            </div>

            {/* Right: Glassmorphism Card */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[36px] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/20 blur-3xl rounded-full transition-all group-hover:scale-125" />
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-red-600/20 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-600/30">
                    Acesso Exclusivo
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black">Ative seu Acesso Cineva</h2>
                  <p className="text-white/50 text-sm">Liberação imediata direto no seu e-mail cadastrado.</p>
                </div>

                <div className="bg-white/5 rounded-3xl p-7 border border-white/10 flex justify-between items-end">
                  <div>
                    <span className="text-white/50 text-xs uppercase tracking-wider block font-bold">Taxa de ativação</span>
                    <span className="text-white text-sm font-semibold">Acesso vitalício ao catálogo</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs block text-white/30 line-through font-bold">R$ 29,90</span>
                    <span className="text-5xl font-black text-white tracking-tight">R$ 1,00</span>
                  </div>
                </div>
                
                <form onSubmit={handleStartActivation} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase text-white/50 tracking-wider font-bold ml-1 block">
                      Seu E-mail para Receber o Acesso
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="seuemail@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-2xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-white/20 text-lg font-medium text-white"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-red-600/30 disabled:opacity-50 cursor-pointer group"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        PAGAR E ATIVAR AGORA 
                        <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-3 text-white/60">
                    <ShieldCheck size={16} className="text-green-500" />
                    <span className="text-[11px] uppercase tracking-wider font-bold">
                      Pagamento seguro via chave PIX imediata
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-white/40 font-medium">
                    <Lock size={12} />
                    Conexão criptografada de ponta a ponta
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "checkout" && (
          <div className="max-w-2xl mx-auto w-full space-y-10 animate-fade-in">
            <div className="flex flex-col items-center text-center space-y-4">
              <button 
                onClick={() => setStep("landing")}
                className="text-xs uppercase tracking-[0.25em] font-black text-white/40 hover:text-red-500 transition-colors cursor-pointer"
              >
                ← Voltar
              </button>
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Finalizar Cadastro</h2>
                <p className="text-white/50 text-base md:text-lg">
                  Estamos liberando seu login <span className="text-white font-bold">Cineva</span> para: <br />
                  <span className="text-red-500 font-bold underline underline-offset-4">{email}</span>
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[36px] overflow-hidden shadow-2xl">
              <div className="p-8 md:p-10 space-y-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 md:h-14 px-3 py-1 rounded-2xl bg-black border border-red-500/40 shadow-md shadow-red-600/30 flex items-center justify-center shrink-0">
                      <img src={cinevaHorizontalLogo} alt="Cineva" className="h-full w-auto object-contain" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase italic tracking-tight">
                        Cineva <span className="text-red-600">VIP</span>
                      </h3>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-widest">
                        Acesso Completo
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl md:text-5xl font-black text-white">R$ 1,00</p>
                    <p className="text-[10px] text-red-500 font-black uppercase tracking-[0.2em]">
                      Taxa Única
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Acesso completo a 15.000+ Filmes e Séries",
                    "Qualidade nativa 4K Ultra HD",
                    "Sem propagandas ou interrupções",
                    "Acesso instantâneo via e-mail",
                    "Compatível com TV, Celular e Computador",
                    "Suporte dedicado"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80">
                      <div className="w-6 h-6 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500 shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleProceedToPayment}
                  disabled={loading}
                  className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-lg tracking-wider uppercase transition-all active:scale-[0.98] shadow-2xl shadow-red-600/30 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    "FINALIZAR CADASTRO"
                  )}
                </button>
              </div>

              <div className="bg-red-600/10 p-4 flex items-center justify-center gap-3 border-t border-white/5">
                <ShieldCheck size={16} className="text-red-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500/90">
                  Ambiente Protegido e Criptografado
                </span>
              </div>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="max-w-md mx-auto w-full space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                Aguardando Pagamento PIX
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tight">
                Quase <span className="text-red-600">pronto!</span>
              </h2>
              <p className="text-white/50 text-sm font-medium">
                Pague <span className="text-white font-bold">R$ 1,00</span> pelo CNPJ abaixo para ativar sua conta Cineva.
              </p>
            </div>

            <div className="bg-white p-7 md:p-8 rounded-[36px] flex flex-col items-center gap-6 shadow-2xl relative border-t-4 border-red-600 text-gray-900">
              <div className="w-full flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 px-2 rounded-xl bg-black border border-red-600/30 flex items-center justify-center shrink-0 shadow-sm">
                    <img src={cinevaHorizontalLogo} alt="Cineva" className="h-full w-auto object-contain" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-900">
                    Cineva <span className="text-red-600">VIP</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-black text-gray-700 uppercase">
                  <ShieldCheck size={14} className="text-red-600" />
                  <span>Finalizar Cadastro</span>
                </div>
              </div>
              
              {/* PIX Key Box */}
              <div className="w-full bg-[#f9fafb] border-2 border-dashed border-gray-300 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
                  Chave PIX (CNPJ)
                </span>
                
                <div className="w-full">
                  <p className="text-xs text-gray-500 font-medium mb-2">Copie a chave para pagar no app do seu banco:</p>
                  <div className="text-xl md:text-2xl font-mono font-black text-gray-900 bg-white py-4 px-3 rounded-2xl border border-gray-200 shadow-sm select-all">
                    34.331.522/0001-98
                  </div>
                </div>

                <div className="w-full p-4 bg-red-50 rounded-2xl border border-red-100">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Valor: <span className="font-black text-red-600 text-base">R$ 1,00</span>
                    <br />
                    Ativação <span className="font-bold">automática e imediata</span> após o envio do PIX.
                  </p>
                </div>
              </div>

              <div className="w-full space-y-3">
                <button 
                  onClick={handleCopyPix}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                    copied 
                      ? 'bg-green-600 text-white shadow-green-600/30' 
                      : 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/25 active:scale-[0.98]'
                  }`}
                >
                  {copied ? <Check size={18} strokeWidth={3} /> : <Copy size={18} strokeWidth={2.5} />}
                  {copied ? "CHAVE CNPJ COPIADA!" : "COPIAR CHAVE CNPJ"}
                </button>
                <p className="text-center text-[10px] text-gray-400 font-medium">
                  Abra o aplicativo do seu banco, escolha PIX e cole a chave CNPJ.
                </p>
              </div>
            </div>

            {/* Steps Guide */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 flex items-center gap-2">
                <CheckCircle2 size={13} /> 
                Passos para ativação
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-white/70">
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white shrink-0">
                    1
                  </div>
                  <p>Copie a chave CNPJ e pague R$ 1,00 no seu banco.</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/70">
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white shrink-0">
                    2
                  </div>
                  <p>O sistema Cineva identifica o pagamento automaticamente.</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-red-400 font-bold">
                  <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-black text-white shrink-0">
                    3
                  </div>
                  <p>Seus dados de acesso chegam em <span className="underline">{email}</span>.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setStep("landing")}
                className="text-[10px] text-white/30 hover:text-red-500 uppercase tracking-[0.3em] font-black transition-colors cursor-pointer"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-white/5 bg-black/60 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
        <div className="flex items-center gap-3">
          <img 
            src={cinevaHorizontalLogo} 
            alt="Cineva" 
            className="h-7 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" 
          />
          <span className="text-white/30">|</span>
          <span>© 2026 CINEVA STREAMING. TODOS OS DIREITOS RESERVADOS.</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Termos</a>
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Suporte</a>
        </div>
      </footer>
    </div>
  );
}
