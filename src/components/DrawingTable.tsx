import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Drawing } from '@/types/drawing';
import { getAllRevisions, getLatestRevisionIds } from '@/utils/drawingUtils';
import metadata from '../assets/metadata.json';
import { Badge } from '@/components/ui/badge';

const BADGE_STYLES = {
  latest: 'bg-red-50 text-red-700',
  old: 'bg-gray-50 text-gray-700',
};

const DrawingTable = ({ latestOnly }: { latestOnly: boolean }) => {
  const drawings: Drawing[] = Object.values(metadata.drawings);
  const revisionItems = getAllRevisions(drawings);
  const latestRevisionIds = getLatestRevisionIds(revisionItems);
  const displayItems = latestOnly
    ? revisionItems.filter((item) => latestRevisionIds.has(item.id))
    : revisionItems;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-500 text-center w-[100px]">
            이름
          </TableHead>
          <TableHead className="text-gray-500 text-center">상태</TableHead>
          <TableHead className="text-gray-500 text-center">버전</TableHead>
          <TableHead className="text-gray-500 text-center">공종</TableHead>
          <TableHead className="text-gray-500 text-center">날짜</TableHead>
          <TableHead className="text-gray-500 text-center">영역</TableHead>
          <TableHead className="text-gray-500 text-center">설명</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayItems.map((elem) => {
          const versionType = latestRevisionIds.has(elem.id) ? 'latest' : 'old';

          return (
            <TableRow key={elem.id}>
              <TableCell className="text-center font-medium">
                {elem.drawingName}
              </TableCell>
              <TableCell className="text-center">
                <Badge className={BADGE_STYLES[versionType]}>
                  {versionType}
                </Badge>
              </TableCell>
              <TableCell className="text-center">{elem.version}</TableCell>
              <TableCell className="text-center">
                {elem.disciplineName}
              </TableCell>
              <TableCell className="text-center">{elem.date}</TableCell>
              <TableCell className="text-center">
                {elem.regionName || '-'}
              </TableCell>
              <TableCell className="text-center">{elem.description}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DrawingTable;
