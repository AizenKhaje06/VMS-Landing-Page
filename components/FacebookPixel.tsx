'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initFacebookPixel, trackPageView } from '@/lib/facebook-pixel';

export default function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    initFacebookPixel();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [pathname]);

  return null;
}
