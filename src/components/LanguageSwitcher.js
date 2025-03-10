import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IconButton, Box, Tooltip } from '@mui/material';

const flags = {
  ka: "🇬🇪",
  en: "🇬🇧",
  ru: "🇷🇺"
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {Object.entries(flags).map(([lang, flag]) => (
        <Tooltip key={lang} title={lang.toUpperCase()} arrow>
          <IconButton
            onClick={() => setLanguage(lang)}
            sx={{
              opacity: language === lang ? 1 : 0.5,
              transform: language === lang ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.2s ease',
              fontSize: '1.5rem',
              padding: '4px',
              '&:hover': {
                opacity: 1,
                backgroundColor: 'transparent'
              }
            }}
          >
            {flag}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
} 