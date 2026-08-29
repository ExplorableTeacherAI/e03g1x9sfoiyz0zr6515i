import { useState } from "react";
import { Button } from "@/components/atoms";

type Sign = "+" | "-";

interface RangeSpec {
    id: string;
    label: string;
    testValue: number;
    domain: [number, number];
}

const RANGES: RangeSpec[] = [
    { id: "left", label: "x < -1", testValue: -2, domain: [-4, -1] },
    { id: "middle", label: "-1 < x < 1", testValue: 0, domain: [-1, 1] },
    { id: "right", label: "x > 1", testValue: 2, domain: [1, 4] },
];

const signOf = (value: number): Sign => (value > 0 ? "+" : "-");
const curve = (x: number) => (2 * x) / (1 + x * x);

/** dy/dx sign that follows from the two chosen bracket signs (leading -2, positive bottom) */
const derivedSign = (plusOne: Sign, minusOne: Sign): Sign =>
    plusOne === minusOne ? "-" : "+";

// ── SVG geometry ──────────────────────────────────────────────────────────────
const VIEW_WIDTH = 620;
const VIEW_HEIGHT = 240;
const PAD_X = 60;
const PAD_Y = 40;
const PLOT_WIDTH = VIEW_WIDTH - 2 * PAD_X;
const PLOT_HEIGHT = VIEW_HEIGHT - 2 * PAD_Y;
const X_SPAN: [number, number] = [-4, 4];
const Y_SPAN = 1.6;

const mapX = (x: number) =>
    PAD_X + ((x - X_SPAN[0]) / (X_SPAN[1] - X_SPAN[0])) * PLOT_WIDTH;
const mapY = (y: number) => PAD_Y + PLOT_HEIGHT / 2 - (y / Y_SPAN) * (PLOT_HEIGHT / 2);

const pathFor = ([from, to]: [number, number]) => {
    const steps = 60;
    const points: string[] = [];
    for (let index = 0; index <= steps; index += 1) {
        const x = from + ((to - from) * index) / steps;
        points.push(`${mapX(x).toFixed(2)},${mapY(curve(x)).toFixed(2)}`);
    }
    return `M ${points.join(" L ")}`;
};

const SignButtons = ({
    value,
    onChange,
}: {
    value?: Sign;
    onChange: (sign: Sign) => void;
}) => (
    <div className="flex gap-1">
        {(["+", "-"] as Sign[]).map((sign) => (
            <Button
                key={sign}
                size="sm"
                variant={value === sign ? "default" : "outline"}
                className="h-8 w-9 px-0 text-base"
                onClick={() => onChange(sign)}
            >
                {sign}
            </Button>
        ))}
    </div>
);

