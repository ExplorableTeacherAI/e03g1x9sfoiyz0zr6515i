import { Cartesian2D, Slider } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";

const curve = (x: number) => (2 * x) / (1 + x * x);
const gradient = (x: number) =>
    (-2 * (x - 1) * (x + 1)) / Math.pow(1 + x * x, 2);

const CURVE_COLOR = "#6366f1";
const GRADIENT_COLOR = "#0ea5e9";
const SWEEP_COLOR = "#f59e0b";
const TURNING_COLOR = "#dc2626";

export const StackedGradientExplorer = () => {
    const sweepX = useVar("turningPointSweepX", 0) as number;
    const setVar = useSetVar();

    const gradientValue = gradient(sweepX);
    const slopeWord =
        Math.abs(gradientValue) < 0.02
            ? "flat — a turning point"
            : gradientValue > 0
              ? "positive — the curve is climbing"
              : "negative — the curve is falling";

    return (
        <div className="space-y-3">
            <div>
                <div className="mb-1 text-sm font-semibold text-slate-600">
                    The curve y = 2x / (1 + x²)
                </div>
                <Cartesian2D
                    height={230}
                    viewBox={{ x: [-4, 4], y: [-1.6, 1.6] }}
                    subdivisions={false}
                    plots={[
                        { type: "function", fn: curve, color: CURVE_COLOR, weight: 3 },
                        { type: "point", x: 1, y: 1, color: TURNING_COLOR },
                        { type: "point", x: -1, y: -1, color: TURNING_COLOR },
                        {
                            type: "segment",
                            point1: [sweepX, -1.6],
                            point2: [sweepX, 1.6],
                            color: SWEEP_COLOR,
                            style: "dashed",
                        },
                        {
                            type: "point",
                            x: sweepX,
                            y: curve(sweepX),
                            color: SWEEP_COLOR,
                        },
                    ]}
                />
            </div>

            <div>
                <div className="mb-1 text-sm font-semibold text-slate-600">
                    Its gradient dy/dx
                </div>
                <Cartesian2D
                    height={230}
                    viewBox={{ x: [-4, 4], y: [-2.4, 2.4] }}
                    subdivisions={false}
                    plots={[
                        {
                            type: "function",
                            fn: gradient,
                            color: GRADIENT_COLOR,
                            weight: 3,
                        },
                        { type: "point", x: 1, y: 0, color: TURNING_COLOR },
                        { type: "point", x: -1, y: 0, color: TURNING_COLOR },
                        {
                            type: "segment",
                            point1: [sweepX, -2.4],
                            point2: [sweepX, 2.4],
                            color: SWEEP_COLOR,
                            style: "dashed",
                        },
                        {
                            type: "point",
                            x: sweepX,
                            y: gradientValue,
                            color: SWEEP_COLOR,
                        },
                    ]}
                />
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <Slider
                    value={[sweepX]}
                    min={-4}
                    max={4}
                    step={0.05}
                    onValueChange={([value]) =>
                        setVar("turningPointSweepX", value)
                    }
                />
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-700">
                    <span>
                        x = <strong>{sweepX.toFixed(2)}</strong>
                    </span>
                    <span>
                        dy/dx = <strong>{gradientValue.toFixed(3)}</strong>
                    </span>
                    <span className="text-slate-500">{slopeWord}</span>
                </div>
            </div>
        </div>
    );
};

export default StackedGradientExplorer;
