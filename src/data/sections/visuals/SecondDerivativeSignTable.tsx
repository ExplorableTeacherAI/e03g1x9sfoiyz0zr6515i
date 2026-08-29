import { useState } from "react";
import { Button } from "@/components/atoms";

type Sign = "+" | "-" | "0";

const ROOT_THREE = Math.sqrt(3);

interface RowSpec {
    id: string;
    label: string;
    kind: "interval" | "point";
    testValue: number;
    /** Only interval rows colour a stretch of the bending strip */
    domain?: [number, number];
}

const ROWS: RowSpec[] = [
    { id: "far-left", label: "x < -√3", kind: "interval", testValue: -2, domain: [-3, -ROOT_THREE] },
    { id: "at-minus-root-three", label: "x = -√3", kind: "point", testValue: -ROOT_THREE },
    { id: "left-of-zero", label: "-√3 < x < 0", kind: "interval", testValue: -1, domain: [-ROOT_THREE, 0] },
    { id: "at-zero", label: "x = 0", kind: "point", testValue: 0 },
    { id: "right-of-zero", label: "0 < x < √3", kind: "interval", testValue: 1, domain: [0, ROOT_THREE] },
    { id: "at-root-three", label: "x = √3", kind: "point", testValue: ROOT_THREE },
    { id: "far-right", label: "x > √3", kind: "interval", testValue: 2, domain: [ROOT_THREE, 3] },
];

interface FactorSpec {
    key: "fourX" | "minusRoot" | "plusRoot";
    header: string;
    value: (x: number) => number;
}

const FACTORS: FactorSpec[] = [
    { key: "fourX", header: "Sign of 4x", value: (x) => x },
    { key: "minusRoot", header: "Sign of (x − √3)", value: (x) => x - ROOT_THREE },
    { key: "plusRoot", header: "Sign of (x + √3)", value: (x) => x + ROOT_THREE },
];

const signOf = (value: number): Sign =>
    Math.abs(value) < 1e-9 ? "0" : value > 0 ? "+" : "-";

const combine = (signs: Sign[]): Sign => {
    if (signs.includes("0")) return "0";
    const negatives = signs.filter((sign) => sign === "-").length;
    return negatives % 2 === 0 ? "+" : "-";
};

const describe = (sign: Sign) =>
    sign === "0"
        ? "zero — a candidate only"
        : sign === "+"
          ? "positive — bends upwards"
          : "negative — bends downwards";

// ── Strip geometry ────────────────────────────────────────────────────────────
const VIEW_WIDTH = 620;
const VIEW_HEIGHT = 110;
const PAD_X = 60;
const STRIP_TOP = 40;
const STRIP_HEIGHT = 28;
const PLOT_WIDTH = VIEW_WIDTH - 2 * PAD_X;
const X_MIN = -3;
const X_MAX = 3;

const mapX = (x: number) => PAD_X + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_WIDTH;

const UP_COLOR = "#2563eb";
const DOWN_COLOR = "#ea580c";
const PENDING_COLOR = "#e2e8f0";

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

type RowChoice = Partial<Record<FactorSpec["key"], Sign>>;

