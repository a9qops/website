import { requireAuth } from '@/lib/auth';
import ServiceEditor from '../ServiceEditor';

export default async function NewServicePage() {
  await requireAuth();
  return <div className="mx-auto max-w-7xl px-6 py-8 sm:px-6 lg:px-8"><ServiceEditor /></div>;
}
