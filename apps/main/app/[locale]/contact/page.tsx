'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {Check, Copy, Mail, MapPin} from 'lucide-react';

const EMAIL = 'apstpm@hotmail.com';

function CopyButton({value, label, copiedLabel}: {value: string; label: string; copiedLabel: string}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // 非安全上下文或權限被拒時，退回舊式複製
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : label}
      className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
        copied
          ? 'border-brand-200 bg-brand-50 text-brand-700'
          : 'border-gray-200 bg-white text-gray-600 hover:border-brand-300 hover:text-brand-700'
      }`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}

export default function ContactPage() {
  const t = useTranslations('contact');

  const contactInfo = [
    {icon: Mail, label: t('info.email'), value: EMAIL, href: `mailto:${EMAIL}`},
    {icon: MapPin, label: t('info.address'), value: t('info.addressValue')},
  ];

  return (
    <div>
      <h1 className="sr-only">{t('title')}</h1>

      <section className="bg-gray-50 px-4 pt-10 pb-20 sm:pt-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}>
            <h2 className="text-2xl font-bold text-brand-700 font-display mb-2">{t('info.title')}</h2>
            <p className="text-gray-600 mb-8">{t('info.description')}</p>

            <div className="space-y-4">
              {contactInfo.map(({icon: Icon, label, value, href}) => (
                <div key={label} className="bg-white rounded-xl p-5 flex items-start gap-4 border border-gray-100 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-brand-700 text-sm font-semibold mb-1">{label}</h3>
                    {href ? (
                      <a href={href} className="text-gray-700 break-all hover:text-brand-700 hover:underline">
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-700">{value}</p>
                    )}
                  </div>
                  <CopyButton value={value} label={t('copy')} copiedLabel={t('copied')} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
