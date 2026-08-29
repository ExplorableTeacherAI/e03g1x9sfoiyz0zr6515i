import { Slider } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";

const X_MIN = -2;
const X_MAX = 2;

const VIEW_WIDTH = 360;
const VIEW_HEIGHT = 280;
const PAD_X = 34;
const PLOT_TOP = 26;
const PLOT_HEIGHT = 170;
const STRIP_TOP = 216;
const STRIP_HEIGHT = 24;
const PLOT_WIDTH = VIEW_WIDTH - 2 * PAD_X;

const UP_COLOR = "#2563eb";
const DOWN_COLOR = "#ea580c";
const MARKER_COLOR = "#f59e0b";
const CANDIDATE_COLOR = "#dc2626";

const mapX = (x: number) => PAD_X + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_WIDTH;

interface PanelSpec {
    title: string;
    subtitle: string;
    fn: (x: number) => number;
    secondDerivative: (x: number) => number;
    yMin: number;
    yMax: number;
    candidates: { x: number; label: string }[];
    verdict: string;
}

const ROOT_THREE = Math.sqrt(3);

const PANELS: PanelSpec[] = [
    {
        title: "y = 2x / (1 + x²)",
        subtitle: "d²y/dx² = 4x(x − √3)(x + √3) / (1 + x²)³",
        fn: (x) => (2 * x) / (1 + x * x),
        secondDerivative: (x) =>
            (4 * x * (x - ROOT_THREE) * (x + ROOT_THREE)) / Math.pow(1 + x * x, 3),
        yMin: -1.6,
        yMax: 1.6,
        candidates: [
            { x: -ROOT_THREE, label: "−√3" },
            { x: 0, label: "0" },
            { x: ROOT_THREE, label: "√3" },
        ],
        verdict: "The strip changes colour at every candidate — all three are inflections.",
    },
    {
        title: "y = x⁴",
        subtitle: "d²y/dx² = 12x²",
        fn: (x) => Math.pow(x, 4),
        secondDerivative: (x) => 12 * x * x,
        yMin: -2,
        yMax: 16,
        candidates: [{ x: 0, label: "0" }],
        verdict: "The strip never changes colour — x = 0 is a minimum, not an inflection.",
    },
];

const ConcavityPanel = ({
    panel,
    markerX,
}: {
    panel: PanelSpec;
    markerX: number;
}) => {
    const mapY = (y: number) =>
        PLOT_TOP + PLOT_HEIGHT - ((y - panel.yMin) / (panel.yMax - panel.yMin)) * PLOT_HEIGHT;

    const steps = 200;
    const points: string[] = [];
    for (let index = 0; index <= steps; index += 1) {
        const x = X_MIN + ((X_MAX - X_MIN) * index) / steps;
        const y = panel.fn(x);
        if (y < panel.yMin || y > panel.yMax) continue;
        points.push(`${mapX(x).toFixed(2)},${mapY(y).toFixed(2)}`);
    }

    const stripSegments = Array.from({ length: 120 }, (_unused, index) => {
        const from = X_MIN + ((X_MAX - X_MIN) * index) / 120;
        const to = X_MIN + ((X_MAX - X_MIN) * (index + 1)) / 120;
        const middle = (from + to) / 2;
        return {
            key: `strip-${index}`,
            x: mapX(from),
            width: mapX(to) - mapX(from) + 0.5,
            color: panel.secondDerivative(middle) >= 0 ? UP_COLOR : DOWN_COLOR,
        };
    });

    const secondValue = panel.secondDerivative(markerX);

    return (
        <div>
            <div className="text-sm font-semibold text-slate-700">{panel.title}</div>
            <div className="mb-1 text-xs text-slate-500">{panel.subtitle}</div>
            <svg
                width="100%"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                role="img"
                aria-label={`${panel.title} with a strip showing the sign of its second derivative`}
            >
                <rect
                    x={0}
                    y={0}
                    width={VIEW_WIDTH}
                    height={VIEW_HEIGHT}
                    fill="#f8fafc"
                    rx={8}
                />
                {panel.yMin < 0 && panel.yMax > 0 && (
                    <line
                        x1={PAD_X}
                        y1={mapY(0)}
                        x2={VIEW_WIDTH - PAD_X}
                        y2={mapY(0)}
                        stroke="#cbd5e1"
                        strokeWidth={1}
                    />
                )}

                {panel.candidates.map((candidate) => (
                    <line
                        key={`candidate-${candidate.label}`}
                        x1={mapX(candidate.x)}
                        y1={PLOT_TOP}
                        x2={mapX(candidate.x)}
                        y2={STRIP_TOP + STRIP_HEIGHT}
                        stroke={CANDIDATE_COLOR}
                        strokeWidth={1}
                        strokeDasharray="4 4"
                        opacity={0.7}
                    />
                ))}

                <polyline
                    points={points.join(" ")}
                    fill="none"
                    stroke="#4338ca"
                    strokeWidth={3}
                />

                {stripSegments.map((segment) => (
                    <rect
                        key={segment.key}
                        x={segment.x}
                        y={STRIP_TOP}
                        width={segment.width}
                        height={STRIP_HEIGHT}
                        fill={segment.color}
                        opacity={0.85}
                    />
                ))}
                <rect
                    x={PAD_X}
                    y={STRIP_TOP}
                    width={PLOT_WIDTH}
                    height={STRIP_HEIGHT}
                    fill="none"
                    stroke="#94a3b8"
                />

                <line
                    x1={mapX(markerX)}
                    y1={PLOT_TOP - 8}
                    x2={mapX(markerX)}
                    y2={STRIP_TOP + STRIP_HEIGHT + 8}
                    stroke={MARKER_COLOR}
                    strokeWidth={2.5}
                />

                {panel.candidates.map((candidate) => (
                    <text
                        key={`candidate-label-${candidate.label}`}
                        x={mapX(candidate.x)}
                        y={STRIP_TOP + STRIP_HEIGHT + 20}
                        textAnchor="middle"
                        fontSize="11"
                        fill={CANDIDATE_COLOR}
                    >
                        {candidate.label}
                    </text>
                ))}

                <text x={PAD_X} y={16} fontSize="11" fill="#64748b">
                    d²y/dx² = {secondValue.toFixed(2)}
                </text>
                <text
                    x={VIEW_WIDTH - PAD_X}
                    y={16}
                    textAnchor="end"
                    fontSize="11"
                    fill={secondValue >= 0 ? UP_COLOR : DOWN_COLOR}
                >
                    {secondValue >= 0 ? "bends upwards" : "bends downwards"}
                </text>
            </svg>
            <div className="mt-1 text-sm text-slate-600">{panel.verdict}</div>
        </div>
    );
};

export const ConcavityComparison = () => {
    const markerX = useVar("bendingMarkerX", 0) as number;
    const setVar = useSetVar();

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {PANELS.map((panel) => (
                    <ConcavityPanel key={panel.title} panel={panel} markerX={markerX} />
                ))}
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <Slider
                    value={[markerX]}
                    min={X_MIN}
                    max={X_MAX}
                    step={0.02}
                    onValueChange={([value]) => setVar("bendingMarkerX", value)}
                />
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-700">
                    <span>
                        x = <strong>{markerX.toFixed(2)}</strong>
                    </span>
                    <span className="text-slate-500">
                        Blue strip = bending upwards, orange = bending downwards
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ConcavityComparison;
