import { Cartesian2D, Switch, Label } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";
import type { PlotItem } from "@/components/atoms";

const safeCurve = (x: number) => (2 * x) / (1 + x * x);
const brokenCurve = (x: number) => (2 * x) / (1 - x * x);

const CURVE_COLOR = "#6366f1";
const BROKEN_COLOR = "#0ea5e9";
const ASYMPTOTE_COLOR = "#dc2626";

const Y_LIMIT = 5;

const asymptoteLine = (x: number): PlotItem => ({
    type: "segment",
    point1: [x, -Y_LIMIT],
    point2: [x, Y_LIMIT],
    color: ASYMPTOTE_COLOR,
    style: "dashed",
    weight: 2,
});

export const DenominatorComparison = () => {
    const showZeros = useVar("framingShowDenominatorZeros", false) as boolean;
    const setVar = useSetVar();

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <div className="mb-1 text-sm font-semibold text-slate-600">
                        y = 2x / (1 + x²) — bottom never zero
                    </div>
                    <Cartesian2D
                        height={260}
                        viewBox={{ x: [-4, 4], y: [-Y_LIMIT, Y_LIMIT] }}
                        subdivisions={false}
                        plots={[
                            {
                                type: "function",
                                fn: safeCurve,
                                color: CURVE_COLOR,
                                weight: 3,
                            },
                        ]}
                    />
                    <div className="mt-1 text-sm text-slate-500">
                        {showZeros
                            ? "1 + x² = 0 has no real solution — no dashed lines to draw."
                            : "Switch the dashed lines on to compare."}
                    </div>
                </div>

                <div>
                    <div className="mb-1 text-sm font-semibold text-slate-600">
                        y = 2x / (1 − x²) — bottom zero at x = ±1
                    </div>
                    <Cartesian2D
                        height={260}
                        viewBox={{ x: [-4, 4], y: [-Y_LIMIT, Y_LIMIT] }}
                        subdivisions={false}
                        plots={[
                            {
                                type: "function",
                                fn: brokenCurve,
                                color: BROKEN_COLOR,
                                weight: 3,
                                domain: [-4, -1.02],
                            },
                            {
                                type: "function",
                                fn: brokenCurve,
                                color: BROKEN_COLOR,
                                weight: 3,
                                domain: [-0.98, 0.98],
                            },
                            {
                                type: "function",
                                fn: brokenCurve,
                                color: BROKEN_COLOR,
                                weight: 3,
                                domain: [1.02, 4],
                            },
                            ...(showZeros
                                ? [asymptoteLine(-1), asymptoteLine(1)]
                                : []),
                        ]}
                    />
                    <div className="mt-1 text-sm text-slate-500">
                        {showZeros
                            ? "1 − x² = 0 at x = −1 and x = 1 — the curve breaks at both."
                            : "Switch the dashed lines on to compare."}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <Switch
                    id="framing-denominator-switch"
                    checked={showZeros}
                    onCheckedChange={(checked) =>
                        setVar("framingShowDenominatorZeros", checked)
                    }
                />
                <Label
                    htmlFor="framing-denominator-switch"
                    className="cursor-pointer text-slate-700"
                >
                    Show where the denominator is zero
                </Label>
            </div>
        </div>
    );
};

export default DenominatorComparison;