export const SignTableBuilder = () => {
    const [choices, setChoices] = useState<
        Record<string, { plusOne?: Sign; minusOne?: Sign }>
    >({});

    const setChoice = (
        rangeId: string,
        bracket: "plusOne" | "minusOne",
        sign: Sign,
    ) =>
        setChoices((previous) => ({
            ...previous,
            [rangeId]: { ...previous[rangeId], [bracket]: sign },
        }));

    const isRangeCorrect = (range: RangeSpec) => {
        const choice = choices[range.id];
        if (!choice?.plusOne || !choice.minusOne) return false;
        return (
            choice.plusOne === signOf(range.testValue + 1) &&
            choice.minusOne === signOf(range.testValue - 1)
        );
    };

    const solvedCount = RANGES.filter(isRangeCorrect).length;

    return (
        <div className="space-y-4">
            <svg
                width="100%"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                role="img"
                aria-label="The curve appears range by range as each sign is chosen"
            >
                <rect
                    x={0}
                    y={0}
                    width={VIEW_WIDTH}
                    height={VIEW_HEIGHT}
                    fill="#f8fafc"
                    rx={8}
                />
                <line
                    x1={PAD_X}
                    y1={mapY(0)}
                    x2={VIEW_WIDTH - PAD_X}
                    y2={mapY(0)}
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                />
                {[-1, 1].map((x) => (
                    <line
                        key={`divider-${x}`}
                        x1={mapX(x)}
                        y1={PAD_Y - 10}
                        x2={mapX(x)}
                        y2={VIEW_HEIGHT - PAD_Y + 10}
                        stroke="#cbd5e1"
                        strokeWidth={1.5}
                        strokeDasharray="5 4"
                    />
                ))}
                {[-1, 1].map((x) => (
                    <text
                        key={`divider-label-${x}`}
                        x={mapX(x)}
                        y={VIEW_HEIGHT - PAD_Y + 26}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#64748b"
                    >
                        x = {x}
                    </text>
                ))}

                {RANGES.map((range) => (
                    <g key={`piece-${range.id}`}>
                        <path
                            d={pathFor(range.domain)}
                            fill="none"
                            stroke={isRangeCorrect(range) ? "#6366f1" : "#e2e8f0"}
                            strokeWidth={isRangeCorrect(range) ? 3 : 2}
                            strokeDasharray={isRangeCorrect(range) ? undefined : "6 5"}
                        />
                        <text
                            x={mapX((range.domain[0] + range.domain[1]) / 2)}
                            y={PAD_Y - 16}
                            textAnchor="middle"
                            fontSize="12"
                            fill={isRangeCorrect(range) ? "#4338ca" : "#94a3b8"}
                        >
                            {range.label}
                        </text>
                    </g>
                ))}

                {solvedCount === RANGES.length && (
                    <>
                        <circle cx={mapX(1)} cy={mapY(1)} r={5} fill="#dc2626" />
                        <circle cx={mapX(-1)} cy={mapY(-1)} r={5} fill="#dc2626" />
                    </>
                )}
            </svg>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                    <thead>
                        <tr className="bg-slate-100 text-slate-700">
                            <th className="border border-slate-200 px-3 py-2 text-left">
                                Range
                            </th>
                            <th className="border border-slate-200 px-3 py-2">
                                Sign of (x + 1)
                            </th>
                            <th className="border border-slate-200 px-3 py-2">
                                Sign of (x − 1)
                            </th>
                            <th className="border border-slate-200 px-3 py-2">
                                So dy/dx is
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {RANGES.map((range) => {
                            const choice = choices[range.id] ?? {};
                            const complete = choice.plusOne && choice.minusOne;
                            const correct = isRangeCorrect(range);
                            return (
                                <tr key={range.id} className="bg-white">
                                    <td className="border border-slate-200 px-3 py-2 font-medium text-slate-700">
                                        {range.label}
                                        <span className="ml-2 text-xs text-slate-400">
                                            try x = {range.testValue}
                                        </span>
                                    </td>
                                    <td className="border border-slate-200 px-3 py-2">
                                        <SignButtons
                                            value={choice.plusOne}
                                            onChange={(sign) =>
                                                setChoice(range.id, "plusOne", sign)
                                            }
                                        />
                                    </td>
                                    <td className="border border-slate-200 px-3 py-2">
                                        <SignButtons
                                            value={choice.minusOne}
                                            onChange={(sign) =>
                                                setChoice(range.id, "minusOne", sign)
                                            }
                                        />
                                    </td>
                                    <td className="border border-slate-200 px-3 py-2 text-center">
                                        {!complete ? (
                                            <span className="text-slate-400">
                                                choose both signs
                                            </span>
                                        ) : correct ? (
                                            <span className="font-semibold text-emerald-700">
                                                {derivedSign(
                                                    choice.plusOne as Sign,
                                                    choice.minusOne as Sign,
                                                )}{" "}
                                                —{" "}
                                                {derivedSign(
                                                    choice.plusOne as Sign,
                                                    choice.minusOne as Sign,
                                                ) === "+"
                                                    ? "climbing"
                                                    : "falling"}
                                            </span>
                                        ) : (
                                            <span className="text-amber-700">
                                                substitute x = {range.testValue} into each
                                                bracket
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="text-sm text-slate-600">
                {solvedCount} of {RANGES.length} ranges correct
                {solvedCount === RANGES.length
                    ? " — the whole shape is now fixed, turning points included."
                    : " — a range only draws once its signs are right."}
            </div>
        </div>
    );
};

export default SignTableBuilder;
