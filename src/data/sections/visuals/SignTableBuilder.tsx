import { useState } from "react";
import { Button } from "@/components/atoms";

type Sign = "+" | "-" | "0";

interface RowSpec {
    id: string;
    label: string;
    /** Interval rows are tested with a sample value; point rows sit exactly on the value */
    kind: "interval" | "point";
    testValue: number;
    /** Only interval rows draw a piece of curve */
    domain?: [number, number];
}

const ROWS: RowSpec[] = [
    { id: "left", label: "x < -1", kind: "interval", testValue: -2, domain: [-4, -1] },
    { id: "at-minus-one", label: "x = -1", kind: "point", testValue: -1 },
    { id: "middle", label: "-1 < x < 1", kind: "interval", testValue: 0, domain: [-1, 1] },
    { id: "at-one", label: "x = 1", kind: "point", testValue: 1 },
    { id: "right", label: "x > 1", kind: "interval", testValue: 2, domain: [1, 4] },
];

const signOf = (value: number): Sign =>
    value === 0 ? "0" : value > 0 ? "+" : "-";

const curve = (x: number) => (2 * x) / (1 + x * x);

/** dy/dx sign that follows from the two bracket signs (leading -2, always-positive bottom) */
const derivedSign = (plusOne: Sign, minusOne: Sign): Sign => {
    if (plusOne === "0" || minusOne === "0") return "0";
    return plusOne === minusOne ? "-" : "+";
};

const describeSign = (sign: Sign) =>
    sign === "0" ? "flat — a turning point" : sign === "+" ? "climbing" : "falling";

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
        {(["+", "-", "0"] as Sign[]).map((sign) => (
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
        rowId: string,
        bracket: "plusOne" | "minusOne",
        sign: Sign,
    ) =>
        setChoices((previous) => ({
            ...previous,
            [rowId]: { ...previous[rowId], [bracket]: sign },
        }));

    const isRowCorrect = (row: RowSpec) => {
        const choice = choices[row.id];
        if (!choice?.plusOne || !choice.minusOne) return false;
        return (
            choice.plusOne === signOf(row.testValue + 1) &&
            choice.minusOne === signOf(row.testValue - 1)
        );
    };

    const solvedCount = ROWS.filter(isRowCorrect).length;
    const intervalRows = ROWS.filter((row) => row.domain);
    const pointRows = ROWS.filter((row) => row.kind === "point");

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

                {intervalRows.map((row) => (
                    <g key={`piece-${row.id}`}>
                        <path
                            d={pathFor(row.domain as [number, number])}
                            fill="none"
                            stroke={isRowCorrect(row) ? "#6366f1" : "#e2e8f0"}
                            strokeWidth={isRowCorrect(row) ? 3 : 2}
                            strokeDasharray={isRowCorrect(row) ? undefined : "6 5"}
                        />
                        <text
                            x={mapX(
                                ((row.domain as [number, number])[0] +
                                    (row.domain as [number, number])[1]) /
                                    2,
                            )}
                            y={PAD_Y - 16}
                            textAnchor="middle"
                            fontSize="12"
                            fill={isRowCorrect(row) ? "#4338ca" : "#94a3b8"}
                        >
                            {row.label}
                        </text>
                    </g>
                ))}

                {pointRows.map((row) =>
                    isRowCorrect(row) ? (
                        <g key={`turning-${row.id}`}>
                            <line
                                x1={mapX(row.testValue) - 22}
                                y1={mapY(curve(row.testValue))}
                                x2={mapX(row.testValue) + 22}
                                y2={mapY(curve(row.testValue))}
                                stroke="#dc2626"
                                strokeWidth={2.5}
                            />
                            <circle
                                cx={mapX(row.testValue)}
                                cy={mapY(curve(row.testValue))}
                                r={5}
                                fill="#dc2626"
                            />
                        </g>
                    ) : null,
                )}
            </svg>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                    <thead>
                        <tr className="bg-slate-100 text-slate-700">
                            <th className="border border-slate-200 px-3 py-2 text-left">
                                Case
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
                        {ROWS.map((row) => {
                            const choice = choices[row.id] ?? {};
                            const complete = choice.plusOne && choice.minusOne;
                            const correct = isRowCorrect(row);
                            return (
                                <tr
                                    key={row.id}
                                    className={
                                        row.kind === "point" ? "bg-rose-50" : "bg-white"
                                    }
                                >
                                    <td className="border border-slate-200 px-3 py-2 font-medium text-slate-700">
                                        {row.label}
                                        <span className="ml-2 text-xs text-slate-400">
                                            {row.kind === "point"
                                                ? "substitute exactly"
                                                : `try x = ${row.testValue}`}
                                        </span>
                                    </td>
                                    <td className="border border-slate-200 px-3 py-2">
                                        <SignButtons
                                            value={choice.plusOne}
                                            onChange={(sign) =>
                                                setChoice(row.id, "plusOne", sign)
                                            }
                                        />
                                    </td>
                                    <td className="border border-slate-200 px-3 py-2">
                                        <SignButtons
                                            value={choice.minusOne}
                                            onChange={(sign) =>
                                                setChoice(row.id, "minusOne", sign)
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
                                                {describeSign(
                                                    derivedSign(
                                                        choice.plusOne as Sign,
                                                        choice.minusOne as Sign,
                                                    ),
                                                )}
                                            </span>
                                        ) : (
                                            <span className="text-amber-700">
                                                substitute x = {row.testValue} into each
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
                {solvedCount} of {ROWS.length} cases correct
                {solvedCount === ROWS.length
                    ? " — the whole shape is now fixed, turning points included."
                    : " — each case only appears on the graph once its signs are right."}
            </div>
        </div>
    );
};

export default SignTableBuilder;
