import { useEffect, useState } from "react";

type Dial = { label: string; value: number; note?: string };

export default function SystemBanner() {
  const [headwinds, setHeadwinds] = useState<Dial[]>([]);
  const [evidence, setEvidence] = useState<Dial[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/metrics/system-dials").catch(() => null);
      if (res?.ok) {
        const data = await res.json();
        setHeadwinds(data.headwinds ?? []);
        setEvidence(data.evidence ?? []);
      } else {
        setHeadwinds([{ label: "RJ school policy controversy", value: 65 }]);
        setEvidence([
          { label: "RCT youth felonies", value: 80 },
          { label: "CoSA reintegration evidence", value: 75 }
        ]);
      }
    })();
  }, []);

  const DialView = ({ d }: { d: Dial }) => (
    <div className="flex items-center gap-3">
      <div className="w-36">{d.label}</div>
      <div className="flex-1 h-2 bg-gray-200 rounded">
        <div className="h-2 rounded" style={{ width: `${Math.min(100, Math.max(0, d.value))}%` }} />
      </div>
      <div className="w-10 text-right">{d.value}</div>
    </div>
  );

  return (
    <div className="rounded-lg border p-4 grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold mb-2">Policy Headwinds</h3>
        <div className="space-y-2">{headwinds.map((d, i) => <DialView key={i} d={d} />)}</div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Evidence Dials</h3>
        <div className="space-y-2">{evidence.map((d, i) => <DialView key={i} d={d} />)}</div>
      </div>
    </div>
  );
}
