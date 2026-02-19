'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { type RuleFile } from '@/lib/content';
import { Badge } from '@apstpm-website/ui';

interface FileDownloadCardProps {
  file: RuleFile;
}

export default function FileDownloadCard({ file }: FileDownloadCardProps) {
  const t = useTranslations('Rules');

  const getFileExtension = (url: string): string => {
    const ext = url.split('.').pop()?.toLowerCase();
    return ext || 'pdf';
  };

  const getFileTypeColor = (ext: string) => {
    switch (ext) {
      case 'pdf':
        return 'bg-red-50 text-red-700';
      case 'doc':
      case 'docx':
        return 'bg-blue-50 text-blue-700';
      case 'zip':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-robot-200 transition-all duration-200 p-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFileTypeColor(getFileExtension(file.url))}`}>
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">
                {file.category === 'regulations' ? t('regulations') : t('rules')}
              </Badge>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-500">{file.year}</span>
            </div>
            <p className="text-sm font-medium text-gray-900 truncate">
              {file.title}
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={file.url}
              download
              className="p-2 rounded-lg bg-robot-50 hover:bg-robot-100 text-robot-600 hover:text-robot-700 transition-colors"
              aria-label={`${t('download')} ${file.title}`}
            >
              <Download className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
