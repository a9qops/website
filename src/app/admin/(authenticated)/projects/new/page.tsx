import { requireAuth } from '@/lib/auth';
import ProjectEditor from '../ProjectEditor';

export default async function NewProjectPage() {
  await requireAuth();

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-8">
      <ProjectEditor />
    </div>
  );
}
