'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteService } from './actions';

export default function ServiceDeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const remove = async () => {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    setDeleting(true);
    const result = await deleteService(id);
    if (result.success) router.refresh();
    else { window.alert(result.error ?? 'Failed to delete service.'); setDeleting(false); }
  };

  return <button type="button" onClick={remove} disabled={deleting} className="text-sm font-bold uppercase tracking-widest text-red-400 hover:text-red-300 disabled:opacity-50">{deleting ? 'Deleting...' : 'Delete'}</button>;
}
