import type { RevisionStatus } from '@/types/drawing';
import { Badge } from './ui/badge';

const REVISION_BADGE_STYLES = {
  latest: 'bg-red-50 text-red-700',
  old: 'bg-gray-50 text-gray-700',
};

const RevisionStatusBadge = ({ status }: { status: RevisionStatus }) => {
  return <Badge className={REVISION_BADGE_STYLES[status]}>{status}</Badge>;
};

export default RevisionStatusBadge;
