import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const LatestOnlySwitch = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center gap-[6px]">
      <Switch
        id="latest-only-mode"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="latest-only-mode">최신 도면만</Label>
    </div>
  );
};

export default LatestOnlySwitch;