export const SecondDerivativeSignTable = () => {
    const [choices, setChoices] = useState<Record<string, RowChoice>>({});

    const setChoice = (rowId: string, factor: FactorSpec["key"], sign: Sign) =>
        setChoices((previous) => ({
            ...previous,
            [rowId]: { ...previous[rowId], [factor]: sign },
        }));

    const isComplete = (row: RowSpec) => {
        const choice = choices[row.id] ?? {};
        return FACTORS.every((factor) => choice[factor.key]);
    };

    const isCorrect = (row: RowSpec) => {
        const choice = choices[row.id] ?? {};
        return FACTORS.every(
            (factor) => choice[factor.key] === signOf(factor.value(row.testValue)),
        );
    };

    const trueSign = (row: RowSpec) =>
        combine(FACTORS.map((factor) => signOf(factor.value(row.testValue))));

    const solvedCount = ROWS.filter(isCorrect).length;

    const intervalRows = ROWS.filter((row) => row.domain);
    const pointRows = ROWS.filter((row) => row.kind === "point");

    /** A candidate is confirmed once both neighbouring stretches are solved and differ */
    const isConfirmedInflection = (row: RowSpec) => {
        const index = ROWS.indexOf(row);
        const before = ROWS[index - 1];
        const after = ROWS[index + 1];
        if (!before || !after) return false;
        if (!isCorrect(before) || !isCorrect(after)) return false;
        return trueSign(before) !== trueSign(after);
    };

    return (
        <div className="space-y-4">
            <svg
                width="100%"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                role="img"
                aria-label="A strip showing which way the curve bends in each range"
            >
                <rect
                    x={0}
                    y={0}
                    width={VIEW_WIDTH}
                    height={VIEW_HEIGHT}
                    fill="#f8fafc"
                    rx={8}
                />
                <text x={PAD_X} y={24} fontSize="12" fill="#64748b">
                    Which way the curve bends
                </text>

                {intervalRows.map((row) => {
                    const [from, to] = row.domain as [number, number];
                    const solved = isCorrect(row);
                    return (
                        <rect
                            key={`strip-${row.id}`}
                            x={mapX(from)}
                            y={STRIP_TOP}
                            width={mapX(to) - mapX(from)}
                            height={STRIP_HEIGHT}
                            fill={
                                solved
                                    ? trueSign(row) === "+"
                                        ? UP_COLOR
                                        : DOWN_COLOR
                                    : PENDING_COLOR
                            }
                            opacity={solved ? 0.85 : 1}
                        />
                    );
                })}
                <rect
                    x={PAD_X}
                    y={STRIP_TOP}
                    width={PLOT_WIDTH}
                    height={STRIP_HEIGHT}
                    fill="none"
                    stroke="#94a3b8"
                />

                {pointRows.map((row) => (
                    <g key={`candidate-${row.id}`}>
                        <line
                            x1={mapX(row.testValue)}
                            y1={STRIP_TOP - 8}
                            x2={mapX(row.testValue)}
                            y2={STRIP_TOP + STRIP_HEIGHT + 8}
                            stroke="#dc2626"
                            strokeWidth={2}
                        />
                        <text
                            x={mapX(row.testValue)}
                            y={STRIP_TOP + STRIP_HEIGHT + 24}
                            textAnchor="middle"
                            fontSize="11"
                            fill={isConfirmedInflection(row) ? "#dc2626" : "#94a3b8"}
                        >
                            {isConfirmedInflection(row) ? "inflection" : row.label}
                        </text>
                    </g>
                ))}
            </svg>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-sm">
                    <thead>
                        <tr className="bg-slate-100 text-slate-700">
                            <th className="border border-slate-200 px-3 py-2 text-left">
                                Case
                            </th>
                            {FACTORS.map((factor) => (
                                <th
                                    key={factor.key}
                                    className="border border-slate-200 px-3 py-2"
                                >
                                    {factor.header}
                                </th>
                            ))}
                            <th className="border border-slate-200 px-3 py-2">
                                So d²y/dx² is
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ROWS.map((row) => {
                            const choice = choices[row.id] ?? {};
                            const complete = isComplete(row);
                            const correct = isCorrect(row);
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
                                    {FACTORS.map((factor) => (
                                        <td
                                            key={factor.key}
                                            className="border border-slate-200 px-3 py-2"
                                        >
                                            <SignButtons
                                                value={choice[factor.key]}
                                                onChange={(sign) =>
                                                    setChoice(row.id, factor.key, sign)
                                                }
                                            />
                                        </td>
                                    ))}
                                    <td className="border border-slate-200 px-3 py-2 text-center">
                                        {!complete ? (
                                            <span className="text-slate-400">
                                                choose all three signs
                                            </span>
                                        ) : correct ? (
                                            <span className="font-semibold text-emerald-700">
                                                {trueSign(row)} — {describe(trueSign(row))}
                                            </span>
                                        ) : (
                                            <span className="text-amber-700">
                                                substitute x = {row.testValue.toFixed(2)}{" "}
                                                into each factor
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
                    ? " — the bending flips at all three candidates, so all three are genuine inflection points."
                    : " — a stretch only takes its colour once its signs are right."}
            </div>
        </div>
    );
};

export default SecondDerivativeSignTable;
