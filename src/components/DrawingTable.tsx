import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { RevisionStatus } from '@/types/drawing';
import RevisionStatusBadge from './RevisionStatusBadge';
import { useDrawingStore } from '@/stores/drawingStore';

const DrawingTable = ({ latestOnly }: { latestOnly: boolean }) => {
  const { setSelected, revisionItems } = useDrawingStore();
  const displayItems = latestOnly
    ? revisionItems.filter((item) => item.latest)
    : revisionItems;

  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-500 text-center w-[200px] ">
            이름
          </TableHead>
          <TableHead className="text-gray-500 text-center">공종</TableHead>
          <TableHead className="text-gray-500 text-center">영역</TableHead>
          <TableHead className="text-gray-500 text-center">상태</TableHead>
          <TableHead className="text-gray-500 text-center">버전</TableHead>
          <TableHead className="text-gray-500 text-center">날짜</TableHead>
          <TableHead className="text-gray-500 text-center">설명</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayItems.map((elem) => {
          const versionType: RevisionStatus = elem.latest ? 'latest' : 'old';

          return (
            <TableRow key={elem.id} onClick={() => setSelected(elem)}>
              <TableCell className="text-center font-medium">
                {elem.drawingName}
              </TableCell>
              <TableCell className="text-center">
                {elem.disciplineName}
              </TableCell>
              <TableCell className="text-center">
                {elem.regionName || '-'}
              </TableCell>
              <TableCell className="text-center">
                <RevisionStatusBadge status={versionType} />
              </TableCell>
              <TableCell className="text-center">{elem.version}</TableCell>
              <TableCell className="text-center">{elem.date}</TableCell>
              <TableCell className="text-center">{elem.description}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DrawingTable;
