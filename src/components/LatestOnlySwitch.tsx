import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const LatestOnlySwitch = () => {
  return (
    <div className="flex items-center gap-[6px]">
      <Switch id="latest-only-mode" />
      <Label htmlFor="latest-only-mode">최신 도면만</Label>
    </div>
  );
};

export default LatestOnlySwitch;
