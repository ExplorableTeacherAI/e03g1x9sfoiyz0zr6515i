import { Button } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";

const ROOT_THREE = Math.sqrt(3);

const curve = (x: number) => (2 * x) / (1 + x * x);
const gradient = (x: number) =>
    (-2 * (x - 1) * (x + 1)) / Math.pow(1 + x * x, 2);

// ── Geometry ──────────────────────────────────────────────────────────────────
const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 340;
const PAD_X = 70;
const PAD_Y = 50;
const PLOT_WIDTH = VIEW_WIDTH - 2 * PAD_X;
const PLOT_HEIGHT = VIEW_HEIGHT - 2 * PAD_Y;
const X_MIN = -4;
const X_MAX = 4;
const Y_LIMIT = 1.7;

const mapX = (x: number) => PAD_X + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_WIDTH;
const mapY = (y: number) => PAD_Y + PLOT_HEIGHT / 2 - (y / Y_LIMIT) * (PLOT_HEIGHT / 2);

const CURVE_COLOR = "#4338ca";
const POINT_COLOR = "#dc2626";
const FRAME_COLOR = "#0ea5e9";
const SLOPE_COLOR = "#16a34a";
const BEND_COLOR = "#ea580c";

interface StepSpec {
    number: number;
    title: string;
    action: string;
    result: string;
}

const STEPS: StepSpec[] = [
    {
        number: 1,
        title: "Differentiate",
        action: "Find dy/dx and d²y/dx², both in factorised form.",
        result: "dy/dx = -2(x - 1)(x + 1) / (1 + x²)²  and  d²y/dx² = 4x(x - √3)(x + √3) / (1 + x²)³",
    },
    {
        number: 2,
        title: "Turning points",
        action: "Set the numerator of dy/dx to zero and find the matching y values.",
        result: "x = -1 and x = 1, giving the points (-1, -1) and (1, 1).",
    },
    {
        number: 3,
        title: "Frame the curve",
        action: "Find y at x = 0, the limits as x runs to ±∞, and any vertical asymptote.",
        result: "Passes through (0, 0); y approaches 0 at both ends; 1 + x² is never zero, so no vertical asymptote.",
    },
    {
        number: 4,
        title: "Sign of dy/dx",
        action: "Test the sign in each range split by the turning points.",
        result: "Falling for x < -1, climbing between -1 and 1, falling again for x > 1. So (-1, -1) is a minimum and (1, 1) a maximum.",
    },
    {
        number: 5,
        title: "Sign of d²y/dx²",
        action: "Solve d²y/dx² = 0 and check where the sign actually changes.",
        result: "The bending flips at x = -√3, x = 0 and x = √3 — three points of inflection.",
    },
    {
        number: 6,
        title: "Sketch",
        action: "Join everything up: the points, the ends, the slopes and the bends.",
        result: "Only one curve fits all five sets of facts at once — and here it is.",
    },
];

/** A short arrow drawn along the tangent direction at x */
const SlopeArrow = ({ x }: { x: number }) => {
    const slope = gradient(x);
    const screenX = mapX(x);
    const screenY = mapY(curve(x));
    const directionX = PLOT_WIDTH / (X_MAX - X_MIN);
    const directionY = -slope * (PLOT_HEIGHT / 2 / Y_LIMIT);
    const length = Math.hypot(directionX, directionY);
    const unitX = (directionX / length) * 30;
    const unitY = (directionY / length) * 30;
    const tipX = screenX + unitX;
    const tipY = screenY + unitY;
    const perpendicularX = -unitY / 5;
    const perpendicularY = unitX / 5;

    return (
        <g>
            <line
                x1={screenX - unitX}
                y1={screenY - unitY}
                x2={tipX}
                y2={tipY}
                stroke={SLOPE_COLOR}
                strokeWidth={2.5}
            />
            <polygon
                points={`${tipX},${tipY} ${tipX - unitX * 0.3 + perpendicularX},${tipY - unitY * 0.3 + perpendicularY} ${tipX - unitX * 0.3 - perpendicularX},${tipY - unitY * 0.3 - perpendicularY}`}
                fill={SLOPE_COLOR}
            />
            <text
                x={screenX}
                y={screenY - 26}
                textAnchor="middle"
                fontSize="11"
                fill={SLOPE_COLOR}
            >
                {slope > 0 ? "climbing" : "falling"}
            </text>
        </g>
    );
};

const curvePath = () => {
    const steps = 240;
    const points: string[] = [];
    for (let index = 0; index <= steps; index += 1) {
        const x = X_MIN + ((X_MAX - X_MIN) * index) / steps;
        points.push(`${mapX(x).toFixed(2)},${mapY(curve(x)).toFixed(2)}`);
    }
    return `M ${points.join(" L ")}`;
};

