import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Drawing } from '@/types/drawing';
import { getAllRevisions } from '@/utils/drawingUtils';
import metadata from '../assets/metadata.json';

const DrawingTable = () => {
  const drawings: Drawing[] = Object.values(metadata.drawings);
  const revisionItems = getAllRevisions(drawings);

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
        {revisionItems.map((elem) => (
          <TableRow>
            <TableCell className="text-center font-medium">
              {elem.drawingName}
            </TableCell>
            <TableCell className="text-center">최신</TableCell>
            <TableCell className="text-center">{elem.version}</TableCell>
            <TableCell className="text-center">{elem.disciplineName}</TableCell>
            <TableCell className="text-center">날짜</TableCell>
            <TableCell className="text-center">영역</TableCell>
            <TableCell className="text-center">설명</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DrawingTable;
