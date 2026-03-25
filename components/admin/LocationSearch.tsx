'use client';

import { useTransition, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationSearchProps {
  service?: string;
  state?: string;
}

export default function LocationSearch({ service, state }: LocationSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const initialSearch = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Debounced search - waits 300ms after user stops typing
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams();
        if (searchValue) {
          params.set('search', searchValue);
        }
        if (service) params.set('service', service);
        if (state) params.set('state', state);
        
        const queryString = params.toString();
        router.push(`/admin/locations${queryString ? `?${queryString}` : ''}`);
      });
    }, 300); // Wait 300ms after user stops typing

    setDebounceTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchValue, service, state, router]);

  const handleClear = () => {
    setSearchValue('');
    startTransition(() => {
      const params = new URLSearchParams();
      if (service) params.set('service', service);
      if (state) params.set('state', state);
      
      const queryString = params.toString();
      router.push(`/admin/locations${queryString ? `?${queryString}` : ''}`);
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200">
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by location name or slug..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={isPending}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          {isPending && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
        {searchValue && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={isPending}
          >
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