export const StepByStepSketchBuilder = () => {
    const rawStep = useVar("sketchStep", 1) as number;
    const step = Math.min(6, Math.max(1, Math.round(rawStep)));
    const setVar = useSetVar();
    const current = STEPS[step - 1];

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                {STEPS.map((item) => (
                    <Button
                        key={item.number}
                        size="sm"
                        variant={item.number === step ? "default" : "outline"}
                        onClick={() => setVar("sketchStep", item.number)}
                    >
                        {item.number}. {item.title}
                    </Button>
                ))}
            </div>

            <svg
                width="100%"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                role="img"
                aria-label="The example curve assembled one step at a time"
            >
                <rect
                    x={0}
                    y={0}
                    width={VIEW_WIDTH}
                    height={VIEW_HEIGHT}
                    fill="#f8fafc"
                    rx={8}
                />

                {/* axes */}
                <line
                    x1={PAD_X}
                    y1={mapY(0)}
                    x2={VIEW_WIDTH - PAD_X}
                    y2={mapY(0)}
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                />
                <line
                    x1={mapX(0)}
                    y1={PAD_Y - 12}
                    x2={mapX(0)}
                    y2={VIEW_HEIGHT - PAD_Y + 12}
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                />
                {[-3, -2, -1, 1, 2, 3].map((tick) => (
                    <text
                        key={`tick-${tick}`}
                        x={mapX(tick)}
                        y={mapY(0) + 16}
                        textAnchor="middle"
                        fontSize="11"
                        fill="#94a3b8"
                    >
                        {tick}
                    </text>
                ))}

                {step === 1 && (
                    <text
                        x={VIEW_WIDTH / 2}
                        y={PAD_Y + PLOT_HEIGHT / 2 - 20}
                        textAnchor="middle"
                        fontSize="13"
                        fill="#64748b"
                    >
                        Nothing is drawn yet — differentiate first.
                    </text>
                )}

                {/* step 3: the frame */}
                {step >= 3 && (
                    <>
                        <circle cx={mapX(0)} cy={mapY(0)} r={5} fill={FRAME_COLOR} />
                        <text
                            x={mapX(0) + 10}
                            y={mapY(0) - 10}
                            fontSize="11"
                            fill={FRAME_COLOR}
                        >
                            (0, 0)
                        </text>
                        <text
                            x={PAD_X}
                            y={mapY(0) - 12}
                            fontSize="11"
                            fill={FRAME_COLOR}
                        >
                            y → 0
                        </text>
                        <text
                            x={VIEW_WIDTH - PAD_X}
                            y={mapY(0) - 12}
                            textAnchor="end"
                            fontSize="11"
                            fill={FRAME_COLOR}
                        >
                            y → 0
                        </text>
                    </>
                )}

                {/* step 2: turning points */}
                {step >= 2 && (
                    <>
                        <circle cx={mapX(1)} cy={mapY(1)} r={6} fill={POINT_COLOR} />
                        <circle cx={mapX(-1)} cy={mapY(-1)} r={6} fill={POINT_COLOR} />
                        <line
                            x1={mapX(1) - 26}
                            y1={mapY(1)}
                            x2={mapX(1) + 26}
                            y2={mapY(1)}
                            stroke={POINT_COLOR}
                            strokeWidth={2}
                        />
                        <line
                            x1={mapX(-1) - 26}
                            y1={mapY(-1)}
                            x2={mapX(-1) + 26}
                            y2={mapY(-1)}
                            stroke={POINT_COLOR}
                            strokeWidth={2}
                        />
                        <text
                            x={mapX(1)}
                            y={mapY(1) - 14}
                            textAnchor="middle"
                            fontSize="11"
                            fill={POINT_COLOR}
                        >
                            (1, 1){step >= 4 ? " maximum" : ""}
                        </text>
                        <text
                            x={mapX(-1)}
                            y={mapY(-1) + 24}
                            textAnchor="middle"
                            fontSize="11"
                            fill={POINT_COLOR}
                        >
                            (-1, -1){step >= 4 ? " minimum" : ""}
                        </text>
                    </>
                )}

                {/* step 4: slope arrows */}
                {step >= 4 &&
                    [-2.5, 0, 2.5].map((x) => <SlopeArrow key={`slope-${x}`} x={x} />)}

                {/* step 5: inflection points */}
                {step >= 5 &&
                    [-ROOT_THREE, 0, ROOT_THREE].map((x) => (
                        <g key={`inflection-${x.toFixed(3)}`}>
                            <circle
                                cx={mapX(x)}
                                cy={mapY(curve(x))}
                                r={5}
                                fill="none"
                                stroke={BEND_COLOR}
                                strokeWidth={2.5}
                            />
                            <text
                                x={mapX(x)}
                                y={mapY(curve(x)) + (x > 0 ? 22 : -14)}
                                textAnchor="middle"
                                fontSize="10"
                                fill={BEND_COLOR}
                            >
                                inflection
                            </text>
                        </g>
                    ))}

                {/* step 6: the finished curve */}
                {step >= 6 && (
                    <path
                        d={curvePath()}
                        fill="none"
                        stroke={CURVE_COLOR}
                        strokeWidth={3}
                    />
                )}
            </svg>

            <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="text-sm font-semibold text-slate-700">
                    Step {current.number} — {current.title}
                </div>
                <div className="mt-1 text-sm text-slate-600">{current.action}</div>
                <div className="mt-2 text-sm text-slate-800">{current.result}</div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={step === 1}
                    onClick={() => setVar("sketchStep", step - 1)}
                >
                    Back
                </Button>
                <Button
                    size="sm"
                    disabled={step === STEPS.length}
                    onClick={() => setVar("sketchStep", step + 1)}
                >
                    Next step
                </Button>
                <span className="text-sm text-slate-500">
                    Step {step} of {STEPS.length}
                </span>
            </div>
        </div>
    );
};

export default StepByStepSketchBuilder;
